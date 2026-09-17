import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/CtaBand";
import { brand, quoteCta } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Visit Rhino Insurance Advisors in Edinburg, TX. ${brand.phone} · ${brand.email}`,
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        kicker="Contact"
        title="Call, email, or come by Fountain Plaza."
        body="We’re in the office Monday–Friday, 8AM–5PM. For a coverage review, use the quote form so we have the details in writing."
      />

      <div className="wrap grid gap-6 pb-20 lg:grid-cols-3">
        <article className="rounded-sm border border-line bg-paper p-6">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-gold-dark uppercase">
            Phone
          </h2>
          <p className="mt-3">
            <a className="text-xl font-semibold text-navy hover:text-gold-dark" href={brand.phoneHref}>
              {brand.phone}
            </a>
          </p>
          <p className="mt-2 text-sm text-muted">{brand.hours}</p>
        </article>
        <article className="rounded-sm border border-line bg-paper p-6">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-gold-dark uppercase">
            Email
          </h2>
          <p className="mt-3">
            <a
              className="text-xl font-semibold break-all text-navy hover:text-gold-dark"
              href={`mailto:${brand.email}`}
            >
              {brand.email}
            </a>
          </p>
          <p className="mt-2 text-sm text-muted">Quotes and follow-ups</p>
        </article>
        <article className="rounded-sm border border-line bg-paper p-6">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-gold-dark uppercase">
            Office
          </h2>
          {brand.addressLines.map((line) => (
            <p key={line} className="mt-2 text-navy">
              {line}
            </p>
          ))}
          <a
            href={brand.mapsHref}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex text-sm font-semibold text-gold-dark hover:text-navy"
          >
            Open in maps
          </a>
        </article>
      </div>

      <section className="wrap pb-20">
        <div className="rounded-sm bg-navy px-6 py-10 text-stone sm:px-10">
          <h2 className="display text-3xl">Prefer to start with a quote?</h2>
          <p className="mt-3 max-w-xl text-stone/75">
            Commercial, personal, or bicycle — the same form, with bike-specific
            fields when you need them.
          </p>
          <Link
            href={quoteCta.href}
            className="mt-6 inline-flex rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-gold-dark hover:text-stone"
          >
            {quoteCta.label}
          </Link>
        </div>
      </section>
    </>
  );
}
