import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageIntro, SampleCallout } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { BuildersRiskArt } from "@/components/illustrations";
import { brand, callCta, callbackCta } from "@/lib/brand";
import { educationalNotice, sampleNotice } from "@/lib/content";
import {
  buildersRiskAudiences,
  buildersRiskCovered,
  buildersRiskFaqs,
  buildersRiskHowItWorks,
  buildersRiskNotCovered,
  buildersRiskQuoteHref,
  buildersRiskSampleLanguage,
} from "@/lib/content/builders-risk";

export const metadata: Metadata = {
  title: "Builders Risk",
  description:
    "Builders risk and course-of-construction coverage for contractors, owners, and renovations in the Rio Grande Valley. Educational overview from Rhino Insurance Advisors — not a binder.",
};

export default function BuildersRiskPage() {
  return (
    <>
      <PageIntro
        kicker={`${brand.shortName} · Commercial product`}
        title="Builders risk, while the job is still a job."
        body="Course-of-construction coverage for the building and the materials that will become it — at the site, in storage, and in transit. It is a Rhino commercial offering, not a substitute for general liability or a completed property policy."
      />

      <div className="wrap grid items-center gap-10 pb-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-sm bg-ink-mid px-4 pt-6">
          <BuildersRiskArt />
        </div>
        <div>
          <SampleCallout>{sampleNotice}</SampleCallout>
          <ol className="mt-6 space-y-4">
            {buildersRiskHowItWorks.map((step) => (
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
              href={buildersRiskQuoteHref}
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
          Contractors, owners, and renovations in progress.
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {buildersRiskAudiences.map((item) => (
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
        <h2 className="display text-3xl text-ink">What this form is for</h2>
        <p className="max-w-3xl text-muted">{educationalNotice}</p>
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-sm border border-line bg-paper p-6 sm:p-8">
            <h3 className="text-sm font-semibold tracking-[0.16em] text-teal-dark uppercase">
              Typically discussed
            </h3>
            <ul className="mt-5 space-y-5">
              {buildersRiskCovered.map((item) => (
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
              {buildersRiskNotCovered.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
        <blockquote className="rounded-sm border border-dashed border-line bg-paper px-5 py-4 text-sm leading-relaxed text-muted sm:px-8">
          <p className="text-xs font-semibold tracking-[0.16em] text-teal-dark uppercase">
            Sample policy language
          </p>
          <p className="mt-2">{buildersRiskSampleLanguage}</p>
        </blockquote>
      </section>

      <section id="faq" className="wrap scroll-mt-28 pb-16">
        <h2 className="display mb-6 text-3xl text-ink">Builders risk FAQ</h2>
        <FaqAccordion items={buildersRiskFaqs} />
      </section>

      <div className="wrap pb-10 text-sm text-muted">
        Looking for the rest of your commercial program? See{" "}
        <Link
          className="font-semibold text-ink hover:text-teal-dark"
          href="/business-insurance"
        >
          business insurance
        </Link>
        .
      </div>

      <CtaBand
        title="Ask Rhino about the job."
        body={`Call ${brand.phone}, ${brand.hours}. We’ll talk through builders risk with you. Leaving details online only requests a callback — it is not a price or a binder.`}
        secondaryHref={buildersRiskQuoteHref}
        secondaryLabel={callbackCta.label}
      />
    </>
  );
}
