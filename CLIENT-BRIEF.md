# CLIENT-BRIEF.md

You are working on a React + Vite + Tailwind website template for a car detailing / car care business.

**Step 0 — read first.** Read `CUSTOMIZATION.md` completely before doing anything. It is the single reference for WHERE everything lives in the code (files, fields, ids, coupling). This brief says WHAT to put there. Every section below names the `CUSTOMIZATION.md` section it maps to. If this brief and `CUSTOMIZATION.md` ever disagree about a file path or field name, trust `CUSTOMIZATION.md` and tell me.

Fill rule for this brief: a value written as `[...]` is something I must still provide. If it is still in brackets, or says "not provided", treat it as missing and follow Rule 11.

---

## 1. Business details
Maps to: `CUSTOMIZATION.md` §1 → `src/data/site.ts`

- `name`: [Profection Car Wash] 
- `nameTagline`: ["Profection"]
- `phone`: [509518818]
- `email`: [not provided]
- `address.line1`: [PWR2+M5 Ras Al-Khaimah, Ras Al Khaimah - United Arab Emirates]
- `address.line2`: [area / district]
- `address.city`: [Ras Al Khaimah, emirate]
- `address.postal`: [ "not provided"]
- `hours`: [one line per entry, format `days | time`, e.g. `Sat – Thu | 09:00 – 19:00`, `Friday | Closed`]
- `serviceArea`: [ "not provided"]
- `currency`: "AED "
- `year`: ignore (unused, see CUSTOMIZATION §1)

## 2. WhatsApp and booking
Maps to: `CUSTOMIZATION.md` §6 → `site.whatsapp` (single source of truth), `Booking.tsx`, `WhatsAppButton.tsx`

- `whatsapp`: [971XXXXXXXXX — digits only, no "+", spaces or dashes]
- The current value in the template (`213776739184`) is MY number, not the client's. It must be replaced by the line above. If the line above is still in brackets, do NOT touch it and list it in the report as critical.
- Do not add the number anywhere else in the code. Read it from `site.whatsapp` only.
- `TIME_SLOTS` in `Booking.tsx`: [keep default 9:00 AM – 6:00 PM / or the client's hours]
- The WhatsApp messages are in Arabic. Keep them in Arabic.

## 3. Services
Maps to: `CUSTOMIZATION.md` §2 → `src/data/services.ts`, and `SERVICE_NAME_AR` in `Booking.tsx`

One block per service. Keep `id` values unless the service is removed or added.

1. id: [exterior-detail] | name (English): [..] | name (Arabic, for `SERVICE_NAME_AR`): [..]
   description: [1–2 sentences, written from the client's own info only] | duration: [e.g. 2–3 hours, or "not provided"] | icon: [keep existing]
2. id: [interior-detail] | name: [..] | Arabic: [..] | description: [..] | duration: [..] | icon: [keep]
3. id: [paint-correction] | name: [..] | Arabic: [..] | description: [..] | duration: [..] | icon: [keep]
4. id: [ceramic-coating] | name: [..] | Arabic: [..] | description: [..] | duration: [..] | icon: [keep]
5. id: [paint-protection-film] | name: [..] | Arabic: [..] | description: [..] | duration: [..] | icon: [keep]

Services the client does NOT offer: [list, or "none" — remove them from `services.ts`, `pricing.tsx`, `SERVICE_NAME_AR` and `serviceByPlan`, keeping all four in sync]

## 4. Pricing
Maps to: `CUSTOMIZATION.md` §2 → `src/data/pricing.tsx`, `serviceByPlan` in `src/App.tsx`

Per plan: sedan price | SUV price | scope | features

1. exterior: sedan [..] | SUV [..] | scope [..]
2. interior: sedan [..] | SUV [..] | scope [..]
3. paint-correction: sedan [..] | SUV [..] | scope [..]
4. signature (recommended): sedan [..] | SUV [..] | scope [..]

If prices are "not provided" or still in brackets: leave `pricing.tsx` exactly as it is, including the template's numbers (Rule 11), and list every price you left in the report. Do not replace them with anything.

## 5. Visual identity
Maps to: `CUSTOMIZATION.md` §4 (tokens, fonts, logo, favicon) and §5 (images)

### 5.1 Logo
- File: `public/assets/logo.jpg` (exact filename, case-sensitive)
- Description: letters "PF" in a bold geometric mark; the P is black, the F is blue
- Source background: white, not transparent
- Use it in `Nav.tsx` and `Footer.tsx` instead of the plain-text `site.name`. Keep the business name as the image `alt` text.
- Load it through `assetUrl()` from `src/lib/assets.ts`, never a hardcoded path.
- The site theme is dark-only (CUSTOMIZATION §4), and the black part of the logo disappears on a dark background. Fix: place the logo on a small light rounded container (use `rounded-lg`, as in the rest of the site). Do not change the global theme to light.
- Favicon: build `public/favicon.svg` from the logo shape and colors if possible. Otherwise keep the current file and list it under "Left unchanged".
- If the logo filename above is still in brackets or the file does not exist in `public/assets/`, leave `Nav.tsx` and `Footer.tsx` as they are (Rule 11).

### 5.2 Colors
Edit only the tokens in `src/index.css` (`:root` and `@theme inline`).

- Logo blue: [#0B4F82 — approximate, picked by eye; verify with a color picker before applying]
- Logo black: [#000000]
- `--primary` (buttons, active icons): [logo blue]
- `--primary-foreground`: [keep, check contrast against the new primary]
- `--gold` / `--ring` (accent, keep sparing, under 8%): [keep the template gold / or a lighter shade of the logo blue — decision: ___ ]
- `--background`, `--foreground`, `--card`, `--border`: [keep]
- The section band color `#0d0d10` is hardcoded in `Marque.tsx`, `Process.tsx`, `Facility.tsx` and `Reviews.tsx` (CUSTOMIZATION ⚠️6). Replace it with ONE shared token in `index.css` and use that token in all four files. Do not change the color value itself unless needed.
- Do NOT change `#25D366` (WhatsApp button) or the `wa-glow` color. See CUSTOMIZATION §4.
- After changing colors, check text contrast on buttons and the booking form.

### 5.3 Fonts
- [Keep the template fonts: Fraunces for headings, Switzer for body]
- If the site UI must be Arabic, ask me first; Switzer does not support Arabic and RTL needs separate work. Do not start it in this task.

### 5.4 Tone
- Style words for the client:  precise, clean, modern
- Any website they like as a reference:  "none"

## 6. Reviews / testimonials
Maps to: `CUSTOMIZATION.md` §3 → `src/data/testimonials.ts`, rendered by `Reviews.tsx`

The template's current testimonials are fake. Use ONLY the real reviews below, exactly as written. Do not rewrite, shorten, translate or improve them.

Fields per review follow the `Testimonial` interface: `name`, `city`, `vehicle`, `service`, `quote`.

For fields I leave empty (very common with Google reviews): make `city`, `vehicle` and `service` optional in the interface and hide those lines in `Reviews.tsx` when they are empty. This is the only code change allowed in `Reviews.tsx` beyond the section heading.

Source of reviews: [Google Maps ] — collected on [date]
Rating summary (for my information only, the template has no star field, do not add stars): [e.g. 4.9 from 120 reviews]

1. name: [Mirela David] | city: [ ] | vehicle: [ ] | service: [ ]
   quote: "[I love this car wash, they are fast and good price. Also upstairs have room prayer, sala with tv for waiting, and toilet. Thank you for the service always. Appreciate a lot.]"
2. name: [Md. Paiker ] | city: [ ] | vehicle: [ ] | service: [ ]
   quote: "[Amazing service. They made my car like a brand new one]"
3. name: [ Arun Vasu] | city: [ ] | vehicle: [ ] | service: [ ]
   quote: "[Best car detailing services in RAK.]"
4. (optional) name: [ ] | city: [ ] | vehicle: [ ] | service: [ ]
   quote: "[exact review text]"

If this list is empty, says "none", or the placeholders are still in brackets: leave `testimonials.ts` and `Reviews.tsx` exactly as they are (Rule 11) and list the template testimonials in the report as "fake, needs my decision". Do not delete the section and do not write any reviews yourself.

## 7. Images
Maps to: `CUSTOMIZATION.md` §5 → `public/assets/`

Filename rule: same filenames as the template, case-sensitive. `Pair1_before.jpg` is not `pair1_before.jpg`.

- Hero: [provided as `Hero.jpg` / not provided — keep the template photo]
- Facility: [provided as `Facility.jpg` / not provided]
- Work photos, before/after pairs: [provided: list pairs / not provided]. Both images of a pair must share size, framing and lighting (CUSTOMIZATION §5).
- Gallery decision: [keep with the client's photos / keep the template photos as sample work / remove the Gallery section] — if this is still in brackets, keep the Gallery exactly as it is (Rule 11).

Template photos are NOT the client's work. Never describe them in code or copy as the client's real work. If I say "remove the Gallery", delete the section from `App.tsx` and its link from `Nav.tsx`.

## 8. Links and extras
Maps to: `CUSTOMIZATION.md` §1 "Not present" and ⚠️8

- Instagram: [link, or "none"]
- TikTok: [link, or "none"]
- Google Maps: [https://maps.app.goo.gl/Lv9gTkUjPWXfRgD56]
- Domain: [name, or "none"]

The template has no field for social links. If I provide any, add only plain text links in `Footer.tsx` and mention it in the report. If "none", do nothing.

## 9. Page meta
Maps to: `CUSTOMIZATION.md` checklist step 11 and ⚠️3 → `index.html`

- `<title>`: [Profection — short descriptor]
- Meta description: [one sentence from the client's real info, no invented claims]
- `theme-color`: [same as `--background`, or the logo blue]
- Add `<meta name="robots" content="noindex, nofollow">` (this is a preview site).
- Fonts link: keep.

## 10. Copy and headings
Maps to: `CUSTOMIZATION.md` ⚠️5

Marketing copy is hardcoded in components (`Hero.tsx`, `Services.tsx`, `Process.tsx`, `Gallery.tsx`, `Facility.tsx`, `Booking.tsx`, `Pricing.tsx`, `Footer.tsx`, `Nav.tsx`).

- Hero headline: [ "keep"]
- Hero paragraph: [ "keep"]
- About / process / facility copy: [ "keep"]
- Template claims that must NOT remain if they do not apply to this client (climate-controlled bay, air filtration, paint-depth gauge logging, "single bay", "since 2018", etc.): list each one you find in the report. Remove one only if I confirm in "Claims to remove" below.
- Claims to remove: [list, or "none — report them only"]

## 11. Rules

1. Work only on the current git branch. Do not touch any other branch and do not run `git push`.
2. Do not invent any information: prices, years of experience, warranties, equipment, certifications, reviews, customer names. Anything not provided follows Rule 11.
3. Once I provide real reviews, they replace the fake template testimonials. If I provide none, follow Rule 11.
4. Template photos are not the client's work; handle them as described in section 7.
5. Keep coupled data in sync (CUSTOMIZATION §2, §6, ⚠️1–2): service `name` values in `services.ts` must match the keys of `SERVICE_NAME_AR` in `Booking.tsx`; plan and service `id` values must match `serviceByPlan` in `App.tsx`.
6. Logo and visual identity follow section 5.
7. Colors: only through tokens in `index.css`. Never change `#25D366`.
8. Update `index.html` as in section 9.
9. Do not change structure, logic or design beyond what this brief requires.
10. When finished, run `npm run lint` and `npm run build`, and fix any errors.
11. Missing data (no exceptions): if a value is marked "not provided", is still in `[...]` brackets, is empty, or you cannot find where it belongs in the codebase, leave the existing template content exactly as it is. Do not guess, do not invent a replacement, do not delete it, and do not substitute placeholder text such as "Request a quote". List every such item under "Left unchanged" in the final report (file, line, current value). You may only change what I gave you a real value for, or what I explicitly ordered you to do in this brief (for example "remove the Gallery").
12. Before you edit anything, give me a short plan (files in order, missing info, conflicts) and wait for my approval.

## 12. Final report (keep it short)

- Files changed, in order
- "Left unchanged": every template value not replaced because data was missing (file, line, current value)
- Template claims, photos or placeholder text that still need my decision
- A search result for any remaining occurrences of: `Studio Detail`, `213776739184`, `Metropolis`, `example.com`, `Marcus`, `+1 (555)`, `studio@`
- Results of `npm run lint` and `npm run build`
