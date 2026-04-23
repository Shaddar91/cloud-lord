# Cloud Lord — Design Handoff

This package is a **design reference**, not production code. It's here so an
engineering agent (or a human) can port it into the live React + Material-UI
codebase without guessing at intent.

Read this file top-to-bottom before you start editing anything.

---

## 1. What's in this package

```
cloud-lord/
├── HANDOFF.md          ← you are here
├── Cloud Lord.html     ← canonical design: home page (single-scroll)
├── privacy.html        ← canonical design: /privacy page
└── assets/
    └── logo.png        ← cloud-with-crown brand mark, transparent PNG
```

Both HTML files are fully self-contained (inline CSS, inline JS, Google Fonts
loaded via `<link>`). Open them in any browser to see the intended result.

---

## 2. What you are porting

The live site is **React 18 + Vite + Material-UI 5 + React Router + react-scroll**.
Keep that stack. Do **not** rewrite routing, do **not** swap MUI for Tailwind,
do **not** introduce a new CSS-in-JS library. Port the *look*, not the *toolchain*.

Target structure in the React app:

- `/` — home page, single scrolling layout with sections: Hero → Proof strip →
  Services → Process → Inquiry form → Footer
- `/privacy` — full privacy policy page (its own route)
- Consent banner — mounted at app root, visible on both routes

---

## 3. Design system (lift these verbatim)

All tokens live in the `:root { ... }` block at the top of each HTML file.
Copy them into a theme module (e.g. `theme.ts` or an MUI `createTheme` call)
rather than inlining them component-by-component.

### Colors (oklch — use as-is, do not convert to hex by eye)

| Token | Value | Use |
|---|---|---|
| `--bg` | `oklch(16% 0.012 250)` | page background |
| `--bg-2` | `oklch(20% 0.014 250)` | card / panel background |
| `--bg-3` | `oklch(24% 0.016 250)` | nested panel, input background |
| `--line` | `oklch(30% 0.014 250)` | default border |
| `--line-2` | `oklch(38% 0.018 250)` | hover / emphasis border |
| `--fg` | `oklch(96% 0.005 250)` | primary text |
| `--fg-2` | `oklch(78% 0.01 250)` | body text |
| `--fg-3` | `oklch(58% 0.012 250)` | muted / metadata |
| `--accent` | `oklch(80% 0.14 180)` | teal — brand accent, links, CTAs |
| `--accent-dim` | `oklch(55% 0.09 180)` | accent hover border, etc. |
| `--warn` | `oklch(78% 0.14 60)` | destructive action (erase data) |

Pure black `#000` is **not** used anywhere on purpose — it reads as generic
"dev portfolio." Keep the warm near-black.

### Typography

- **Display** — `Inter Tight`, weights 500/600/700 → headings, hero claim
- **Body** — `Inter`, weights 400/500/600 → paragraphs
- **Mono** — `JetBrains Mono`, weights 400/500 → labels, UI chrome, metadata

Scale: hero `clamp(40px, 5.5vw, 72px)`, section titles 22px, body 15px,
mono labels 11–13px, muted captions 11–12px.

### Spacing / layout

- Max container: 1200px (most sections), 760px (privacy long-form)
- Section vertical padding: 80px desktop, 56px mobile
- Card border radius: 10px
- Button border radius: 4–6px

---

## 4. Component inventory

Each item below is a discrete React component you should build.

| Component | Source in HTML | Notes |
|---|---|---|
| `<TopNav>` | `<nav class="top">` | Sticky, backdrop-blur, logo + 3 section links + CTA button |
| `<Hero>` | `<section class="hero">` | Headline + lede + 2 CTAs, terminal card on the right |
| `<ProofStrip>` | `<section class="proof">` | Anonymized client tags ("Series B fintech", etc.) |
| `<ServicesGrid>` | `<section id="services">` | One wide hero card + 3 smaller cards (see §5) |
| `<ProcessSteps>` | `<section id="process">` | Numbered steps, left-aligned |
| `<InquiryForm>` | `<section id="contact">` | Multi-checkbox interests + email + message, mails on submit |
| `<Footer>` | `<footer>` | Copyright + social links + **privacy** + **privacy settings** |
| `<ConsentBanner>` | `<div id="clPrivacyNotice">` | Bottom-right card, first-visit only |
| `<PrivacyPage>` | `privacy.html` (entire) | Own route; see §6 |

### Logo usage

`assets/logo.png` is a transparent PNG, cloud + crown, teal gradient.
Render at 28–30px in the nav with a soft drop-shadow:

```css
filter: drop-shadow(0 0 8px color-mix(in oklab, var(--accent) 40%, transparent));
```

Also wire it as the favicon (`<link rel="icon" ...>`).

---

## 5. Services section — DO NOT make 4 equal cards

The old site had 4 identical 2×2 cards. The redesign intentionally breaks the
grid: **one wide "hero service" card** (the primary offer) above **three
smaller cards** (supporting offers). This is part of the visual fix, not an
accident. Keep that hierarchy.

---

## 6. Privacy page — hard requirements

This is the part most agents get wrong. Read carefully.

### 6.1 Must-haves

- **Controller identity card** at the top (Operated by / Based in / Contact)
- **Cookies table** with `_pk_id` / `_pk_ses` / `_pk_ref` — stack on mobile,
  never horizontal-scroll
- **Dual-jurisdiction layout** for both "Legal basis" and "Right to complain"
  — two equal-weight columns side-by-side on desktop, stacked on mobile
- **Interactive consent toggle** (switch + "Saved" hint + helper state text)
- **"Forget me on this site"** button (destructive styling, confirmation toast)
- **"Last updated" slot** at the top (developer fills the date)
- **Data-location block** naming Germany / EU-EEA

### 6.2 Must-not-haves

- ❌ No "accept these terms" button on the privacy page (it's informational)
- ❌ No geo-detection that hides one jurisdiction's content
- ❌ No language toggle (single-language English for now)
- ❌ No "Terms of Service" or "Imprint" page — they don't exist
- ❌ No stock padlock / shield / security imagery

---

## 7. Consent banner — GDPR constraints (non-negotiable)

The banner in `Cloud Lord.html` follows specific legal requirements. If you
change any of these, you break compliance.

| Rule | Enforcement |
|---|---|
| Accept and Reject **equal size, equal visual weight** | Same `.consent-btn` class, same border, same hover |
| **Not a modal**, no backdrop, does not block the page | Fixed bottom-right card |
| Shown **only on first visit** | `localStorage` key `cl_consent_v1`, never reappears after choice |
| Reachable later via **"privacy settings"** link in footer | `#clOpenPrivacy` → calls `show()` |
| **Esc = Reject** (symmetric dismissal) | Keydown handler |
| Focus moves to banner on appearance, **no focus trap** | `setTimeout` focus first button |
| Mobile: buttons **stack full-width** | Grid `1fr 1fr` → single column breakpoint |
| `role="dialog"`, `aria-label="Cookie consent"` | On the root element |

No dark patterns. No "continuing to use the site = consent." No pre-checked
boxes. No cookies set before Accept.

---

## 8. Tracking hookup (implementation notes, not design)

Your analytics plumbing (outside the scope of this design package):

1. Inject Matomo `<script>` in `index.html <head>` — but guarded.
2. Wrap `<App/>` with a `<TrackingProvider/>` at the app root.
3. **Block tracking until Accept is recorded.** Read `cl_consent_v1` from
   `localStorage`; if value is `"accept"`, load Matomo; otherwise do not.
4. When the toggle on `/privacy` changes, either boot or tear down Matomo
   accordingly. `_paq.push(['forgetConsentGiven'])` is the Matomo call.
5. Attach conversion events to: Inquiry form submit, outbound GitHub link,
   outbound LinkedIn link. Do **not** add new UI for this — the existing
   buttons/links already have stable roles.

---

## 9. What to ask the client before changing anything

- Real email addresses for `privacy@cloud-lord.com` and `engineering@cloud-lord.com`
- Real LinkedIn + GitHub URLs (currently `#` placeholders)
- Real client references for the proof strip (or keep anonymized tags)
- Actual "Last updated" date for the privacy page

Do **not** invent testimonials, client logos, or metrics. Leave placeholders
if data is missing.

---

## 10. What *not* to do

- Don't add a hero background image or cloud wallpaper — the current grid mask
  on the hero is intentional.
- Don't replace the monospace UI labels with sentence-case text — the
  terminal/platform-engineer voice is the brand.
- Don't add emoji anywhere.
- Don't add a "Terms" / "Imprint" / "Impressum" link.
- Don't switch the accent color. The teal matches the logo gradient; it's
  the single distinctive visual tie.
- Don't expand the services section back to 4 equal cards.
- Don't pad the hero with extra sections, logos walls, or "trusted by" strips
  unless the client gives you real content.

---

## 11. Handing this off to a coding agent

Suggested first prompt:

> Read HANDOFF.md and the two HTML files. Port this design into my existing
> React + MUI codebase at `/`. Start with the theme tokens, then the TopNav,
> then the Hero. Don't move on to the next component until I approve the
> previous one. Do not add content I didn't write. Do not change anything
> flagged as a hard requirement in HANDOFF.md §6 or §7.

---

*Last updated: April 23, 2026*
