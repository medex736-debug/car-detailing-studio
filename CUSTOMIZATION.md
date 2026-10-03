# CUSTOMIZATION.md

Single reference guide for adapting this site template to a new client.
Everything below was read from the actual codebase — file paths, field names
and image filenames are exactly as they exist in this repository.

> **Scope of this doc:** configuration, data and content only. No logic or
> layout changes are required to rebrand the site for a new client, except
> where the ⚠️ Needs refactoring section says otherwise.

---

## Quick Onboarding Checklist

Work top to bottom; each step names the exact file to open.

1. **Business details** — `src/data/site.ts`: name, tagline, year, phone,
   email, address, hours, service area. (No social links field exists yet —
   see ⚠️.)
2. **WhatsApp number** — change it in **both** places (they are not linked):
   - `src/components/sections/Booking.tsx` → `WHATSAPP_NUMBER`
   - `src/components/WhatsAppButton.tsx` → `WHATSAPP_NUMBER`
   - Keep digits-only international format (no `+`, spaces or dashes).
3. **Booking WhatsApp message** — `src/components/sections/Booking.tsx` →
   `SERVICE_NAME_AR` (Arabic service names) and `TIME_SLOTS`. Keys must match
   the `name` values in `src/data/services.ts`.
4. **Services** — `src/data/services.ts`: names, descriptions, durations,
   icons.
5. **Pricing** — `src/data/pricing.tsx`: plan names, sedan/SUV prices,
   scope, feature lists, recommended badge.
6. **Pricing → booking link** — if you renamed any plan `id` or service `id`,
   update `serviceByPlan` in `src/App.tsx`.
7. **Testimonials** — `src/data/testimonials.ts`.
8. **Marquee brands** — `src/data/marque.ts`.
9. **Colors / fonts** — `src/index.css` (`:root` tokens + `@theme inline`).
   Do **not** change `#25D366` on the WhatsApp button (see section 4).
10. **Logo & favicon** — `public/favicon.svg` (the wordmark in the nav/footer
    is just `site.name` text, not an image).
11. **Page meta** — `index.html`: `<title>`, meta description, theme-color,
    font stylesheet.
12. **Images** — replace files in `public/assets/` using the **exact same
    filenames** (case-sensitive). See section 5.
13. **Copy / headings** — hardcoded inside components (list in ⚠️), most
    importantly `Hero.tsx`, `Process.tsx`, `Gallery.tsx`, `Facility.tsx`,
    `Booking.tsx`.
14. **Deployment base path** — `vite.config.ts` → `base:
    '/<repo-name>/'` must match the GitHub repo name.
15. **Verify** — `npm run lint`, `npm run build`, `npm run preview`.

---

## 1. Business Information

**File: `src/data/site.ts`** — the only data file for business identity.

| Field | Current placeholder value | Where it appears |
|---|---|---|
| `name` | `"Studio Detail"` | Nav wordmark, footer brand, copyright line, nav `aria-label` |
| `nameTagline` | `"Precision car care"` | Footer intro sentence |
| `year` | `"2018"` | **Unused** — footer year is generated from `new Date().getFullYear()` |
| `phone` | `"+1 (555) 010-8200"` | Booking intro link, footer Contact column (both build `tel:` hrefs) |
| `email` | `"studio@example.com"` | Footer Contact column (`mailto:` href) |
| `address.line1` | `"Unit 4, 12 Atlas Road"` | Footer → Visit |
| `address.line2` | `"North Park Industrial Estate"` | Footer → Visit, Hero "Location" |
| `address.city` | `"Metropolis"` | Footer → Visit, Hero "Location" |
| `address.postal` | `"MP1 2PE"` | Footer → Visit |
| `hours[]` | 4 entries `{ days, time }` | Footer → Hours (mapped) |
| `serviceArea` | `"Mobile collection and delivery available within 40 km…"` | Footer, Hero "Service area" |

Consumed by: `src/components/sections/Nav.tsx`, `Hero.tsx`, `Footer.tsx`,
`Booking.tsx`.

**Not present (must be added if the client needs them):**
- **Social links** — no Instagram/Facebook/YouTube fields anywhere; the
  footer has only Visit / Hours / Contact columns.
- **WhatsApp number** — deliberately *not* in `site.ts` (it lives inside two
  components; see section 6).
- **Logo image path** — the "logo" is the `site.name` text with a gold rule
  under it (`Nav.tsx`, `Footer.tsx`).

---

## 2. Services & Pricing

### Services — `src/data/services.ts`

```ts
export interface Service {
  id: string;        // used by booking <select> and App.tsx mapping
  name: string;      // shown in booking dropdown; ALSO the key source for Arabic map
  description: string;
  duration: string;  // free text, e.g. "4–5 hours", "1–2 days"
  icon: LucideIcon;  // lucide-react icon component
}
```

5 entries: `exterior-detail`, `interior-detail`, `paint-correction`,
`ceramic-coating`, `paint-protection-film`.

Used in: Services cards (`Services.tsx`) and the booking form dropdown
(`Booking.tsx`).

### Pricing — `src/data/pricing.tsx`

```ts
{
  id: string;                 // must match a key in App.tsx serviceByPlan
  name: string;
  description: string;
  icon: ReactNode;            // e.g. <Droplets className="w-8 h-8 text-primary" />
  priceSedan: number;         // 180 / 160 / 420 / 950
  priceSuv: number;           // 220 / 200 / 520 / 1150
  scope: string;
  features: { label: string; included: boolean }[];
  recommended?: boolean;      // shows gold badge + ring
  recommendedLabel?: string;  // badge text, e.g. "Signature"
}
```

4 tiers: `exterior`, `interior`, `paint-correction`, `signature`
(the recommended one).

**Currency:** the `$` sign is **hardcoded** in
`src/components/ui/pricing-module.tsx` line 133 — there is no currency field
in the data file. See ⚠️.

**Vehicle toggle:** the Sedan/SUV switch is built into the pricing module;
`SUV` label is the `suvLabel` prop (default `"SUV"`), passed from
`src/components/sections/Pricing.tsx`.

**Section copy:** `Pricing.tsx` passes `title="Pricing"`, the subtitle, and
`buttonLabel="Book this slot"` into the module.

**Coupling — do not break:** `src/App.tsx` maps pricing ids → service ids so
"Book this slot" preselects the right service:

```ts
const serviceByPlan = {
  exterior: "exterior-detail",
  interior: "interior-detail",
  "paint-correction": "paint-correction",
  signature: "ceramic-coating",
};
```

---

## 3. Testimonials

**File: `src/data/testimonials.ts`**

```ts
export interface Testimonial {
  name: string;    // "Marcus Hale"
  city: string;    // "Northbridge"
  vehicle: string; // "Porsche 911 Carrera"
  service: string; // "Paint correction"
  quote: string;   // the review text
}
```

3 placeholder entries. Rendered by `src/components/sections/Reviews.tsx`.

**Note:** there is **no `rating` / star field** — the design is quote-based,
not star-based. Adding ratings would require a `Reviews.tsx` change.

---

## 4. Visual Identity

### Theme tokens — `src/index.css`

Color tokens live in `:root` (lines ~15–38) and are exposed to Tailwind via
`@theme inline` (lines ~41–68):

| Token | Value | Role |
|---|---|---|
| `--background` | `#0b0b0d` | Page background (onyx) |
| `--foreground` | `#e9e7e2` | Body text |
| `--card` / `--popover` / `--muted` | `#111318` | Card surfaces |
| `--primary` | `#0f3d3e` | Primary buttons, active icons (emerald) |
| `--gold` / `--ring` | `#b08d57` | Accent + focus ring (keep sparing, <8%) |
| `--graphite` | `#4a4e58` | Muted labels, borders |
| `--border` / `--input` | `#34373e` | Borders, inputs |
| `--muted-foreground` | `#9ba0a8` | Secondary text (contrast-checked) |

Section band background `#0d0d10` is **hardcoded in four components**
(`Marque.tsx`, `Process.tsx`, `Facility.tsx`, `Reviews.tsx`) — if you retheme,
change those too (⚠️).

> **Theme is dark-only.** `<html style="color-scheme: dark">` in `index.html`
> plus form controls styled for dark. Switching to light mode is not a
> token-only change.

### Fonts

| Role | Font | Where defined |
|---|---|---|
| Headings (`.font-display`, `h1–h3`) | **Fraunces Variable** (serif) | `src/index.css` → `--font-display`; loaded via npm `@fontsource-variable/fraunces` imported in `src/main.tsx` |
| Body | **Switzer** (400/500 only) | `src/index.css` → `--font-sans`; loaded from Fontshare CDN `<link>` in `index.html` |

To swap fonts: replace both the CSS variables in `index.css` **and** the
loader (npm import in `main.tsx` / CDN link in `index.html`).

### Logo / favicon

- **Favicon:** `public/favicon.svg` — 64×64 SVG: onyx square, gold + emerald
  concentric circles. Referenced in `index.html` (`/favicon.svg`); Vite rewrites
  it to the deploy base path at build time.
- **Nav/footer logo:** text `site.name` with a gold underline — no image file.

### Border radius

No radius token exists (shadcn `new-york` style, `components.json`). Radius is
per-component:

- `rounded-lg` — buttons, cards, inputs, selects, nav icon button
- `rounded-xl` — pricing cards (`pricing-module.tsx`)
- `rounded-full` — pills, icon badges, the WhatsApp button

### WhatsApp button color — **DO NOT CHANGE**

`src/components/WhatsAppButton.tsx` uses `bg-[#25D366]`. That is the official
WhatsApp brand green. Changing it (or the `wa-glow` halo color in
`src/index.css`) breaks brand compliance — leave both as they are.

---

## 5. Images

**Runtime folder: `public/assets/`** — served under the deploy base path and
resolved by `src/lib/assets.ts` (`assetUrl()`), which prefixes
`import.meta.env.BASE_URL` (`base: '/car-detailing-studio/'` from
`vite.config.ts`).

**Filename rule:** paths are **case-sensitive** (Linux/Pages builds). Replace
files using the exact existing names — `Pair1_before.jpg` ≠ `pair1_before.jpg`.
Git history contains two case-sensitivity fix commits; don't reintroduce this.

| Key / filename | Size (current) | Aspect / container | Used for | Referenced in |
|---|---|---|---|---|
| `/assets/Hero.jpg` | 1408×768 | Full-bleed, `object-cover`, `absolute inset-0`, hero is `min-h-[100svh]` | Hero section background, whole viewport with dark gradient overlay | `src/components/sections/Hero.tsx` |
| `/assets/Facility.jpg` | 1408×768 | `aspect-[4/3]`, `object-cover` (source is 16:9, cropped) | Facility section photo — correction bay | `src/components/sections/Facility.tsx` |
| `/assets/Pair1_before.jpg` | 1408×768 | `aspect-[4/3]`, `object-cover` | Gallery before/after slider #1 — "Swirl removal, black paint" (BEFORE layer) | `src/components/sections/Gallery.tsx` |
| `/assets/pair1_after.jpg` | 1408×768 | same | Gallery slider #1 (AFTER layer) | `Gallery.tsx` |
| `/assets/Pair2_before.jpg` | 1408×768 | same | Gallery slider #2 — "Cabin refresh" (BEFORE) | `Gallery.tsx` |
| `/assets/pair2_after.jpg` | 1408×768 | same | Gallery slider #2 (AFTER) | `Gallery.tsx` |
| `/assets/Pair3_before.jpg` | 1408×768 | same | Gallery slider #3 — "Ceramic coating" (BEFORE) | `Gallery.tsx` |
| `/assets/pair3_after.jpg` | 1408×768 | same | Gallery slider #3 (AFTER) | `Gallery.tsx` |
| `/favicon.svg` | 64×64 SVG | square | Tab icon / PWA icon | `index.html` |

**Critical rule for before/after pairs:** both files of a pair must have the
**same dimensions, framing and lighting** — the slider clips one over the other
at the same pixel geometry. Recommended ≥1408×768 landscape.

**Image slots that do NOT exist in this template:**
- **Service cards have no images** — they use lucide icons (`Droplets`,
  `Armchair`, `Sparkles`, `Shield`, `Layers`) defined in `src/data/services.ts`.
- **No team/staff/about photos anywhere.**
- **Testimonials have no photos.**

**Unused folder:** `images/` at the project root (`hero-bg.jpg`,
`workshop.jpg`, `service-*.jpg`, `lounge-*.jpg`, `testimonial-owner.jpg`,
`before-after.jpg` — 11 files) is **referenced nowhere** in the codebase. It is
dead weight; delete it or wire it up deliberately (⚠️).

---

## 6. WhatsApp Integration

**The number is NOT a single source of truth — it is defined twice.**
Both must be updated together:

| # | File | Constant | Used for |
|---|---|---|---|
| 1 | `src/components/sections/Booking.tsx` (line ~15) | `WHATSAPP_NUMBER = "213776739184"` | Booking form submit → `buildWhatsAppLink()` → `https://wa.me/<number>?text=<Arabic booking message>` opened in a new tab |
| 2 | `src/components/WhatsAppButton.tsx` (line ~16) | `WHATSAPP_NUMBER = "213776739184"` | Floating green button → `https://wa.me/<number>?text=<generic Arabic greeting>` |

Format requirement (documented in `Booking.tsx`): international, digits only,
no `+`, spaces or dashes.

**Message payloads (different on purpose — do not conflate):**

- **Booking** (`Booking.tsx` → `buildWhatsAppLink`) — assembled from the form
  plus `SERVICE_NAME_AR` translations:
  ```
  مرحباً، أرغب بطلب موعد:
  الخخدمة: <Arabic service name>
  التاريخ المفضل: <date>
  الوقت المفضل: <time>
  الاسم: <name>

  (بانتظار تأكيدكم للموعد)
  ```
- **Floating button** (`WhatsAppButton.tsx` → `GREETING`):
  ```
  مرحباً، أرغب بالاستفسار عن خدماتكم
  ```

**Related config in `Booking.tsx`:**
- `SERVICE_NAME_AR` — English → Arabic map. Keys must exactly match `name`
  values in `src/data/services.ts` (e.g. `"Exterior detail"`). Unknown keys
  fall back to the English name, so a mismatch degrades silently — keep them
  in sync.
- `TIME_SLOTS` — 9:00 AM → 6:00 PM, displayed in English in the UI.

**Do not add the number anywhere else** (footer, CTA bars, etc.) without
consolidating it into `site.ts` first — see ⚠️.

---

## ⚠️ Needs refactoring

Hardcoded client-specific values that live in component/config code rather
than a data file. Fix these before treating the repo as a clean reusable
template.

1. **WhatsApp number duplicated** — `Booking.tsx` and `WhatsAppButton.tsx`
   each declare `WHATSAPP_NUMBER`. Should become one field (e.g.
   `site.whatsapp`) imported by both.
2. **Arabic service map inside the form component** — `SERVICE_NAME_AR` in
   `Booking.tsx` must track `services.ts` names; a rename in the data file
   silently breaks translations. Move alongside `services.ts` or key by `id`.
3. **Pricing → service id mapping in `App.tsx`** — `serviceByPlan` breaks the
   "Book this slot" preselect if any `id` is renamed in `pricing.tsx` /
   `services.ts`.
4. **Currency symbol hardcoded** — `$` is baked into
   `src/components/ui/pricing-module.tsx` (line ~133), plus the literal copy
   `"sedan detail"` on the same screen. No currency field exists.
5. **SEO/meta not driven by data** — `index.html` `<title>`
   ("Studio Detail — Precision car care"), meta description and
   `theme-color` must be edited manually per client.
6. **Deployment base path hardcoded** — `vite.config.ts` →
   `base: '/car-detailing-studio/'` must equal the GitHub repo name; forgetting
   this 404s every image and asset on Pages.
7. **Marketing copy lives in components**, not data files. Editing content
   means touching JSX:
   - `Hero.tsx` — headline, paragraph, button labels
   - `Services.tsx` — section heading + intro
   - `Process.tsx` — entire `steps` array (5 process steps)
   - `Gallery.tsx` — entire `work` array (titles, before/after notes, alt
     text, results) **and** the `filters` array
   - `Facility.tsx` — entire `points` array + headings
   - `Booking.tsx` — headings, instructions, disclaimers, field labels,
     `TIME_SLOTS`
   - `Reviews.tsx` — section heading
   - `Pricing.tsx` — subtitle and footnote paragraph
   - `Footer.tsx` — column titles (Visit/Hours/Contact) and tagline sentence
   - `Nav.tsx` — `navLinks` labels and their hrefs. Current links are
     Services / Process / Work / Pricing / Reviews → `#services #process
     #work #pricing #reviews`. Other hrefs used across the site: `#top`
     (nav logo), `#booking` (all CTAs), `#services` (hero), `#pricing`
     (service cards). Section ids present: `#top #services #process #work
     #facility #pricing #reviews #booking` — note `#facility` currently has
     **no link pointing to it**. If you delete or rename a section, update
     `navLinks`/CTAs or the links scroll nowhere.
8. **Section band color repeated** — `#0d0d10` hardcoded in `Marque.tsx`,
   `Process.tsx`, `Facility.tsx`, `Reviews.tsx`; make it a theme token.
9. **Dead data / dead assets** — `site.year` is never rendered;
   `testimonials.ts` has no rating field; the root `images/` folder (11
   files) is referenced nowhere.
10. **No social links support** — adding client socials requires new fields in
    `site.ts` plus footer markup.
11. **README is the stock Vite template** — replace with project-specific
    onboarding docs.

---

## Project layout (for orientation)

```
index.html                  meta, title, fonts CDN, favicon
vite.config.ts              base path, @ alias, plugins
public/assets/              all live images (case-sensitive names)
public/favicon.svg          logo mark
src/
  main.tsx                  React entry, Fraunces font import
  index.css                 color/font tokens, motion, base styles
  App.tsx                   sections order, serviceByPlan mapping, skip link
  data/
    site.ts                 business info            ← section 1
    services.ts             services                 ← section 2
    pricing.tsx             pricing plans            ← section 2
    testimonials.ts         reviews                  ← section 3
    marque.ts               marquee brand list
  lib/assets.ts             assetUrl() base-path helper
  components/
    WhatsAppButton.tsx      floating CTA (WhatsApp #2) ← section 6
    sections/*.tsx          Nav, Hero, Marque, Services, Process, Gallery,
                            Facility, Pricing, Reviews, Booking, Footer, StickyCTA
    ui/*.tsx                button, card, field, switch, pricing-module
```

**Commands:** `npm run dev` · `npm run build` · `npm run lint` ·
`npm run preview`
