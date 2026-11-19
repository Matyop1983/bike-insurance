# Rhino Insurance Advisors

Custom [Next.js](https://nextjs.org) site for **Rhino Insurance Advisors** (Edinburg, TX), intended to replace the current Squarespace site at [rhinoinsuranceadvisors.com](https://www.rhinoinsuranceadvisors.com/).

Commercial, life insurance, group benefits, and builders risk are in the header. On the home page, builders risk is also a services card beside group benefits, a hero quote button, and a footer link. Quotes start with a phone call to the Edinburg office, `(956) 609-6222`, Monday–Friday 8AM–5PM. The `/quote` page is an optional callback request — not a price and not a binder. Brand, nav, and contact live in `src/lib/brand.ts`. Coverage copy lives in `src/lib/content/`.

Former bicycle routes (`/bicycle-insurance`, `/coverage`, `/how-it-works`, `/faq`) redirect to `/contact`. `/personal-insurance` redirects to `/`.

## Pages

- `/` — agency home (commercial, life insurance, group benefits, and builders risk in the header, hero, and services grid; testimonials, visit strip). Primary CTA is the phone number. The hero links to the builder’s risk intake.
- `/about` — mission and service-with-integrity
- `/business-insurance` — commercial: GL, E&O, workers’ comp, umbrella, commercial auto, builders risk
- `/life-insurance` — families, mortgage protection, business owners and key person; term and permanent in general terms
- `/group-benefits` — employer benefits: group health, dental, vision, group life, disability
- `/builders-risk` — course-of-construction coverage (contractors, owners, renovations). Linked from the header, home hero, services grid, and footer. The page links to the project intake.
- `/builders-risk/quote` — builder’s risk questionnaire (address, construction, values, dates, named insured, contractor). It is still a callback request, not a price or a binder.
- `/workers-comp` — workers’ compensation for Texas employers. Linked from the business insurance page and the footer, not the top nav. The page links to the quote form.
- `/workers-comp/quote` — workers’ comp quote request (business, employees, payroll, current coverage). Same callback rules: not a price and not a binder.
- `/quote` — optional callback request (`?type=commercial`, optional `&coverage=` such as `builders-risk`, `life`, or `group-benefits`)
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

## Callback form (no payments, no pricing)

Calling the office is the way to get a quote. The form is optional and labeled as a callback request. It validates in the browser. The request is commercial:

- **Commercial** — business name + coverage checkboxes (general liability, professional liability, workers’ comp, umbrella, commercial auto, builders risk, life insurance, and group benefits)

On submit it `POST`s JSON to `/api/quote`. The API re-validates, then best-effort appends one JSON line to:

```text
data/quote-submissions.jsonl
```

That file is gitignored. On a read-only filesystem (Vercel serverless functions can only write under `/tmp`), the file write is skipped and the submission is written to the server log instead. A failed log never blocks the request. Success shows a reference ID such as `RH-A1B2C3D4`. This is not a binder and not a price.

The same request is then pushed to NowCerts / Momentum AMS. NowCerts and the local file are both best-effort: the visitor still gets the RH- ID for a valid submission. An internal email to `Matthew@Rhinoia.com` is sent when Resend env vars are set. If `RESEND_API_KEY` or `QUOTE_NOTIFY_FROM` is missing, email is skipped and the API reports `email: "pending-env"`.

## NowCerts / Momentum AMS

Quote applications POST to:

```text
https://api.nowcerts.com/api/PushJsonQuoteApplications
```

Config (see `.env.example`):

- `NOWCERTS_AGENCY_ID` — defaults to `f3f521d1-ac53-4e82-9865-b9642378d129` for this agency
- `Form Name` (stable mapping key) — `Rhino Website Quote Request`
- Optional `NOWCERTS_ENDPOINT` / `NOWCERTS_API_KEY` if NowCerts ever requires them

The webhook body is `{ AgencyID, FormName, json }` where `json` is a string of those labeled fields (a flat JSON object is rejected by NowCerts with HTTP 200 `{"status":1,"message":"Error!"}`). Inner keys are human-readable for the mapping UI: `AgencyID`, `Form Name`, `Applicant Name`, `Email`, `Phone Number`, `Coverage Type`, `Business Name`, `City or ZIP`, `Coverage Interests` (includes Builders risk when selected), `Message`, `Reference ID`, `Submitted At`, and `Source`. Success is an AMS message containing `successfully inserted` (not HTTP 200 alone).

The builder’s risk intake (`POST /api/quote` with `form: "builders-risk"`) uses this same route, form name, and field list. The API validates the questionnaire, then puts the answers in `Message` (it starts with `Builder’s risk intake`) and sets `Coverage Interests` to Builders risk. `Applicant Name`, `Email`, and `Phone Number` are the person to call. `Business Name` prefers the named insured’s company. `City or ZIP` is the project city, state, and ZIP. `Source` is `Rhino website builder’s risk intake`. No new file is written. The short callback note stays capped at 1,000 characters; this intake’s Message may be longer, up to 8,000.

The workers’ comp quote (`POST /api/quote` with `form: "workers-comp"`) uses that same route, form name, and field list. `Message` starts with `Workers’ Comp quote request`. `Coverage Interests` is Workers’ comp. `Source` is `Rhino website workers’ comp quote request`. `Applicant Name` is the contact. `Business Name` is the business. `City or ZIP` is the business city, state, and ZIP, or `Not provided`. Phone or email is enough; a missing email is sent as an empty Email field when a phone number is present. The Resend subject line is `Workers’ Comp quote request` plus the reference ID, to `Matthew@Rhinoia.com` when `RESEND_API_KEY` and `QUOTE_NOTIFY_FROM` are set. The message cap is 8,000 characters.

After the first real or test submit:

1. In NowCerts / Momentum AMS go to **Prospects/Leads → Quote Applications**.
2. Open the submission and click **Edit**.
3. **Map** each left-column form label to an AMS field.
4. Click **Save and Merge**. Future submits with the same Form Name reuse that mapping.

If NowCerts is down or returns `Error!`, the visitor still sees the RH- ID. The JSON response flags `nowcerts: "failed"` for ops. Check server logs (`[nowcerts]`) and, when the filesystem is writable, the follow-up `delivery` JSONL line.

### Email notification

Set `RESEND_API_KEY` and `QUOTE_NOTIFY_FROM` (verified Resend sender). `QUOTE_NOTIFY_TO` defaults to `Matthew@Rhinoia.com`. If those env vars are missing, NowCerts still runs and the log notes that email is pending. A workers’ comp submission uses the subject `Workers’ Comp quote request` so the alert is distinct from the general callback and the builder’s risk intake.

## Deploy and DNS (later)

This repo does not change DNS. When you are ready to replace Squarespace:

1. Deploy this app (Vercel, Netlify, or similar).
2. Point `rhinoinsuranceadvisors.com` (and `www`) at the new host.
3. Keep Squarespace until the cutover is tested.

## Out of scope for v1

Auth, payments, live rating/underwriting, claims portal, CMS, and Squarespace export tooling.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4.
