import { brand } from "../brand";

/** Personal callback with life pre-selected. Not a price. */
export const lifeQuoteHref = "/quote?type=personal&coverage=life" as const;

/** Key-person and owner conversations start on the commercial callback. */
export const lifeBusinessQuoteHref =
  "/quote?type=commercial&coverage=life" as const;

export const lifeAudiences = [
  {
    title: "Families",
    body: "Households that want to talk through what happens to income if a parent or spouse dies. A death benefit, when one is payable, is paid to the beneficiary named in the contract — subject to that contract, not to this page.",
  },
  {
    title: "Mortgage protection",
    body: "People carrying a home loan often ask whether life insurance can help the household address the mortgage. How much is appropriate, and whether the benefit is used that way, is a conversation with an advisor. This page does not promise that a loan will be paid.",
  },
  {
    title: "Business owners and key person",
    body: "Owners sometimes look at coverage for their own family and, separately, at coverage on a person whose death would affect the business. Those are different requests. Call and we will sort which one you mean before anyone talks about a contract.",
  },
] as const;

export const lifeOptions = [
  {
    title: "Term",
    body: "Term life is generally written for a stated number of years. If the insured dies during that period, the contract may provide a death benefit. When the term ends, coverage ends unless it is continued under whatever options the contract actually offers at that time. Families often ask about term when the need lines up with a stretch of years — children at home, or a mortgage still outstanding.",
  },
  {
    title: "Permanent",
    body: "Permanent life is generally intended to remain in force for the insured’s lifetime, as long as the premiums the contract requires are paid. Some contracts include a cash value. What that cash value is, and whether it can be borrowed against, is defined in the policy. We do not project values, rates, or returns on this site.",
  },
] as const;

export const lifeNotThis = [
  "A price, a binder, or coverage in force. Call the office to start a quote conversation. The form only asks for a callback.",
  "Health insurance, or an employer medical plan. Those belong in a group benefits conversation.",
  "A statement that term or permanent is always the better fit. That depends on the person and on what can actually be issued.",
  "Group life an employer provides to employees. That is discussed on the group benefits page, not as an individual contract.",
] as const;

export const lifeHowItWorks = [
  {
    n: "01",
    title: "Tell us who the coverage is for",
    body: "Family protection, a mortgage, a business owner, or a key person. No account is required, and nothing is priced on this page.",
  },
  {
    n: "02",
    title: "Call, and an advisor walks through the options",
    body: "We talk in general about term and permanent, then about what you actually need. Leaving details online only asks us to call you back.",
  },
  {
    n: "03",
    title: "You decide whether to apply",
    body: "Nothing is in force until an application is approved, any required premium is paid, and you receive a policy. A callback request is not coverage.",
  },
] as const;

export const lifeFaqs = [
  {
    q: "Do you show rates for term or permanent life?",
    a: "No. This site does not rate, price, or compare premiums. Call the Edinburg office and an advisor will talk through what to ask for. Any figure you eventually see comes from a carrier illustration or quote, not from this page.",
  },
  {
    q: "Is term the same as permanent?",
    a: "No. Term is generally for a set period. Permanent is generally meant to last for the insured’s lifetime if required premiums are paid, and some contracts include cash value. Which one fits is a conversation — this page is only the vocabulary.",
  },
  {
    q: "Can life insurance pay off a mortgage?",
    a: "Households often buy coverage with a mortgage in mind. Whether a death benefit is large enough, and how a beneficiary uses it, is not something this website can promise. The issued policy controls.",
  },
  {
    q: "What is key person coverage?",
    a: "It is life insurance a business asks about on someone whose death would hurt the company — often an owner or a specialist. It is not the same request as a personal policy meant for a family. Tell us which one you want and we will keep them separate.",
  },
  {
    q: "Will the callback form give me a price?",
    a: "No. There is no rating engine on this site. You will see a confirmation ID, and the office follows up by phone during business hours.",
  },
  {
    q: `Does ${brand.shortName} issue the policy?`,
    a: `${brand.name} is an independent agency. We help you request coverage through carriers we are appointed with. Wording on this page is educational — the issued policy controls.`,
  },
] as const;
