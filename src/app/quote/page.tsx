import type { Metadata } from "next";
import { PageIntro, SampleCallout } from "@/components/CtaBand";
import { QuoteForm } from "@/components/QuoteForm";
import { sampleNotice } from "@/lib/content";
import { parseQuoteType } from "@/lib/quote";

export const metadata: Metadata = {
  title: "Get a quote",
  description:
    "Request a commercial, personal, or bicycle insurance quote from Rhino Insurance Advisors in Edinburg, TX.",
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const initialType = parseQuoteType(params.type);

  return (
    <>
      <PageIntro
        kicker="Quote request"
        title="Tell us what you need. We’ll confirm we got it."
        body="Choose commercial, personal, or bicycle. This is not a pricing engine or checkout — an advisor follows up. Bicycle requests capture type, value, and coverage interests."
      />
      <div className="wrap grid gap-10 pb-20 lg:grid-cols-[1.05fr_0.8fr] lg:items-start">
        <QuoteForm initialType={initialType} />
        <aside className="space-y-5 rounded-sm border border-line bg-paper p-6 sm:p-8">
          <SampleCallout>{sampleNotice}</SampleCallout>
          <div>
            <h2 className="text-lg font-semibold text-ink">What happens</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              You’ll see a success state and a reference ID starting with RH-.
              Submissions are appended to{" "}
              <code className="text-ink">data/quote-submissions.jsonl</code>. Wire
              email later so quoting@rhinoia.com gets a copy — see the README.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
