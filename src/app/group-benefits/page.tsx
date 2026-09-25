import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageIntro, SampleCallout } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GroupBenefitsArt } from "@/components/illustrations";
import { brand, callCta, callbackCta } from "@/lib/brand";
import { sampleNotice } from "@/lib/content";
import {
  groupBenefitLines,
  groupBenefitsAudiences,
  groupBenefitsFaqs,
  groupBenefitsHowItWorks,
  groupBenefitsNotThis,
  groupBenefitsQuoteHref,
} from "@/lib/content/group-benefits";

export const metadata: Metadata = {
  title: "Group Benefits",
  description:
    "Employee benefits for local employers in Edinburg and the Rio Grande Valley — group health, dental, vision, group life, and disability. Call Rhino Insurance Advisors. Not a rate or a binder.",
};

export default function GroupBenefitsPage() {
  return (
    <>
      <PageIntro
        kicker={`${brand.shortName} · For employers`}
        title="Group benefits for local employers."
        body="Group health, dental, vision, group life, and disability — discussed with the business that sponsors them. This is an overview for Edinburg and Rio Grande Valley employers. It is not an individual health plan, and it is not a rate."
      />

      <div className="wrap grid items-center gap-10 pb-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-sm bg-ink-mid px-4 pt-6">
          <GroupBenefitsArt />
        </div>
        <div>
          <SampleCallout>{sampleNotice}</SampleCallout>
          <ol className="mt-6 space-y-4">
            {groupBenefitsHowItWorks.map((step) => (
              <li key={step.n} className="flex gap-4">
                <span className="display text-3xl text-teal-dark">{step.n}</span>
                <div>
                  <h2 className="font-semibold text-ink">{step.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={callCta.href}
              className="inline-flex rounded-sm bg-teal px-5 py-3 text-sm font-semibold text-ink hover:bg-teal-dark"
            >
              {callCta.label}
            </a>
            <Link
              href={groupBenefitsQuoteHref}
              className="text-sm font-semibold text-teal-dark hover:text-ink"
            >
              Or {callbackCta.label.toLowerCase()}
            </Link>
          </div>
        </div>
      </div>

      <section className="wrap pb-16">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal-dark uppercase">
          Who it’s for
        </p>
        <h2 className="display mt-2 max-w-2xl text-3xl text-ink">
          Employers in the Valley, not individual shoppers.
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {groupBenefitsAudiences.map((item) => (
            <li
              key={item.title}
              className="rounded-sm border border-line bg-paper p-6"
            >
              <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap space-y-6 pb-16">
        <h2 className="display text-3xl text-ink">Benefits employers ask about</h2>
        <p className="max-w-3xl text-muted">
          Five lines we discuss with local businesses. Availability depends on
          the employer and on the plan that is issued. Nothing here is a quote
          or a promise of coverage.
        </p>
        <ul className="grid gap-4 md:grid-cols-2">
          {groupBenefitLines.map((item) => (
            <li
              key={item.title}
              className="rounded-sm border border-line bg-paper p-6"
            >
              <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <article className="rounded-sm border border-line bg-paper p-6 sm:p-8">
          <h3 className="text-sm font-semibold tracking-[0.16em] text-teal-dark uppercase">
            What this page is not
          </h3>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink/85">
            {groupBenefitsNotThis.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section id="faq" className="wrap scroll-mt-28 pb-16">
        <h2 className="display mb-6 text-3xl text-ink">Group benefits FAQ</h2>
        <FaqAccordion items={groupBenefitsFaqs} />
      </section>

      <div className="wrap pb-10 text-sm text-muted">
        Need the rest of a commercial program? See{" "}
        <Link
          className="font-semibold text-ink hover:text-teal-dark"
          href="/business-insurance"
        >
          commercial insurance
        </Link>
        . For an individual life policy, see{" "}
        <Link
          className="font-semibold text-ink hover:text-teal-dark"
          href="/life-insurance"
        >
          life insurance
        </Link>
        .
      </div>

      <CtaBand
        title="Call us about employee benefits."
        body={`Call ${brand.phone}, ${brand.hours}. Tell us you are an employer and which benefits to discuss. Leaving details online only requests a callback — it is not a price or a binder.`}
        secondaryHref={groupBenefitsQuoteHref}
        secondaryLabel={callbackCta.label}
      />
    </>
  );
}
