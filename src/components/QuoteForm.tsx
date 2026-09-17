"use client";

import { useRef, useState } from "react";
import {
  bikeTypes,
  bikeValues,
  coverageInterests,
  emptyQuote,
  type QuoteFieldErrors,
  type QuotePayload,
  validateQuote,
} from "@/lib/quote";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "success"; id: string };

const fieldClass =
  "mt-1.5 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] placeholder:text-muted/60";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-copper-dark">
      {message}
    </p>
  );
}

export function QuoteForm() {
  const [form, setForm] = useState<QuotePayload>(emptyQuote);
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);

  function update<K extends keyof QuotePayload>(key: K, value: QuotePayload[K]) {
    setForm((current) => ({ ...current, [key]: value }));
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
      "name",
      "email",
      "phone",
      "bikeType",
      "bikeValue",
      "location",
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
        className="rounded-[2rem] border border-line bg-paper px-6 py-10 sm:px-10"
        role="status"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">
          Request received
        </p>
        <h2 className="display mt-3 text-3xl text-forest sm:text-4xl">
          You’re on the list.
        </h2>
        <p className="mt-4 max-w-lg text-muted">
          Thanks — we stored your quote request locally. In a live product this
          is where a licensed partner would email a written quote. Nothing is
          bound and no payment was taken.
        </p>
        <p className="mt-5 rounded-2xl bg-cream px-4 py-3 font-mono text-sm text-forest">
          Reference {status.id}
        </p>
        <button
          type="button"
          className="mt-8 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-cream hover:bg-moss"
          onClick={() => {
            setForm(emptyQuote());
            setErrors({});
            setStatus({ kind: "idle" });
          }}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="rounded-[2rem] border border-line bg-paper p-5 shadow-[0_20px_50px_-32px_rgba(18,52,40,0.45)] sm:p-8"
    >
      <p ref={liveRef} className="sr-only" aria-live="polite">
        {status.kind === "submitting" ? "Sending your request" : ""}
      </p>

      {status.kind === "error" ? (
        <p
          role="alert"
          className="mb-6 rounded-2xl border border-copper/30 bg-copper/8 px-4 py-3 text-sm text-copper-dark"
        >
          {status.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="text-sm font-medium text-forest">
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
          <label htmlFor="email" className="text-sm font-medium text-forest">
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
          <label htmlFor="phone" className="text-sm font-medium text-forest">
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
          <label htmlFor="location" className="text-sm font-medium text-forest">
            City or ZIP
          </label>
          <input
            id="location"
            name="location"
            autoComplete="postal-code"
            required
            className={fieldClass}
            placeholder="Portland, OR or 97214"
            value={form.location}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? "location-error" : undefined}
            onChange={(event) => update("location", event.target.value)}
          />
          <FieldError id="location-error" message={errors.location} />
        </div>

        <div>
          <label htmlFor="bikeType" className="text-sm font-medium text-forest">
            Bike type
          </label>
          <select
            id="bikeType"
            name="bikeType"
            required
            className={fieldClass}
            value={form.bikeType}
            aria-invalid={Boolean(errors.bikeType)}
            aria-describedby={errors.bikeType ? "bikeType-error" : undefined}
            onChange={(event) => update("bikeType", event.target.value)}
          >
            <option value="">Select type</option>
            {bikeTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id="bikeType-error" message={errors.bikeType} />
        </div>

        <div>
          <label htmlFor="bikeValue" className="text-sm font-medium text-forest">
            Bike value
          </label>
          <select
            id="bikeValue"
            name="bikeValue"
            required
            className={fieldClass}
            value={form.bikeValue}
            aria-invalid={Boolean(errors.bikeValue)}
            aria-describedby={errors.bikeValue ? "bikeValue-error" : undefined}
            onChange={(event) => update("bikeValue", event.target.value)}
          >
            <option value="">Select range</option>
            {bikeValues.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id="bikeValue-error" message={errors.bikeValue} />
        </div>
      </div>

      <fieldset
        className="mt-6"
        aria-invalid={Boolean(errors.coverage)}
        aria-describedby={
          errors.coverage ? "coverage-error coverage-hint" : "coverage-hint"
        }
      >
        <legend className="text-sm font-medium text-forest">
          Coverage interests
        </legend>
        <p id="coverage-hint" className="mt-1 text-sm text-muted">
          Pick everything you want priced. You can change this later.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {coverageInterests.map((option) => {
            const checked = form.coverage.includes(option.value);
            return (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${
                  checked
                    ? "border-forest bg-forest/6 text-forest"
                    : "border-line bg-cream text-ink"
                }`}
              >
                <input
                  type="checkbox"
                  name="coverage"
                  value={option.value}
                  checked={checked}
                  className="size-4 accent-forest"
                  onChange={() => toggleCoverage(option.value)}
                />
                {option.label}
              </label>
            );
          })}
        </div>
        <FieldError id="coverage-error" message={errors.coverage} />
      </fieldset>

      <div className="mt-6">
        <label htmlFor="message" className="text-sm font-medium text-forest">
          Anything else? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${fieldClass} resize-y`}
          placeholder="Second bike, e-bike class, lock type, commuting vs weekend…"
          value={form.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(event) => update("message", event.target.value)}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      <p className="mt-6 text-sm text-muted">
        Submitting does not start coverage and is not a price. We’ll only use
        this information to follow up on the request.
      </p>

      <button
        type="submit"
        disabled={status.kind === "submitting"}
        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-copper px-6 py-3.5 text-sm font-semibold text-white hover:bg-copper-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status.kind === "submitting" ? "Sending…" : "Request a quote"}
      </button>
    </form>
  );
}
