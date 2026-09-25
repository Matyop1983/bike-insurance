import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageIntro, SampleCallout } from "@/components/CtaBand";
import { brand, callbackCta } from "@/lib/brand";
import { businessCoverages, educationalNotice } from "@/lib/content";

export const metadata: Metadata = {
  title: "Commercial Insurance",
  description:
    "General liability, professional liability, workers’ comp, umbrella, commercial auto, and builders risk — educational overviews from Rhino Insurance Advisors.",
};

export default function BusinessInsurancePage() {
  return (
    <>
      <PageIntro
        kicker="Commercial"
        title="Coverage that fits how you actually work."
        body="Six building blocks most commercial clients ask about. Use this as a briefing with an advisor — not as a substitute for the policy."
      />

      <div className="wrap pb-8">
        <SampleCallout>{educationalNotice}</SampleCallout>
        <Link
          href="/builders-risk"
          className="mt-6 flex h-full flex-col rounded-sm border border-line bg-paper p-6 hover:border-ink/30 sm:p-8"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-teal-dark uppercase">
            Featured commercial product
          </p>
          <h2 className="display mt-2 text-3xl text-ink">Builders Risk</h2>
          <p className="mt-3 max-w-3xl text-muted">
            Course-of-construction coverage for contractors, owners, and
            renovations — the building under construction, materials, off-site
            storage, and transit. Educational overview, not a binder.
          </p>
          <span className="mt-5 text-sm font-semibold text-teal-dark">
            Read the builders risk overview
          </span>
        </Link>
        <nav aria-label="Coverage types" className="mt-6 flex flex-wrap gap-2">
          {businessCoverages.map((item) => (
            <a
              key={item.id}
              href={"pageHref" in item && item.pageHref ? item.pageHref : `#${item.id}`}
              className="rounded-sm border border-line bg-paper px-3 py-1.5 text-sm font-medium text-ink hover:border-ink"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      <div className="wrap space-y-6 pb-16">
        {businessCoverages.map((item) => (
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
            {"pageHref" in item && item.pageHref ? (
              <Link
                href={item.pageHref}
                className="mt-6 inline-flex text-sm font-semibold text-teal-dark hover:text-ink"
              >
                Full builders risk overview
              </Link>
            ) : null}
          </article>
        ))}
      </div>

      <div className="wrap pb-10 text-sm text-muted">
        For an individual life policy, see{" "}
        <Link
          className="font-semibold text-ink hover:text-teal-dark"
          href="/life-insurance"
        >
          life insurance
        </Link>
        . Employers asking about health, dental, vision, group life, or
        disability can read{" "}
        <Link
          className="font-semibold text-ink hover:text-teal-dark"
          href="/group-benefits"
        >
          group benefits
        </Link>
        . Or{" "}
        <a className="font-semibold text-ink hover:text-teal-dark" href={brand.phoneHref}>
          call {brand.phone}
        </a>
        . The callback form is optional and is not a price.
      </div>

      <CtaBand
        title="Need a commercial quote?"
        body={`Call ${brand.phone} and tell us which coverages to look at. ${brand.hours}. The online form only asks us to call you back.`}
        secondaryHref={`${callbackCta.href}?type=commercial`}
        secondaryLabel={callbackCta.label}
      />
    </>
  );
}
