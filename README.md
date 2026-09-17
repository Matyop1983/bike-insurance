# PedalGuard

Marketing site for a bicycle insurance product (working name: **PedalGuard**). Trustworthy, outdoor-lifestyle look with insurance-style sample copy — not a live carrier, not a pricing engine, and not a claims portal.

Rename the product by editing `src/lib/brand.ts` (name, contact, nav) and `src/lib/content.ts` (coverage, FAQ, how-it-works copy).

## Pages

- `/` — hero, coverage snapshot, 3-step overview, FAQ preview
- `/coverage` — theft, damage, liability, accessories (placeholder policy language, clearly marked sample)
- `/how-it-works` — the same three steps, plus what happens after submit
- `/faq` — accordion answers
- `/quote` — quote request form

Contact details live in the footer.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build
npm run start
npm run lint
```

## Quote form (no payments)

The form validates in the browser (required name, email, bike type, value range, city/ZIP, at least one coverage checkbox; phone and message are optional). On submit it `POST`s JSON to `/api/quote`.

The API re-validates, logs the request, and **appends one JSON line** to:

```text
data/quote-submissions.jsonl
```

That file is gitignored. You should see a success state with a reference ID such as `PG-A1B2C3D4`.

This is not a quote: there is no rating, no bind, and no checkout.

### Wiring email later

Replace or extend `src/app/api/quote/route.ts` after a successful write:

1. Add an API key via environment variable (for example `RESEND_API_KEY` or `POSTMARK_SERVER_TOKEN`). Do not commit secrets.
2. Send a confirmation to the requester and an internal copy to `brand.email` in `src/lib/brand.ts`.
3. Keep the JSONL (or swap it for a database) as a backup of the payload.
4. Only then add a licensed-agency workflow: underwriting questions, documents, and a real premium.

Sketch with [Resend](https://resend.com/docs/send-with-nodejs):

```ts
await resend.emails.send({
  from: "PedalGuard <quotes@your-domain>",
  to: normalized.email,
  subject: `We received your quote request (${id})`,
  text: "Thanks — a specialist will follow up. This is not a binder.",
});
```

## Next steps (intentionally out of v1)

- Licensed carrier / MGA appointment and real underwriting
- Rating engine and bindable quotes
- Payments and policy documents
- Auth, account area, and claims
- CMS for coverage copy

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4.
