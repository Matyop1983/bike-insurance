import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageIntro, SampleCallout } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { WorkersCompArt } from "@/components/illustrations";
import { CoverageWithQuote } from "@/components/QuoteAside";
import { brand, callCta } from "@/lib/brand";
import { educationalNotice, sampleNotice } from "@/lib/content";
import {
  workersCompAudiences,
  workersCompCovered,
  workersCompFaqs,
  workersCompHowItWorks,
  workersCompIntakeCta,
  workersCompIntakeHref,
  workersCompNotCovered,
  workersCompWhy,
} from "@/lib/content/workers-comp";

export const metadata: Metadata = {
  title: "Workers’ Compensation",
  description:
    "Workers’ compensation for Texas employers in Edinburg, McAllen, and the Rio Grande Valley. Request a quote from Rhino Insurance Advisors. Not a binder.",
};

export default function WorkersCompPage() {
  return (
    <>
      <PageIntro
        kicker={`${brand.shortName} · Commercial product`}
        title="Workers’ compensation, even when Texas doesn’t require it."
        body="Texas is the one state where workers’ compensation is generally optional for most private employers. An employer who opts out is often called a nonsubscriber. Many still carry a policy: a work injury can mean medical bills and a lawsuit, and a lot of jobs will not start without a certificate of insurance."
      />

      <CoverageWithQuote
        quoteHref={workersCompIntakeHref}
        card={{
          kicker: "Workers’ comp",
          title: "Start your quote",
          body: "Business name, what you do, and how many people you employ. We’ll call you back — this is not a price or a binder.",
          label: workersCompIntakeCta,
          prominent: true,
        }}
        lead={
          <div className="pb-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={workersCompIntakeHref}
                className="inline-flex w-full items-center justify-center rounded-sm bg-teal px-5 py-3 text-center text-sm font-semibold text-ink hover:bg-teal-dark sm:w-auto"
              >
                {workersCompIntakeCta}
              </Link>
              <a
                href={callCta.href}
                className="inline-flex w-full items-center justify-center rounded-sm border border-line bg-paper px-5 py-3 text-center text-sm font-semibold text-ink hover:border-ink sm:w-auto"
              >
                {callCta.label}
              </a>
            </div>
            <div className="mt-8 grid items-center gap-10 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="overflow-hidden rounded-sm bg-ink-mid px-4 pt-6">
                <WorkersCompArt />
              </div>
              <div>
                <SampleCallout>{sampleNotice}</SampleCallout>
                <ol className="mt-6 space-y-4">
                  {workersCompHowItWorks.map((step) => (
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
              </div>
            </div>
          </div>
        }
      >
        <section className="pb-16">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal-dark uppercase">
            Why it still matters
          </p>
          <h2 className="display mt-2 max-w-2xl text-3xl text-ink">
            Optional for most private employers. Often required by the job.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
            Carrying a policy is still a choice for most private businesses in
            Texas. It is not a choice for every employer — public employers
            generally have to provide coverage — and a contract can require it
            either way. This is a general explanation, not a ruling on your
            business.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {workersCompWhy.map((item) => (
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

        <section className="pb-16">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal-dark uppercase">
            Who it’s for
          </p>
          <h2 className="display mt-2 max-w-2xl text-3xl text-ink">
            Any Rio Grande Valley employer with people on the payroll.
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {workersCompAudiences.map((item) => (
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

        <section className="space-y-6 pb-16">
          <h2 className="display text-3xl text-ink">What this page is describing</h2>
          <p className="max-w-3xl text-muted">{educationalNotice}</p>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-sm border border-line bg-paper p-6 sm:p-8">
              <h3 className="text-sm font-semibold tracking-[0.16em] text-teal-dark uppercase">
                Typically discussed
              </h3>
              <ul className="mt-5 space-y-5">
                {workersCompCovered.map((item) => (
                  <li key={item.title}>
                    <p className="font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-sm border border-line bg-paper p-6 sm:p-8">
              <h3 className="text-sm font-semibold tracking-[0.16em] text-teal-dark uppercase">
                Usually a different policy
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink/85">
                {workersCompNotCovered.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28 pb-16">
          <h2 className="display mb-6 text-3xl text-ink">Workers’ comp FAQ</h2>
          <FaqAccordion items={workersCompFaqs} />
        </section>

        <div className="pb-10 text-sm text-muted">
          Looking for the rest of your commercial program? See{" "}
          <Link
            className="font-semibold text-ink hover:text-teal-dark"
            href="/business-insurance"
          >
            business insurance
          </Link>
          .
        </div>
      </CoverageWithQuote>

      <CtaBand
        title="Ask Rhino about the payroll."
        body={`Call ${brand.phone}, ${brand.hours}, or send the business details with the form. A submission only requests a callback — it is not a price or a binder.`}
        href={workersCompIntakeHref}
        label={workersCompIntakeCta}
        secondaryHref={callCta.href}
        secondaryLabel={callCta.label}
      />
    </>
  );
}
