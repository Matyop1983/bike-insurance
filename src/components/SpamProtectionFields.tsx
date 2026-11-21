"use client";

import { useEffect, useId, useRef } from "react";
import {
  HONEYPOT_FIELD,
  RENDERED_AT_FIELD,
  TURNSTILE_FIELD,
} from "@/lib/spam-fields";

const TURNSTILE_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export const TURNSTILE_PENDING_MESSAGE =
  "Verification is still loading. Please try again in a moment.";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      appearance?: "always" | "execute" | "interaction-only";
      theme?: "auto" | "light" | "dark";
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileScript: Promise<void> | null = null;

function siteKey(): string {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
}

function readInput(form: HTMLFormElement, name: string): string {
  const element = form.elements.namedItem(name);
  if (element instanceof HTMLInputElement) return element.value;
  if (element instanceof RadioNodeList) {
    const first = element[0];
    return first instanceof HTMLInputElement ? first.value : "";
  }
  return "";
}

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (turnstileScript) return turnstileScript;
  turnstileScript = new Promise((resolve, reject) => {
    const finish = () => {
      if (window.turnstile) resolve();
      else reject(new Error("Turnstile did not load"));
    };
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-turnstile="explicit"]',
    );
    if (existing) {
      existing.addEventListener("load", finish);
      existing.addEventListener("error", () => {
        turnstileScript = null;
        reject(new Error("Turnstile failed to load"));
      });
      return;
    }
    const script = document.createElement("script");
    script.src = TURNSTILE_SRC;
    script.async = true;
    script.defer = true;
    script.dataset.turnstile = "explicit";
    script.addEventListener("load", finish);
    script.addEventListener("error", () => {
      turnstileScript = null;
      reject(new Error("Turnstile failed to load"));
    });
    document.head.appendChild(script);
  });
  return turnstileScript;
}

export function turnstilePending(form: HTMLFormElement): boolean {
  if (!siteKey()) return false;
  return readInput(form, TURNSTILE_FIELD).trim() === "";
}

export function withSpamFields<T extends object>(form: HTMLFormElement, payload: T) {
  const extra: Record<string, string | number> = {
    [HONEYPOT_FIELD]: readInput(form, HONEYPOT_FIELD),
  };
  const renderedAt = Number(readInput(form, RENDERED_AT_FIELD));
  if (Number.isFinite(renderedAt) && renderedAt > 0) {
    extra[RENDERED_AT_FIELD] = renderedAt;
  }
  if (siteKey()) {
    extra[TURNSTILE_FIELD] = readInput(form, TURNSTILE_FIELD);
  }
  return { ...payload, ...extra };
}

/** Honeypot plus the time the form rendered. Takes no visual space. */
export function SpamTraps() {
  const honeypotId = useId();
  const renderedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renderedRef.current && !renderedRef.current.value) {
      renderedRef.current.value = String(Date.now());
    }
  }, []);

  return (
    <div aria-hidden="true" className="offscreen-field">
      <label htmlFor={honeypotId}>Company website</label>
      <input
        id={honeypotId}
        className="offscreen-field"
        type="text"
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        defaultValue=""
        data-1p-ignore="true"
        data-lpignore="true"
        data-bwignore="true"
      />
      <input
        ref={renderedRef}
        type="hidden"
        name={RENDERED_AT_FIELD}
        defaultValue=""
        readOnly
      />
    </div>
  );
}

/**
 * Managed Turnstile that stays invisible unless Cloudflare asks for a
 * checkbox (`appearance: interaction-only`). An Invisible site key stays
 * hidden as well. Rendered only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set.
 */
export function TurnstileWidget() {
  const key = siteKey();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!key || !containerRef.current) return;
    let widgetId: string | null = null;
    let cancelled = false;

    loadTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: key,
          appearance: "interaction-only",
          theme: "light",
          "expired-callback": () => {
            if (widgetId) window.turnstile?.reset(widgetId);
          },
          "error-callback": () => {
            if (widgetId) window.turnstile?.reset(widgetId);
          },
        });
      })
      .catch(() => {
        // Token stays empty. Submit asks the visitor to try again.
      });

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [key]);

  if (!key) return null;
  return <div ref={containerRef} />;
}
