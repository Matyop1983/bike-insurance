import { brand } from "./brand";

export const sampleNotice =
  "Sample marketing copy for demonstration only. This is not an offer of insurance, a binder, or a licensed product.";

export const coverageTypes = [
  {
    id: "theft",
    title: "Theft",
    kicker: "The bike leaves without you",
    summary:
      "Replacement help when your bike is stolen from home, a locked garage, or while secured in public.",
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

export const howItWorksSteps = [
  {
    n: "01",
    title: "Tell us about the bike",
    body: "Share the rider, the bicycle type and value range, where you keep it, and which coverages you care about. Takes a few minutes — no account required.",
  },
  {
    n: "02",
    title: "We review the request",
    body: "A licensed partner (in a real deployment) would check eligibility, ask about locks or prior claims if needed, and send a written quote. In this sample, we confirm we received the form.",
  },
  {
    n: "03",
    title: "You choose whether to bind",
    body: "Nothing is in force until you accept terms, pay a premium, and receive declarations. A quote request is not coverage.",
  },
] as const;

export const faqs = [
  {
    q: `Is ${brand.name} a real insurance company?`,
    a: `This site is a product marketing prototype. ${brand.name} is a working name, and the policy language is realistic sample copy — not a licensed product, not a binder, and not advice. A production version would be issued by an admitted or surplus-lines carrier through a licensed agency.`,
  },
  {
    q: "Does homeowners or renters insurance already cover my bike?",
    a: "Often only partly. Those policies may treat a bicycle as personal property with a low sublimit, a high deductible, and little or no coverage away from home or for liability while riding. Dedicated bicycle insurance is meant to fill those gaps — especially for bikes worth more than a couple of thousand dollars.",
  },
  {
    q: "Do I need a specific lock?",
    a: "In a typical theft form, yes. Sample wording assumes a sold-secure or equivalently rated lock when the bike is in public, and a locked building at home. Keep the receipt and, after a theft, the cut lock if you still have it.",
  },
  {
    q: "Are e-bikes eligible?",
    a: "Class 1 and 2 e-bikes are commonly eligible; throttle-only or high-speed conversions often need underwriting review or are excluded. Use the quote form’s bike type field and mention motor/class in the message.",
  },
  {
    q: "What is not covered?",
    a: "Typical exclusions (sample): wear and tear, mechanical breakdown, racing without an endorsement, unlocked public theft, commercial delivery, and injury to the rider. Read the coverage page for the placeholder wording.",
  },
  {
    q: "How are claims handled in a real product?",
    a: "You would report the loss, provide photos, a police report for theft, and proof of ownership. The carrier would inspect or request estimates, apply the deductible, and repair or pay value. This demo has no claims portal.",
  },
  {
    q: "Will I get a price when I submit the form?",
    a: "Not in this version. There is no rating engine. Submitting the form stores the request locally and shows a confirmation. Wiring an email provider and an underwriting partner is documented in the README.",
  },
  {
    q: "Can I insure more than one bike?",
    a: "A production policy would usually schedule multiple bicycles on one account. For this demo, describe additional bikes in the message field or submit a second request.",
  },
] as const;

export const homeStats = [
  { value: "$11", label: "Sample monthly from*", hint: "Not a real rate" },
  { value: "4", label: "Coverage building blocks", hint: "Theft to accessories" },
  { value: "24h", label: "Target quote follow-up", hint: "When email is wired" },
] as const;
