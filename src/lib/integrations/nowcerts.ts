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

/** Human-readable keys for the NowCerts mapping UI (inner `json` string). */
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

/**
 * PushJsonQuoteApplications expects AgencyID / FormName on the envelope and
 * the labeled fields as a JSON *string* in `json`. A flat object posts as
 * HTTP 200 `{"status":1,"message":"Error!"}` and is not inserted.
 */
export type NowCertsEnvelope = {
  AgencyID: string;
  FormName: string;
  "Form Name": string;
  json: string;
};

export type DeliveryResult = {
  ok: boolean;
  skipped?: boolean;
  status?: number;
  message: string;
  amsId?: string;
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

export function buildNowCertsEnvelope(
  fields: NowCertsQuotePayload,
): NowCertsEnvelope {
  return {
    AgencyID: fields.AgencyID,
    FormName: fields["Form Name"],
    "Form Name": fields["Form Name"],
    json: JSON.stringify(fields),
  };
}

export function parseNowCertsBody(text: string): {
  ok: boolean;
  message: string;
  amsId?: string;
} {
  const trimmed = text.trim();
  try {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    const rawMessage =
      (typeof parsed.message === "string" && parsed.message) ||
      (typeof parsed.Message === "string" && parsed.Message) ||
      trimmed;
    const amsIdMatch = rawMessage.match(/database id:\s*([0-9a-f-]{36})/i);
    const inserted = /successfully inserted/i.test(rawMessage);
    const errorOnly = /^error!?$/i.test(rawMessage.trim());
    return {
      ok: inserted && !errorOnly,
      message: rawMessage.slice(0, 300),
      amsId: amsIdMatch?.[1],
    };
  } catch {
    return {
      ok: false,
      message: (trimmed || "NowCerts returned a non-JSON body").slice(0, 300),
    };
  }
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

    const envelope = buildNowCertsEnvelope(payload);
    const response = await fetch(nowCertsEndpoint(), {
      method: "POST",
      headers,
      body: JSON.stringify(envelope),
      signal: AbortSignal.timeout(12_000),
    });
    const text = await response.text();
    const parsed = parseNowCertsBody(text);

    if (!response.ok || !parsed.ok) {
      console.error(
        "[nowcerts]",
        payload["Reference ID"],
        response.status,
        parsed.message,
      );
      return {
        ok: false,
        status: response.status,
        message: parsed.message || `NowCerts HTTP ${response.status}`,
      };
    }

    console.info(
      "[nowcerts]",
      payload["Reference ID"],
      "ok",
      response.status,
      parsed.amsId ?? parsed.message,
    );
    return {
      ok: true,
      status: response.status,
      message: parsed.message,
      amsId: parsed.amsId,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "NowCerts request failed";
    console.error("[nowcerts]", payload["Reference ID"], message);
    return { ok: false, message };
  }
}
