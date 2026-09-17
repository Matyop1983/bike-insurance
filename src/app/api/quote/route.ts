import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
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
    typeof record.name === "string" &&
    typeof record.email === "string" &&
    typeof record.phone === "string" &&
    typeof record.bikeType === "string" &&
    typeof record.bikeValue === "string" &&
    typeof record.location === "string" &&
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

  const id = `PG-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const entry = {
    id,
    receivedAt: new Date().toISOString(),
    ...normalized,
  };

  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, "quote-submissions.jsonl"),
    `${JSON.stringify(entry)}\n`,
    "utf8",
  );

  console.info("[quote]", id, normalized.email, normalized.bikeType);
  return NextResponse.json({ ok: true, id });
}
