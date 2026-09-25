import type { Metadata } from "next";
import { PageIntro, SampleCallout } from "@/components/CtaBand";
import { QuoteForm } from "@/components/QuoteForm";
import { brand, callCta } from "@/lib/brand";
import { sampleNotice } from "@/lib/content";
import { parseCoverageParam, parseQuoteType } from "@/lib/quote";

export const metadata: Metadata = {
  title: "Request a callback",
  description: `Call ${brand.phone} for a quote from Rhino Insurance Advisors in Edinburg, TX. The online form only requests a callback — it is not a price or a binder.`,
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; coverage?: string | string[] }>;
}) {
  const params = await searchParams;
  const initialType = parseQuoteType(params.type);
  const initialCoverage = parseCoverageParam(params.coverage, initialType);

  return (
    <>
      <PageIntro
        kicker="Quotes"
        title="Call us for a quote."
        body={`Call ${brand.phone}, ${brand.hours}. ${brand.name}, Edinburg. The form below is optional — leave your details and we’ll call you back. It does not show a price and it does not bind coverage.`}
      />
      <div className="wrap pb-10">
        <a
          href={callCta.href}
          className="inline-flex flex-col items-center justify-center rounded-sm bg-teal px-6 py-3 text-center text-sm font-semibold text-ink hover:bg-teal-dark sm:flex-row"
        >
          <span>{callCta.label}</span>
          <span className="font-medium sm:ml-2">{brand.phone}</span>
        </a>
      </div>
      <div className="wrap grid gap-10 pb-20 lg:grid-cols-[1.05fr_0.8fr] lg:items-start">
        <div>
          <h2 className="text-xl font-semibold text-ink">Optional: request a callback</h2>
          <p className="mt-2 mb-6 text-sm leading-relaxed text-muted">
            Commercial or personal. Coverage interests include life insurance,
            group benefits, and builders risk. An advisor follows up by phone.
            This is not live pricing.
          </p>
          <QuoteForm initialType={initialType} initialCoverage={initialCoverage} />
        </div>
        <aside className="space-y-5 rounded-sm border border-line bg-paper p-6 sm:p-8">
          <SampleCallout>{sampleNotice}</SampleCallout>
          <div>
            <h2 className="text-lg font-semibold text-ink">What happens</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Calling {brand.phone} is the way to talk through a quote during{" "}
              {brand.hours}. If you use the form, you’ll see a confirmation and
              a reference ID starting with RH-. That confirmation is not a
              price, a binder, or coverage.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
