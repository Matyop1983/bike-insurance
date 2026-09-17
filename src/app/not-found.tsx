import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">
        404
      </p>
      <h1 className="display mt-3 text-4xl text-forest">That page isn’t on the map.</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        The trail ends here. Head home or request a quote from the main path.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream hover:bg-moss"
        >
          Home
        </Link>
        <Link
          href="/quote"
          className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-forest hover:bg-sand/60"
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}
