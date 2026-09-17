import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageIntro, SampleCallout } from "@/components/CtaBand";
import { businessCoverages, educationalNotice } from "@/lib/content";

export const metadata: Metadata = {
  title: "Business Insurance",
  description:
    "General liability, professional liability, workers’ comp, umbrella, commercial auto, builders risk, and property — educational overviews from Rhino Insurance Advisors.",
};

export default function BusinessInsurancePage() {
  return (
    <>
      <PageIntro
        kicker="Business insurance"
        title="Coverage that fits how you actually work."
        body="Seven building blocks most commercial clients ask about. Use this as a briefing with an advisor — not as a substitute for the policy."
      />

      <div className="wrap pb-8">
        <SampleCallout>{educationalNotice}</SampleCallout>
        <nav aria-label="Coverage types" className="mt-6 flex flex-wrap gap-2">
          {businessCoverages.map((item) => (
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
          </article>
        ))}
      </div>

      <div className="wrap pb-10 text-sm text-muted">
        Looking for personal lines?{" "}
        <Link className="font-semibold text-ink hover:text-teal-dark" href="/quote?type=personal">
          Request a personal quote
        </Link>
        . For bikes, see{" "}
        <Link className="font-semibold text-ink hover:text-teal-dark" href="/bicycle-insurance">
          bicycle insurance
        </Link>
        .
      </div>

      <CtaBand
        title="Need a commercial quote?"
        body="Choose Commercial on the quote form and tell us which coverages to look at."
        href="/quote?type=commercial"
      />
    </>
  );
}
