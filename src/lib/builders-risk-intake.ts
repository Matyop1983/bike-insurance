import {
  BUILDERS_RISK_INTAKE_MARKER,
  BUILDERS_RISK_MESSAGE_MAX,
  normalizeQuote,
  validateQuote,
  type QuotePayload,
} from "@/lib/quote";

export const BUILDERS_RISK_FORM_ID = "builders-risk" as const;

export const US_STATES = [
  ["AL", "Alabama"],
  ["AK", "Alaska"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["DC", "District of Columbia"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["HI", "Hawaii"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"],
] as const;

const STATE_CODES = new Set<string>(US_STATES.map(([code]) => code));

export const contactRoles = [
  { value: "owner", label: "Project owner" },
  { value: "general-contractor", label: "General contractor" },
  { value: "other", label: "Other (architect, lender, or agent)" },
] as const;

export const constructionTypes = [
  { value: "frame", label: "Frame" },
  { value: "joisted-masonry", label: "Joisted masonry" },
  { value: "non-combustible", label: "Non-combustible" },
  { value: "masonry-non-combustible", label: "Masonry non-combustible" },
  { value: "fire-resistive", label: "Fire resistive" },
  { value: "other", label: "Other" },
] as const;

export const occupancies = [
  { value: "residential", label: "Residential" },
  { value: "multifamily", label: "Multi-family residential" },
  { value: "commercial", label: "Commercial" },
  { value: "mixed-use", label: "Mixed use" },
  { value: "industrial", label: "Industrial" },
  { value: "other", label: "Other" },
] as const;

export const projectKinds = [
  { value: "new", label: "New construction" },
  { value: "renovation", label: "Renovation or addition" },
] as const;

export const sprinklerOptions = [
  { value: "none", label: "No sprinklers" },
  { value: "partial", label: "Partial" },
  { value: "full", label: "Full sprinkler system" },
] as const;

export const protectionClasses = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const;

const PROTECTION_CLASSES = new Set<string>(protectionClasses);

export const occupiedOptions = [
  { value: "no", label: "No — it will be vacant during the work" },
  { value: "yes", label: "Yes — it will be occupied during the work" },
  { value: "partial", label: "Part of the building will stay occupied" },
] as const;

export const gcModes = [
  { value: "known", label: "A general contractor is on the job" },
  { value: "same-as-contact", label: "I am the general contractor" },
  { value: "owner-builder", label: "Owner-builder (no separate contractor)" },
  { value: "undecided", label: "Not selected yet" },
] as const;

type ContactRole = (typeof contactRoles)[number]["value"];
type ConstructionType = (typeof constructionTypes)[number]["value"];
type Occupancy = (typeof occupancies)[number]["value"];
type ProjectKind = (typeof projectKinds)[number]["value"];
type Sprinkler = (typeof sprinklerOptions)[number]["value"];
type Occupied = (typeof occupiedOptions)[number]["value"];
type GcMode = (typeof gcModes)[number]["value"];

export type BuildersRiskIntake = {
  form: typeof BUILDERS_RISK_FORM_ID;
  contactName: string;
  contactCompany: string;
  contactPhone: string;
  contactEmail: string;
  contactRole: ContactRole | "";
  projectName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  constructionType: ConstructionType | "";
  constructionOther: string;
  occupancy: Occupancy | "";
  occupancyOther: string;
  projectKind: ProjectKind | "";
  stories: string;
  squareFeet: string;
  sprinklers: Sprinkler | "";
  protectionClass: string;
  description: string;
  completedValue: string;
  hardCosts: string;
  softCosts: string;
  startDate: string;
  completionDate: string;
  existingValue: string;
  yearBuilt: string;
  scopeOfWork: string;
  occupiedDuringWork: Occupied | "";
  currentCarrier: string;
  namedInsuredSameAsContact: boolean;
  namedInsuredName: string;
  namedInsuredCompany: string;
  namedInsuredPhone: string;
  namedInsuredEmail: string;
  gcMode: GcMode | "";
  gcName: string;
  gcCompany: string;
  gcPhone: string;
  gcEmail: string;
  lender: string;
  notes: string;
};

export type BuildersRiskFieldErrors = Partial<
  Record<keyof BuildersRiskIntake, string>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()0-9.\-\s]{7,20}$/;
const MAX_MONEY = 5_000_000_000;
const MIN_DATE = Date.UTC(1980, 0, 1);

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const friendlyDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function emptyBuildersRiskIntake(): BuildersRiskIntake {
  return {
    form: BUILDERS_RISK_FORM_ID,
    contactName: "",
    contactCompany: "",
    contactPhone: "",
    contactEmail: "",
    contactRole: "",
    projectName: "",
    street: "",
    city: "",
    state: "TX",
    zip: "",
    constructionType: "",
    constructionOther: "",
    occupancy: "",
    occupancyOther: "",
    projectKind: "",
    stories: "",
    squareFeet: "",
    sprinklers: "",
    protectionClass: "",
    description: "",
    completedValue: "",
    hardCosts: "",
    softCosts: "",
    startDate: "",
    completionDate: "",
    existingValue: "",
    yearBuilt: "",
    scopeOfWork: "",
    occupiedDuringWork: "",
    currentCarrier: "",
    namedInsuredSameAsContact: true,
    namedInsuredName: "",
    namedInsuredCompany: "",
    namedInsuredPhone: "",
    namedInsuredEmail: "",
    gcMode: "",
    gcName: "",
    gcCompany: "",
    gcPhone: "",
    gcEmail: "",
    lender: "",
    notes: "",
  };
}

export function isBuildersRiskIntakeBody(value: unknown): value is BuildersRiskIntake {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  if (record.form !== BUILDERS_RISK_FORM_ID) return false;
  const sample = emptyBuildersRiskIntake();
  for (const key of Object.keys(sample) as (keyof BuildersRiskIntake)[]) {
    if (typeof record[key] !== typeof sample[key]) return false;
  }
  return true;
}

function blank(value: string): boolean {
  return value.trim() === "";
}

function digits(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

function isEmail(value: string): boolean {
  return value.length <= 120 && emailPattern.test(value);
}

function isPhone(value: string): boolean {
  const count = digits(value);
  return phonePattern.test(value) && count >= 10 && count <= 15;
}

export function parseMoney(value: string): number | null {
  const cleaned = value.trim().replace(/[$,\s]/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const amount = Number(cleaned);
  if (!Number.isFinite(amount)) return null;
  return amount;
}

function cents(amount: number): number {
  return Math.round(amount * 100);
}

function optionalInteger(
  value: string,
): { ok: true; empty: true } | { ok: true; empty: false; value: number } | { ok: false } {
  if (blank(value)) return { ok: true, empty: true };
  const cleaned = value.trim().replace(/,/g, "");
  if (!/^\d+$/.test(cleaned)) return { ok: false };
  const parsed = Number(cleaned);
  if (!Number.isSafeInteger(parsed)) return { ok: false };
  return { ok: true, empty: false, value: parsed };
}

function parseIsoDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return date;
}

function isChoice(value: string, options: readonly { value: string }[]): boolean {
  return options.some((option) => option.value === value);
}

function choiceLabel(value: string, options: readonly { value: string; label: string }[]): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

function checkLength(
  errors: BuildersRiskFieldErrors,
  key: keyof BuildersRiskIntake,
  value: string,
  max: number,
  message: string,
) {
  if (value.trim().length > max) errors[key] = message;
}

function checkOptionalName(
  errors: BuildersRiskFieldErrors,
  key: keyof BuildersRiskIntake,
  value: string,
  max: number,
) {
  const trimmed = value.trim();
  if (!trimmed) return;
  if (trimmed.length < 2 || trimmed.length > max) {
    errors[key] = "Enter the full name, or leave it blank.";
  }
}

function checkRequiredPerson(
  errors: BuildersRiskFieldErrors,
  fields: {
    name: keyof BuildersRiskIntake;
    phone: keyof BuildersRiskIntake;
    email: keyof BuildersRiskIntake;
    company?: keyof BuildersRiskIntake;
    companyRequired?: boolean;
  },
  input: BuildersRiskIntake,
) {
  const name = input[fields.name];
  const phone = input[fields.phone];
  const email = input[fields.email];
  if (typeof name !== "string" || name.trim().length < 2) {
    errors[fields.name] = "Enter the full name.";
  } else {
    checkLength(errors, fields.name, name, 100, "Keep the name under 100 characters.");
  }
  if (typeof phone !== "string" || blank(phone)) {
    errors[fields.phone] = "Enter a phone number we can call.";
  } else if (!isPhone(phone.trim())) {
    errors[fields.phone] = "Enter a 10-digit phone number.";
  }
  if (typeof email !== "string" || !isEmail(email.trim())) {
    errors[fields.email] = "Enter a valid email so we can follow up.";
  }
  if (!fields.company) return;
  const company = input[fields.company];
  if (typeof company !== "string") return;
  const trimmed = company.trim();
  if (fields.companyRequired && trimmed.length < 2) {
    errors[fields.company] = "Enter the company name. If they work under their own name, use that.";
    return;
  }
  checkOptionalName(errors, fields.company, company, 120);
}

function checkMoney(
  errors: BuildersRiskFieldErrors,
  key: keyof BuildersRiskIntake,
  value: string,
  mode: "required" | "optional",
): number | null {
  if (blank(value)) {
    if (mode === "required") {
      errors[key] =
        key === "existingValue"
          ? "Enter the value of the existing building."
          : "Enter the total completed value.";
    }
    return null;
  }
  const amount = parseMoney(value);
  if (amount == null) {
    errors[key] = "Use a dollar amount, like 450000 or $450,000.";
    return null;
  }
  if (amount > MAX_MONEY) {
    errors[key] = "That amount looks too large. Check the number of digits.";
    return null;
  }
  if (mode === "required" && amount <= 0) {
    errors[key] =
      key === "existingValue"
        ? "Enter a value greater than zero."
        : "Enter a completed value greater than zero.";
    return null;
  }
  return amount;
}

export function validateBuildersRiskIntake(
  input: BuildersRiskIntake,
): BuildersRiskFieldErrors {
  const errors: BuildersRiskFieldErrors = {};
  const maxDate = Date.UTC(new Date().getUTCFullYear() + 15, 11, 31);

  checkRequiredPerson(errors, {
    name: "contactName",
    phone: "contactPhone",
    email: "contactEmail",
  }, input);
  checkOptionalName(errors, "contactCompany", input.contactCompany, 120);
  if (!isChoice(input.contactRole, contactRoles)) {
    errors.contactRole = "Tell us who you are on this project.";
  }

  if (input.street.trim().length < 4) {
    errors.street = "Enter the street address.";
  } else {
    checkLength(errors, "street", input.street, 120, "Keep the street address under 120 characters.");
  }
  if (input.city.trim().length < 2) {
    errors.city = "Enter the city.";
  } else {
    checkLength(errors, "city", input.city, 60, "Keep the city under 60 characters.");
  }
  if (!STATE_CODES.has(input.state.trim().toUpperCase())) {
    errors.state = "Choose a state.";
  }
  if (!/^\d{5}(-\d{4})?$/.test(input.zip.trim())) {
    errors.zip = "Enter a 5-digit ZIP code.";
  }

  checkLength(errors, "projectName", input.projectName, 120, "Keep the project name under 120 characters.");
  if (!isChoice(input.constructionType, constructionTypes)) {
    errors.constructionType = "Choose a construction type.";
  } else if (input.constructionType === "other") {
    if (input.constructionOther.trim().length < 2) {
      errors.constructionOther = "Describe the construction type.";
    } else {
      checkLength(errors, "constructionOther", input.constructionOther, 80, "Keep that description shorter.");
    }
  }

  if (!isChoice(input.occupancy, occupancies)) {
    errors.occupancy = "Choose how the building will be used.";
  } else if (input.occupancy === "other") {
    if (input.occupancyOther.trim().length < 2) {
      errors.occupancyOther = "Describe the occupancy.";
    } else {
      checkLength(errors, "occupancyOther", input.occupancyOther, 80, "Keep that description shorter.");
    }
  }

  if (!isChoice(input.projectKind, projectKinds)) {
    errors.projectKind = "Choose new construction or renovation.";
  }

  const stories = optionalInteger(input.stories);
  if (!stories.ok || (!stories.empty && (stories.value < 1 || stories.value > 100))) {
    errors.stories = "Enter the number of stories, or leave it blank.";
  }
  const squareFeet = optionalInteger(input.squareFeet);
  if (!squareFeet.ok || (!squareFeet.empty && (squareFeet.value < 1 || squareFeet.value > 5_000_000))) {
    errors.squareFeet = "Enter the square footage, or leave it blank.";
  }
  if (input.sprinklers && !isChoice(input.sprinklers, sprinklerOptions)) {
    errors.sprinklers = "Choose a sprinkler answer.";
  }
  if (input.protectionClass && !PROTECTION_CLASSES.has(input.protectionClass)) {
    errors.protectionClass = "Choose a protection class, or leave it blank.";
  }
  checkLength(errors, "description", input.description, 300, "Keep the description under 300 characters.");

  const completed = checkMoney(errors, "completedValue", input.completedValue, "required");
  const hard = checkMoney(errors, "hardCosts", input.hardCosts, "optional");
  const soft = checkMoney(errors, "softCosts", input.softCosts, "optional");
  if (completed != null && hard != null && cents(hard) > cents(completed)) {
    errors.hardCosts = "Hard costs can’t be more than the completed value.";
  }
  if (completed != null && soft != null && cents(soft) > cents(completed)) {
    errors.softCosts = "Soft costs can’t be more than the completed value.";
  }
  if (
    completed != null &&
    hard != null &&
    soft != null &&
    Math.abs(cents(hard) + cents(soft) - cents(completed)) > 100
  ) {
    errors.softCosts =
      "Hard and soft costs should add up to the completed value, or leave one of them blank.";
  }

  const start = parseIsoDate(input.startDate);
  const completion = parseIsoDate(input.completionDate);
  if (blank(input.startDate)) {
    errors.startDate = "Add the estimated start date.";
  } else if (!start || start.getTime() < MIN_DATE || start.getTime() > maxDate) {
    errors.startDate = "Enter a real start date.";
  }
  if (blank(input.completionDate)) {
    errors.completionDate = "Add the estimated completion date.";
  } else if (!completion || completion.getTime() < MIN_DATE || completion.getTime() > maxDate) {
    errors.completionDate = "Enter a real completion date.";
  } else if (start && completion.getTime() < start.getTime()) {
    errors.completionDate = "Completion should be on or after the start date.";
  }

  if (input.projectKind === "renovation") {
    checkMoney(errors, "existingValue", input.existingValue, "required");
    const year = optionalInteger(input.yearBuilt);
    const maxYear = new Date().getUTCFullYear();
    if (year.ok && year.empty) {
      errors.yearBuilt = "Enter the year the building was built.";
    } else if (!year.ok || year.value < 1700 || year.value > maxYear) {
      errors.yearBuilt = "Enter a four-digit year, like 1986.";
    }
    if (input.scopeOfWork.trim().length < 8) {
      errors.scopeOfWork = "Describe the work in a few words.";
    } else {
      checkLength(errors, "scopeOfWork", input.scopeOfWork, 600, "Keep the scope under 600 characters.");
    }
    if (!isChoice(input.occupiedDuringWork, occupiedOptions)) {
      errors.occupiedDuringWork = "Tell us if the building will be occupied during the work.";
    }
    checkOptionalName(errors, "currentCarrier", input.currentCarrier, 120);
  }

  if (!input.namedInsuredSameAsContact) {
    checkRequiredPerson(errors, {
      name: "namedInsuredName",
      phone: "namedInsuredPhone",
      email: "namedInsuredEmail",
      company: "namedInsuredCompany",
    }, input);
  }

  if (!isChoice(input.gcMode, gcModes)) {
    errors.gcMode = "Tell us who the general contractor is.";
  } else if (input.gcMode === "known") {
    checkRequiredPerson(errors, {
      name: "gcName",
      phone: "gcPhone",
      email: "gcEmail",
      company: "gcCompany",
      companyRequired: true,
    }, input);
  }

  checkLength(errors, "lender", input.lender, 160, "Keep the lender name under 160 characters.");
  checkLength(errors, "notes", input.notes, 600, "Keep the note under 600 characters.");

  if (Object.keys(errors).length === 0) {
    const message = formatBuildersRiskMessage(input);
    if (message.length > BUILDERS_RISK_MESSAGE_MAX) {
      errors.notes = "Shorten the notes so we can send the full intake.";
    }
  }

  return errors;
}

type Party = {
  name: string;
  company: string;
  phone: string;
  email: string;
};

function party(name: string, company: string, phone: string, email: string): Party {
  return {
    name: name.trim(),
    company: company.trim(),
    phone: phone.trim(),
    email: email.trim().toLowerCase(),
  };
}

function contactParty(input: BuildersRiskIntake): Party {
  return party(input.contactName, input.contactCompany, input.contactPhone, input.contactEmail);
}

function namedInsuredParty(input: BuildersRiskIntake): Party {
  if (input.namedInsuredSameAsContact) return contactParty(input);
  return party(
    input.namedInsuredName,
    input.namedInsuredCompany,
    input.namedInsuredPhone,
    input.namedInsuredEmail,
  );
}

function formatUsd(amount: number): string {
  return usd.format(amount);
}

function formatDate(value: string): string {
  const date = parseIsoDate(value);
  if (!date) return value.trim();
  return `${friendlyDate.format(date)} (${value.trim()})`;
}

function withOther(label: string, value: string, other: string): string {
  if (value === "other" && other.trim()) return `${label} — ${other.trim()}`;
  return label;
}

function partyLines(person: Party, sameAsContact: boolean): string[] {
  const lines = [
    `Same as the person to call: ${sameAsContact ? "Yes" : "No"}`,
    `Name: ${person.name}`,
    `Phone: ${person.phone}`,
    `Email: ${person.email}`,
  ];
  if (person.company) lines.splice(2, 0, `Company: ${person.company}`);
  return lines;
}

export function formatBuildersRiskMessage(input: BuildersRiskIntake): string {
  const contact = contactParty(input);
  const named = namedInsuredParty(input);
  const state = input.state.trim().toUpperCase();
  const lines: string[] = [BUILDERS_RISK_INTAKE_MARKER, ""];

  const push = (title: string, body: Array<string | null>) => {
    lines.push(title);
    for (const line of body) {
      if (line) lines.push(line);
    }
    lines.push("");
  };

  push("Person to call", [
    `Role: ${choiceLabel(input.contactRole, contactRoles)}`,
    `Name: ${contact.name}`,
    contact.company ? `Company: ${contact.company}` : null,
    `Phone: ${contact.phone}`,
    `Email: ${contact.email}`,
  ]);

  push("Named insured / owner", partyLines(named, input.namedInsuredSameAsContact));

  if (input.gcMode === "known") {
    push(
      "General contractor",
      partyLines(
        party(input.gcName, input.gcCompany, input.gcPhone, input.gcEmail),
        false,
      ),
    );
  } else if (input.gcMode === "same-as-contact") {
    push("General contractor", partyLines(contact, true));
  } else {
    push("General contractor", [
      `Status: ${input.gcMode ? choiceLabel(input.gcMode, gcModes) : "Not provided"}`,
    ]);
  }

  push("Project address", [
    input.projectName.trim() ? `Project name: ${input.projectName.trim()}` : null,
    input.street.trim(),
    `${input.city.trim()}, ${state} ${input.zip.trim()}`,
  ]);

  const stories = optionalInteger(input.stories);
  const squareFeet = optionalInteger(input.squareFeet);
  push("Project", [
    `Construction type: ${withOther(choiceLabel(input.constructionType, constructionTypes), input.constructionType, input.constructionOther)}`,
    `Occupancy: ${withOther(choiceLabel(input.occupancy, occupancies), input.occupancy, input.occupancyOther)}`,
    `New construction or renovation: ${choiceLabel(input.projectKind, projectKinds) || "Not provided"}`,
    !stories.ok || stories.empty ? "Stories: Not provided" : `Stories: ${stories.value}`,
    !squareFeet.ok || squareFeet.empty
      ? "Square footage: Not provided"
      : `Square footage: ${squareFeet.value.toLocaleString("en-US")}`,
    `Sprinklers: ${input.sprinklers ? choiceLabel(input.sprinklers, sprinklerOptions) : "Not sure"}`,
    `Protection class: ${input.protectionClass ? `Class ${input.protectionClass}` : "Not sure"}`,
    input.description.trim() ? `Description: ${input.description.trim()}` : null,
  ]);

  if (input.projectKind === "renovation") {
    const existing = parseMoney(input.existingValue);
    push("Existing building", [
      existing == null ? null : `Existing structure value: ${formatUsd(existing)}`,
      `Year built: ${input.yearBuilt.trim()}`,
      `Occupied during the work: ${choiceLabel(input.occupiedDuringWork, occupiedOptions) || "Not provided"}`,
      input.currentCarrier.trim() ? `Current property carrier: ${input.currentCarrier.trim()}` : null,
      "Scope of work:",
      input.scopeOfWork.trim(),
    ]);
  }

  const completed = parseMoney(input.completedValue);
  const hard = parseMoney(input.hardCosts);
  const soft = parseMoney(input.softCosts);
  push("Value and schedule", [
    completed == null ? null : `Completed value: ${formatUsd(completed)}`,
    hard == null || blank(input.hardCosts) ? null : `Hard costs: ${formatUsd(hard)}`,
    soft == null || blank(input.softCosts) ? null : `Soft costs: ${formatUsd(soft)}`,
    `Estimated start: ${formatDate(input.startDate)}`,
    `Estimated completion: ${formatDate(input.completionDate)}`,
  ]);

  if (input.lender.trim() || input.notes.trim()) {
    push("Other", [
      input.lender.trim() ? `Lender / loss payee: ${input.lender.trim()}` : null,
      input.notes.trim() ? `Additional notes:\n${input.notes.trim()}` : null,
    ]);
  }

  return lines.join("\n").trim();
}

export function toQuotePayload(input: BuildersRiskIntake): QuotePayload {
  const contact = contactParty(input);
  const named = namedInsuredParty(input);
  const state = input.state.trim().toUpperCase();
  return normalizeQuote({
    quoteType: "commercial",
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    location: `${input.city.trim()}, ${state} ${input.zip.trim()}`,
    businessName: named.company || contact.company || named.name,
    coverage: ["builders-risk"],
    message: formatBuildersRiskMessage(input),
  });
}

export function buildersRiskQuoteErrors(input: BuildersRiskIntake) {
  return validateQuote(toQuotePayload(input));
}
