import Link from "next/link";
import { Logo } from "@/components/Logo";
import { brand, callCta, callbackCta, footerLinks } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-stone">
      <div className="wrap grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link href="/" className="inline-flex rounded-sm">
            <Logo className="h-16 w-auto sm:h-[4.5rem]" />
          </Link>
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-stone/75">
            {brand.tagline}. Independent advisors in Edinburg serving commercial
            and personal clients across the Rio Grande Valley, including life
            insurance and group benefits for local employers. Builders risk is
            available for course-of-construction jobs. Call {brand.phone} for a
            quote.
          </p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">
            Explore
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a className="font-semibold text-teal hover:text-white" href={callCta.href}>
                {callCta.label}
              </a>
            </li>
            <li>
              <Link className="text-stone/70 hover:text-white" href={callbackCta.href}>
                {callbackCta.label}
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">
            Visit us
          </h2>
          <address className="mt-4 space-y-2 text-sm not-italic text-stone/80">
            <p>
              <a className="hover:text-white" href={`mailto:${brand.email}`}>
                {brand.email}
              </a>
            </p>
            <p>
              <a className="hover:text-white" href={brand.phoneHref}>
                {brand.phone}
              </a>
              <span className="text-stone/50"> · {brand.hours}</span>
            </p>
            <p>
              <a
                className="hover:text-white"
                href={brand.mapsHref}
                target="_blank"
                rel="noreferrer"
              >
                {brand.address}
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-5 text-xs leading-relaxed text-stone/50 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legalName}.
          </p>
          <p>Edinburg, Texas · Custom site replacing Squarespace.</p>
        </div>
      </div>
    </footer>
  );
}
