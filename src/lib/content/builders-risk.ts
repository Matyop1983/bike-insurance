import { brand } from "../brand";

export const buildersRiskQuoteHref =
  "/quote?type=commercial&coverage=builders-risk" as const;

export const buildersRiskAudiences = [
  {
    title: "General contractors",
    body: "When you are responsible for the job site until substantial completion, builders risk is often the form that protects the work itself — not just your liability to others.",
  },
  {
    title: "Project owners and developers",
    body: "Owners commonly purchase the policy (or require it) so the building, materials, and fixtures are insured while the project is still in the course of construction.",
  },
  {
    title: "Renovations and additions",
    body: "Major remodels, vertical expansions, and gut renovations can need course-of-construction coverage for the new work and the materials staged for it — even if the existing building already has a property policy.",
  },
] as const;

export const buildersRiskCovered = [
  {
    title: "Building under construction",
    body: "The structure in the course of construction — framing, systems, and the work in place — typically up to the estimated completed value (sample).",
  },
  {
    title: "Materials and fixtures",
    body: "Materials, supplies, and fixtures intended to become part of the building, while they are at the described job site.",
  },
  {
    title: "Off-site storage",
    body: "Materials stored away from the job site that are destined for the project, when the form includes an off-site storage limit (sample).",
  },
  {
    title: "Transit",
    body: "Materials in transit to the job, when the form includes a transit sublimit (sample). This is not a substitute for a motor-truck cargo or auto policy.",
  },
] as const;

export const buildersRiskNotCovered = [
  "Liability for injury or property damage to others — that is typically general liability, not builders risk.",
  "Contractors’ tools, machinery, and mobile equipment — often inland marine / equipment floaters.",
  "Workers’ injuries — workers’ compensation, not this form.",
  "The existing building on a remodel, unless the policy is written to include it.",
  "Occupancy after the job is complete, accepted, or put to its intended use — coverage is temporary.",
] as const;

export const buildersRiskHowItWorks = [
  {
    n: "01",
    title: "Tell us about the job",
    body: "Share who is buying the policy (owner or contractor), project type, estimated completed value, location, and start/finish dates. No account required.",
  },
  {
    n: "02",
    title: "Call, and Rhino reviews the job",
    body: "Call the office to talk through eligibility, construction type, theft exposure, or existing property coverage. Leaving details online only asks us to call you back — it is not a price and not a binder.",
  },
  {
    n: "03",
    title: "You decide whether to bind",
    body: "Nothing is in force until you accept terms, pay the premium, and receive declarations. A quote request is not coverage.",
  },
] as const;

export const buildersRiskFaqs = [
  {
    q: "Is builders risk the same as general liability?",
    a: "No. Builders risk (course-of-construction) is first-party property coverage for the building and materials. General liability responds to claims that you injured someone or damaged someone else’s property. Most jobs need both, written separately.",
  },
  {
    q: "Who usually buys the policy — the contractor or the owner?",
    a: "Either can. Many contracts require the owner to purchase it, or the GC to purchase it and name the owner. We’ll ask who holds the insurable interest and who the contract names, then quote accordingly. Sample wording on this page is educational — the issued policy controls.",
  },
  {
    q: "Does it cover tools and equipment?",
    a: "Typically not. Tools, scaffolding you own, and mobile equipment are usually a different form (inland marine). Builders risk is aimed at the work and the materials that will become the building.",
  },
  {
    q: "What about off-site storage and materials in transit?",
    a: "Many sample forms include sublimits for materials stored off-site and in transit to the job. Those limits are often smaller than the building limit. Tell us if you stage materials in a warehouse or move them between sites so we can ask for the right terms.",
  },
  {
    q: "When does coverage start and stop?",
    a: "It is temporary. Sample wording starts when work or materials are at risk and ends at the earliest of completion, occupancy, acceptance, or the expiration date. Permanent property insurance should be in place before that happens.",
  },
  {
    q: "Will I get a price when I submit the form?",
    a: "Not automatically. There is no live rating engine on this site. You’ll receive a confirmation ID, and our team follows up at quoting@rhinoia.com.",
  },
  {
    q: `Does ${brand.shortName} manufacture the policy?`,
    a: `${brand.name} is an independent agency. We help you find and request coverage through appointed carriers. Sample wording on this page is educational — the issued policy controls.`,
  },
] as const;

export const buildersRiskSampleLanguage =
  "We cover direct physical loss or damage to the building or structure while in the course of construction at the described premises, including materials, supplies, and fixtures that will become a permanent part of the building, while at the job site, in transit, or in temporary off-site storage, subject to the limits and sublimits shown. Coverage ends when the project is accepted, occupied, or put to its intended use. This is sample language for discussion — not a binder.";
