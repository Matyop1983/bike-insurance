import { brand } from "@/lib/brand";

export function RhinoMark({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="5" fill="currentColor" />
      <path
        fill="#c4a35a"
        d="M9 28.2c-.2-5.4 3.4-10.2 10.2-12.4L23.4 7.6c.4-.8 1.6-.5 1.6.4l-.6 6.6c2.5.5 4.6 2.2 5.7 4.4.6 1.1-.3 2.2-1.5 2.2h-2.1l-.7 2.6c1.7.5 2.8 1.7 3.2 3.2.4 1.3-.6 2.4-1.9 2.4H13.1c-2.4 0-4-1.4-4.1-3.2z"
      />
      <circle cx="18.2" cy="21.6" r="1.5" fill="currentColor" />
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
