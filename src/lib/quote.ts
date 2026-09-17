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

export const coverageInterests = [
  { value: "theft", label: "Theft" },
  { value: "damage", label: "Damage" },
  { value: "liability", label: "Liability" },
  { value: "accessories", label: "Accessories" },
] as const;

export type QuotePayload = {
  name: string;
  email: string;
  phone: string;
  bikeType: string;
  bikeValue: string;
  location: string;
  coverage: string[];
  message: string;
};

export type QuoteFieldErrors = Partial<Record<keyof QuotePayload, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()0-9.\-\s]{7,20}$/;

export const emptyQuote = (): QuotePayload => ({
  name: "",
  email: "",
  phone: "",
  bikeType: "",
  bikeValue: "",
  location: "",
  coverage: [],
  message: "",
});

export function validateQuote(input: QuotePayload): QuoteFieldErrors {
  const errors: QuoteFieldErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const location = input.location.trim();

  if (name.length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email so we can follow up.";
  }
  if (phone && !phonePattern.test(phone)) {
    errors.phone = "That phone number doesn’t look right. Leave it blank or include a full number.";
  }
  if (!bikeTypes.some((option) => option.value === input.bikeType)) {
    errors.bikeType = "Select a bike type.";
  }
  if (!bikeValues.some((option) => option.value === input.bikeValue)) {
    errors.bikeValue = "Select a value range.";
  }
  if (location.length < 3) {
    errors.location = "Add a city or ZIP so we know the region.";
  }
  if (!input.coverage.length) {
    errors.coverage = "Choose at least one coverage you’re interested in.";
  } else if (
    input.coverage.some(
      (item) => !coverageInterests.some((option) => option.value === item),
    )
  ) {
    errors.coverage = "One of those coverage choices isn’t recognized.";
  }
  if (input.message.trim().length > 1000) {
    errors.message = "Keep the note under 1,000 characters.";
  }

  return errors;
}

export function normalizeQuote(input: QuotePayload): QuotePayload {
  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    bikeType: input.bikeType,
    bikeValue: input.bikeValue,
    location: input.location.trim(),
    coverage: [...new Set(input.coverage)],
    message: input.message.trim(),
  };
}
