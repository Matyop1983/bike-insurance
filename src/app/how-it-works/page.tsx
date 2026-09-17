import type { Metadata } from "next";
import { CtaBand, PageIntro, SampleCallout } from "@/components/CtaBand";
import { howItWorksSteps, sampleNotice } from "@/lib/content";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Request a bicycle insurance quote in three steps. Nothing is bound until you accept a real policy.",
};

const afterSubmit = [
  {
    title: "In this demo",
    body: "The form validates in the browser, posts to /api/quote, and appends a JSON line under data/quote-submissions.jsonl. You see a reference ID. Nobody is emailed unless you wire a provider.",
  },
  {
    title: "In a live product",
    body: "A licensed agency would review eligibility, request serial numbers or lock details if needed, and send a quote with premium, deductibles, and exclusions. Binding would require payment and declarations.",
  },
  {
    title: "What we will not do here",
    body: "No rating engine, no payments, no claims portal, no login. Those belong after underwriting partners and a carrier appointment exist.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro
        kicker="How it works"
        title="Ask for a quote. Decide later whether to bind."
        body="Bicycle insurance should feel as straightforward as booking a shop appointment: describe the bike, say what you need, wait for a written offer. A request is not coverage."
      />

      <div className="wrap pb-8">
        <SampleCallout>{sampleNotice}</SampleCallout>
      </div>

      <ol className="wrap space-y-5 pb-16">
        {howItWorksSteps.map((step, index) => (
          <li
            key={step.n}
            className="relative grid gap-4 rounded-[2rem] border border-line bg-paper p-6 sm:grid-cols-[7rem_1fr] sm:gap-8 sm:p-9"
          >
            <p className="display text-5xl text-leaf sm:text-6xl">{step.n}</p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Step {index + 1}
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-forest">
                {step.title}
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <section className="wrap pb-16">
        <h2 className="display text-3xl text-forest">After you hit submit</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {afterSubmit.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.6rem] bg-sand/50 px-5 py-6"
            >
              <h3 className="font-semibold text-forest">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="Start with the bike you have."
        body="Name, email, type, value range, city or ZIP, and the coverages you want. Optional phone and a short note."
      />
    </>
  );
}
