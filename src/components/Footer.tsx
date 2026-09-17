import Link from "next/link";
import { Logo } from "@/components/Logo";
import { brand, nav, quoteCta } from "@/lib/brand";
import { sampleNotice } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-forest text-cream">
      <div className="wrap grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link href="/" className="inline-flex rounded-lg">
            <Logo inverted />
          </Link>
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-cream/78">
            {brand.name} is a bicycle insurance marketing prototype: theft,
            damage, liability, and the parts you bolted on later. Built to feel
            like a carrier site — not a live policy.
          </p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">
            Explore
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="hover:text-white" href={quoteCta.href}>
                {quoteCta.label}
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">
            Contact
          </h2>
          <address className="mt-4 space-y-2 text-sm not-italic text-cream/80">
            <p>
              <a className="hover:text-white" href={`mailto:${brand.email}`}>
                {brand.email}
              </a>
            </p>
            <p>
              <a className="hover:text-white" href={`tel:+14155550148`}>
                {brand.phone}
              </a>
              <span className="text-cream/55"> · {brand.hours}</span>
            </p>
            <p>{brand.address}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-5 text-xs leading-relaxed text-cream/55 sm:flex-row sm:items-start sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legalName}. Easy to rename —
            brand strings live in{" "}
            <code className="text-cream/75">src/lib/brand.ts</code>.
          </p>
          <p className="max-w-md sm:text-right">{sampleNotice}</p>
        </div>
      </div>
    </footer>
  );
}
