import { brand } from "@/lib/brand";

export function RhinoMark({ className = "size-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="5" fill="currentColor" />
      <path
        fill="#c4a35a"
        d="M8 26.4c.5-5.6 4.4-10.8 11.4-13 .9-.3 2 .5 1.7 1.5l-.9 2.2c2.6.2 4.7 1.5 5.9 3.5.5.8-.2 1.8-1.2 1.8h-2l-.8 2.2c2 .5 3.4 1.8 3.9 3.4.4 1.2-.6 2.2-1.8 2.2H12.6C9.8 30.2 7.8 28.2 8 26.4z"
      />
      <path
        fill="currentColor"
        d="M17.6 20.4c.7 0 1.3.6 1.3 1.4s-.6 1.4-1.3 1.4-1.3-.6-1.3-1.4.6-1.4 1.3-1.4z"
      />
    </svg>
  );
}

export function Logo({
  compact = false,
  inverted = false,
}: {
  compact?: boolean;
  inverted?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${inverted ? "text-stone" : "text-navy"}`}
    >
      <RhinoMark className="size-10 shrink-0" />
      <span className="leading-tight">
        <span className="block text-[0.95rem] font-semibold tracking-tight">
          {brand.shortName}
        </span>
        {!compact ? (
          <span
            className={`block text-[0.68rem] font-medium tracking-[0.14em] uppercase ${
              inverted ? "text-gold" : "text-muted"
            }`}
          >
            Insurance Advisors
          </span>
        ) : null}
      </span>
    </span>
  );
}
