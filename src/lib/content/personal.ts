export const personalQuoteHref = "/quote?type=personal" as const;

export const personalLines = [
  {
    id: "auto",
    title: "Personal auto",
    summary:
      "Liability and physical damage for household vehicles. If a vehicle is used for business, it may belong on a commercial auto policy instead — we will help you sort that on the phone.",
    details: [
      "What is covered, and which drivers and vehicles are listed, is set in the declarations.",
      "This page does not compare deductibles or premiums.",
    ],
  },
  {
    id: "home",
    title: "Home and renters",
    summary:
      "Property and liability coverage for a house you own or a place you rent. The form follows the occupancy — a dwelling policy and a renters policy are not the same contract.",
    details: [
      "Flood, wind, and other specific perils are often limited or excluded unless the policy adds them.",
      "A mortgage lender may ask for proof of insurance. That request is not itself a quote.",
    ],
  },
  {
    id: "umbrella",
    title: "Personal umbrella",
    summary:
      "Extra liability limits above an underlying home or auto policy, when those underlying limits are high enough to qualify.",
    details: [
      "An umbrella does not replace the underlying policies. They have to be in place.",
      "What it responds to, and what it excludes, is in the umbrella form — not in this summary.",
    ],
  },
] as const;
