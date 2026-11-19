import { US_STATES } from "@/lib/us-states";
import {
  WORKERS_COMP_INTAKE_MARKER,
  WORKERS_COMP_MESSAGE_MAX,
  normalizeQuote,
  validateQuote,
  type QuotePayload,
} from "@/lib/quote";

export const WORKERS_COMP_FORM_ID = "workers-comp" as const;

const STATE_CODES = new Set<string>(US_STATES.map(([code]) => code));

export const businessTypes = [
  { value: "contractor", label: "Contractor or trades" },
  { value: "restaurant", label: "Restaurant or food service" },
  { value: "retail", label: "Retail" },
  { value: "office", label: "Office or professional" },
  { value: "manufacturing", label: "Manufacturing, warehouse, or wholesale" },
  { value: "other", label: "Other" },
] as const;

export const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

export const claimsOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not-sure", label: "Not sure" },
] as const;

export const subsCoverageOptions = [
  { value: "yes", label: "Yes — they carry their own" },
  { value: "some", label: "Some do" },
  { value: "no", label: "No" },
  { value: "not-sure", label: "Not sure" },
] as const;

type BusinessType = (typeof businessTypes)[number]["value"];
type YesNo = (typeof yesNoOptions)[number]["value"];
type ClaimsAnswer = (typeof claimsOptions)[number]["value"];
type SubsCoverage = (typeof subsCoverageOptions)[number]["value"];

export type WorkersCompIntake = {
  form: typeof WORKERS_COMP_FORM_ID;
  businessName: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  fein: string;
  businessType: BusinessType | "";
  businessTypeOther: string;
  operations: string;
  yearsInBusiness: string;
  fullTimeEmployees: string;
  partTimeEmployees: string;
  annualPayroll: string;
  payrollByClass: string;
  currentlyCovered: YesNo | "";
  currentCarrier: string;
  expirationDate: string;
  claims: ClaimsAnswer | "";
  claimsNotes: string;
  effectiveDate: string;
  usesSubcontractors: YesNo | "";
  subsHaveCoverage: SubsCoverage | "";
  notes: string;
};

export type WorkersCompFieldErrors = Partial<Record<keyof WorkersCompIntake, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()0-9.\-\s]{7,20}$/;
const MAX_MONEY = 5_000_000_000;

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

export function emptyWorkersCompIntake(): WorkersCompIntake {
  return {
    form: WORKERS_COMP_FORM_ID,
    businessName: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    street: "",
    city: "",
    state: "TX",
    zip: "",
    fein: "",
    businessType: "",
    businessTypeOther: "",
    operations: "",
    yearsInBusiness: "",
    fullTimeEmployees: "",
    partTimeEmployees: "",
    annualPayroll: "",
    payrollByClass: "",
    currentlyCovered: "",
    currentCarrier: "",
    expirationDate: "",
    claims: "",
    claimsNotes: "",
    effectiveDate: "",
    usesSubcontractors: "",
    subsHaveCoverage: "",
    notes: "",
  };
}

export function isWorkersCompIntakeBody(value: unknown): value is WorkersCompIntake {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  if (record.form !== WORKERS_COMP_FORM_ID) return false;
  const sample = emptyWorkersCompIntake();
  for (const key of Object.keys(sample) as (keyof WorkersCompIntake)[]) {
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
  errors: WorkersCompFieldErrors,
  key: keyof WorkersCompIntake,
  value: string,
  max: number,
  message: string,
) {
  if (value.trim().length > max) errors[key] = message;
}

function normalizeFein(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const onlyDigits = trimmed.replace(/\D/g, "");
  if (onlyDigits.length !== 9) return null;
  if (trimmed.replace(/[\d\s-]/g, "") !== "") return null;
  return `${onlyDigits.slice(0, 2)}-${onlyDigits.slice(2)}`;
}

function checkOptionalDate(
  errors: WorkersCompFieldErrors,
  key: keyof WorkersCompIntake,
  value: string,
) {
  if (blank(value)) return;
  const date = parseIsoDate(value);
  const now = new Date();
  const min = Date.UTC(now.getUTCFullYear() - 1, 0, 1);
  const max = Date.UTC(now.getUTCFullYear() + 2, 11, 31);
  if (!date || date.getTime() < min || date.getTime() > max) {
    errors[key] = "Enter a real date, or leave it blank.";
  }
}

function requiredCount(
  errors: WorkersCompFieldErrors,
  key: keyof WorkersCompIntake,
  value: string,
  label: string,
) {
  if (blank(value)) {
    errors[key] = `Enter the number of ${label}. Use 0 if none.`;
    return;
  }
  const parsed = optionalInteger(value);
  if (!parsed.ok || parsed.empty || parsed.value > 100_000) {
    errors[key] = `Enter the number of ${label}. Use 0 if none.`;
  }
}

export function validateWorkersCompIntake(input: WorkersCompIntake): WorkersCompFieldErrors {
  const errors: WorkersCompFieldErrors = {};

  if (input.businessName.trim().length < 2) {
    errors.businessName = "Enter the business name.";
  } else {
    checkLength(errors, "businessName", input.businessName, 160, "Keep the business name under 160 characters.");
  }

  if (input.contactName.trim().length < 2) {
    errors.contactName = "Enter the full name.";
  } else {
    checkLength(errors, "contactName", input.contactName, 100, "Keep the name under 100 characters.");
  }

  const phone = input.contactPhone.trim();
  const email = input.contactEmail.trim();
  if (!phone && !email) {
    errors.contactPhone = "Enter a phone number or an email so we can reach you.";
  } else {
    if (phone && !isPhone(phone)) {
      errors.contactPhone = "Enter a 10-digit phone number.";
    }
    if (email && !isEmail(email)) {
      errors.contactEmail = "Enter a valid email, or leave it blank.";
    }
  }

  if (!blank(input.street)) {
    if (input.street.trim().length < 4) {
      errors.street = "Enter the street address, or leave it blank.";
    } else {
      checkLength(errors, "street", input.street, 120, "Keep the street address under 120 characters.");
    }
  }
  if (!blank(input.city)) {
    if (input.city.trim().length < 2) {
      errors.city = "Enter the city, or leave it blank.";
    } else {
      checkLength(errors, "city", input.city, 60, "Keep the city under 60 characters.");
    }
  }
  if (!STATE_CODES.has(input.state.trim().toUpperCase())) {
    errors.state = "Choose a state.";
  }
  if (!blank(input.zip) && !/^\d{5}(-\d{4})?$/.test(input.zip.trim())) {
    errors.zip = "Enter a 5-digit ZIP code, or leave it blank.";
  }

  const fein = normalizeFein(input.fein);
  if (fein == null) {
    errors.fein = "Enter a 9-digit FEIN, or leave it blank.";
  }

  if (!isChoice(input.businessType, businessTypes)) {
    errors.businessType = "Choose a business type.";
  } else if (input.businessType === "other") {
    if (input.businessTypeOther.trim().length < 2) {
      errors.businessTypeOther = "Describe the business.";
    } else {
      checkLength(
        errors,
        "businessTypeOther",
        input.businessTypeOther,
        80,
        "Keep that description shorter.",
      );
    }
  }

  checkLength(errors, "operations", input.operations, 600, "Keep the description under 600 characters.");

  const years = optionalInteger(input.yearsInBusiness);
  if (!years.ok || (!years.empty && years.value > 200)) {
    errors.yearsInBusiness = "Enter the years in business, or leave it blank.";
  }

  requiredCount(errors, "fullTimeEmployees", input.fullTimeEmployees, "full-time employees");
  requiredCount(errors, "partTimeEmployees", input.partTimeEmployees, "part-time employees");

  if (!blank(input.annualPayroll)) {
    const payroll = parseMoney(input.annualPayroll);
    if (payroll == null) {
      errors.annualPayroll = "Use a dollar amount, like 250000 or $250,000.";
    } else if (payroll > MAX_MONEY) {
      errors.annualPayroll = "That amount looks too large. Check the number of digits.";
    }
  }
  checkLength(
    errors,
    "payrollByClass",
    input.payrollByClass,
    600,
    "Keep the class payroll under 600 characters.",
  );

  if (input.currentlyCovered && !isChoice(input.currentlyCovered, yesNoOptions)) {
    errors.currentlyCovered = "Choose yes or no, or leave it blank.";
  }
  if (input.currentlyCovered === "yes") {
    if (!blank(input.currentCarrier)) {
      if (input.currentCarrier.trim().length < 2) {
        errors.currentCarrier = "Enter the carrier name, or leave it blank.";
      } else {
        checkLength(errors, "currentCarrier", input.currentCarrier, 120, "Keep the carrier name shorter.");
      }
    }
    checkOptionalDate(errors, "expirationDate", input.expirationDate);
  }

  if (input.claims && !isChoice(input.claims, claimsOptions)) {
    errors.claims = "Choose an answer, or leave it blank.";
  }
  if (input.claims === "yes") {
    checkLength(errors, "claimsNotes", input.claimsNotes, 600, "Keep the claims note under 600 characters.");
  }

  checkOptionalDate(errors, "effectiveDate", input.effectiveDate);

  if (input.usesSubcontractors && !isChoice(input.usesSubcontractors, yesNoOptions)) {
    errors.usesSubcontractors = "Choose yes or no, or leave it blank.";
  }
  if (
    input.usesSubcontractors === "yes" &&
    input.subsHaveCoverage &&
    !isChoice(input.subsHaveCoverage, subsCoverageOptions)
  ) {
    errors.subsHaveCoverage = "Choose an answer, or leave it blank.";
  }

  checkLength(errors, "notes", input.notes, 600, "Keep the note under 600 characters.");

  if (Object.keys(errors).length === 0) {
    const message = formatWorkersCompMessage(input);
    if (message.length > WORKERS_COMP_MESSAGE_MAX) {
      errors.notes = "Shorten the notes so we can send the full quote request.";
    }
  }

  return errors;
}

function formatUsd(amount: number): string {
  return usd.format(amount);
}

function formatDate(value: string): string {
  const date = parseIsoDate(value);
  if (!date) return value.trim();
  return `${friendlyDate.format(date)} (${value.trim()})`;
}

function orNotProvided(value: string): string {
  const trimmed = value.trim();
  return trimmed || "Not provided";
}

function countLine(label: string, value: string): string {
  const parsed = optionalInteger(value);
  if (!parsed.ok || parsed.empty) return `${label}: Not provided`;
  return `${label}: ${parsed.value.toLocaleString("en-US")}`;
}

function businessTypeLine(input: WorkersCompIntake): string {
  const label = choiceLabel(input.businessType, businessTypes);
  if (input.businessType === "other" && input.businessTypeOther.trim()) {
    return `Business type: ${label} — ${input.businessTypeOther.trim()}`;
  }
  return `Business type: ${label || "Not provided"}`;
}

export function formatLocation(input: WorkersCompIntake): string {
  const city = input.city.trim();
  const zip = input.zip.trim();
  if (!city && !zip) return "Not provided";
  const state = input.state.trim().toUpperCase();
  const locality = [state, zip].filter(Boolean).join(" ");
  return [city, locality].filter(Boolean).join(", ");
}

export function formatWorkersCompMessage(input: WorkersCompIntake): string {
  const state = input.state.trim().toUpperCase();
  const lines: string[] = [WORKERS_COMP_INTAKE_MARKER, ""];
  const fullTime = optionalInteger(input.fullTimeEmployees);
  const partTime = optionalInteger(input.partTimeEmployees);
  const fein = normalizeFein(input.fein);
  const payroll = blank(input.annualPayroll) ? null : parseMoney(input.annualPayroll);

  const push = (title: string, body: Array<string | null>) => {
    lines.push(title);
    for (const line of body) {
      if (line) lines.push(line);
    }
    lines.push("");
  };

  push("Business", [
    `Business name: ${input.businessName.trim()}`,
    businessTypeLine(input),
    input.operations.trim() ? `Operations: ${input.operations.trim()}` : "Operations: Not provided",
    blank(input.yearsInBusiness)
      ? "Years in business: Not provided"
      : `Years in business: ${input.yearsInBusiness.trim()}`,
    fein ? `FEIN: ${fein}` : "FEIN: Not provided",
  ]);

  push("Person to call", [
    `Name: ${input.contactName.trim()}`,
    `Phone: ${orNotProvided(input.contactPhone)}`,
    `Email: ${blank(input.contactEmail) ? "Not provided" : input.contactEmail.trim().toLowerCase()}`,
  ]);

  push("Business address", [
    `Street: ${orNotProvided(input.street)}`,
    input.city.trim() || input.zip.trim()
      ? [input.city.trim(), [state, input.zip.trim()].filter(Boolean).join(" ")]
          .filter(Boolean)
          .join(", ")
      : "City: Not provided",
  ]);

  const total =
    fullTime.ok && !fullTime.empty && partTime.ok && !partTime.empty
      ? fullTime.value + partTime.value
      : null;
  push("Employees and payroll", [
    countLine("Full-time employees", input.fullTimeEmployees),
    countLine("Part-time employees", input.partTimeEmployees),
    total == null ? null : `Total employees: ${total.toLocaleString("en-US")}`,
    payroll == null ? "Estimated annual payroll: Not provided" : `Estimated annual payroll: ${formatUsd(payroll)}`,
    input.payrollByClass.trim()
      ? `Payroll by class:\n${input.payrollByClass.trim()}`
      : "Payroll by class: Not provided",
  ]);

  push("Current workers’ comp", [
    `Currently carries workers’ comp: ${
      input.currentlyCovered ? choiceLabel(input.currentlyCovered, yesNoOptions) : "Not provided"
    }`,
    ...(input.currentlyCovered === "yes"
      ? [
          `Current carrier: ${orNotProvided(input.currentCarrier)}`,
          `Expiration: ${blank(input.expirationDate) ? "Not provided" : formatDate(input.expirationDate)}`,
        ]
      : []),
  ]);

  push("Claims in the last 3 years", [
    `Any claims: ${input.claims ? choiceLabel(input.claims, claimsOptions) : "Not provided"}`,
    input.claims === "yes"
      ? `Claims notes: ${input.claimsNotes.trim() || "Not provided"}`
      : null,
  ]);

  push("Requested start", [
    `Desired effective date: ${
      blank(input.effectiveDate) ? "Not provided" : formatDate(input.effectiveDate)
    }`,
  ]);

  push("Subcontractors", [
    `Uses subcontractors: ${
      input.usesSubcontractors ? choiceLabel(input.usesSubcontractors, yesNoOptions) : "Not provided"
    }`,
    input.usesSubcontractors === "yes"
      ? `Subcontractors carry their own workers’ comp: ${
          input.subsHaveCoverage
            ? choiceLabel(input.subsHaveCoverage, subsCoverageOptions)
            : "Not provided"
        }`
      : null,
  ]);

  if (input.notes.trim()) {
    push("Notes", [input.notes.trim()]);
  }

  return lines.join("\n").trim();
}

export function toWorkersCompQuotePayload(input: WorkersCompIntake): QuotePayload {
  return normalizeQuote({
    quoteType: "commercial",
    name: input.contactName,
    email: input.contactEmail,
    phone: input.contactPhone,
    location: formatLocation(input),
    businessName: input.businessName,
    coverage: ["workers-comp"],
    message: formatWorkersCompMessage(input),
  });
}

export function workersCompQuoteErrors(input: WorkersCompIntake) {
  const payload = toWorkersCompQuotePayload(input);
  const errors = validateQuote(payload);
  const phoneOk = Boolean(payload.phone) && !errors.phone;
  if (!payload.email && phoneOk) delete errors.email;
  return errors;
}
