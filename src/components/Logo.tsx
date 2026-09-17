import { brand } from "@/lib/brand";

export function Logo({
  compact = false,
  inverted = false,
}: {
  compact?: boolean;
  inverted?: boolean;
}) {
  const shield = inverted ? "#123428" : "#f4efe6";
  const line = inverted ? "#f4efe6" : "#123428";

  return (
    <span
      className={`inline-flex items-center gap-2.5 ${inverted ? "text-cream" : "text-forest"}`}
    >
      <svg
        viewBox="0 0 40 40"
        className="size-9 shrink-0"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="11" fill="currentColor" />
        <path
          fill={shield}
          d="M20 7.2 31 11.6v7.6c0 7.4-5.1 11.7-11 13.3-5.9-1.6-11-5.9-11-13.3v-7.6L20 7.2z"
        />
        <circle
          cx="15.4"
          cy="23.2"
          r="3.8"
          fill="none"
          stroke={line}
          strokeWidth="1.7"
        />
        <circle
          cx="25.4"
          cy="23.2"
          r="3.8"
          fill="none"
          stroke={line}
          strokeWidth="1.7"
        />
        <path
          d="M15.4 23.2h5.1l2.9-6.2h3.3M20.5 23.2 18.1 17l2.7-1.7M17.9 16.8h4.4"
          fill="none"
          stroke={line}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
      <span className="leading-tight">
        <span className="block font-semibold tracking-tight">{brand.name}</span>
        {!compact ? (
          <span
            className={`block text-[0.7rem] font-medium uppercase tracking-[0.16em] ${
              inverted ? "text-cream/55" : "text-muted"
            }`}
          >
            Bike insurance
          </span>
        ) : null}
      </span>
    </span>
  );
}
