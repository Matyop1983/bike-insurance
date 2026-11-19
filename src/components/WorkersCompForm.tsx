"use client";

import { useEffect, useRef, useState } from "react";
import { brand } from "@/lib/brand";
import { US_STATES } from "@/lib/us-states";
import {
  businessTypes,
  claimsOptions,
  emptyWorkersCompIntake,
  subsCoverageOptions,
  validateWorkersCompIntake,
  yesNoOptions,
  type WorkersCompFieldErrors,
  type WorkersCompIntake,
} from "@/lib/workers-comp-intake";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "success"; id: string };

type IntakeResponse = {
  id?: string;
  error?: string;
  errors?: WorkersCompFieldErrors;
};

const fieldClass =
  "mt-1.5 w-full min-w-0 max-w-full rounded-sm border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-muted/60";

const NETWORK_ERROR_MESSAGE = "Network error — check your connection and try again.";
const SERVER_ERROR_MESSAGE = "Server error — we couldn’t save that request. Try again.";
const SAVE_ERROR_MESSAGE = "We couldn’t save that request. Try again.";

const focusOrder: (keyof WorkersCompIntake)[] = [
  "businessName",
  "contactName",
  "contactPhone",
  "contactEmail",
  "street",
  "city",
  "state",
  "zip",
  "fein",
  "businessType",
  "businessTypeOther",
  "operations",
  "yearsInBusiness",
  "fullTimeEmployees",
  "partTimeEmployees",
  "annualPayroll",
  "payrollByClass",
  "currentlyCovered",
  "currentCarrier",
  "expirationDate",
  "claims",
  "claimsNotes",
  "effectiveDate",
  "usesSubcontractors",
  "subsHaveCoverage",
  "notes",
];

function clearErrorKeys(
  current: WorkersCompFieldErrors,
  keys: readonly (keyof WorkersCompIntake)[],
): WorkersCompFieldErrors {
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
  quietOptional = false,
  hint,
  autoComplete,
  inputMode,
  className = "",
  maxLength,
  placeholder,
}: {
  id: keyof WorkersCompIntake;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  optional?: boolean;
  /** Keep the field out of the browser required check without labeling it optional. */
  quietOptional?: boolean;
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
        {optional && !quietOptional ? (
          <span className="font-normal text-muted"> (optional)</span>
        ) : null}
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
  placeholder,
}: {
  id: keyof WorkersCompIntake;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  optional?: boolean;
  hint?: string;
  className?: string;
  maxLength?: number;
  rows?: number;
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
      <textarea
        id={id}
        name={id}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
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
  id: keyof WorkersCompIntake;
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

function ChoiceGroup({
  name,
  legend,
  value,
  error,
  options,
  onChange,
  optional = false,
}: {
  name: keyof WorkersCompIntake;
  legend: string;
  value: string;
  error?: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
  optional?: boolean;
}) {
  return (
    <fieldset
      className="sm:col-span-2"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${name}-error` : undefined}
    >
      <legend className="text-sm font-medium text-ink">
        {legend}
        {optional ? <span className="font-normal text-muted"> (optional)</span> : null}
      </legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-start gap-3 rounded-sm border px-4 py-3 text-sm font-medium ${
                selected ? "border-teal bg-teal/10 text-ink" : "border-line bg-stone text-ink"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                className="mt-0.5 size-4 accent-teal"
                onChange={() => onChange(option.value)}
              />
              {option.label}
            </label>
          );
        })}
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </fieldset>
  );
}

function messageForResponse(
  response: { ok: boolean; status: number },
  data: IntakeResponse | null,
): Status | { kind: "fields"; message: string; errors: WorkersCompFieldErrors } {
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

export function WorkersCompForm() {
  const [form, setForm] = useState<WorkersCompIntake>(emptyWorkersCompIntake);
  const [errors, setErrors] = useState<WorkersCompFieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status.kind !== "success") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    successRef.current?.focus();
  }, [status]);

  function update<K extends keyof WorkersCompIntake>(key: K, value: WorkersCompIntake[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => clearErrorKeys(current, [key]));
  }

  function focusFirstError(nextErrors: WorkersCompFieldErrors) {
    const first = focusOrder.find((key) => nextErrors[key]);
    if (!first || !formRef.current) return;
    const node = formRef.current.querySelector<HTMLElement>(`[name="${first}"]`);
    node?.focus();
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateWorkersCompIntake(form);
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
          We’ll call you about workers’ compensation.
        </h2>
        <p className="mt-4 max-w-lg text-muted">
          Thanks — the workers’ comp quote request is saved with a reference ID.
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
            setForm(emptyWorkersCompIntake());
            setErrors({});
            setStatus({ kind: "idle" });
          }}
        >
          Submit another business
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-busy={status.kind === "submitting"}
      className="rounded-sm border border-line bg-paper px-5 pt-5 pb-8 shadow-[0_24px_50px_-36px_rgba(26,36,51,0.28)] sm:px-8 sm:pt-8 sm:pb-10"
    >
      <p className="sr-only" aria-live="polite">
        {status.kind === "submitting" ? "Sending your workers’ comp quote request" : ""}
      </p>
      <p className="text-sm text-muted">
        Business name, your name, business type, and employee counts are required.
        Add a phone number or an email — one is enough. We’ll use this only to
        call you back.
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
        <Section title="The business">
          <TextField
            id="businessName"
            label="Business name"
            autoComplete="organization"
            maxLength={160}
            className="sm:col-span-2"
            value={form.businessName}
            error={errors.businessName}
            onChange={(value) => update("businessName", value)}
          />
          <SelectField
            id="businessType"
            label="Business type"
            className="sm:col-span-2"
            value={form.businessType}
            error={errors.businessType}
            onChange={(value) => {
              update("businessType", value as WorkersCompIntake["businessType"]);
              if (value !== "other") {
                setErrors((current) => clearErrorKeys(current, ["businessTypeOther"]));
              }
            }}
          >
            <option value="" disabled>
              Select a business type
            </option>
            {businessTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
          {form.businessType === "other" ? (
            <TextField
              id="businessTypeOther"
              label="Describe the business"
              maxLength={80}
              className="sm:col-span-2"
              value={form.businessTypeOther}
              error={errors.businessTypeOther}
              onChange={(value) => update("businessTypeOther", value)}
            />
          ) : null}
          <TextAreaField
            id="operations"
            label="Description of operations"
            optional
            rows={3}
            maxLength={600}
            hint="What the business does day to day."
            className="sm:col-span-2"
            value={form.operations}
            error={errors.operations}
            onChange={(value) => update("operations", value)}
          />
          <TextField
            id="yearsInBusiness"
            label="Years in business"
            optional
            inputMode="numeric"
            maxLength={3}
            value={form.yearsInBusiness}
            error={errors.yearsInBusiness}
            onChange={(value) => update("yearsInBusiness", value)}
          />
          <TextField
            id="fein"
            label="FEIN"
            optional
            inputMode="numeric"
            autoComplete="off"
            maxLength={11}
            placeholder="12-3456789"
            hint="Federal employer identification number, if you have it handy."
            value={form.fein}
            error={errors.fein}
            onChange={(value) => update("fein", value)}
          />
        </Section>

        <Section
          title="Who should we call?"
          hint="Phone or email is required. You don’t need both."
        >
          <TextField
            id="contactName"
            label="Contact name"
            autoComplete="name"
            maxLength={100}
            className="sm:col-span-2"
            value={form.contactName}
            error={errors.contactName}
            onChange={(value) => update("contactName", value)}
          />
          <TextField
            id="contactPhone"
            label="Phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            optional
            quietOptional
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
            optional
            quietOptional
            value={form.contactEmail}
            error={errors.contactEmail}
            onChange={(value) => update("contactEmail", value)}
          />
        </Section>

        <Section title="Business address" hint="Helpful, and not required to send this request.">
          <TextField
            id="street"
            label="Street"
            optional
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
              optional
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
              optional
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

        <Section
          title="People and payroll"
          hint="Count the people on your payroll. Use 0 if you have none in that group."
        >
          <TextField
            id="fullTimeEmployees"
            label="Full-time employees"
            inputMode="numeric"
            maxLength={6}
            placeholder="0"
            value={form.fullTimeEmployees}
            error={errors.fullTimeEmployees}
            onChange={(value) => update("fullTimeEmployees", value)}
          />
          <TextField
            id="partTimeEmployees"
            label="Part-time employees"
            inputMode="numeric"
            maxLength={6}
            placeholder="0"
            value={form.partTimeEmployees}
            error={errors.partTimeEmployees}
            onChange={(value) => update("partTimeEmployees", value)}
          />
          <TextField
            id="annualPayroll"
            label="Estimated annual payroll"
            optional
            inputMode="decimal"
            maxLength={20}
            placeholder="250000"
            hint="A total is enough. Class-by-class payroll is below if you know it."
            value={form.annualPayroll}
            error={errors.annualPayroll}
            onChange={(value) => update("annualPayroll", value)}
          />
          <TextAreaField
            id="payrollByClass"
            label="Payroll by class"
            optional
            rows={3}
            maxLength={600}
            placeholder="Class code and payroll, one per line, if you know them."
            className="sm:col-span-2"
            value={form.payrollByClass}
            error={errors.payrollByClass}
            onChange={(value) => update("payrollByClass", value)}
          />
        </Section>

        <Section title="Current coverage">
          <ChoiceGroup
            name="currentlyCovered"
            legend="Do you currently carry workers’ comp?"
            optional
            value={form.currentlyCovered}
            error={errors.currentlyCovered}
            options={yesNoOptions}
            onChange={(value) => {
              update("currentlyCovered", value as WorkersCompIntake["currentlyCovered"]);
              if (value !== "yes") {
                setErrors((current) =>
                  clearErrorKeys(current, ["currentCarrier", "expirationDate"]),
                );
              }
            }}
          />
          {form.currentlyCovered === "yes" ? (
            <>
              <TextField
                id="currentCarrier"
                label="Current carrier"
                optional
                maxLength={120}
                value={form.currentCarrier}
                error={errors.currentCarrier}
                onChange={(value) => update("currentCarrier", value)}
              />
              <TextField
                id="expirationDate"
                label="Expiration date"
                optional
                type="date"
                value={form.expirationDate}
                error={errors.expirationDate}
                onChange={(value) => update("expirationDate", value)}
              />
            </>
          ) : null}
        </Section>

        <Section title="Claims">
          <ChoiceGroup
            name="claims"
            legend="Any workers’ comp claims in the last 3 years?"
            optional
            value={form.claims}
            error={errors.claims}
            options={claimsOptions}
            onChange={(value) => {
              update("claims", value as WorkersCompIntake["claims"]);
              if (value !== "yes") {
                setErrors((current) => clearErrorKeys(current, ["claimsNotes"]));
              }
            }}
          />
          {form.claims === "yes" ? (
            <TextAreaField
              id="claimsNotes"
              label="What happened?"
              optional
              rows={3}
              maxLength={600}
              className="sm:col-span-2"
              value={form.claimsNotes}
              error={errors.claimsNotes}
              onChange={(value) => update("claimsNotes", value)}
            />
          ) : null}
        </Section>

        <Section title="Subcontractors">
          <ChoiceGroup
            name="usesSubcontractors"
            legend="Do you use subcontractors?"
            optional
            value={form.usesSubcontractors}
            error={errors.usesSubcontractors}
            options={yesNoOptions}
            onChange={(value) => {
              update("usesSubcontractors", value as WorkersCompIntake["usesSubcontractors"]);
              if (value !== "yes") {
                setErrors((current) => clearErrorKeys(current, ["subsHaveCoverage"]));
              }
            }}
          />
          {form.usesSubcontractors === "yes" ? (
            <ChoiceGroup
              name="subsHaveCoverage"
              legend="Do those subcontractors carry their own workers’ comp?"
              optional
              value={form.subsHaveCoverage}
              error={errors.subsHaveCoverage}
              options={subsCoverageOptions}
              onChange={(value) =>
                update("subsHaveCoverage", value as WorkersCompIntake["subsHaveCoverage"])
              }
            />
          ) : null}
        </Section>

        <Section title="Timing and notes">
          <TextField
            id="effectiveDate"
            label="Desired effective date"
            optional
            type="date"
            hint="When you want coverage to start, if you know."
            value={form.effectiveDate}
            error={errors.effectiveDate}
            onChange={(value) => update("effectiveDate", value)}
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
        you want to talk through the payroll now. We’ll only use these details to call
        you back.
      </p>

      <button
        type="submit"
        disabled={status.kind === "submitting"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-teal px-6 py-3.5 text-sm font-semibold text-ink hover:bg-teal-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status.kind === "submitting" ? "Sending…" : "Submit workers’ comp quote request"}
      </button>
    </form>
  );
}
