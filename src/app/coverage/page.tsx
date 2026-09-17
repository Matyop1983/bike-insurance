import type { Metadata } from "next";
import { CtaBand, PageIntro, SampleCallout } from "@/components/CtaBand";
import { CoverageIcon } from "@/components/illustrations";
import { coverageTypes, sampleNotice } from "@/lib/content";

export const metadata: Metadata = {
  title: "Coverage",
  description:
    "Sample bicycle insurance wording for theft, damage, liability, and accessories.",
};

export default function CoveragePage() {
  return (
    <>
      <PageIntro
        kicker="Coverage"
        title="What a policy would typically include."
        body="Four building blocks you can mix on a quote request. Limits, deductibles, and the quoted paragraphs below are realistic placeholders — they are not a contract."
      />

      <div className="wrap pb-8">
        <SampleCallout>{sampleNotice}</SampleCallout>
      </div>

      <div className="wrap space-y-8 pb-16">
        {coverageTypes.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="scroll-mt-28 rounded-[2rem] border border-line bg-paper p-6 sm:p-9"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-cream text-forest">
                  <CoverageIcon id={item.id} />
                </span>
                <h2 className="display mt-4 text-3xl text-forest">{item.title}</h2>
                <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-muted">
                  {item.kicker}
                </p>
              </div>
              <dl className="grid gap-3 rounded-2xl bg-cream px-5 py-4 text-sm sm:min-w-[16rem]">
                <div>
                  <dt className="text-muted">Typical limit (sample)</dt>
                  <dd className="font-semibold text-forest">{item.typicalLimit}</dd>
                </div>
                <div>
                  <dt className="text-muted">Sample deductible</dt>
                  <dd className="font-semibold text-forest">
                    {item.sampleDeductible}
                  </dd>
                </div>
              </dl>
            </div>

            <p className="mt-5 max-w-3xl text-muted">{item.summary}</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-moss">
                  Often included
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/85">
                  {item.included.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-leaf" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-moss">
                  Often excluded
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/85">
                  {item.excluded.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-copper" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <blockquote className="mt-8 rounded-2xl border border-dashed border-line bg-cream/60 px-5 py-4 text-sm leading-relaxed text-muted">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-moss">
                Sample policy language
              </p>
              <p className="mt-2">{item.sampleLanguage}</p>
            </blockquote>
          </article>
        ))}
      </div>

      <CtaBand
        title="Match coverage to the bike, not a generic household policy."
        body="Tell us which of these four you care about. A production underwriter would turn that into limits and a premium."
      />
    </>
  );
}
