import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/CtaBand";
import { brand, callbackCta } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Visit Rhino Insurance Advisors in Edinburg, TX. ${brand.phone} · ${brand.email}`,
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        kicker="Contact"
        title="Call us for a quote."
        body={`${brand.name} is in Edinburg, Monday–Friday, 8AM–5PM. Call ${brand.phone} and an advisor will talk through coverage with you. Leaving details online is optional — it is not a live price or a binder.`}
      />

      <div className="wrap grid gap-6 pb-20 lg:grid-cols-3">
        <article className="rounded-sm border border-line bg-paper p-6">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-teal-dark uppercase">
            Phone
          </h2>
          <p className="mt-3">
            <a className="text-xl font-semibold text-ink hover:text-teal-dark" href={brand.phoneHref}>
              {brand.phone}
            </a>
          </p>
          <p className="mt-2 text-sm text-muted">{brand.hours}</p>
        </article>
        <article className="rounded-sm border border-line bg-paper p-6">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-teal-dark uppercase">
            Email
          </h2>
          <p className="mt-3">
            <a
              className="text-xl font-semibold break-all text-ink hover:text-teal-dark"
              href={`mailto:${brand.email}`}
            >
              {brand.email}
            </a>
          </p>
          <p className="mt-2 text-sm text-muted">Quotes and follow-ups</p>
        </article>
        <article className="rounded-sm border border-line bg-paper p-6">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-teal-dark uppercase">
            Office
          </h2>
          {brand.addressLines.map((line) => (
            <p key={line} className="mt-2 text-ink">
              {line}
            </p>
          ))}
          <a
            href={brand.mapsHref}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex text-sm font-semibold text-teal-dark hover:text-ink"
          >
            Open in maps
          </a>
        </article>
      </div>

      <section className="wrap pb-20">
        <div className="rounded-sm bg-ink px-6 py-10 text-stone sm:px-10">
          <h2 className="display text-3xl">Call {brand.phone}</h2>
          <p className="mt-3 max-w-xl text-stone/75">
            That’s the way to get a quote. {brand.hours}. If you’d rather we
            call you, leave your details — commercial or personal. That form is
            optional and does not show a price.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={brand.phoneHref}
              className="inline-flex rounded-sm bg-teal px-6 py-3 text-sm font-semibold text-ink hover:bg-teal-dark"
            >
              Call us for a quote
            </a>
            <Link
              href={callbackCta.href}
              className="inline-flex rounded-sm border border-white/25 px-6 py-3 text-sm font-semibold text-stone hover:bg-white/10"
            >
              {callbackCta.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
