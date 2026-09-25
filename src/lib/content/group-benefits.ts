import { brand } from "../brand";

export const groupBenefitsQuoteHref =
  "/quote?type=commercial&coverage=group-benefits" as const;

export const groupBenefitsAudiences = [
  {
    title: "Local employers",
    body: "Businesses in Edinburg and the Rio Grande Valley that want employee benefits explained by a local advisor. This page is for the employer, not for someone shopping an individual medical plan.",
  },
  {
    title: "Growing teams",
    body: "Owners adding employees who want to understand which benefits are commonly offered together, and that enrollment rules are set by the plan — before anyone is asked to sign up.",
  },
  {
    title: "Employers who already call Rhino",
    body: "If you already talk with us about liability or workers’ comp, group benefits is a separate request about what you offer the people who work for you.",
  },
] as const;

export const groupBenefitLines = [
  {
    title: "Group health",
    body: "Medical coverage an employer sponsors for eligible employees. Networks, deductibles, and who may enroll are defined in the plan documents. We do not list copays or premiums here.",
  },
  {
    title: "Dental",
    body: "Dental benefits are often discussed next to medical. Covered services, waiting periods, and annual maximums come from the plan, not from this overview.",
  },
  {
    title: "Vision",
    body: "Vision benefits typically follow a schedule for exams and eyewear. Allowances and any copays are plan terms. This page does not quote them.",
  },
  {
    title: "Group life",
    body: "Life insurance the employer sponsors, often a flat amount or a multiple of pay for eligible employees. It is not a substitute for an individual policy a person buys for their family. Individual life has its own page.",
  },
  {
    title: "Disability",
    body: "Disability coverage is generally meant to replace a portion of income if an employee cannot work because of illness or injury, for a period the contract defines. Employers often ask about both short-term and long-term forms. This is not workers’ compensation, which is a separate commercial line for job-related injury and disease.",
  },
] as const;

export const groupBenefitsNotThis = [
  "An individual health, dental, or vision plan for a household. We do not place individual medical coverage.",
  "A rate, a contribution amount, or a promise that a carrier will offer a plan to your group.",
  "Enrollment on this website. Employees do not apply for benefits here.",
  "Workers’ compensation. That statutory coverage is discussed with your other commercial policies.",
  "A binder. A callback request does not put benefits in force.",
] as const;

export const groupBenefitsHowItWorks = [
  {
    n: "01",
    title: "Tell us about the employer",
    body: "Business name, about how many people you employ, and which benefits you want to discuss — health, dental, vision, group life, disability, or several of them. No account required.",
  },
  {
    n: "02",
    title: "Call, and we talk through what groups usually ask",
    body: "An advisor covers eligibility, the difference between these benefits and workers’ comp, and what has to be true before a plan can be offered. The form on this site only requests that call.",
  },
  {
    n: "03",
    title: "You decide whether to move forward",
    body: "Nothing is in force until the employer accepts terms, any required premium is paid, and plan documents are issued. Employee enrollment is a later step, off this website.",
  },
] as const;

export const groupBenefitsFaqs = [
  {
    q: "Is this page for employees who need their own health plan?",
    a: "No. Group benefits are sponsored by an employer. An individual life policy is a different conversation, on the life insurance page. We do not place household auto or home coverage, and we will not treat an individual request as a group quote.",
  },
  {
    q: "Which benefits can we ask about?",
    a: "Group health, dental, vision, group life, and disability. You can ask about one of them or several. What a carrier will actually offer depends on the employer and on underwriting, which does not happen on this site.",
  },
  {
    q: "Will I see premiums for my group?",
    a: `No. There is no rating on this website, and we do not publish sample rates. Call ${brand.phone} during office hours, or leave a callback request. A confirmation ID is not a quote.`,
  },
  {
    q: "Is group life the same as an individual life policy?",
    a: "No. Group life is an employer-sponsored benefit for eligible employees. Individual life insurance — for a family, a mortgage, or a key person — is a different conversation, with its own page.",
  },
  {
    q: "Does disability replace workers’ comp?",
    a: "No. Workers’ compensation responds to job-related injury and occupational disease under state law. Disability benefits are a separate contract about income when someone cannot work, on terms the plan spells out.",
  },
  {
    q: `Does ${brand.shortName} administer the plan?`,
    a: `${brand.name} is an independent agency in Edinburg. We help employers request group benefits through carriers we are appointed with. We do not publish carrier names or plan guarantees here. The issued documents control.`,
  },
] as const;
