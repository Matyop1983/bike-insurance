import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageIntro, SampleCallout } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { BikeHeroArt, CoverageIcon } from "@/components/illustrations";
import { brand } from "@/lib/brand";
import {
  bikeCoverages,
  bikeFaqs,
  bikeHowItWorks,
  sampleNotice,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Bicycle Insurance",
  description:
    "Rhino Insurance Advisors bicycle coverage: theft, damage, liability, and accessories. Request a quote — educational sample wording, not a binder.",
};

export default function BicycleInsurancePage() {
  return (
    <>
      <PageIntro
        kicker={`${brand.shortName} · Personal product`}
        title="Bicycle insurance, handled like it matters."
        body="Homeowners policies often treat a bicycle as another household item. This product is for the bike you actually ride — theft, crash damage, liability, and the parts you added later. It is a Rhino offering, not a separate brand."
      />

      <div className="wrap grid items-center gap-10 pb-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-sm bg-ink px-4 pt-6">
          <BikeHeroArt />
        </div>
        <div>
          <SampleCallout>{sampleNotice}</SampleCallout>
          <ol className="mt-6 space-y-4" id="how-it-works">
            {bikeHowItWorks.map((step) => (
              <li key={step.n} className="flex gap-4">
                <span className="display text-3xl text-teal-dark">{step.n}</span>
                <div>
                  <h2 className="font-semibold text-ink">{step.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link
            href="/quote?type=bicycle"
            className="mt-8 inline-flex rounded-sm bg-teal px-5 py-3 text-sm font-semibold text-ink hover:bg-teal-dark"
          >
            Request a bicycle quote
          </Link>
        </div>
      </div>

      <section className="wrap space-y-6 pb-16">
        <h2 className="display text-3xl text-ink">Coverage building blocks</h2>
        {bikeCoverages.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="scroll-mt-28 rounded-sm border border-line bg-paper p-6 sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="inline-flex size-12 items-center justify-center rounded-sm bg-stone text-ink">
                  <CoverageIcon id={item.id} />
                </span>
                <h3 className="display mt-4 text-3xl text-ink">{item.title}</h3>
                <p className="mt-1 text-sm font-medium tracking-[0.14em] text-muted uppercase">
                  {item.kicker}
                </p>
              </div>
              <dl className="grid gap-3 rounded-sm bg-stone px-5 py-4 text-sm sm:min-w-[16rem]">
                <div>
                  <dt className="text-muted">Typical limit (sample)</dt>
                  <dd className="font-semibold text-ink">{item.typicalLimit}</dd>
                </div>
                <div>
                  <dt className="text-muted">Sample deductible</dt>
                  <dd className="font-semibold text-ink">{item.sampleDeductible}</dd>
                </div>
              </dl>
            </div>
            <p className="mt-5 max-w-3xl text-muted">{item.summary}</p>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold tracking-[0.16em] text-teal-dark uppercase">
                  Often included
                </h4>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                  {item.included.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-[0.16em] text-teal-dark uppercase">
                  Often excluded
                </h4>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                  {item.excluded.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <blockquote className="mt-8 rounded-sm border border-dashed border-line bg-stone/70 px-5 py-4 text-sm leading-relaxed text-muted">
              <p className="text-xs font-semibold tracking-[0.16em] text-teal-dark uppercase">
                Sample policy language
              </p>
              <p className="mt-2">{item.sampleLanguage}</p>
            </blockquote>
          </article>
        ))}
      </section>

      <section id="faq" className="wrap scroll-mt-28 pb-16">
        <h2 className="display mb-6 text-3xl text-ink">Bicycle insurance FAQ</h2>
        <FaqAccordion items={bikeFaqs} />
      </section>

      <CtaBand
        title="Ask Rhino about the bike."
        body="The quote form has a Bicycle type that captures type, value, and coverage interests."
        href="/quote?type=bicycle"
        label="Get a bicycle quote"
      />
    </>
  );
}
