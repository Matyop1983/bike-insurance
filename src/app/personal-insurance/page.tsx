import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageIntro, SampleCallout } from "@/components/CtaBand";
import { brand, callbackCta } from "@/lib/brand";
import { educationalNotice } from "@/lib/content";
import { personalLines, personalQuoteHref } from "@/lib/content/personal";

export const metadata: Metadata = {
  title: "Personal Insurance",
  description:
    "Personal auto, home, renters, and umbrella coverage from Rhino Insurance Advisors in Edinburg, TX. Educational overview — call for a quote. Not a rate or a binder.",
};

export default function PersonalInsurancePage() {
  return (
    <>
      <PageIntro
        kicker="Personal insurance"
        title="Household coverage, with an advisor on the phone."
        body="Personal auto, home, renters, and umbrella — the lines households in the Valley usually ask about. Life insurance has its own page. Use this as a briefing, then call the office."
      />

      <div className="wrap pb-8">
        <SampleCallout>{educationalNotice}</SampleCallout>
        <Link
          href="/life-insurance"
          className="mt-6 flex h-full flex-col rounded-sm border border-line bg-paper p-6 hover:border-ink/30 sm:p-8"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-teal-dark uppercase">
            Related
          </p>
          <h2 className="display mt-2 text-3xl text-ink">Life Insurance</h2>
          <p className="mt-3 max-w-3xl text-muted">
            Families, mortgage protection, and business owners or key person
            coverage. Term and permanent, in general terms — not a rate.
          </p>
          <span className="mt-5 text-sm font-semibold text-teal-dark">
            Read the life insurance overview
          </span>
        </Link>
        <nav aria-label="Personal lines" className="mt-6 flex flex-wrap gap-2">
          {personalLines.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-sm border border-line bg-paper px-3 py-1.5 text-sm font-medium text-ink hover:border-ink"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      <div className="wrap space-y-6 pb-16">
        {personalLines.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="scroll-mt-28 rounded-sm border border-line bg-paper p-6 sm:p-8"
          >
            <h2 className="display text-3xl text-ink">{item.title}</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">{item.summary}</p>
            <ul className="mt-5 space-y-2 text-sm leading-relaxed text-ink/85">
              {item.details.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="wrap pb-10 text-sm text-muted">
        Looking for the business? See{" "}
        <Link
          className="font-semibold text-ink hover:text-teal-dark"
          href="/business-insurance"
        >
          commercial insurance
        </Link>
        , or{" "}
        <Link
          className="font-semibold text-ink hover:text-teal-dark"
          href="/group-benefits"
        >
          group benefits
        </Link>{" "}
        if you are an employer. You can also{" "}
        <a className="font-semibold text-ink hover:text-teal-dark" href={brand.phoneHref}>
          call {brand.phone}
        </a>
        .
      </div>

      <CtaBand
        title="Need a personal quote?"
        body={`Call ${brand.phone} and tell us which household policies to look at. ${brand.hours}. The online form only asks us to call you back.`}
        secondaryHref={personalQuoteHref}
        secondaryLabel={callbackCta.label}
      />
    </>
  );
}
