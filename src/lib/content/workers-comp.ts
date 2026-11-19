import { brand } from "../brand";

export const workersCompIntakeHref = "/workers-comp/quote" as const;

export const workersCompIntakeCta = "Start your workers’ comp quote" as const;

export const workersCompAudiences = [
  {
    title: "Contractors and trades",
    body: "Roofing, electrical, plumbing, concrete, HVAC, and other crews are often asked for a certificate of insurance before they can start on a site.",
  },
  {
    title: "Restaurants and food service",
    body: "Kitchens and dining rooms mean slips, cuts, and burns. A policy is one way to fund medical care and lost wages when an employee is hurt at work.",
  },
  {
    title: "Retail",
    body: "Shops with people on the floor, in a stockroom, or making deliveries have the same choice as any other private employer with a payroll.",
  },
  {
    title: "Offices and other employers",
    body: "Professional offices, warehouses, and other local payrolls. If people work for you, this is the conversation — not only for job sites.",
  },
] as const;

export const workersCompWhy = [
  {
    title: "Injury costs",
    body: "A work injury can mean medical bills and lost wages. Without a workers’ compensation policy, those costs stay with the employer. This page does not estimate what an injury costs.",
  },
  {
    title: "Lawsuits",
    body: "An employer who carries workers’ compensation generally has exclusive-remedy protection: a work injury is handled as a claim on the policy instead of a negligence lawsuit. A nonsubscriber does not get that protection. An injured employee can sue, and the employer cannot use three defenses — that the employee was also negligent, assumed the risk, or was hurt by a coworker.",
  },
  {
    title: "Contracts and general contractors",
    body: "A general contractor, property owner, or public job can require workers’ compensation in the contract even when Texas law does not. No policy can mean no work.",
  },
  {
    title: "Certificates of insurance",
    body: "A certificate is a snapshot that a policy was in force when it was issued. Many jobs will not let a crew on site without one. A certificate is not the policy.",
  },
] as const;

export const workersCompCovered = [
  {
    title: "Medical care",
    body: "Care for a compensable work injury or occupational disease, as the issued policy and Texas law describe it.",
  },
  {
    title: "A portion of lost wages",
    body: "Income benefits while an employee cannot work because of that injury. The share and any waiting period come from the statute and the policy, not from this page.",
  },
  {
    title: "Impairment and death benefits",
    body: "In qualifying cases, benefits for lasting impairment, or for the family after a work-related death. What qualifies is decided by the claim, not by this overview.",
  },
] as const;

export const workersCompNotCovered = [
  "Injuries that are not from work.",
  "Claims by customers or the public — that is typically general liability.",
  "Vehicles used for the business — commercial auto.",
  "Health, dental, or vision for employees and their families — group benefits.",
  "Tools, equipment, or a building under construction — other forms.",
  "A ruling on who is an employee and who is an independent contractor. That depends on the facts and the policy.",
] as const;

export const workersCompHowItWorks = [
  {
    n: "01",
    title: "Tell us about the business",
    body: "Business name, what you do, and how many people you employ. Phone or email is enough. No account required.",
  },
  {
    n: "02",
    title: "Call, and Rhino reviews the operation",
    body: "Payroll, current coverage, and any certificate a job is asking for. Leaving details online only asks us to call you back — it is not a price and not a binder.",
  },
  {
    n: "03",
    title: "You decide whether to bind",
    body: "Nothing is in force until you accept terms, pay the premium, and receive declarations. A quote request is not coverage.",
  },
] as const;

export const workersCompFaqs = [
  {
    q: "Is workers’ compensation required in Texas?",
    a: "Texas is the one state where workers’ compensation is generally optional for most private employers. Public employers generally have to provide coverage, and a contract can require it even when the state does not. This is a general explanation, not a determination for your business.",
  },
  {
    q: "What is a nonsubscriber?",
    a: "A nonsubscriber is an employer that chooses not to carry workers’ compensation. That employer does not get the exclusive-remedy protection a subscriber generally has. An injured employee can sue for negligence, and the employer cannot defend by saying the employee was also negligent, assumed the risk, or was hurt by a coworker. Opting out still comes with notice duties, including telling employees and reporting the choice to the state. It is not the same as doing nothing.",
  },
  {
    q: "If I carry a policy, can I still be sued?",
    a: "The workers’ compensation claim is generally the employee’s exclusive remedy against the employer for a work injury. That is not a guarantee that no lawsuit can be filed. Under Texas law, a death caused by gross negligence can still support a separate claim. The policy that is issued controls.",
  },
  {
    q: "What does a policy usually pay?",
    a: "For a compensable injury, benefits generally include medical care and a portion of lost wages, and in some cases impairment or death benefits. Amounts depend on Texas law and the policy. This page does not quote those amounts.",
  },
  {
    q: "Will a general contractor accept something else?",
    a: "Many general contractors, property owners, and public jobs ask for a workers’ compensation policy and a certificate of insurance before a crew can start. A certificate shows that a policy was in force when it was issued. It does not replace the policy, and it does not replace general liability.",
  },
  {
    q: "What about subcontractors?",
    a: "If you hire subcontractors, the form asks whether they carry their own workers’ compensation. How those certificates are handled depends on the job and the policy. The form does not decide who counts as your employee.",
  },
  {
    q: "Will I get a price when I submit the form?",
    a: `Not automatically. There is no live rating on this site. You’ll receive a confirmation ID, and our team follows up at ${brand.email}. Submitting the form is not a price, a binder, or coverage. Call ${brand.phone}, ${brand.hours}, if you want to talk now.`,
  },
  {
    q: `Does ${brand.shortName} manufacture the policy?`,
    a: `${brand.name} is an independent agency. We help you find and request coverage through appointed carriers. What applies depends on the policy that is issued.`,
  },
] as const;
