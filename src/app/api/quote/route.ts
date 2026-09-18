import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { notifyQuoteByEmail } from "@/lib/integrations/notify";
import {
  buildNowCertsPayload,
  pushNowCertsQuote,
} from "@/lib/integrations/nowcerts";
import {
  normalizeQuote,
  type QuotePayload,
  validateQuote,
} from "@/lib/quote";

export const runtime = "nodejs";

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
    typeof record.bikeType === "string" &&
    typeof record.bikeValue === "string" &&
    typeof record.message === "string" &&
    Array.isArray(record.coverage) &&
    record.coverage.every((item) => typeof item === "string")
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send JSON in the request body." }, { status: 400 });
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

  const id = `RH-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const receivedAt = new Date().toISOString();
  const entry = {
    id,
    receivedAt,
    ...normalized,
  };

  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  const logPath = path.join(dir, "quote-submissions.jsonl");
  await appendFile(logPath, `${JSON.stringify(entry)}\n`, "utf8");

  const nowcertsPayload = buildNowCertsPayload(normalized, { id, receivedAt });
  const nowcerts = await pushNowCertsQuote(nowcertsPayload);
  const email = await notifyQuoteByEmail(normalized, { id, receivedAt });

  await appendFile(
    logPath,
    `${JSON.stringify({
      type: "delivery",
      id,
      at: new Date().toISOString(),
      nowcerts,
      email,
    })}\n`,
    "utf8",
  );

  console.info(
    "[quote]",
    id,
    normalized.quoteType,
    normalized.email,
    "nowcerts",
    nowcerts.ok ? "ok" : nowcerts.skipped ? "skipped" : "failed",
    "email",
    email.ok ? "ok" : email.skipped ? "pending-env" : "failed",
  );

  return NextResponse.json({
    ok: true,
    id,
    // User-facing success is based on the local save. Integrations are best-effort.
    nowcerts: nowcerts.ok ? "ok" : "failed",
    email: email.skipped ? "pending-env" : email.ok ? "ok" : "failed",
    ...(nowcerts.ok
      ? {}
      : {
          note: "Quote saved locally. NowCerts insert failed — check delivery logs.",
        }),
  });
}
