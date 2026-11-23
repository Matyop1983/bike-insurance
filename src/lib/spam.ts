import {
  HONEYPOT_FIELD,
  RENDERED_AT_FIELD,
} from "@/lib/spam-fields";

/**
 * Submissions faster than this (measured from when the form rendered)
 * are treated as automated. Edit this if real callbacks are being dropped.
 */
export const MIN_SUBMIT_MS = 3_000;

/** More than this many URLs in the visitor's note is treated as solicitation. */
export const MAX_MESSAGE_URLS = 2;

/**
 * Case-insensitive solicitation phrases checked against the visitor's
 * note (the callback message, and free-text notes on the longer intakes).
 * Names, addresses, and business names are not scanned, so a contractor
 * whose company name contains one of these words is not dropped.
 *
 * A single short word uses a word boundary (`seo` does not match inside
 * another word). Everything else is a substring match.
 * Add or remove phrases here — this is the only list.
 */
export const SOLICITATION_PATTERNS = [
  "built a website for you",
  "seo",
  "web design",
  "rank your website",
  "marketing services",
  "backlinks",
  "guest post",
] as const;

const NOTE_FIELDS = [
  "message",
  "notes",
  "description",
  "scopeOfWork",
  "operations",
  "claimsNotes",
  "payrollByClass",
  "businessTypeOther",
  "constructionOther",
  "occupancyOther",
] as const;

const URL_PATTERN = /\b(?:https?:\/\/|www\.)[^\s<>"'`]+/gi;

export type SpamDrop = {
  reason: string;
};

function record(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") return null;
  return value as Record<string, unknown>;
}

function honeypotFilled(value: unknown): boolean {
  if (typeof value === "string") return value.trim() !== "";
  if (Array.isArray(value)) return value.some((item) => honeypotFilled(item));
  return false;
}

function renderedAtMillis(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

/**
 * True when the form included a render timestamp and the submit arrived
 * too quickly. A missing timestamp is allowed so a payload that predates
 * this field still delivers.
 * A client clock ahead of the server (negative elapsed) is allowed so
 * ordinary clock skew does not drop a real callback.
 */
export function submittedTooFast(value: unknown, now = Date.now()): boolean {
  const started = renderedAtMillis(value);
  if (started == null) return false;
  const elapsed = now - started;
  if (elapsed < 0) return false;
  return elapsed < MIN_SUBMIT_MS;
}

function patternMatches(text: string, pattern: string): boolean {
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!pattern.includes(" ") && pattern.length <= 4) {
    return new RegExp(`\\b${escaped}\\b`, "i").test(text);
  }
  return text.toLowerCase().includes(pattern.toLowerCase());
}

export function solicitationMatch(text: string): string | null {
  for (const pattern of SOLICITATION_PATTERNS) {
    if (patternMatches(text, pattern)) return pattern;
  }
  return null;
}

export function countUrls(text: string): number {
  return text.match(URL_PATTERN)?.length ?? 0;
}

/** Free-text notes the visitor typed. Does not include name or address fields. */
export function visitorNotes(body: unknown): string {
  const source = record(body);
  if (!source) return "";
  const parts: string[] = [];
  for (const key of NOTE_FIELDS) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) parts.push(value);
  }
  return parts.join("\n");
}

export function contentDrop(body: unknown): SpamDrop | null {
  const notes = visitorNotes(body);
  if (!notes) return null;
  const pattern = solicitationMatch(notes);
  if (pattern) return { reason: `solicitation:${pattern}` };
  const urls = countUrls(notes);
  if (urls > MAX_MESSAGE_URLS) return { reason: `urls:${urls}` };
  return null;
}

/** Honeypot and speed trap. These return a normal-looking success and skip delivery. */
export function trapDrop(body: unknown, now = Date.now()): SpamDrop | null {
  const source = record(body);
  if (!source) return null;
  if (honeypotFilled(source[HONEYPOT_FIELD])) return { reason: "honeypot" };
  if (submittedTooFast(source[RENDERED_AT_FIELD], now)) return { reason: "too-fast" };
  return null;
}

function emailDomain(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().toLowerCase();
  const at = trimmed.lastIndexOf("@");
  if (at <= 0 || at >= trimmed.length - 1) return null;
  const domain = trimmed.slice(at + 1).replace(/\.+$/, "");
  if (!/^[a-z0-9.-]+$/.test(domain) || !domain.includes(".")) return null;
  return domain.slice(0, 80);
}

export function emailDomainFromBody(body: unknown): string {
  const source = record(body);
  if (!source) return "unknown";
  for (const key of ["email", "contactEmail", "namedInsuredEmail"]) {
    const domain = emailDomain(source[key]);
    if (domain) return domain;
  }
  return "unknown";
}

function formKind(body: unknown): string {
  const source = record(body);
  if (!source) return "unknown";
  if (source.form === "builders-risk" || source.form === "workers-comp") {
    return source.form;
  }
  if (typeof source.quoteType === "string" && source.quoteType) return source.quoteType;
  return "callback";
}

/** Vercel log line. Email domain only — never the full address or the message. */
export function logDroppedSubmission(reason: string, body: unknown): void {
  console.log(
    `[quote] dropped reason=${reason} emailDomain=${emailDomainFromBody(body)} form=${formKind(body)}`,
  );
}
