import { TURNSTILE_FIELD } from "@/lib/spam-fields";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function turnstileSiteKey(): string {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
}

export function turnstileSecret(): string {
  return process.env.TURNSTILE_SECRET_KEY?.trim() ?? "";
}

/** Both keys are required. Either one alone leaves verification off. */
export function turnstileEnabled(): boolean {
  return Boolean(turnstileSiteKey() && turnstileSecret());
}

export type TurnstileResult =
  | { ok: true }
  | { ok: false; reason: "turnstile" | "turnstile-unavailable" };

export function turnstileToken(body: unknown): unknown {
  if (!body || typeof body !== "object") return undefined;
  return (body as Record<string, unknown>)[TURNSTILE_FIELD];
}

/**
 * No-op when Turnstile is not configured. A missing or rejected token
 * fails closed. A network failure fails closed with `turnstile-unavailable`
 * so the visitor can retry instead of the lead being forwarded unverified.
 */
export async function verifyTurnstileToken(
  token: unknown,
  remoteIp: string | null,
): Promise<TurnstileResult> {
  if (!turnstileEnabled()) return { ok: true };
  if (typeof token !== "string" || token.trim() === "" || token.length > 2048) {
    return { ok: false, reason: "turnstile" };
  }

  try {
    const params = new URLSearchParams({
      secret: turnstileSecret(),
      response: token,
    });
    if (remoteIp) params.set("remoteip", remoteIp);
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
      signal: AbortSignal.timeout(10_000),
    });
    // Siteverify uses HTTP 400 with `{ success: false }` for a bad token or
    // secret. That is a failed check, not an outage. Only a missing body or
    // a 5xx means we could not complete verification.
    let data: { success?: unknown };
    try {
      data = (await response.json()) as { success?: unknown };
    } catch {
      return { ok: false, reason: "turnstile-unavailable" };
    }
    if (data.success === true) return { ok: true };
    if (response.status >= 500) return { ok: false, reason: "turnstile-unavailable" };
    return { ok: false, reason: "turnstile" };
  } catch {
    return { ok: false, reason: "turnstile-unavailable" };
  }
}
