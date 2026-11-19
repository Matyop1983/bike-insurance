import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SampleCallout } from "@/components/CtaBand";
import { WorkersCompForm } from "@/components/WorkersCompForm";
import { brand } from "@/lib/brand";
import { sampleNotice } from "@/lib/content";

export const metadata: Metadata = {
  title: "Workers’ Comp Quote",
  description: `Request a workers’ compensation quote from ${brand.name} in Edinburg, TX. Tell us about your employees and payroll. This form is not a price or a binder.`,
};

export default function WorkersCompQuotePage() {
  return (
    <>
      <PageIntro
        kicker="Workers’ comp"
        title="Tell us about the business."
        body="Share the business name, what you do, and how many people you employ. Submitting this form requests a workers’ compensation quote callback. It does not show a price and it does not bind coverage."
      />
      <div className="wrap pb-6">
        <p className="text-sm text-muted">
          Prefer to talk now?{" "}
          <a className="font-semibold text-ink hover:text-teal-dark" href={brand.phoneHref}>
            {brand.phone}
          </a>
          , {brand.hours}.{" "}
          <Link className="font-semibold text-ink hover:text-teal-dark" href="/workers-comp">
            Read how workers’ comp works in Texas
          </Link>
          .
        </p>
      </div>
      <div className="wrap grid gap-10 pb-20 lg:grid-cols-[minmax(0,42rem)_18rem] lg:items-start lg:justify-between">
        <WorkersCompForm />
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
            Loss runs and payroll reports can wait until the callback. This form
            does not take file uploads.
          </p>
        </aside>
      </div>
    </>
  );
}
