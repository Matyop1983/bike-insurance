import { coverageLabels, quoteTypeLabel, type QuotePayload } from "@/lib/quote";

export const DEFAULT_QUOTE_NOTIFY_TO = "Matthew@Rhinoia.com";

export type DeliveryResult = {
  ok: boolean;
  skipped?: boolean;
  status?: number;
  message: string;
};

export function quoteNotifyTo(): string {
  return process.env.QUOTE_NOTIFY_TO?.trim() || DEFAULT_QUOTE_NOTIFY_TO;
}

export function formatQuoteNotification(
  quote: QuotePayload,
  meta: { id: string; receivedAt: string },
): { subject: string; text: string } {
  const lines = [
    `Reference ID: ${meta.id}`,
    `Submitted: ${meta.receivedAt}`,
    `Coverage Type: ${quoteTypeLabel(quote.quoteType)}`,
    `Applicant Name: ${quote.name}`,
    `Email: ${quote.email}`,
    `Phone Number: ${quote.phone || "(none)"}`,
    `City or ZIP: ${quote.location}`,
    `Business Name: ${quote.businessName || "(none)"}`,
    `Coverage Interests: ${coverageLabels(quote) || "(none)"}`,
    `Bike Type: ${quote.bikeType || "(none)"}`,
    `Bike Value: ${quote.bikeValue || "(none)"}`,
    `Message: ${quote.message || "(none)"}`,
    "",
    "This is a website quote request, not a binder.",
  ];
  return {
    subject: `Rhino quote request ${meta.id} (${quoteTypeLabel(quote.quoteType)})`,
    text: lines.join("\n"),
  };
}

export async function notifyQuoteByEmail(
  quote: QuotePayload,
  meta: { id: string; receivedAt: string },
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.QUOTE_NOTIFY_FROM?.trim();
  if (!apiKey || !from) {
    const message =
      "Email pending env vars (set RESEND_API_KEY and QUOTE_NOTIFY_FROM). NowCerts push is independent.";
    console.info("[quote-email]", meta.id, message);
    return { ok: false, skipped: true, message };
  }

  const { subject, text } = formatQuoteNotification(quote, meta);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [quoteNotifyTo()],
        subject,
        text,
      }),
      signal: AbortSignal.timeout(12_000),
    });
    const body = await response.text();
    if (!response.ok) {
      console.error("[quote-email]", meta.id, response.status, body.slice(0, 400));
      return {
        ok: false,
        status: response.status,
        message: body.slice(0, 300) || `Resend HTTP ${response.status}`,
      };
    }
    console.info("[quote-email]", meta.id, "sent to", quoteNotifyTo());
    return { ok: true, status: response.status, message: "sent" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email request failed";
    console.error("[quote-email]", meta.id, message);
    return { ok: false, message };
  }
}
