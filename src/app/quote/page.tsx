import type { Metadata } from "next";
import { PageIntro, SampleCallout } from "@/components/CtaBand";
import { QuoteForm } from "@/components/QuoteForm";
import { sampleNotice } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get a quote",
  description:
    "Request a PedalGuard bicycle insurance quote. Client-side validation, no payment, no live pricing.",
};

export default function QuotePage() {
  return (
    <>
      <PageIntro
        kicker="Quote request"
        title="Tell us about the bike. We’ll confirm we got it."
        body="This is not a pricing engine. There is no checkout. The form checks required fields in your browser, then a small API route stores the request locally so you can wire email later."
      />
      <div className="wrap grid gap-10 pb-20 lg:grid-cols-[1fr_0.85fr] lg:items-start">
        <QuoteForm />
        <aside className="space-y-5 rounded-[2rem] border border-line bg-sand/40 p-6 sm:p-8">
          <SampleCallout>{sampleNotice}</SampleCallout>
          <div>
            <h2 className="text-lg font-semibold text-forest">What we ask</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
              <li>Name and email so a partner can follow up</li>
              <li>Phone only if you’d rather talk than type</li>
              <li>Bike type and value range — enough to start, not a serial number</li>
              <li>City or ZIP for regional eligibility later</li>
              <li>Coverage checkboxes: theft, damage, liability, accessories</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-forest">What happens</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              You’ll see a success state and a reference ID. Submissions are
              appended to{" "}
              <code className="text-forest">data/quote-submissions.jsonl</code>{" "}
              on the server. See the README to connect Resend, Postmark, or
              another email API.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
