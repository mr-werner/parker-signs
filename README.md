# Parker Signs & Graphics, Incorporated: Blueprint WebStudio Concept

Independent, non-official redesign concept for https://parkersign.com/ (Parker Signs & Graphics, Incorporated, Indianola, Iowa).
Preview: https://psg.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

Custom build. Content and layout are in `src/App.jsx`, styles in `src/styles.css`, and the Blueprint WebStudio concept widget in `src/concept.jsx`.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Vercel project `parker-signs` (framework: Vite, team mrwerner-s-projects). Pushes to `main` deploy automatically.
Domain `psg.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.

Environment variables (all optional): `VITE_CONCEPT_END_DATE` (countdown end, defaults to 2026-11-30), `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` for the sign request form (`api/contact.js`; without them the form answers in demo mode). The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the main studio site.

## Design

- Their own logo (silver "P" with the red paint brush, "Parker SIGNS & Graphics, Incorporated"), cut out of its GIF background and set on a near-black header, like the original's black site. Favicon is the "P" mark.
- Palette from the logo and site: brushed silver, the original site red (#cd0000) and the logo's dark sign-shop green (#166007), on black, with a vinyl-sheet off-white for light sections.
- Fonts: Big Shoulders Display (condensed, sign-lettering headings), Figtree (body), IBM Plex Mono (work-order labels and project credits).
- Sign-making motif: headings built as channel letters (face plus stacked "returns"), their own tagline with "Parker Signs." lit as a flickering red neon tube, the Pella sign in a bolted sign cabinet with a round porthole frame, a raceway bar with an LED line under the hero, product groups as weeded vinyl decals with dashed cut lines and registration marks, the process as a lit raceway with mounting bolts, and a contact form styled as a sign work order.
- Section order: header → hero (their tagline, call button, 1972 / portfolio count / Class A) → red contact strip (phone, email, address, license) → filterable portfolio of 34 projects with a lightbox showing a second photo and each project's designer and fabricator credits, plus a scrolling strip of 15 "More Signs" → products (all 18 from their Products page, in four groups) → 4-step process from the Capabilities page with their own "reputation" line → Parker Evolution timeline and credited architects/partners → towns where their signs stand + Google reviews link → contact (phone, JR's email and extension, address, fax, map, sign request form) → footer.

## What changed from the current site

- The home page is a 2000s table layout: ": : PARKER EVOLUTION : : CAPABILITIES ..." nav repeated twice, tiny serif text, and the tagline broken one word per line ("When other / sign makers / find a ..."). It has no mobile layout.
- The home page footer shows a broken image box, links to "EDJE Shopping" and "Website Designed By EDJE technologies", and ends with a keyword-stuffed line ("This Site Contains Information On: Parker Signs & Graphics, Parker Signs, Parker Sign, Signs, ... Business Sign, Business Signs"). All gone.
- No phone number, address or email anywhere on the home page; they only appear on the Contact page. The concept puts the phone in the header, hero, a contact strip right under the hero and the contact section, and adds a sign request form and a map.
- The portfolio is 34 separate small pop-up pages with 80px thumbnails behind an accordion menu, and the "More Signs" page shows no text at all. The concept shows every project in one filterable grid with a lightbox and the credits from each project sheet.
- The Capabilities page says "With over 30 years of experience" while the history says 1972; the concept uses "since 1972" and computes the years.
- The Gray's Lake project sheet spells the park "Grey's Lake" in its heading and "Gray's Lake" below; the concept uses "Gray's Lake Park".
- Checked at 1280px and 390px with no sideways scrolling.

## Owner should confirm

- Shop hours: not on the current site. The concept says "Call ahead for shop hours".
- Contact person: the Contact page lists John Parker Jr., (515) 962-0330 ext. 12, jr@parkersign.com. Confirm JR is still the right contact and that the fax number (515) 962-0570 is still in use.
- The Class "A" license and bonding statement is still current.
- Whether the business is still "Incorporated" under the same name (the logo and project sheets say "Parker Signs & Graphics, Inc.").
- The archive photo on the Evolution page (a man standing in front of a hand-lettered sign) is not captioned on their site; the concept shows it without a name. Who is it?
- Portfolio grouping (business, parks & civic, schools & athletics, museums/churches/nonprofits) is our own; the "More Signs" captions are read from the signs in the photos. Housby Truck Lube and Brokers International have no location on their sheets.
- "Known throughout the Midwest" comes from the Capabilities page; the town list is built from the portfolio locations, not a stated service area.
- Products: the list is verbatim from their Products page; electronic message centers appear in the portfolio but not on that list. Confirm whether to add them.
- Reviews: their site has no testimonials, so the concept only links to a Google search for the business. No rating or count is shown.

## Photos

All photos and the logo are their own, from parkersign.com (portfolio project pages, the "More Signs" page, the Evolution and Capabilities pages). They are small (380 × 330 px) web exports from the old site; higher-resolution originals should replace them before launch. No stock photos are used.
