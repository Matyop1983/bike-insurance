import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageIntro, SampleCallout } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { LifeArt } from "@/components/illustrations";
import { brand, callCta, callbackCta } from "@/lib/brand";
import { sampleNotice } from "@/lib/content";
import {
  lifeAudiences,
  lifeBusinessQuoteHref,
  lifeFaqs,
  lifeHowItWorks,
  lifeNotThis,
  lifeOptions,
  lifeQuoteHref,
} from "@/lib/content/life";

export const metadata: Metadata = {
  title: "Life Insurance",
  description:
    "Life insurance for families, mortgage protection, and business owners in Edinburg and the Rio Grande Valley. Term and permanent options in general terms — call Rhino Insurance Advisors. Not a rate or a binder.",
};

export default function LifeInsurancePage() {
  return (
    <>
      <PageIntro
        kicker={`${brand.shortName} · Life insurance`}
        title="Life insurance, explained before anyone talks price."
        body="For families, for a mortgage, and for business owners who need an individual policy or coverage on a key person. Term and permanent are the two shapes people ask about. This page is the vocabulary — call the office for a quote."
      />

      <div className="wrap grid items-center gap-10 pb-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-sm bg-ink-mid px-4 pt-6">
          <LifeArt />
        </div>
        <div>
          <SampleCallout>{sampleNotice}</SampleCallout>
          <ol className="mt-6 space-y-4">
            {lifeHowItWorks.map((step) => (
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
              href={lifeQuoteHref}
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
          Families, mortgages, owners, and key people.
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {lifeAudiences.map((item) => (
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
        <h2 className="display text-3xl text-ink">Term and permanent, in general</h2>
        <p className="max-w-3xl text-muted">
          These are categories, not products you can buy on this page. No carrier
          is named here, and nothing on this site is a rate or a guarantee that
          a policy will be issued.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          {lifeOptions.map((item) => (
            <article
              key={item.title}
              className="rounded-sm border border-line bg-paper p-6 sm:p-8"
            >
              <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
        <article className="rounded-sm border border-line bg-paper p-6 sm:p-8">
          <h3 className="text-sm font-semibold tracking-[0.16em] text-teal-dark uppercase">
            What this page is not
          </h3>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink/85">
            {lifeNotThis.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section id="faq" className="wrap scroll-mt-28 pb-16">
        <h2 className="display mb-6 text-3xl text-ink">Life insurance FAQ</h2>
        <FaqAccordion items={lifeFaqs} />
      </section>

      <div className="wrap pb-10 text-sm text-muted">
        Asking as a business owner or about a key person?{" "}
        <Link
          className="font-semibold text-ink hover:text-teal-dark"
          href={lifeBusinessQuoteHref}
        >
          Leave a commercial callback
        </Link>
        , or see{" "}
        <Link
          className="font-semibold text-ink hover:text-teal-dark"
          href="/business-insurance"
        >
          commercial insurance
        </Link>
        . Employer-sponsored life is on{" "}
        <Link
          className="font-semibold text-ink hover:text-teal-dark"
          href="/group-benefits"
        >
          group benefits
        </Link>
        .
      </div>

      <CtaBand
        title="Call us about life insurance."
        body={`Call ${brand.phone}, ${brand.hours}. We’ll talk through term and permanent in plain language. Leaving details online only requests a callback — it is not a price or a binder.`}
        secondaryHref={lifeQuoteHref}
        secondaryLabel={callbackCta.label}
      />
    </>
  );
}
