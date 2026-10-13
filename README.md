# Dentalign Goa — Mobile-First Website Rebuild

Static, dependency-free rebuild of the Dentalign Multispeciality Dental Clinic &
Orthodontic Centre website (Miramar, Panaji, Goa), implementing the
**Dentalign Website Audit & Improvement Plan (14 Oct 2026)**.

Old site: `https://dentaligngoa.wixsite.com/dentalign`
Target domain: **`https://dentalign.in/`** (all canonicals/OG/sitemap use this —
see "Go-live checklist" if the final domain differs).

## What was built

| Audit requirement | Implementation |
|---|---|
| §3 Branding | Custom SVG logo + favicon, no Wix banner/subdomain, professional titles |
| §4.1–4.2 SEO | Keyword titles + meta descriptions on every page |
| §4.3 Structured data | `Dentist` JSON-LD (address, hours, geo, socials, founders) + `FAQPage` + `BreadcrumbList` |
| §4.4 Sitemap + 404 | `sitemap.xml`, `robots.txt`, branded `404.html` |
| §4.5 Alt text | Keyword-rich alt on every image (no filenames) |
| §4.6 Tap-to-call | `tel:+919322972363` everywhere; no `telephone=no` blocker |
| §4.7 Structure | 7 service pages + doctors, gallery, FAQ, contact, booking (13 pages) |
| §5 Design system | Navy `#112F5B`, teal `#0E7490/#06B6D4`, gold `#F5B841`, pill CTAs, 12px cards |
| §5.2 Sections | Sticky header, hero + trust strip, service cards, doctors, gallery, reviews, pricing, FAQ, map + hours, footer |
| §6 Conversion | Tap-to-call, WhatsApp links + floating bubble, hero CTAs, sticky mobile Call/WhatsApp/Book bar, form with **phone + service + preferred-time**, emergency strip, "Open now" pill, Google-reviews links |
| §8 Performance | ~15 KB CSS + ~3 KB JS, zero frameworks, system fonts, lazy images, responsive `srcset` hero — targets LCP < 2.5s on 4G |

## Project structure

```
├── index.html                 # Home (hero, services, doctors, reviews, pricing, FAQ, map, booking)
├── services/                  # 7 SEO service pages (unique content + FAQ schema each)
│   ├── invisalign-clear-aligners-goa.html
│   ├── braces-orthodontics-goa.html
│   ├── dental-implants-panaji.html
│   ├── painless-root-canal-treatment.html
│   ├── smile-designing-veneers.html
│   ├── dental-bleaching-whitening.html
│   └── pediatric-dentistry.html
├── doctors.html gallery.html faq.html contact.html book.html 404.html
├── assets/css/styles.css      # Single mobile-first stylesheet (no build step)
├── assets/js/main.js          # Nav, open-now pill, WhatsApp booking form (~3 KB)
├── assets/img/logo.svg        # Brand mark (favicon.svg = tab icon)
├── sitemap.xml robots.txt
```

## Run locally / preview

No build step — any static server works:

```bash
cd dentalign && python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Drag-and-drop the folder to **Netlify / Vercel / Cloudflare Pages**, or enable
**GitHub Pages** (Settings → Pages → Deploy from branch). Then point the
`dentalign.in` DNS to the host.

## How booking works (no backend needed)

The form on `index.html` / `book.html` composes a WhatsApp message with
name + phone + service + preferred time and opens `wa.me/919322972363`.
The clinic receives a ready-made enquiry — no server, no spam folder.

## Go-live checklist (for the clinic)

- [ ] Buy `dentalign.in` (or `dentaligngoa.com`) and point DNS to the host.
      If the domain differs, find-replace `dentalign.in` across the repo.
- [ ] **Verify hours**: site shows Mon–Sat 9:30 AM–8 PM (from Practo) with
      Sunday by appointment. Update `contact.html`, `index.html`, JSON-LD,
      and the `OPEN` constant in `assets/js/main.js` if different.
- [ ] **Replace geo coordinates** (`15.4757, 73.8067` is approximate Miramar)
      in `index.html` JSON-LD with the Google Business Profile pin.
- [ ] Download the 4 clinic photos from Wix into `assets/img/` and swap the
      `static.wixstatic.com` URLs (they're hotlinked so the old site's media
      is reused; local copies remove the Wix dependency). Same for `og:image`.
- [ ] Add real before/after photos (with consent) to `gallery.html`.
- [ ] Collect Google reviews; expand the testimonial section to 6–9 cards.
- [ ] Confirm treatment prices, then replace the "Ask on WhatsApp" pricing rows.
- [ ] Set up `care@dentalign.in` (Google Workspace/Zoho) and swap the Gmail.
- [ ] Install GA4 + Search Console, submit `sitemap.xml`.
- [ ] Run PageSpeed Insights; target LCP < 2.5s, CLS < 0.1.
