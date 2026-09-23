/**
 * Rhino Insurance Advisors brand, nav, and contact.
 * Keep user-facing identity here so pages stay easy to update.
 */
export const brand = {
  name: "Rhino Insurance Advisors",
  shortName: "Rhino",
  legalName: "Rhino Insurance Advisors",
  tagline: "We make insurance easy for you & your business",
  mission:
    "Our mission is to help secure your future and build a relationship that no digit can compare to.",
  description:
    "Independent insurance advisors in Edinburg, Texas. Commercial and individual coverage, including builders risk. Call the office for a quote.",
  integrity:
    "At Rhino, we’re focused on providing the highest level of service with integrity. Our team makes it easy to find the best commercial and individual insurance for your needs.",
  email: "quoting@rhinoia.com",
  phone: "(956) 609-6222",
  phoneHref: "tel:+19566096222",
  hours: "Monday–Friday 8AM–5PM",
  address: "2721 Fountain Plaza Blvd Suite D, Edinburg, TX 78539",
  addressLines: [
    "2721 Fountain Plaza Blvd Suite D",
    "Edinburg, TX 78539",
  ] as const,
  mapsHref:
    "https://maps.google.com/?q=2721+Fountain+Plaza+Blvd+Suite+D,+Edinburg,+TX+78539",
  liveSite: "https://www.rhinoinsuranceadvisors.com/",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/business-insurance", label: "Business" },
  { href: "/builders-risk", label: "Builders Risk" },
  { href: "/contact", label: "Contact" },
] as const;

/** Primary conversion path: call the agency. */
export const callCta = {
  href: brand.phoneHref,
  label: "Call us for a quote",
} as const;

/** Optional follow-up. Not a price and not a binder. */
export const callbackCta = {
  href: "/quote",
  label: "Request a callback",
} as const;
