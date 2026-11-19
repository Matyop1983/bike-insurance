"use client";

import { useEffect, useRef, useState } from "react";
import { brand } from "@/lib/brand";
import {
  US_STATES,
  constructionTypes,
  contactRoles,
  emptyBuildersRiskIntake,
  gcModes,
  occupancies,
  occupiedOptions,
  projectKinds,
  protectionClasses,
  sprinklerOptions,
  validateBuildersRiskIntake,
  type BuildersRiskFieldErrors,
  type BuildersRiskIntake,
} from "@/lib/builders-risk-intake";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "success"; id: string };

type IntakeResponse = {
  id?: string;
  error?: string;
  errors?: BuildersRiskFieldErrors;
};

const fieldClass =
  "mt-1.5 w-full min-w-0 max-w-full rounded-sm border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-muted/60";

const NETWORK_ERROR_MESSAGE = "Network error — check your connection and try again.";
const SERVER_ERROR_MESSAGE = "Server error — we couldn’t save that request. Try again.";
const SAVE_ERROR_MESSAGE = "We couldn’t save that request. Try again.";

const focusOrder: (keyof BuildersRiskIntake)[] = [
  "contactName",
  "contactCompany",
  "contactPhone",
  "contactEmail",
  "contactRole",
  "street",
  "city",
  "state",
  "zip",
  "projectName",
  "constructionType",
  "constructionOther",
  "occupancy",
  "occupancyOther",
  "projectKind",
  "stories",
  "squareFeet",
  "sprinklers",
  "protectionClass",
  "description",
  "existingValue",
  "yearBuilt",
  "occupiedDuringWork",
  "currentCarrier",
  "scopeOfWork",
  "completedValue",
  "hardCosts",
  "softCosts",
  "startDate",
  "completionDate",
  "namedInsuredName",
  "namedInsuredCompany",
  "namedInsuredPhone",
  "namedInsuredEmail",
  "gcMode",
  "gcName",
  "gcCompany",
  "gcPhone",
  "gcEmail",
  "lender",
  "notes",
];

const renovationKeys: (keyof BuildersRiskIntake)[] = [
  "existingValue",
  "yearBuilt",
  "occupiedDuringWork",
  "currentCarrier",
  "scopeOfWork",
];

const namedInsuredKeys: (keyof BuildersRiskIntake)[] = [
  "namedInsuredName",
  "namedInsuredCompany",
  "namedInsuredPhone",
  "namedInsuredEmail",
];

const gcKeys: (keyof BuildersRiskIntake)[] = ["gcName", "gcCompany", "gcPhone", "gcEmail"];

function clearErrorKeys(
  current: BuildersRiskFieldErrors,
  keys: readonly (keyof BuildersRiskIntake)[],
): BuildersRiskFieldErrors {
  let next = current;
  for (const key of keys) {
    if (!next[key]) continue;
    if (next === current) next = { ...current };
    delete next[key];
  }
  return next;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-teal-dark">
      {message}
    </p>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 border-t border-line pt-8 first:mt-0 first:border-t-0 first:pt-0">
      <h2 className="text-xs font-semibold tracking-[0.16em] text-teal-dark uppercase">
        {title}
      </h2>
      {hint ? <p className="mt-2 max-w-2xl text-sm text-muted">{hint}</p> : null}
      <div className="mt-4 grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function TextField({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  optional = false,
  hint,
  autoComplete,
  inputMode,
  className = "",
  maxLength,
  placeholder,
}: {
  id: keyof BuildersRiskIntake;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  optional?: boolean;
  hint?: string;
  autoComplete?: string;
  inputMode?: "text" | "decimal" | "numeric" | "tel" | "email";
  className?: string;
  maxLength?: number;
  placeholder?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {optional ? <span className="font-normal text-muted"> (optional)</span> : null}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        placeholder={placeholder}
        required={!optional}
        aria-required={!optional}
        className={fieldClass}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function TextAreaField({
  id,
  label,
  value,
  error,
  onChange,
  optional = false,
  hint,
  className = "",
  maxLength,
  rows = 4,
}: {
  id: keyof BuildersRiskIntake;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  optional?: boolean;
  hint?: string;
  className?: string;
  maxLength?: number;
  rows?: number;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {optional ? <span className="font-normal text-muted"> (optional)</span> : null}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <textarea
        id={id}
        name={id}
        rows={rows}
        maxLength={maxLength}
        required={!optional}
        aria-required={!optional}
        className={`${fieldClass} resize-y`}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  error,
  onChange,
  optional = false,
  autoComplete,
  children,
  className = "",
}: {
  id: keyof BuildersRiskIntake;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  optional?: boolean;
  autoComplete?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {optional ? <span className="font-normal text-muted"> (optional)</span> : null}
      </label>
      <select
        id={id}
        name={id}
        autoComplete={autoComplete}
        required={!optional}
        aria-required={!optional}
        className={fieldClass}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
      >
        {children}
      </select>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function messageForResponse(
  response: { ok: boolean; status: number },
  data: IntakeResponse | null,
): Status | { kind: "fields"; message: string; errors: BuildersRiskFieldErrors } {
  if (response.ok && data?.id) return { kind: "success", id: data.id };
  if (data?.errors && Object.keys(data.errors).length) {
    return {
      kind: "fields",
      message: data.error || "Please fix the highlighted fields.",
      errors: data.errors,
    };
  }
  if (data?.error) return { kind: "error", message: data.error };
  if (!response.ok && response.status >= 500) {
    return { kind: "error", message: SERVER_ERROR_MESSAGE };
  }
  return { kind: "error", message: SAVE_ERROR_MESSAGE };
}

export function BuildersRiskForm() {
  const [form, setForm] = useState<BuildersRiskIntake>(emptyBuildersRiskIntake);
  const [errors, setErrors] = useState<BuildersRiskFieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status.kind !== "success") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    successRef.current?.focus();
  }, [status]);

  function update<K extends keyof BuildersRiskIntake>(key: K, value: BuildersRiskIntake[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => clearErrorKeys(current, [key]));
  }

  function focusFirstError(nextErrors: BuildersRiskFieldErrors) {
    const first = focusOrder.find((key) => nextErrors[key]);
    if (!first || !formRef.current) return;
    const node = formRef.current.querySelector<HTMLElement>(`[name="${first}"]`);
    node?.focus();
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateBuildersRiskIntake(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus({ kind: "error", message: "Please fix the highlighted fields." });
      focusFirstError(nextErrors);
      return;
    }

    setStatus({ kind: "submitting" });
    let response: Response;
    try {
      response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      setStatus({ kind: "error", message: NETWORK_ERROR_MESSAGE });
      return;
    }

    let data: IntakeResponse | null = null;
    try {
      data = (await response.json()) as IntakeResponse;
    } catch {
      data = null;
    }

    const next = messageForResponse(response, data);
    if (next.kind === "fields") {
      setErrors(next.errors);
      setStatus({ kind: "error", message: next.message });
      focusFirstError(next.errors);
      return;
    }
    setStatus(next);
  }

  if (status.kind === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-sm border border-line bg-paper px-6 py-10 outline-none sm:px-10"
      >
        <p className="text-xs font-semibold tracking-[0.2em] text-teal-dark uppercase">
          Request received
        </p>
        <h2 className="display mt-3 text-3xl text-ink sm:text-4xl">
          We’ll call you about this project.
        </h2>
        <p className="mt-4 max-w-lg text-muted">
          Thanks — the builder’s risk details are saved with a reference ID.
          This is not a price, a binder, or coverage, and no payment was taken.
          You can also call {brand.phone} now, {brand.hours}.
        </p>
        <a
          href={brand.phoneHref}
          className="mt-5 inline-flex rounded-sm bg-teal px-5 py-3 text-sm font-semibold text-ink hover:bg-teal-dark"
        >
          Call {brand.phone}
        </a>
        <p className="mt-5 rounded-sm bg-stone px-4 py-3 font-mono text-sm text-ink">
          Reference {status.id}
        </p>
        <button
          type="button"
          className="mt-8 rounded-sm bg-ink px-5 py-3 text-sm font-semibold text-stone hover:bg-ink-mid"
          onClick={() => {
            setForm(emptyBuildersRiskIntake());
            setErrors({});
            setStatus({ kind: "idle" });
          }}
        >
          Submit another project
        </button>
      </div>
    );
  }

  const contactLabel = form.contactName.trim() || "you";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-busy={status.kind === "submitting"}
      className="rounded-sm border border-line bg-paper px-5 pt-5 pb-8 shadow-[0_24px_50px_-36px_rgba(26,36,51,0.28)] sm:px-8 sm:pt-8 sm:pb-10"
    >
      <p className="sr-only" aria-live="polite">
        {status.kind === "submitting" ? "Sending your project details" : ""}
      </p>
      <p className="text-sm text-muted">
        Fields without “(optional)” are required. We’ll use this only to call you back.
      </p>

      {status.kind === "error" ? (
        <p
          role="alert"
          className="mt-6 rounded-sm border border-teal/40 bg-teal/10 px-4 py-3 text-sm text-ink"
        >
          {status.message}
        </p>
      ) : null}

      <div>
        <Section
          title="Who should we call?"
          hint="The person we should talk to about this project."
        >
          <TextField
            id="contactName"
            label="Full name"
            autoComplete="name"
            maxLength={100}
            value={form.contactName}
            error={errors.contactName}
            onChange={(value) => update("contactName", value)}
          />
          <TextField
            id="contactCompany"
            label="Company"
            optional
            autoComplete="organization"
            maxLength={120}
            value={form.contactCompany}
            error={errors.contactCompany}
            onChange={(value) => update("contactCompany", value)}
          />
          <TextField
            id="contactPhone"
            label="Phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            value={form.contactPhone}
            error={errors.contactPhone}
            onChange={(value) => update("contactPhone", value)}
          />
          <TextField
            id="contactEmail"
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={120}
            value={form.contactEmail}
            error={errors.contactEmail}
            onChange={(value) => update("contactEmail", value)}
          />
          <SelectField
            id="contactRole"
            label="Your role"
            className="sm:col-span-2"
            value={form.contactRole}
            error={errors.contactRole}
            onChange={(value) => update("contactRole", value as BuildersRiskIntake["contactRole"])}
          >
            <option value="" disabled>
              Select your role
            </option>
            {contactRoles.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
        </Section>

        <Section title="Project address">
          <TextField
            id="street"
            label="Street"
            autoComplete="street-address"
            maxLength={120}
            placeholder="123 Main St"
            className="sm:col-span-2"
            value={form.street}
            error={errors.street}
            onChange={(value) => update("street", value)}
          />
          <div className="grid gap-5 sm:col-span-2 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_8.5rem]">
            <TextField
              id="city"
              label="City"
              autoComplete="address-level2"
              maxLength={60}
              placeholder="Edinburg"
              value={form.city}
              error={errors.city}
              onChange={(value) => update("city", value)}
            />
            <SelectField
              id="state"
              label="State"
              autoComplete="address-level1"
              value={form.state}
              error={errors.state}
              onChange={(value) => update("state", value)}
            >
              {US_STATES.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </SelectField>
            <TextField
              id="zip"
              label="ZIP"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={10}
              placeholder="78539"
              value={form.zip}
              error={errors.zip}
              onChange={(value) => update("zip", value)}
            />
          </div>
        </Section>

        <Section title="The job">
          <TextField
            id="projectName"
            label="Project name"
            optional
            maxLength={120}
            className="sm:col-span-2"
            value={form.projectName}
            error={errors.projectName}
            onChange={(value) => update("projectName", value)}
          />
          <SelectField
            id="constructionType"
            label="Construction type"
            value={form.constructionType}
            error={errors.constructionType}
            onChange={(value) => {
              update("constructionType", value as BuildersRiskIntake["constructionType"]);
              if (value !== "other") {
                setErrors((current) => clearErrorKeys(current, ["constructionOther"]));
              }
            }}
          >
            <option value="" disabled>
              Select construction type
            </option>
            {constructionTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
          {form.constructionType === "other" ? (
            <TextField
              id="constructionOther"
              label="Describe the construction"
              maxLength={80}
              value={form.constructionOther}
              error={errors.constructionOther}
              onChange={(value) => update("constructionOther", value)}
            />
          ) : null}
          <SelectField
            id="occupancy"
            label="Building use"
            value={form.occupancy}
            error={errors.occupancy}
            onChange={(value) => {
              update("occupancy", value as BuildersRiskIntake["occupancy"]);
              if (value !== "other") {
                setErrors((current) => clearErrorKeys(current, ["occupancyOther"]));
              }
            }}
          >
            <option value="" disabled>
              Select occupancy
            </option>
            {occupancies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
          {form.occupancy === "other" ? (
            <TextField
              id="occupancyOther"
              label="Describe the occupancy"
              maxLength={80}
              value={form.occupancyOther}
              error={errors.occupancyOther}
              onChange={(value) => update("occupancyOther", value)}
            />
          ) : null}
          <fieldset
            className="sm:col-span-2"
            aria-invalid={Boolean(errors.projectKind)}
            aria-describedby={errors.projectKind ? "projectKind-error" : undefined}
          >
            <legend className="text-sm font-medium text-ink">
              New construction or renovation
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {projectKinds.map((option) => {
                const selected = form.projectKind === option.value;
                return (
                  <label
                    key={option.value}
                    className={`cursor-pointer rounded-sm border px-4 py-3 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink ${
                      selected ? "border-teal bg-teal text-ink" : "border-line bg-stone text-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="projectKind"
                      value={option.value}
                      checked={selected}
                      className="sr-only"
                      onChange={() => {
                        update("projectKind", option.value);
                        if (option.value !== "renovation") {
                          setErrors((current) => clearErrorKeys(current, renovationKeys));
                        }
                      }}
                    />
                    <span className="block text-sm font-semibold">{option.label}</span>
                  </label>
                );
              })}
            </div>
            <FieldError id="projectKind-error" message={errors.projectKind} />
          </fieldset>
          <TextField
            id="stories"
            label="Number of stories"
            optional
            inputMode="numeric"
            maxLength={3}
            value={form.stories}
            error={errors.stories}
            onChange={(value) => update("stories", value)}
          />
          <TextField
            id="squareFeet"
            label="Square footage"
            optional
            inputMode="numeric"
            maxLength={9}
            value={form.squareFeet}
            error={errors.squareFeet}
            onChange={(value) => update("squareFeet", value)}
          />
          <SelectField
            id="sprinklers"
            label="Sprinklers"
            optional
            value={form.sprinklers}
            error={errors.sprinklers}
            onChange={(value) => update("sprinklers", value as BuildersRiskIntake["sprinklers"])}
          >
            <option value="">Not sure</option>
            {sprinklerOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
          <SelectField
            id="protectionClass"
            label="Protection class"
            optional
            value={form.protectionClass}
            error={errors.protectionClass}
            onChange={(value) => update("protectionClass", value)}
          >
            <option value="">Not sure</option>
            {protectionClasses.map((value) => (
              <option key={value} value={value}>
                Class {value}
              </option>
            ))}
          </SelectField>
          <TextAreaField
            id="description"
            label="Project description"
            optional
            rows={3}
            maxLength={300}
            hint="What is being built, in a sentence or two."
            className="sm:col-span-2"
            value={form.description}
            error={errors.description}
            onChange={(value) => update("description", value)}
          />
        </Section>

        {form.projectKind === "renovation" ? (
          <Section
            title="Existing building"
            hint="Tell us about the standing structure. This section is only for renovations and additions."
          >
            <TextField
              id="existingValue"
              label="Existing structure value"
              inputMode="decimal"
              maxLength={20}
              placeholder="250000"
              hint="What the building is worth today, before this work."
              value={form.existingValue}
              error={errors.existingValue}
              onChange={(value) => update("existingValue", value)}
            />
            <TextField
              id="yearBuilt"
              label="Year built"
              inputMode="numeric"
              maxLength={4}
              placeholder="1986"
              value={form.yearBuilt}
              error={errors.yearBuilt}
              onChange={(value) => update("yearBuilt", value)}
            />
            <fieldset
              className="sm:col-span-2"
              aria-invalid={Boolean(errors.occupiedDuringWork)}
              aria-describedby={
                errors.occupiedDuringWork ? "occupiedDuringWork-error" : undefined
              }
            >
              <legend className="text-sm font-medium text-ink">
                Will the building be occupied during the work?
              </legend>
              <div className="mt-3 grid gap-2">
                {occupiedOptions.map((option) => {
                  const selected = form.occupiedDuringWork === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-start gap-3 rounded-sm border px-4 py-3 text-sm font-medium ${
                        selected
                          ? "border-teal bg-teal/10 text-ink"
                          : "border-line bg-stone text-ink"
                      }`}
                    >
                      <input
                        type="radio"
                        name="occupiedDuringWork"
                        value={option.value}
                        checked={selected}
                        className="mt-0.5 size-4 accent-teal"
                        onChange={() => update("occupiedDuringWork", option.value)}
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
              <FieldError id="occupiedDuringWork-error" message={errors.occupiedDuringWork} />
            </fieldset>
            <TextField
              id="currentCarrier"
              label="Current property carrier"
              optional
              maxLength={120}
              className="sm:col-span-2"
              value={form.currentCarrier}
              error={errors.currentCarrier}
              onChange={(value) => update("currentCarrier", value)}
            />
            <TextAreaField
              id="scopeOfWork"
              label="Scope of work"
              maxLength={600}
              hint="What is being renovated, added, or torn out."
              className="sm:col-span-2"
              value={form.scopeOfWork}
              error={errors.scopeOfWork}
              onChange={(value) => update("scopeOfWork", value)}
            />
          </Section>
        ) : null}

        <Section title="Value and schedule">
          <TextField
            id="completedValue"
            label="Total completed value"
            inputMode="decimal"
            maxLength={20}
            placeholder="450000"
            hint="Estimated value of the project at completion."
            className="sm:col-span-2"
            value={form.completedValue}
            error={errors.completedValue}
            onChange={(value) => update("completedValue", value)}
          />
          <p className="text-sm text-muted sm:col-span-2">
            Hard costs are labor and materials. Soft costs are design, permits, and
            similar fees. If you enter both, they should add up to the completed value.
          </p>
          <TextField
            id="hardCosts"
            label="Hard costs"
            optional
            inputMode="decimal"
            maxLength={20}
            value={form.hardCosts}
            error={errors.hardCosts}
            onChange={(value) => update("hardCosts", value)}
          />
          <TextField
            id="softCosts"
            label="Soft costs"
            optional
            inputMode="decimal"
            maxLength={20}
            value={form.softCosts}
            error={errors.softCosts}
            onChange={(value) => update("softCosts", value)}
          />
          <TextField
            id="startDate"
            label="Estimated start"
            type="date"
            value={form.startDate}
            error={errors.startDate}
            onChange={(value) => update("startDate", value)}
          />
          <TextField
            id="completionDate"
            label="Estimated completion"
            type="date"
            value={form.completionDate}
            error={errors.completionDate}
            onChange={(value) => update("completionDate", value)}
          />
        </Section>

        <Section
          title="Named insured"
          hint="The owner or other party who should be named on the policy."
        >
          <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-line bg-stone px-4 py-3 sm:col-span-2">
            <input
              type="checkbox"
              name="namedInsuredSameAsContact"
              checked={form.namedInsuredSameAsContact}
              className="mt-0.5 size-4 accent-teal"
              onChange={(event) => {
                update("namedInsuredSameAsContact", event.target.checked);
                if (event.target.checked) {
                  setErrors((current) => clearErrorKeys(current, namedInsuredKeys));
                }
              }}
            />
            <span>
              <span className="block text-sm font-medium text-ink">
                Same as my contact information
              </span>
              <span className="mt-1 block text-sm text-muted">
                We’ll list {contactLabel} as the named insured.
              </span>
            </span>
          </label>
          {form.namedInsuredSameAsContact ? null : (
            <>
              <TextField
                id="namedInsuredName"
                label="Named insured name"
                autoComplete="section-insured name"
                maxLength={100}
                value={form.namedInsuredName}
                error={errors.namedInsuredName}
                onChange={(value) => update("namedInsuredName", value)}
              />
              <TextField
                id="namedInsuredCompany"
                label="Company"
                optional
                autoComplete="section-insured organization"
                maxLength={120}
                value={form.namedInsuredCompany}
                error={errors.namedInsuredCompany}
                onChange={(value) => update("namedInsuredCompany", value)}
              />
              <TextField
                id="namedInsuredPhone"
                label="Phone"
                type="tel"
                inputMode="tel"
                autoComplete="section-insured tel"
                maxLength={20}
                value={form.namedInsuredPhone}
                error={errors.namedInsuredPhone}
                onChange={(value) => update("namedInsuredPhone", value)}
              />
              <TextField
                id="namedInsuredEmail"
                label="Email"
                type="email"
                inputMode="email"
                autoComplete="section-insured email"
                maxLength={120}
                value={form.namedInsuredEmail}
                error={errors.namedInsuredEmail}
                onChange={(value) => update("namedInsuredEmail", value)}
              />
            </>
          )}
        </Section>

        <Section title="General contractor">
          <fieldset
            className="sm:col-span-2"
            aria-invalid={Boolean(errors.gcMode)}
            aria-describedby={errors.gcMode ? "gcMode-error" : undefined}
          >
            <legend className="sr-only">General contractor</legend>
            <div className="grid gap-2">
              {gcModes.map((option) => {
                const selected = form.gcMode === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-sm border px-4 py-3 text-sm font-medium ${
                      selected ? "border-teal bg-teal/10 text-ink" : "border-line bg-stone text-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gcMode"
                      value={option.value}
                      checked={selected}
                      className="mt-0.5 size-4 accent-teal"
                      onChange={() => {
                        update("gcMode", option.value);
                        if (option.value !== "known") {
                          setErrors((current) => clearErrorKeys(current, gcKeys));
                        }
                      }}
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
            <FieldError id="gcMode-error" message={errors.gcMode} />
          </fieldset>
          {form.gcMode === "same-as-contact" ? (
            <p className="text-sm text-muted sm:col-span-2">
              We’ll list {contactLabel} as the general contractor.
            </p>
          ) : null}
          {form.gcMode === "known" ? (
            <>
              <TextField
                id="gcName"
                label="Contractor name"
                autoComplete="section-gc name"
                maxLength={100}
                value={form.gcName}
                error={errors.gcName}
                onChange={(value) => update("gcName", value)}
              />
              <TextField
                id="gcCompany"
                label="Contractor company"
                autoComplete="section-gc organization"
                maxLength={120}
                hint="If they work under their own name, enter that."
                value={form.gcCompany}
                error={errors.gcCompany}
                onChange={(value) => update("gcCompany", value)}
              />
              <TextField
                id="gcPhone"
                label="Phone"
                type="tel"
                inputMode="tel"
                autoComplete="section-gc tel"
                maxLength={20}
                value={form.gcPhone}
                error={errors.gcPhone}
                onChange={(value) => update("gcPhone", value)}
              />
              <TextField
                id="gcEmail"
                label="Email"
                type="email"
                inputMode="email"
                autoComplete="section-gc email"
                maxLength={120}
                value={form.gcEmail}
                error={errors.gcEmail}
                onChange={(value) => update("gcEmail", value)}
              />
            </>
          ) : null}
        </Section>

        <Section title="Lender and notes">
          <TextField
            id="lender"
            label="Lender or loss payee"
            optional
            maxLength={160}
            className="sm:col-span-2"
            value={form.lender}
            error={errors.lender}
            onChange={(value) => update("lender", value)}
          />
          <TextAreaField
            id="notes"
            label="Anything else?"
            optional
            maxLength={600}
            className="sm:col-span-2"
            value={form.notes}
            error={errors.notes}
            onChange={(value) => update("notes", value)}
          />
        </Section>
      </div>

      <p className="mt-8 text-sm text-muted">
        This form does not show a price and does not bind coverage. Call {brand.phone} if
        you want to talk through the job now. We’ll only use these details to call you back.
      </p>

      <button
        type="submit"
        disabled={status.kind === "submitting"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-teal px-6 py-3.5 text-sm font-semibold text-ink hover:bg-teal-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status.kind === "submitting" ? "Sending…" : "Submit project details"}
      </button>
    </form>
  );
}
