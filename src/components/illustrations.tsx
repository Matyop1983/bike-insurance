export function BuildersRiskArt() {
  return (
    <svg
      viewBox="0 0 640 520"
      className="h-auto w-full"
      role="img"
      aria-label="Illustration of a building frame under construction"
    >
      <rect width="640" height="520" fill="none" />
      <ellipse cx="400" cy="250" rx="175" ry="180" fill="#243044" />
      <g
        fill="none"
        stroke="#eef2f6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M120 400h400" strokeWidth="8" />
        <path d="M170 400V210l150-88 150 88v190" strokeWidth="8" />
        <path d="M170 210h300" strokeWidth="6" />
        <path d="M245 400V248h150v152" strokeWidth="6" />
        <path d="M245 310h150M320 248v152" strokeWidth="5" />
        <path d="M200 270h60M380 270h60M200 340h60M380 340h60" strokeWidth="5" />
      </g>
      <path
        d="M320 122 500 228v28"
        fill="none"
        stroke="#00d9c7"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="320" cy="122" r="6" fill="#00d9c7" />
    </svg>
  );
}

export function BikeHeroArt() {
  return (
    <svg
      viewBox="0 0 640 520"
      className="h-auto w-full"
      role="img"
      aria-label="Illustration of a bicycle in front of a shield"
    >
      <rect width="640" height="520" fill="none" />
      <ellipse cx="430" cy="248" rx="168" ry="176" fill="#243044" />
      <path
        d="M430 98 534 140v72c0 70-48 110-104 126-56-16-104-56-104-126v-72L430 98z"
        fill="none"
        stroke="#00d9c7"
        strokeWidth="3"
      />
      <g
        fill="none"
        stroke="#eef2f6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="188" cy="348" r="86" strokeWidth="8" />
        <circle cx="188" cy="348" r="12" strokeWidth="5" />
        <circle cx="452" cy="348" r="86" strokeWidth="8" />
        <circle cx="452" cy="348" r="12" strokeWidth="5" />
        <path d="M188 348h132l78-168h86" strokeWidth="8" />
        <path d="M320 348 250 180l72-42" strokeWidth="8" />
        <path d="M250 180h118" strokeWidth="8" />
        <path d="M322 138h54" strokeWidth="7" />
        <path d="M376 138v22" strokeWidth="7" />
        <circle cx="250" cy="180" r="16" strokeWidth="6" />
      </g>
      <circle cx="188" cy="348" r="4" fill="#00d9c7" />
      <circle cx="452" cy="348" r="4" fill="#00d9c7" />
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

const bikeIcons = {
  theft: IconLock,
  damage: IconCrash,
  liability: IconShield,
  accessories: IconBag,
} as const;

export function CoverageIcon({ id }: { id: keyof typeof bikeIcons }) {
  const Icon = bikeIcons[id];
  return <Icon />;
}
