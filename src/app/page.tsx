import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { RhinoHeroArt } from "@/components/illustrations";
import { brand, quoteCta } from "@/lib/brand";
import { homePillars, testimonials } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="bg-navy text-stone">
        <div className="wrap grid items-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">
              Edinburg, Texas
            </p>
            <h1 className="display mt-4 text-[2.5rem] leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
              {brand.tagline}.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone/75">
              {brand.integrity} Commercial coverage, individual policies, and a
              featured bicycle insurance product — with an advisor you can actually
              reach.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/business-insurance"
                className="inline-flex items-center justify-center rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-gold-dark hover:text-stone"
              >
                Business insurance
              </Link>
              <Link
                href={quoteCta.href}
                className="inline-flex items-center justify-center rounded-sm border border-stone/25 px-6 py-3 text-sm font-semibold text-stone hover:bg-white/10"
              >
                {quoteCta.label}
              </Link>
            </div>
          </div>
          <div className="px-4 sm:px-8">
            <RhinoHeroArt />
          </div>
        </div>
      </section>

      <section className="wrap py-16 sm:py-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-dark uppercase">
          What we help with
        </p>
        <h2 className="display mt-2 max-w-2xl text-3xl text-navy sm:text-4xl">
          Commercial strength. Personal attention. A bicycle product that isn’t an
          afterthought.
        </h2>
        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {homePillars.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex h-full flex-col rounded-sm border border-line bg-paper p-6 hover:border-navy/30"
              >
                <h3 className="text-xl font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
                <span className="mt-5 text-sm font-semibold text-gold-dark">
                  Learn more
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-navy-mid py-16 text-stone">
        <div className="wrap">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            See what our clients are saying
          </p>
          <h2 className="display mt-2 text-3xl sm:text-4xl">
            Relationships first — that’s the point of the mission.
          </h2>
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {testimonials.map((item) => (
              <li key={item.name} className="rounded-sm bg-navy px-6 py-7">
                <p className="text-[0.95rem] leading-relaxed text-stone/85">
                  “{item.quote}”
                </p>
                <p className="mt-5 text-sm font-semibold text-gold">{item.name}</p>
                <p className="text-xs text-stone/55">{item.role}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-stone/45">
            Placeholder testimonials for this custom site until live quotes are
            confirmed.
          </p>
        </div>
      </section>

      <section className="wrap grid gap-8 py-16 sm:grid-cols-2 sm:py-20">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-dark uppercase">
            Visit us
          </p>
          <h2 className="display mt-2 text-3xl text-navy">
            Fountain Plaza, Edinburg
          </h2>
          <p className="mt-4 text-muted">{brand.address}</p>
          <p className="mt-1 text-muted">Hours {brand.hours}</p>
          <p className="mt-1">
            <a className="font-semibold text-navy hover:text-gold-dark" href={brand.phoneHref}>
              {brand.phone}
            </a>
          </p>
          <a
            href={brand.mapsHref}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex text-sm font-semibold text-gold-dark hover:text-navy"
          >
            Open in maps
          </a>
        </div>
        <div className="rounded-sm bg-navy px-6 py-8 text-stone">
          <h2 className="display text-2xl">Let’s get started</h2>
          <p className="mt-3 text-stone/75">
            Request a commercial, personal, or bicycle quote. An advisor follows up
            — this site does not bind coverage online.
          </p>
          <Link
            href={quoteCta.href}
            className="mt-6 inline-flex rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-navy hover:bg-gold-dark hover:text-stone"
          >
            I want to learn more
          </Link>
        </div>
      </section>

      <CtaBand
        title="Ready when you are."
        body="Tell us whether you need commercial, personal, or bicycle coverage. We’ll confirm we received it."
      />
    </>
  );
}
