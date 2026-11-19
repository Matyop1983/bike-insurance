import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SampleCallout } from "@/components/CtaBand";
import { BuildersRiskForm } from "@/components/BuildersRiskForm";
import { brand } from "@/lib/brand";
import { sampleNotice } from "@/lib/content";

export const metadata: Metadata = {
  title: "Builder’s Risk Quote",
  description: `Send project details for a builder’s risk callback from ${brand.name} in Edinburg, TX. This form is not a price or a binder.`,
};

export default function BuildersRiskQuotePage() {
  return (
    <>
      <PageIntro
        kicker="Builder’s risk"
        title="Tell us about the job."
        body="Share the project address, construction type, values, and who to call. Submitting this form requests a callback. It does not show a price and it does not bind coverage."
      />
      <div className="wrap pb-6">
        <p className="text-sm text-muted">
          Prefer to talk now?{" "}
          <a className="font-semibold text-ink hover:text-teal-dark" href={brand.phoneHref}>
            {brand.phone}
          </a>
          , {brand.hours}.{" "}
          <Link className="font-semibold text-ink hover:text-teal-dark" href="/builders-risk">
            Read how builder’s risk works
          </Link>
          .
        </p>
      </div>
      <div className="wrap grid gap-10 pb-20 lg:grid-cols-[minmax(0,42rem)_18rem] lg:items-start lg:justify-between">
        <BuildersRiskForm />
        <aside className="space-y-5 rounded-sm border border-line bg-paper p-6 sm:p-8 lg:sticky lg:top-28">
          <SampleCallout>{sampleNotice}</SampleCallout>
          <div>
            <h2 className="text-lg font-semibold text-ink">What happens</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              You’ll see a confirmation and a reference ID starting with RH-. An
              advisor calls you back during {brand.hours}. That confirmation is
              not a price, a binder, or coverage.
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Plans, contracts, and photos can wait until the callback. This form
            does not take file uploads.
          </p>
        </aside>
      </div>
    </>
  );
}
