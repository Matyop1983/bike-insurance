import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { notifyQuoteByEmail } from "@/lib/integrations/notify";
import {
  buildNowCertsPayload,
  pushNowCertsQuote,
} from "@/lib/integrations/nowcerts";
import {
  buildersRiskQuoteErrors,
  isBuildersRiskIntakeBody,
  toQuotePayload,
  validateBuildersRiskIntake,
} from "@/lib/builders-risk-intake";
import {
  isWorkersCompIntakeBody,
  toWorkersCompQuotePayload,
  validateWorkersCompIntake,
  workersCompQuoteErrors,
} from "@/lib/workers-comp-intake";
import {
  normalizeQuote,
  type QuotePayload,
  validateQuote,
} from "@/lib/quote";
import { contentDrop, logDroppedSubmission, trapDrop } from "@/lib/spam";
import { turnstileToken, verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

const QUOTE_LOG_DIR = path.join(process.cwd(), "data");
const QUOTE_LOG_PATH = path.join(QUOTE_LOG_DIR, "quote-submissions.jsonl");

function fsErrorCode(error: unknown): string {
  if (typeof error === "object" && error && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string") return code;
  }
  return "";
}

/**
 * Local JSONL is a convenience for writable environments. Vercel functions
 * can only write under /tmp, so a failure here must not fail the submission.
 */
async function tryAppendQuoteLog(record: unknown): Promise<boolean> {
  try {
    await mkdir(QUOTE_LOG_DIR, { recursive: true });
    await appendFile(QUOTE_LOG_PATH, `${JSON.stringify(record)}\n`, "utf8");
    return true;
  } catch (error) {
    const code = fsErrorCode(error);
    console.warn(
      "[quote] local file log skipped",
      code || (error instanceof Error ? error.message : "unknown error"),
    );
    return false;
  }
}

function isPayload(value: unknown): value is QuotePayload {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.quoteType === "string" &&
    typeof record.name === "string" &&
    typeof record.email === "string" &&
    typeof record.phone === "string" &&
    typeof record.location === "string" &&
    typeof record.businessName === "string" &&
    typeof record.message === "string" &&
    Array.isArray(record.coverage) &&
    record.coverage.every((item) => typeof item === "string")
  );
}

export async function POST(request: Request) {
  try {
    return await handleQuotePost(request);
  } catch (error) {
    console.error("[quote] request failed", error);
    return NextResponse.json(
      { error: "Server error — we couldn’t save that request. Try again." },
      { status: 500 },
    );
  }
}

function clientIp(request: Request): string | null {
  const cloudflare = request.headers.get("cf-connecting-ip")?.trim();
  if (cloudflare) return cloudflare;
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || null;
}

/**
 * Same shape as a delivered quote. Bots get an RH- id and nothing is
 * forwarded to NowCerts or Resend.
 */
function silentDrop(reason: string, body: unknown) {
  logDroppedSubmission(reason, body);
  const id = `RH-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  return NextResponse.json({
    ok: true,
    id,
    nowcerts: "ok",
    email: "ok",
  });
}

function turnstileRejection(reason: "turnstile" | "turnstile-unavailable", body: unknown) {
  logDroppedSubmission(reason, body);
  return NextResponse.json(
    { error: "We couldn’t verify this submission. Please try again." },
    { status: reason === "turnstile-unavailable" ? 503 : 400 },
  );
}

function acceptQuote(body: unknown): QuotePayload | NextResponse {
  if (isBuildersRiskIntakeBody(body)) {
    const intakeErrors = validateBuildersRiskIntake(body);
    if (Object.keys(intakeErrors).length) {
      return NextResponse.json(
        { error: "Please fix the highlighted fields.", errors: intakeErrors },
        { status: 400 },
      );
    }
    const quoteErrors = buildersRiskQuoteErrors(body);
    if (Object.keys(quoteErrors).length) {
      console.error(
        "[quote] builders risk intake did not fit the quote payload",
        quoteErrors,
      );
      return NextResponse.json(
        { error: "Server error — we couldn’t save that request. Try again." },
        { status: 500 },
      );
    }
    return toQuotePayload(body);
  }

  if (isWorkersCompIntakeBody(body)) {
    const intakeErrors = validateWorkersCompIntake(body);
    if (Object.keys(intakeErrors).length) {
      return NextResponse.json(
        { error: "Please fix the highlighted fields.", errors: intakeErrors },
        { status: 400 },
      );
    }
    const quoteErrors = workersCompQuoteErrors(body);
    if (Object.keys(quoteErrors).length) {
      console.error(
        "[quote] workers comp intake did not fit the quote payload",
        quoteErrors,
      );
      return NextResponse.json(
        { error: "Server error — we couldn’t save that request. Try again." },
        { status: 500 },
      );
    }
    return toWorkersCompQuotePayload(body);
  }

  if (!isPayload(body)) {
    return NextResponse.json(
      { error: "The form was missing required fields." },
      { status: 400 },
    );
  }

  const normalized = normalizeQuote(body);
  const errors = validateQuote(normalized);
  if (Object.keys(errors).length) {
    return NextResponse.json(
      { error: "Please fix the highlighted fields.", errors },
      { status: 400 },
    );
  }

  return normalized;
}

async function handleQuotePost(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send JSON in the request body." }, { status: 400 });
  }

  const trap = trapDrop(body);
  if (trap) return silentDrop(trap.reason, body);

  const accepted = acceptQuote(body);
  if (accepted instanceof NextResponse) return accepted;

  const content = contentDrop(body);
  if (content) return silentDrop(content.reason, body);

  const turnstile = await verifyTurnstileToken(turnstileToken(body), clientIp(request));
  if (!turnstile.ok) return turnstileRejection(turnstile.reason, body);

  return deliverQuote(accepted);
}

async function deliverQuote(normalized: QuotePayload) {
  const id = `RH-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const receivedAt = new Date().toISOString();
  const entry = {
    id,
    receivedAt,
    ...normalized,
  };

  const loggedSubmission = await tryAppendQuoteLog(entry);
  if (!loggedSubmission) {
    console.info("[quote] submission", JSON.stringify(entry));
  }

  const nowcertsPayload = buildNowCertsPayload(normalized, { id, receivedAt });
  const nowcerts = await pushNowCertsQuote(nowcertsPayload);
  const email = await notifyQuoteByEmail(normalized, { id, receivedAt });

  await tryAppendQuoteLog({
    type: "delivery",
    id,
    at: new Date().toISOString(),
    nowcerts,
    email,
  });

  console.info(
    "[quote]",
    id,
    normalized.quoteType,
    normalized.email,
    "nowcerts",
    nowcerts.ok ? "ok" : nowcerts.skipped ? "skipped" : "failed",
    "email",
    email.ok ? "ok" : email.skipped ? "pending-env" : "failed",
    "log",
    loggedSubmission ? "file" : "skipped",
  );

  return NextResponse.json({
    ok: true,
    id,
    // File log, NowCerts, and email are best-effort. A valid request still
    // returns the RH- id so a read-only filesystem cannot fail the submission.
    nowcerts: nowcerts.ok ? "ok" : "failed",
    email: email.skipped ? "pending-env" : email.ok ? "ok" : "failed",
    ...(nowcerts.ok
      ? {}
      : {
          note: loggedSubmission
            ? "Quote saved locally. NowCerts insert failed — check delivery logs."
            : "NowCerts insert failed — check server logs.",
        }),
  });
}
