import { brand } from "../brand";

export const bikeCoverages = [
  {
    id: "theft",
    title: "Theft",
    kicker: "When the bike leaves without you",
    summary:
      "Replacement help when your bicycle is stolen from home, a locked garage, or while secured in public.",
    typicalLimit: "Up to the declared bicycle value",
    sampleDeductible: "$250",
    included: [
      "Theft from a locked residence or private garage",
      "Theft while locked to an immovable object in public, with evidence of forced removal",
      "Recovered-bike repair if the frame or components are damaged during the theft",
    ],
    excluded: [
      "Unlocked and unattended bikes in public spaces",
      "Mysterious disappearance with no signs of forced entry or cut lock",
      "Theft of unlisted high-value components above the accessories sublimit",
    ],
    sampleLanguage:
      "We cover sudden and accidental theft of the scheduled bicycle, provided it was secured with a lock meeting the policy’s approved-lock list, or stored inside a locked private building. Coverage is limited to the declared actual cash value or agreed value endorsement, less the deductible.",
  },
  {
    id: "damage",
    title: "Damage",
    kicker: "Crashes, transit, the unexpected knock",
    summary:
      "Repair or replacement after a crash, collision, or damage while the bike is in transit.",
    typicalLimit: "Repair cost up to declared value",
    sampleDeductible: "$150",
    included: [
      "Accidental collision and crash damage while riding",
      "Damage during airline, rail, or vehicle transport",
      "Vandalism to the frame or listed components",
    ],
    excluded: [
      "Wear, tear, corrosion, and gradual mechanical failure",
      "Damage from racing unless a racing endorsement is added",
      "Cosmetic scuffs that do not affect safe operation (unless scheduled)",
    ],
    sampleLanguage:
      "We cover sudden accidental physical damage to the scheduled bicycle occurring during recreational or commuting use. We may repair, replace, or pay the lesser of repair cost and declared value. This coverage does not apply to mechanical breakdown or maintenance.",
  },
  {
    id: "liability",
    title: "Liability",
    kicker: "If a ride involves someone else",
    summary:
      "Help with bodily injury or property damage you accidentally cause while riding.",
    typicalLimit: "$100,000 per occurrence (sample)",
    sampleDeductible: "$0 for third-party injury",
    included: [
      "Bodily injury to others arising from your use of the bicycle",
      "Property damage to others (vehicles, storefronts, bikes)",
      "Defense costs for covered claims, in addition to the limit (sample)",
    ],
    excluded: [
      "Injury to you (this is not health or disability insurance)",
      "Use of the bicycle as a motor vehicle or throttle-only e-bike beyond class limits",
      "Intentional acts, or delivery/commercial use unless endorsed",
    ],
    sampleLanguage:
      "We will pay those sums the insured becomes legally obligated to pay as damages because of bodily injury or property damage caused by an occurrence arising from the ownership, maintenance, or recreational use of the scheduled bicycle. Coverage is excess over any applicable homeowners, renters, or umbrella policy.",
  },
  {
    id: "accessories",
    title: "Accessories",
    kicker: "The parts you added after the receipt",
    summary:
      "Lights, computers, bags, custom wheels, and other add-ons — listed so they are actually covered.",
    typicalLimit: "$1,500 blanket, or scheduled items",
    sampleDeductible: "$100",
    included: [
      "Lights, computers, locks, and bags attached to or carried with the bike",
      "Aftermarket wheels, cockpits, and drivetrain upgrades you schedule",
      "Theft or damage occurring with a covered bicycle loss",
    ],
    excluded: [
      "Phones, laptops, and personal electronics not mounted as cycling computers",
      "Apparel, helmets, and shoes (unless a kit endorsement is added)",
      "Items you cannot show were owned or scheduled at the time of loss",
    ],
    sampleLanguage:
      "Accessories are covered on a blanket basis up to the accessories sublimit, or at the scheduled amount if listed on the declarations. Unscheduled single items above $400 may be limited to the blanket remainder. Proof of ownership may be required at claim time.",
  },
] as const;

export const bikeHowItWorks = [
  {
    n: "01",
    title: "Tell us about the bike",
    body: "Share the rider, bicycle type and value range, where you keep it, and which coverages you care about. No account required.",
  },
  {
    n: "02",
    title: "Rhino reviews the request",
    body: "An advisor checks eligibility, may ask about locks or prior claims, and follows up with options. Submitting this website form is a request — not a price and not a binder.",
  },
  {
    n: "03",
    title: "You decide whether to bind",
    body: "Nothing is in force until you accept terms, pay the premium, and receive declarations. A quote request is not coverage.",
  },
] as const;

export const bikeFaqs = [
  {
    q: `Does ${brand.shortName} manufacture the bicycle policy?`,
    a: `${brand.name} is an independent agency. We help you find and request coverage through appointed carriers. Sample wording on this page is educational — the issued policy controls.`,
  },
  {
    q: "Does homeowners or renters insurance already cover my bike?",
    a: "Often only partly. Those policies may treat a bicycle as personal property with a low sublimit, a high deductible, and little coverage away from home or for liability while riding. Dedicated bicycle insurance is meant to fill those gaps.",
  },
  {
    q: "Do I need a specific lock?",
    a: "On a typical theft form, yes. Sample wording assumes a sold-secure or equivalently rated lock in public, and a locked building at home. Keep the receipt and, after a theft, the cut lock if you still have it.",
  },
  {
    q: "Are e-bikes eligible?",
    a: "Class 1 and 2 e-bikes are commonly eligible; throttle-only or high-speed conversions often need underwriting review. Choose e-bike on the quote form and mention motor class in the notes.",
  },
  {
    q: "What is usually not covered?",
    a: "Typical exclusions (sample): wear and tear, mechanical breakdown, racing without an endorsement, unlocked public theft, commercial delivery, and injury to the rider. Read the coverage sections below for placeholder wording.",
  },
  {
    q: "Will I get a price when I submit the form?",
    a: "Not automatically. There is no live rating engine on this site. You’ll receive a confirmation ID, and our team follows up at quoting@rhinoia.com.",
  },
  {
    q: "Can I insure more than one bike?",
    a: "A production policy can usually schedule multiple bicycles. Describe additional bikes in the message field or submit a second request.",
  },
] as const;
