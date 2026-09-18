export const quoteTypes = [
  { value: "commercial", label: "Commercial", hint: "Business and contractor coverages" },
  { value: "personal", label: "Personal", hint: "Household and individual lines" },
  { value: "bicycle", label: "Bicycle", hint: "Theft, damage, liability, accessories" },
] as const;

export type QuoteType = (typeof quoteTypes)[number]["value"];

export const bikeTypes = [
  { value: "road", label: "Road" },
  { value: "gravel", label: "Gravel / cyclocross" },
  { value: "mountain", label: "Mountain" },
  { value: "commuter", label: "Commuter / city" },
  { value: "ebike", label: "E-bike" },
  { value: "cargo", label: "Cargo / family" },
  { value: "other", label: "Other" },
] as const;

export const bikeValues = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-3k", label: "$1,000 – $3,000" },
  { value: "3k-6k", label: "$3,000 – $6,000" },
  { value: "6k-10k", label: "$6,000 – $10,000" },
  { value: "over-10k", label: "$10,000+" },
] as const;

export const commercialCoverages = [
  { value: "general-liability", label: "General liability" },
  { value: "professional-liability", label: "Professional liability (E&O)" },
  { value: "workers-comp", label: "Workers’ comp" },
  { value: "umbrella", label: "Umbrella" },
  { value: "commercial-auto", label: "Commercial auto" },
  { value: "builders-risk", label: "Builders risk" },
  { value: "property", label: "Property" },
] as const;

export const personalCoverages = [
  { value: "auto", label: "Personal auto" },
  { value: "home", label: "Home / renters" },
  { value: "umbrella", label: "Personal umbrella" },
  { value: "life", label: "Life" },
  { value: "other", label: "Other / not sure" },
] as const;

export const bicycleCoverages = [
  { value: "theft", label: "Theft" },
  { value: "damage", label: "Damage" },
  { value: "liability", label: "Liability" },
  { value: "accessories", label: "Accessories" },
] as const;

export type QuotePayload = {
  quoteType: QuoteType | "";
  name: string;
  email: string;
  phone: string;
  location: string;
  businessName: string;
  bikeType: string;
  bikeValue: string;
  coverage: string[];
  message: string;
};

export type QuoteFieldErrors = Partial<Record<keyof QuotePayload, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()0-9.\-\s]{7,20}$/;

export function parseQuoteType(value: string | undefined | null): QuoteType | "" {
  if (value === "commercial" || value === "personal" || value === "bicycle") {
    return value;
  }
  return "";
}

export const emptyQuote = (quoteType: QuoteType | "" = ""): QuotePayload => ({
  quoteType,
  name: "",
  email: "",
  phone: "",
  location: "",
  businessName: "",
  bikeType: "",
  bikeValue: "",
  coverage: [],
  message: "",
});

function coverageOptionsFor(type: QuoteType | "") {
  if (type === "commercial") return commercialCoverages;
  if (type === "personal") return personalCoverages;
  if (type === "bicycle") return bicycleCoverages;
  return [];
}

export function parseCoverageParam(
  value: string | string[] | undefined | null,
  type: QuoteType | "",
): string[] {
  const raw = Array.isArray(value) ? value.join(",") : (value ?? "");
  const allowed = new Set<string>(
    coverageOptionsFor(type).map((option) => option.value),
  );
  return [
    ...new Set(
      raw
        .split(",")
        .map((item) => item.trim())
        .filter((item) => allowed.has(item)),
    ),
  ];
}

export function validateQuote(input: QuotePayload): QuoteFieldErrors {
  const errors: QuoteFieldErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const location = input.location.trim();

  if (!quoteTypes.some((option) => option.value === input.quoteType)) {
    errors.quoteType = "Choose commercial, personal, or bicycle.";
  }
  if (name.length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email so we can follow up.";
  }
  if (phone && !phonePattern.test(phone)) {
    errors.phone =
      "That phone number doesn’t look right. Leave it blank or include a full number.";
  }
  if (location.length < 3) {
    errors.location = "Add a city or ZIP so we know the region.";
  }
  if (input.message.trim().length > 1000) {
    errors.message = "Keep the note under 1,000 characters.";
  }

  if (input.quoteType === "commercial" && input.businessName.trim().length < 2) {
    errors.businessName = "Add the business name.";
  }

  if (input.quoteType === "bicycle") {
    if (!bikeTypes.some((option) => option.value === input.bikeType)) {
      errors.bikeType = "Select a bike type.";
    }
    if (!bikeValues.some((option) => option.value === input.bikeValue)) {
      errors.bikeValue = "Select a value range.";
    }
  }

  const allowed = coverageOptionsFor(input.quoteType);
  if (input.quoteType) {
    if (!input.coverage.length) {
      errors.coverage = "Choose at least one coverage you’re interested in.";
    } else if (
      input.coverage.some((item) => !allowed.some((option) => option.value === item))
    ) {
      errors.coverage = "One of those coverage choices isn’t recognized.";
    }
  }

  return errors;
}

export function normalizeQuote(input: QuotePayload): QuotePayload {
  const quoteType = parseQuoteType(input.quoteType);
  return {
    quoteType,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    location: input.location.trim(),
    businessName: quoteType === "commercial" ? input.businessName.trim() : "",
    bikeType: quoteType === "bicycle" ? input.bikeType : "",
    bikeValue: quoteType === "bicycle" ? input.bikeValue : "",
    coverage: [...new Set(input.coverage)],
    message: input.message.trim(),
  };
}
