"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/Logo";
import { brand, nav, quoteCta } from "@/lib/brand";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const panelId = useId();

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/95 backdrop-blur-md">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
        <Link href="/" aria-label={`${brand.name} home`} className="shrink-0 rounded-sm">
          <Logo priority />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => {
            const current =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`rounded-sm px-3 py-2 text-sm font-medium transition-colors ${
                  current
                    ? "text-ink"
                    : "text-ink/65 hover:bg-stone hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={quoteCta.href}
            className="ml-2 rounded-sm bg-teal px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-teal-dark"
          >
            {quoteCta.label}
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-sm border border-line bg-paper lg:hidden"
          aria-controls={panelId}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6 6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M5 7h14M5 12h14M5 17h10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div id={panelId} className="border-t border-line bg-paper lg:hidden">
          <nav aria-label="Mobile" className="wrap flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-4 py-3 text-lg font-medium text-ink hover:bg-stone"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={quoteCta.href}
              className="mt-2 rounded-sm bg-teal px-4 py-3 text-center text-base font-semibold text-ink hover:bg-teal-dark"
            >
              {quoteCta.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
