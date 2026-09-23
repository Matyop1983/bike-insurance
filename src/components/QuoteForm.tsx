"use client";

import { useRef, useState } from "react";
import { brand } from "@/lib/brand";
import {
  commercialCoverages,
  emptyQuote,
  personalCoverages,
  quoteTypes,
  type QuoteFieldErrors,
  type QuotePayload,
  type QuoteType,
  validateQuote,
} from "@/lib/quote";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "success"; id: string };

const fieldClass =
  "mt-1.5 w-full rounded-sm border border-line bg-paper px-4 py-3 text-ink placeholder:text-muted/60";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-teal-dark">
      {message}
    </p>
  );
}

function coverageList(type: QuoteType | "") {
  if (type === "commercial") return commercialCoverages;
  if (type === "personal") return personalCoverages;
  return [];
}

export function QuoteForm({
  initialType = "",
  initialCoverage = [],
}: {
  initialType?: QuoteType | "";
  initialCoverage?: string[];
}) {
  const [form, setForm] = useState<QuotePayload>(() => {
    const next = emptyQuote(initialType);
    if (initialCoverage.length) {
      next.coverage = initialCoverage;
    }
    return next;
  });
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  function update<K extends keyof QuotePayload>(key: K, value: QuotePayload[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function setQuoteType(next: QuoteType) {
    setForm((current) => ({
      ...current,
      quoteType: next,
      coverage: [],
      businessName: next === "commercial" ? current.businessName : "",
    }));
    setErrors({});
  }

  function toggleCoverage(value: string) {
    setForm((current) => {
      const has = current.coverage.includes(value);
      return {
        ...current,
        coverage: has
          ? current.coverage.filter((item) => item !== value)
          : [...current.coverage, value],
      };
    });
  }

  function focusFirstError(nextErrors: QuoteFieldErrors) {
    const order: (keyof QuotePayload)[] = [
      "quoteType",
      "name",
      "email",
      "phone",
      "location",
      "businessName",
      "coverage",
      "message",
    ];
    const first = order.find((key) => nextErrors[key]);
    if (!first || !formRef.current) return;
    const node = formRef.current.querySelector<HTMLElement>(`[name="${first}"]`);
    node?.focus();
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateQuote(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus({ kind: "idle" });
      focusFirstError(nextErrors);
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !data.id) {
        setStatus({
          kind: "error",
          message: data.error ?? "We couldn’t save that request. Try again.",
        });
        return;
      }
      setStatus({ kind: "success", id: data.id });
    } catch {
      setStatus({
        kind: "error",
        message: "Network error — check your connection and try again.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div
        className="rounded-sm border border-line bg-paper px-6 py-10 sm:px-10"
        role="status"
      >
        <p className="text-xs font-semibold tracking-[0.2em] text-teal-dark uppercase">
          Request received
        </p>
        <h2 className="display mt-3 text-3xl text-ink sm:text-4xl">
          We’ll call you back.
        </h2>
        <p className="mt-4 max-w-lg text-muted">
          Thanks — your callback request is saved with a reference ID. This is
          not a price, a binder, or coverage, and no payment was taken. You can
          also call {brand.phone} now, {brand.hours}.
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
            setForm(emptyQuote(form.quoteType));
            setErrors({});
            setStatus({ kind: "idle" });
          }}
        >
          Submit another callback request
        </button>
      </div>
    );
  }

  const options = coverageList(form.quoteType);

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="rounded-sm border border-line bg-paper px-5 pt-5 pb-8 shadow-[0_24px_50px_-36px_rgba(26,36,51,0.28)] sm:px-8 sm:pt-8 sm:pb-10"
    >
      <p className="sr-only" aria-live="polite">
        {status.kind === "submitting" ? "Sending your request" : ""}
      </p>

      {status.kind === "error" ? (
        <p
          role="alert"
          className="mb-6 rounded-sm border border-teal/40 bg-teal/10 px-4 py-3 text-sm text-ink"
        >
          {status.message}
        </p>
      ) : null}

      <fieldset>
        <legend className="text-sm font-medium text-ink">What should we call you about?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {quoteTypes.map((option) => {
            const selected = form.quoteType === option.value;
            return (
              <label
                key={option.value}
                className={`cursor-pointer rounded-sm border px-4 py-3 ${
                  selected
                    ? "border-teal bg-teal text-ink"
                    : "border-line bg-stone text-ink"
                }`}
              >
                <input
                  type="radio"
                  name="quoteType"
                  value={option.value}
                  checked={selected}
                  className="sr-only"
                  onChange={() => setQuoteType(option.value)}
                />
                <span className="block text-sm font-semibold">{option.label}</span>
                <span
                  className={`mt-1 block text-xs ${selected ? "text-ink/70" : "text-muted"}`}
                >
                  {option.hint}
                </span>
              </label>
            );
          })}
        </div>
        <FieldError id="quoteType-error" message={errors.quoteType} />
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Full name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            className={fieldClass}
            value={form.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={(event) => update("name", event.target.value)}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClass}
            value={form.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={(event) => update("email", event.target.value)}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-ink">
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            value={form.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            onChange={(event) => update("phone", event.target.value)}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
        <div>
          <label htmlFor="location" className="text-sm font-medium text-ink">
            City or ZIP
          </label>
          <input
            id="location"
            name="location"
            autoComplete="postal-code"
            required
            className={fieldClass}
            placeholder="Edinburg, TX or 78539"
            value={form.location}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? "location-error" : undefined}
            onChange={(event) => update("location", event.target.value)}
          />
          <FieldError id="location-error" message={errors.location} />
        </div>
      </div>

      {form.quoteType === "commercial" ? (
        <div className="mt-5">
          <label htmlFor="businessName" className="text-sm font-medium text-ink">
            Business name
          </label>
          <input
            id="businessName"
            name="businessName"
            autoComplete="organization"
            className={fieldClass}
            value={form.businessName}
            aria-invalid={Boolean(errors.businessName)}
            aria-describedby={errors.businessName ? "businessName-error" : undefined}
            onChange={(event) => update("businessName", event.target.value)}
          />
          <FieldError id="businessName-error" message={errors.businessName} />
        </div>
      ) : null}

      {form.quoteType ? (
        <fieldset
          className="mt-6"
          aria-invalid={Boolean(errors.coverage)}
          aria-describedby={
            errors.coverage ? "coverage-error coverage-hint" : "coverage-hint"
          }
        >
          <legend className="text-sm font-medium text-ink">
            Coverage interests
          </legend>
          <p id="coverage-hint" className="mt-1 text-sm text-muted">
            Pick everything you want us to look at. You can change this later.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {options.map((option) => {
              const checked = form.coverage.includes(option.value);
              return (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-sm font-medium ${
                    checked
                      ? "border-teal bg-teal/10 text-ink"
                      : "border-line bg-stone text-ink"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="coverage"
                    value={option.value}
                    checked={checked}
                    className="size-4 accent-teal"
                    onChange={() => toggleCoverage(option.value)}
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
          <FieldError id="coverage-error" message={errors.coverage} />
        </fieldset>
      ) : null}

      <div className="mt-6">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Anything else? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${fieldClass} resize-y`}
          placeholder="Payroll, vehicle count, project address…"
          value={form.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(event) => update("message", event.target.value)}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      <p className="mt-6 text-sm text-muted">
        This form does not show a price and does not bind coverage. Call{" "}
        {brand.phone} if you want to talk through a quote now. We’ll only use
        these details to call you back.
      </p>

      <button
        type="submit"
        disabled={status.kind === "submitting"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-sm border border-line bg-paper px-6 py-3.5 text-sm font-semibold text-ink hover:bg-stone disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status.kind === "submitting" ? "Sending…" : "Request a callback"}
      </button>
    </form>
  );
}
