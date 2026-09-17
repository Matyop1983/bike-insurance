/**
 * Central brand tokens. Rename the product by editing this file
 * (and the copy in src/lib/content.ts) rather than hunting through pages.
 */
export const brand = {
  name: "PedalGuard",
  legalName: "PedalGuard Insurance Marketing (sample)",
  tagline: "Insurance for the bike you actually ride.",
  description:
    "Bicycle insurance for theft, crash damage, liability, and accessories. Request a quote — this is a sample marketing site, not a live policy.",
  email: "hello@pedalguard.example",
  phone: "(415) 555-0148",
  hours: "Weekdays 9am–6pm PT",
  address: "1840 Valencia St, Suite 2, San Francisco, CA 94110",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/coverage", label: "Coverage" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
] as const;

export const quoteCta = { href: "/quote", label: "Get a quote" } as const;
