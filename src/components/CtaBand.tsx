import type { ReactNode } from "react";
import Link from "next/link";
import { quoteCta } from "@/lib/brand";

export function CtaBand({
  title,
  body,
  href = quoteCta.href,
  label = quoteCta.label,
}: {
  title: string;
  body: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="wrap pb-20">
      <div className="relative overflow-hidden rounded-sm bg-navy px-6 py-10 text-stone sm:px-10 sm:py-12">
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="display text-3xl leading-tight text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-stone/75">{body}</p>
          </div>
          <Link
            href={href}
            className="inline-flex shrink-0 items-center justify-center rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-gold-dark hover:text-stone"
          >
            {label}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PageIntro({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <header className="wrap max-w-3xl pt-12 pb-10 sm:pt-16">
      <p className="text-xs font-semibold tracking-[0.2em] text-gold-dark uppercase">
        {kicker}
      </p>
      <h1 className="display mt-3 text-4xl leading-[1.1] text-balance text-navy sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">{body}</p>
    </header>
  );
}

export function SampleCallout({ children }: { children: ReactNode }) {
  return (
    <p
      role="note"
      className="rounded-sm border border-line bg-paper px-4 py-3 text-sm text-muted"
    >
      {children}
    </p>
  );
}
