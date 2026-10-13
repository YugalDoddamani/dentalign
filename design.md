# Design — Dentalign

The single source of truth for all Dentalign routes. Keep the existing static HTML architecture, content, navigation, structured data, and working appointment flow.

## Genre
Modern-minimal, warm clinical editorial.

## Macrostructure family
- Marketing: editorial hero, generous section breaks, clear content-led grids, one obvious primary action per section.
- Clinic pages: compact page introduction, then breathable and readable sections.
- Treatment pages: service-specific introduction, clear information hierarchy, supporting details, and a direct appointment path.

## Theme
- Paper `#F8F7F2`, paper 2 `#EFEEE7`, surface `#FCFBF8`.
- Ink `#21433D`, deep ink `#17352F`, secondary text `#53645D`.
- Rule `#DDE2D9`, sage accent `#A9C9B8`, interactive green `#477D68`.
- Use solid colours only: no gradients, glossy/glass effects, or exaggerated shadows.

## Typography
- Display: Iowan Old Style / Palatino / Georgia, regular-to-medium.
- Body: system sans-serif, regular.
- Calm display sizes, slightly tight heading tracking, readable body line-height.

## Spacing
Use named 4-point tokens from `assets/css/tokens.css`. Give sections generous responsive spacing. Avoid nested cards unless content requires them.

## Motion
- Homepage-only restrained image parallax.
- Continuous credential marquee with reduced-motion fallback.
- Short brand reveal under one second.
- Respect `prefers-reduced-motion`; no scroll-reveal animations.

## Microinteractions
Quiet transitions, visible keyboard focus, no bounce, no decorative glass, and minimal shadow. Keep the appointment form and WhatsApp handoff working.

## CTA voice
- Primary: solid deep botanical green.
- Secondary: restrained outline or text link.
- Each section should have one primary action; retain distinct contact methods only where useful.

## Shared across all pages
Dentalign logo and wordmark, palette, typography, header, footer, button language, spacing rhythm, loader, and developer credit.

## Page-specific variation
Hero size, service content, imagery, tables, FAQs, and grid columns may vary with the content.

## Implementation boundaries
No framework or external dependency. Keep all existing routes and clinic content. Cloudflare Pages serves from the repository root, so root-relative asset paths are intentional.
