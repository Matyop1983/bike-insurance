export const educationalNotice =
  "Educational overview for discussion with an advisor — not a binder, not a complete list of terms, and not a promise of coverage. What applies depends on the policy issued.";

export const businessCoverages = [
  {
    id: "general-liability",
    title: "General Liability",
    summary:
      "Protects against financial loss from claims of bodily injury, damage to someone else’s belongings, and offenses such as libel, slander, and advertising injury caused by a business or its employees.",
    details: [
      "Exposures can come from many places: accidents on the premises, employment-related lawsuits, and copyright infringement.",
      "A general liability policy typically covers the cost to defend or settle claims — even if they turn out to be fraudulent.",
      "It does not cover auto or professional liability exposures; those need their own forms.",
    ],
  },
  {
    id: "professional-liability",
    title: "Professional Liability (E&O)",
    summary:
      "Often called errors and omissions, this protects professionals and companies against liability from mistakes or omissions in performing professional services.",
    details: [
      "Most E&O policies focus on financial losses suffered by third parties — not bodily injury or damage to someone else’s belongings.",
      "Injury and damage to someone else’s belongings are usually the territory of a commercial general liability policy.",
    ],
  },
  {
    id: "workers-comp",
    title: "Workers’ Comp",
    summary:
      "A statutory benefit in state law requiring most employers to compensate employees or their families for lost wages and medical care due to job-related injuries or occupational disease.",
    details: [
      "In exchange, employees typically give up the right to sue the employer for negligence.",
      "Workers’ compensation insurance helps cover the cost of injured employees’ medical and income benefits.",
    ],
  },
  {
    id: "umbrella",
    title: "Umbrella",
    summary:
      "Covers losses that exceed the limits of an underlying insurance policy.",
    details: [
      "Provides excess limits when underlying policies are exhausted by claims.",
      "Can fill exclusions and gaps in those policies, and may protect against some claims the underlying forms do not cover.",
    ],
  },
  {
    id: "commercial-auto",
    title: "Commercial Auto",
    summary:
      "Covers liability for bodily injury and physical damage caused by vehicles used for business.",
    details: [
      "Ownership by a business, hauling goods for hire, and gross weight are among the factors that determine eligibility on a commercial auto policy.",
      "Except for auto-related businesses, motor carriers, and trucking firms, a commercial auto policy addresses the needs of most commercial entities.",
      "Tell us how each vehicle is used. Vehicles used for the business belong in this commercial auto conversation.",
    ],
  },
  {
    id: "builders-risk",
    title: "Builders Risk",
    pageHref: "/builders-risk",
    summary:
      "Covers the building and materials in the course of construction — typically at the job site, in off-site storage, and in transit.",
    details: [
      "Protects against building damage and damaged or lost materials, fixtures, and equipment used in construction or renovation.",
      "The estimated completed value of the project is commonly used as the limit, and protection ends when the work is completed.",
    ],
  },
] as const;
