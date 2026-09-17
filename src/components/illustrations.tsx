export function BikeHeroArt() {
  return (
    <svg
      viewBox="0 0 640 520"
      className="h-auto w-full"
      role="img"
      aria-label="Illustration of a bicycle in front of a shield"
    >
      <rect width="640" height="520" rx="0" fill="none" />
      <ellipse cx="430" cy="248" rx="168" ry="176" fill="#1b4636" />
      <path
        d="M430 78c78 0 148 48 148 148 0 92-62 148-148 172-86-24-148-80-148-172 0-100 70-148 148-148z"
        fill="#f4efe6"
        opacity="0.08"
      />
      <path
        d="M430 98 534 140v72c0 70-48 110-104 126-56-16-104-56-104-126v-72L430 98z"
        fill="none"
        stroke="#e4d8c4"
        strokeWidth="3"
      />
      <g
        fill="none"
        stroke="#f4efe6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="188" cy="348" r="86" strokeWidth="8" />
        <circle cx="188" cy="348" r="12" strokeWidth="5" />
        <circle cx="452" cy="348" r="86" strokeWidth="8" />
        <circle cx="452" cy="348" r="12" strokeWidth="5" />
        <path
          d="M188 348h132l78-168h86"
          strokeWidth="8"
        />
        <path d="M320 348 250 180l72-42" strokeWidth="8" />
        <path d="M250 180h118" strokeWidth="8" />
        <path d="M322 138h54" strokeWidth="7" />
        <path d="M376 138v22" strokeWidth="7" />
        <circle cx="250" cy="180" r="16" strokeWidth="6" />
        <path d="M218 348c22-38 58-38 80 0" strokeWidth="5" opacity="0.7" />
        <path d="M414 348c22-38 58-38 80 0" strokeWidth="5" opacity="0.7" />
      </g>
      <circle cx="188" cy="348" r="4" fill="#c45c26" />
      <circle cx="452" cy="348" r="4" fill="#c45c26" />
    </svg>
  );
}

export function IconLock() {
  return (
    <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
      <rect
        x="7"
        y="14"
        width="18"
        height="13"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M11 14V11a5 5 0 0 1 10 0v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconCrash() {
  return (
    <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
      <path
        d="M7 22 16 6l9 16H7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M16 14v5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="16" cy="22.2" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function IconShield() {
  return (
    <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
      <path
        d="M16 5 26 9v7.5c0 7-4.6 11-10 12.5C10.6 27.5 6 23.5 6 16.5V9L16 5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconBag() {
  return (
    <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
      <rect
        x="6"
        y="12"
        width="20"
        height="14"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 12V10a4 4 0 0 1 8 0v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const icons = {
  theft: IconLock,
  damage: IconCrash,
  liability: IconShield,
  accessories: IconBag,
} as const;

export function CoverageIcon({ id }: { id: keyof typeof icons }) {
  const Icon = icons[id];
  return <Icon />;
}
