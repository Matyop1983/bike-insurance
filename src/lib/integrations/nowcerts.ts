import {
  bikeTypeLabel,
  bikeValueLabel,
  coverageLabels,
  quoteTypeLabel,
  type QuotePayload,
} from "@/lib/quote";

export const NOWCERTS_FORM_NAME = "Rhino Website Quote Request";
export const DEFAULT_NOWCERTS_AGENCY_ID =
  "f3f521d1-ac53-4e82-9865-b9642378d129";
export const DEFAULT_NOWCERTS_ENDPOINT =
  "https://api.nowcerts.com/api/PushJsonQuoteApplications";

export type NowCertsQuotePayload = {
  AgencyID: string;
  "Form Name": string;
  "Applicant Name": string;
  Email: string;
  "Phone Number": string;
  "Coverage Type": string;
  "Business Name": string;
  "City or ZIP": string;
  "Coverage Interests": string;
  "Bike Type": string;
  "Bike Value Range": string;
  Message: string;
  "Reference ID": string;
  "Submitted At": string;
  Source: string;
};

export type DeliveryResult = {
  ok: boolean;
  skipped?: boolean;
  status?: number;
  message: string;
};

export function nowCertsAgencyId(): string {
  return process.env.NOWCERTS_AGENCY_ID?.trim() || DEFAULT_NOWCERTS_AGENCY_ID;
}

export function nowCertsEndpoint(): string {
  return process.env.NOWCERTS_ENDPOINT?.trim() || DEFAULT_NOWCERTS_ENDPOINT;
}

export function buildNowCertsPayload(
  quote: QuotePayload,
  meta: { id: string; receivedAt: string },
): NowCertsQuotePayload {
  return {
    AgencyID: nowCertsAgencyId(),
    "Form Name": NOWCERTS_FORM_NAME,
    "Applicant Name": quote.name,
    Email: quote.email,
    "Phone Number": quote.phone,
    "Coverage Type": quoteTypeLabel(quote.quoteType),
    "Business Name": quote.businessName,
    "City or ZIP": quote.location,
    "Coverage Interests": coverageLabels(quote),
    "Bike Type": bikeTypeLabel(quote.bikeType),
    "Bike Value Range": bikeValueLabel(quote.bikeValue),
    Message: quote.message,
    "Reference ID": meta.id,
    "Submitted At": meta.receivedAt,
    Source: "Rhino website quote form",
  };
}

export async function pushNowCertsQuote(
  payload: NowCertsQuotePayload,
): Promise<DeliveryResult> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const apiKey = process.env.NOWCERTS_API_KEY?.trim();
    if (apiKey) {
      headers.Authorization = `Bearer ${apiKey}`;
    }

    const response = await fetch(nowCertsEndpoint(), {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12_000),
    });
    const text = await response.text();
    if (!response.ok) {
      console.error(
        "[nowcerts]",
        payload["Reference ID"],
        response.status,
        text.slice(0, 500),
      );
      return {
        ok: false,
        status: response.status,
        message: text.slice(0, 300) || `NowCerts HTTP ${response.status}`,
      };
    }
    console.info("[nowcerts]", payload["Reference ID"], "ok", response.status);
    return {
      ok: true,
      status: response.status,
      message: text.slice(0, 300) || "accepted",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "NowCerts request failed";
    console.error("[nowcerts]", payload["Reference ID"], message);
    return { ok: false, message };
  }
}
