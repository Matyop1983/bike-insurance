import type { ReactNode } from "react";
import Link from "next/link";
import { callbackCta } from "@/lib/brand";

/** Outline link used beside a teal call button. Quieter than the call CTA. */
export function SecondaryQuoteLink({
  href = callbackCta.href,
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center self-start rounded-sm border border-line bg-paper px-5 py-3 text-center text-sm font-semibold text-ink hover:border-ink sm:self-auto ${className}`}
    >
      {callbackCta.sideLabel}
    </Link>
  );
}

export function QuoteSideCard({ href }: { href: string }) {
  return (
    <aside className="rounded-sm border border-line bg-paper p-5">
      <p className="text-xs font-semibold tracking-[0.16em] text-teal-dark uppercase">
        Prefer online?
      </p>
      <h2 className="mt-2 text-lg font-semibold text-ink">{callbackCta.sideLabel}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Leave your details and we’ll call you back. This is a callback request —
        not a price, and not a binder.
      </p>
      <Link
        href={href}
        className="mt-4 inline-flex text-sm font-semibold text-ink underline decoration-teal decoration-2 underline-offset-4 hover:text-teal-dark"
      >
        {callbackCta.sideLabel}
      </Link>
    </aside>
  );
}

/**
 * Coverage pages: call stays in the lead. The quote card sits in a right
 * column on large screens and is hidden on small screens, where a
 * SecondaryQuoteLink next to the call button carries the same job.
 */
export function CoverageWithQuote({
  quoteHref,
  lead,
  children,
}: {
  quoteHref: string;
  lead: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="wrap lg:grid lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-start lg:gap-x-10">
      <div className="min-w-0">{lead}</div>
      <div className="mb-16 hidden self-start lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:block">
        <QuoteSideCard href={quoteHref} />
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
