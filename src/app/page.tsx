import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { BikeHeroArt, CoverageIcon } from "@/components/illustrations";
import { brand, quoteCta } from "@/lib/brand";
import {
  coverageTypes,
  faqs,
  homeStats,
  howItWorksSteps,
  sampleNotice,
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="wrap grid items-center gap-10 pt-10 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:pt-14 lg:pb-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-moss">
            Bicycle insurance
          </p>
          <h1 className="display mt-4 text-[2.65rem] leading-[1.05] text-forest sm:text-6xl">
            The lock isn’t
            <br className="hidden sm:block" /> the whole plan.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {brand.name} covers theft, crash damage, liability, and the
            accessories you actually ride with — so a cut U-lock or a wet
            descent doesn’t end the season. Request a quote. No account, no
            payment in this demo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={quoteCta.href}
              className="inline-flex items-center justify-center rounded-full bg-copper px-6 py-3 text-sm font-semibold text-white hover:bg-copper-dark"
            >
              {quoteCta.label}
            </Link>
            <Link
              href="/coverage"
              className="inline-flex items-center justify-center rounded-full border border-forest/20 bg-paper px-6 py-3 text-sm font-semibold text-forest hover:bg-sand/60"
            >
              See what’s covered
            </Link>
          </div>
          <p className="mt-6 max-w-lg text-xs leading-relaxed text-muted/80">
            {sampleNotice}
          </p>
        </div>

        <div className="grain relative overflow-hidden rounded-[2rem] bg-forest px-4 pt-8 text-cream sm:px-8">
          <BikeHeroArt />
          <div className="relative z-10 -mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-t-[1.5rem] bg-white/10">
            {homeStats.map((stat) => (
              <div key={stat.label} className="bg-forest/40 px-3 py-4 sm:px-4">
                <p className="display text-2xl text-cream sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.7rem] leading-snug text-cream/70 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap pb-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">
              Building blocks
            </p>
            <h2 className="display mt-2 text-3xl text-forest sm:text-4xl">
              Four coverages, one bicycle.
            </h2>
          </div>
          <Link
            href="/coverage"
            className="text-sm font-semibold text-copper hover:text-copper-dark"
          >
            Full sample wording →
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {coverageTypes.map((item) => (
            <li key={item.id}>
              <Link
                href={`/coverage#${item.id}`}
                className="group flex h-full flex-col rounded-[1.6rem] border border-line bg-paper p-6 transition-colors hover:border-forest/30 hover:bg-white"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-cream text-forest">
                  <CoverageIcon id={item.id} />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-forest">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  {item.kicker}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {item.summary}
                </p>
                <span className="mt-4 text-sm font-semibold text-copper group-hover:text-copper-dark">
                  Details
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-sand/45 py-16">
        <div className="wrap">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">
            How it works
          </p>
          <h2 className="display mt-2 max-w-xl text-3xl text-forest sm:text-4xl">
            Three steps. Coverage only after you say yes.
          </h2>
          <ol className="mt-10 grid gap-6 lg:grid-cols-3">
            {howItWorksSteps.map((step) => (
              <li
                key={step.n}
                className="rounded-[1.6rem] bg-paper px-6 py-7"
              >
                <p className="display text-4xl text-leaf">{step.n}</p>
                <h3 className="mt-3 text-xl font-semibold text-forest">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <Link
            href="/how-it-works"
            className="mt-8 inline-block text-sm font-semibold text-copper hover:text-copper-dark"
          >
            What happens after you submit →
          </Link>
        </div>
      </section>

      <section className="wrap py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">
              Questions
            </p>
            <h2 className="display mt-2 text-3xl text-forest sm:text-4xl">
              Straight answers before you request a quote.
            </h2>
            <p className="mt-4 text-muted">
              Including the honest one: this is a marketing prototype, not a
              licensed insurer.
            </p>
            <Link
              href="/faq"
              className="mt-6 inline-block text-sm font-semibold text-copper hover:text-copper-dark"
            >
              All FAQs →
            </Link>
          </div>
          <FaqAccordion items={faqs.slice(0, 4)} />
        </div>
      </section>

      <CtaBand
        title="Ready when the bike is."
        body="Tell us the type, the value range, and what you want covered. We’ll confirm we received it — and in production, a partner would send a written quote."
      />
    </>
  );
}
