# Rhino Insurance Advisors

Custom [Next.js](https://nextjs.org) site for **Rhino Insurance Advisors** (Edinburg, TX), intended to replace the current Squarespace site at [rhinoinsuranceadvisors.com](https://www.rhinoinsuranceadvisors.com/).

Bicycle insurance is a **featured personal product** on this site — not a separate brand. Brand, nav, and contact live in `src/lib/brand.ts`. Coverage copy lives in `src/lib/content/`.

## Pages

- `/` — agency home (commercial + individual, bicycle featured, testimonials, visit strip)
- `/about` — mission and service-with-integrity
- `/business-insurance` — GL, E&O, workers’ comp, umbrella, commercial auto, builders risk, property
- `/bicycle-insurance` — theft, damage, liability, accessories + how it works + FAQ
- `/quote` — unified quote request (`?type=commercial|personal|bicycle`)
- `/contact` — phone, email, address, hours

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run start
npm run lint
```

## Quote form (no payments)

The form validates in the browser. Quote type is required:

- **Commercial** — business name + commercial coverage checkboxes
- **Personal** — personal-line coverage interests
- **Bicycle** — bike type, value range, and theft/damage/liability/accessories

On submit it `POST`s JSON to `/api/quote`. The API re-validates, logs the request, and appends one JSON line to:

```text
data/quote-submissions.jsonl
```

That file is gitignored. Success shows a reference ID such as `RH-A1B2C3D4`. This is not a binder and not a price.

### Wiring email later

Extend `src/app/api/quote/route.ts` after a successful write:

1. Add an API key via environment variable (`RESEND_API_KEY`, `POSTMARK_SERVER_TOKEN`, etc.). Do not commit secrets.
2. Email the requester and an internal copy to `quoting@rhinoia.com`.
3. Keep the JSONL (or a database) as a backup.

## Deploy and DNS (later)

This repo does not change DNS. When you are ready to replace Squarespace:

1. Deploy this app (Vercel, Netlify, or similar).
2. Point `rhinoinsuranceadvisors.com` (and `www`) at the new host.
3. Keep Squarespace until the cutover is tested.

## Out of scope for v1

Auth, payments, live rating/underwriting, claims portal, CMS, and Squarespace export tooling.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4.
