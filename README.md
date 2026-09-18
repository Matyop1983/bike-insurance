# Rhino Insurance Advisors

Custom [Next.js](https://nextjs.org) site for **Rhino Insurance Advisors** (Edinburg, TX), intended to replace the current Squarespace site at [rhinoinsuranceadvisors.com](https://www.rhinoinsuranceadvisors.com/).

Bicycle insurance is a **featured personal product** on this site — not a separate brand. Builders risk is a **featured commercial product**. Brand, nav, and contact live in `src/lib/brand.ts`. Coverage copy lives in `src/lib/content/`.

## Pages

- `/` — agency home (commercial + individual, builders risk and bicycle featured, testimonials, visit strip)
- `/about` — mission and service-with-integrity
- `/business-insurance` — GL, E&O, workers’ comp, umbrella, commercial auto, builders risk, property
- `/builders-risk` — course-of-construction coverage (contractors, owners, renovations)
- `/bicycle-insurance` — theft, damage, liability, accessories + how it works + FAQ
- `/quote` — unified quote request (`?type=commercial|personal|bicycle`, optional `&coverage=builders-risk`)
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

On submit it `POST`s JSON to `/api/quote`. The API re-validates, appends one JSON line to:

```text
data/quote-submissions.jsonl
```

That file is gitignored. Success shows a reference ID such as `RH-A1B2C3D4`. This is not a binder and not a price.

The same request is then pushed to NowCerts / Momentum AMS (soft-fail: the visitor still gets the RH- ID if the local save succeeded). An internal email to `Matthew@Rhinoia.com` is sent when Resend env vars are set.

## NowCerts / Momentum AMS

Quote applications POST to:

```text
https://api.nowcerts.com/api/PushJsonQuoteApplications
```

Config (see `.env.example`):

- `NOWCERTS_AGENCY_ID` — defaults to `f3f521d1-ac53-4e82-9865-b9642378d129` for this agency
- `Form Name` (stable mapping key) — `Rhino Website Quote Request`
- Optional `NOWCERTS_ENDPOINT` / `NOWCERTS_API_KEY` if NowCerts ever requires them

Payload keys are human-readable for the mapping UI, including `AgencyID`, `Form Name`, `Applicant Name`, `Email`, `Phone Number`, `Coverage Type`, `Business Name`, `City or ZIP`, `Coverage Interests` (includes Builders risk when selected), `Bike Type`, `Bike Value Range`, `Message`, `Reference ID`, `Submitted At`, and `Source`.

After the first real or test submit:

1. In NowCerts / Momentum AMS go to **Prospects/Leads → Quote Applications**.
2. Open the submission and click **Edit**.
3. **Map** each left-column form label to an AMS field.
4. Click **Save and Merge**. Future submits with the same Form Name reuse that mapping.

If NowCerts is down, the JSONL line is still written and the visitor still sees the RH- ID. Check server logs (`[nowcerts]`) and the follow-up `delivery` JSONL line.

### Email notification

Set `RESEND_API_KEY` and `QUOTE_NOTIFY_FROM` (verified Resend sender). `QUOTE_NOTIFY_TO` defaults to `Matthew@Rhinoia.com`. If those env vars are missing, NowCerts still runs and the log notes that email is pending.

## Deploy and DNS (later)

This repo does not change DNS. When you are ready to replace Squarespace:

1. Deploy this app (Vercel, Netlify, or similar).
2. Point `rhinoinsuranceadvisors.com` (and `www`) at the new host.
3. Keep Squarespace until the cutover is tested.

## Out of scope for v1

Auth, payments, live rating/underwriting, claims portal, CMS, and Squarespace export tooling.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4.
