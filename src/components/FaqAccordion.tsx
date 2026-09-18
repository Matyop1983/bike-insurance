"use client";

import { useId, useState } from "react";

export function FaqAccordion({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-sm border border-line bg-paper">
      {items.map((item, index) => {
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        const isOpen = open === index;
        return (
          <div key={item.q} className="px-5 sm:px-7">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-4 py-5 text-left text-base font-semibold text-ink sm:text-lg"
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-sm border border-line text-sm transition-transform ${
                    isOpen ? "rotate-45 bg-stone" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 text-[0.95rem] leading-relaxed text-muted"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
