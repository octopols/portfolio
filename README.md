# hirnaymay.com

Source for my portfolio. Static HTML, no framework, no client-side router.

**Live**: [hirnaymay.com](https://hirnaymay.com)

## What's here

| Path | What it is |
| --- | --- |
| `index.html` | Home. Three case studies, the CV, projects, writing index, about, contact. |
| `writing/index.html` | Writing index. |
| `writing/<slug>/index.html` | One long-form piece each. Self-contained: own `<style>`, no shared CSS. |
| `projects/<slug>/index.html` | One project page each. Same self-contained pattern. |
| `photography.html` | Gallery, driven by `assets/photography/manifest.json`. |
| `css/styles.css` | Type scale, section chrome, article cards, lightbox, nav. Hand-written. |
| `css/tailwind.css` | **Build output — do not edit.** See below. |
| `js/nav.js` | Mobile nav panel. Loaded by every page. |
| `js/main.js` | Home + photography: scroll progress, reveal-on-scroll, footer year. |
| `js/writing.js` | Writing pages: reading progress, reveals. |

Home, the writing index and photography share `css/styles.css` and Tailwind
utilities. Article and project pages are deliberately standalone — each one
carries its own CSS so a page can be rewritten without regression-testing the
rest of the site.

## Build

Tailwind is compiled to a static stylesheet. The site previously loaded the
Play CDN from `<head>`, which is ~120KB gzipped of JavaScript that has to
execute and generate the stylesheet before the first styled paint — Tailwind
documents that build as development-only.

```bash
npm install
npm run build:css     # css/tailwind.src.css -> css/tailwind.css (~4KB gzipped)
```

Run it after adding or changing a utility class in `index.html`,
`photography.html` or `writing/index.html`. CI runs the same command on every
deploy, so a forgotten local rebuild can't ship stale CSS.

## Local development

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Root-absolute paths (`/writing/`,
`/css/tailwind.css`) mean you have to serve the directory — opening
`index.html` off the filesystem will not resolve them.

## Photography

`assets/photography/manifest.json` is generated, not hand-edited. Drop images
into `assets/photography/` and run:

```bash
npm run photos        # writes thumbnails/, optimized/ and manifest.json
```

Grid uses the 800px thumbnails and lazy-loads them; the lightbox loads the
1920px version on open.

## Résumé tracking

`/resume/` is a viewer around `docs/hirnaymay_bhaskar_resume.pdf`. It logs one
row per open into a Google Sheet — no analytics vendor. `/track/` generates a
distinct link per application, so an open identifies itself by which link was
used.

**Setup**

1. New Google Sheet → **Extensions → Apps Script**
2. Delete the stub, paste `tools/resume-logger.gs`, save
3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** ← required; visitors are not signed in
4. Authorize (Google warns about an unverified app — it is your own script)
5. Copy the `/exec` URL, paste it into `ENDPOINT` in `resume/index.html`

Visiting the `/exec` URL in a browser should print `ok`.

**Redeploying:** editing the script does not update the live web app. Use
**Deploy → Manage deployments → edit → Version: New version**, or the URL keeps
serving the old code.

**Columns:** Opened · Link · Seconds · Visit # · Returning · Downloaded · Came
from · Device. Seconds counts only focused time, and climbs while the page is
open — a row that stops updating is someone who left.

**Limits worth knowing.** It sees web opens, not PDFs sent as attachments.
Anyone blocking scripts is invisible. It cannot identify a person: no browser
API exposes that and no other origin's cookies are readable, which is why
identity comes from the per-link mapping in `/track/` instead.

## Constraints worth keeping

- **No third-party runtime dependencies.** No CDN scripts, no analytics vendor,
  no icon library. Only the font is external. The lightbox animates with CSS
  transitions rather than GSAP for this reason.
- **Progressive enhancement.** Every reveal animation is gated behind a `.js`
  class set in `<head>`. If a script fails the page is fully readable, not
  blank. The mobile nav panel degrades to a plain list of links.
- **Contrast floor.** `--label` (5.4:1) and `--secondary` (6.4:1) in
  `css/styles.css` are the dimmest greys allowed on `--bg-color`. Both clear
  WCAG AA at normal size. Don't introduce a dimmer one.
- **One nav.** The same block appears on all ten pages, with absolute links, so
  an article reached from search can get back to the work, the writing or the
  résumé without going home first.

## Deployment

Pushes to `main` build and deploy to GitHub Pages via
`.github/workflows/deploy.yml`. Custom domain via `CNAME`.

## Contact

**Hirnaymay Bhaskar** — Bengaluru

- [hirnaymay.com](https://hirnaymay.com)
- [@octopols](https://github.com/octopols) · [LinkedIn](https://linkedin.com/in/hirnaymay)
- hirnaymay@gmail.com
