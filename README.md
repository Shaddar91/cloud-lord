# cloud-lord.com

*Personal portfolio + IT consultancy site — Matomo-tracked with consent,
Blazar-powered contact form, deployed via Azure CloudFront.*

Tagline: cloud infrastructure, DevOps, and AI engineering services for
teams that need senior hands without a full-time hire.

## Stack

| Layer          | Choice                                |
|----------------|---------------------------------------|
| Build          | Vite 5                                |
| Framework      | React 18                              |
| UI             | MUI 5 (`@mui/material`, `@mui/icons-material`) |
| Routing        | react-router-dom 6                    |
| SEO            | react-helmet 6                        |
| Tracking       | Matomo (consent-gated, self-hosted)   |
| Contact form   | Blazar (Rust backend, see `../../../blazar/`) |

## Design

Design originally delivered as a zip from a Claude-Design session;
ported to React by component C22. The reference spec lives at:

- `design-package/new-design/HANDOFF.md` — stability contracts D1–D5
  (colors, spacing, fonts, breakpoints, motion tokens).
- `design-package/screenshots/` — canonical visual reference.

Design tokens (oklch color palette) are defined in `src/theme.js` and
consumed via MUI's `ThemeProvider`. Do not edit component styles in
isolation — all changes must trace back to a token to preserve D1–D5.

## Privacy

Dual-jurisdiction policy: ZZPL (Serbia) + GDPR (EU). See `/privacy` —
the route renders `src/pages/Privacy.jsx` with 11 sections covering:

1. Controller identity
2. Legal bases
3. Data collected (only what Matomo sees: pseudonymous visitor ID + a
   coarse IP after 2-byte anonymization)
4. Cookies (session + `_pk_*` analytics cookies when Accepted)
5. Third parties (none for analytics; CloudFront for CDN;
   `api.cloud-lord.com` for contact form)
6. Retention (365 d raw logs; 180 d for backups; indefinite for
   aggregated reports)
7. Data-subject rights (Art. 15/17/20 GDPR + Art. 26/30 ZZPL)
8. How to exercise rights (email `privacy@cloud-lord.com`)
9. Complaint routing (Poverenik SR + relevant EU DPA)
10. Breach notification commitments (72 hr to Poverenik)
11. Changes to the policy

The **ConsentBanner** component mounts at the bottom of every page and
persists the user's Accept / Reject choice in `localStorage`. Until
Accept is chosen, Matomo fires nothing.

## Tracking

`src/providers/TrackingProvider.jsx` wraps `<App>` and uses Matomo's
`requireConsent` mode — `_paq.push(['requireConsent'])` is called at
bootstrap so nothing tracks until the user clicks Accept.

`src/lib/tracking.js` exports two wrappers:

- `track(action, category, name, value)` — thin `_paq.push(['trackEvent', ...])`.
- `trackGoal(goalId, value)` — `_paq.push(['trackGoal', goalId, value])`.

CTA elements carry `data-track` attributes (D1–D5 — the five conversion
events: hero CTA click, pricing card click, case-study open, contact
submit, blog engagement). The TrackingProvider reads these off the DOM
and routes them through `track()` with a consistent category.

Until the Matomo first-run wizard assigns real goal IDs (C35), `trackGoal`
calls buffer safely — no-op until `_paq` is live.

## Contact form

The form posts to Blazar (`https://api.cloud-lord.com`). Submission
logic lives in `src/lib/contactSubmit.js`:

1. `GET /nonce` — fetch a fresh HMAC-signed nonce (5-min TTL).
2. `POST /contact` with `{name, email, subject, message, nonce,
   honeypot: ""}`.
3. Blazar replies `204` on both accept and silent-reject; frontend shows
   a generic success state either way.

Honeypot field: a hidden `<input name="website">` — browsers that
aren't autofill-bots leave it empty; bots fill every field and
silent-reject. The form also shows a loading state while the request is
in flight so double-clicks don't re-submit.

## Env vars

Only one env var matters on the frontend:

| Var             | Default                           | Purpose                                    |
|-----------------|-----------------------------------|--------------------------------------------|
| `VITE_API_BASE` | `https://api.cloud-lord.com`      | Base URL for Blazar contact-form requests |

Override for local dev by copying `.env.example` → `.env.local` and
setting `VITE_API_BASE=http://localhost:3030`.

## Local dev

```bash
npm install
npm run dev        # vite dev server on http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the built dist/ locally
npm run lint       # eslint
```

Note: Vite is the build tool — `npm run dev` (not `npm start`).

## Deploy

Deployed to **Azure CloudFront** via the existing GitHub Actions
workflow in `.github/workflows/cloudlord_master_oidc.yml`:

- Push to `master` triggers the workflow.
- Workflow OIDC-assumes the Azure role, runs `npm run build`, uploads
  `dist/` to the CDN origin bucket, then invalidates the CloudFront
  distribution.

No custom server infrastructure for the SPA itself. The only
server-side piece is `api.cloud-lord.com` (Blazar) on Hetzner, which
this site talks to for the contact form.

## Repo layout

```
cloud-lord/
├── README.md                 (this file)
├── index.html                (Vite entry)
├── package.json
├── vite.config.js
├── robots.txt
├── public/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── theme.js              (oklch design tokens)
│   ├── components/
│   ├── pages/                (Home, About, Services, Contact, Privacy)
│   ├── providers/
│   │   └── TrackingProvider.jsx
│   └── lib/
│       ├── contactSubmit.js  (GET /nonce -> POST /contact)
│       └── tracking.js       (track + trackGoal wrappers)
├── design-package/
│   ├── new-design/HANDOFF.md (D1..D5 stability contracts)
│   ├── screenshots/
│   └── current-design.md
└── .github/workflows/cloudlord_master_oidc.yml
```

## Status

C22 ported the design; C42 wired the contact form; C45 wired the
tracking event handlers (goal IDs pending Matomo wizard C35). Deploy
via the existing CloudFront workflow.

Last updated: 2026-04-24
