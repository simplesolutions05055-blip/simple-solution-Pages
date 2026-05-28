# Portfolio page — HIDDEN from navigation (temporary)

This page is fully built and intact (HTML + video + structure preserved)
but currently HIDDEN from the site navigation by user request, until the
real portfolio materials (case studies, images, videos) are ready.

## What was removed
- The "תיק עבודות" link from the top nav of all pages
- The "תיק עבודות" link from the footer "שירותים" list of all pages

## What was preserved (untouched)
- /portfolio/index.html — the full page
- /videos/portfolio.mp4 — the hero video
- All styling, structure, breadcrumbs, JSON-LD

## How to RESTORE (bring it back)
Re-add this nav link after the mega-menu </div> in every page header:
    <a href="/main-site-redesign/portfolio/">תיק עבודות</a>

And this footer list item after the automation <li>:
    <li><a href="/main-site-redesign/portfolio/">תיק עבודות</a></li>

(Ask Claude to "restore the portfolio page to the navigation" — it will
re-run the inverse of the removal script.)
