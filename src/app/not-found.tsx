import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-24 text-center">
      <p className="text-xs font-semibold tracking-[0.2em] text-teal-dark uppercase">
        404
      </p>
      <h1 className="display mt-3 text-4xl text-ink">That page isn’t here.</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        Head home, review business coverage, or request a quote.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-sm bg-ink px-5 py-2.5 text-sm font-semibold text-stone hover:bg-ink-mid"
        >
          Home
        </Link>
        <Link
          href="/quote"
          className="rounded-sm border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:bg-paper"
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}
