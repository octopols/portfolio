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

## Analytics

First-party, no vendor. `js/track.js` runs on every page and beacons to a Google
Apps Script web app (`tools/resume-logger.gs`) which writes into a spreadsheet.

Two tabs:

- **Sessions** — one row per visit, upserted as it unfolds: source, journey
  (pages in order), focused seconds, device/browser/OS/screen, city/country/org
  from an IP lookup, and whether the visit reached the résumé.
- **Opens** — one row per résumé open, with reading time and whether the PDF was
  downloaded.

`/track/` generates a distinct `?s=` link per application, so an open identifies
itself by which link was used.

**Setup**

1. New Google Sheet → **Extensions → Apps Script** (must be from inside the
   Sheet — a standalone project cannot reach it)
2. Paste `tools/resume-logger.gs`, save
3. **Deploy → New deployment → Web app**, Execute as **Me**, access **Anyone**
4. Copy the `/exec` URL into `ENDPOINT` in `js/track.js`

Open the `/exec` URL in a browser: it prints which spreadsheet it writes to,
row counts, and recent visits. That is the first thing to check when something
looks wrong.

**Redeploying:** editing the script does not update the live URL. Use
**Deploy → Manage deployments → pencil → Version: New version**, or the old code
keeps serving.

**Reliability.** Every payload goes through a localStorage queue and is sent as
a batch. A beacon lost to a dead tab, a dropped network or a blocker stays
queued and rides along with the next send — on this page or a later visit.
Every event is an idempotent upsert keyed on session id, so a replayed batch
cannot double-count; `seconds` only ever climbs.

**Limits.** Web opens only — a PDF sent as an email attachment is invisible.
Anyone blocking scripts is invisible. It cannot identify a person: no browser
API exposes that and no other origin's cookies are readable. Identity comes from
the per-link mapping in `/track/`.

**Privacy.** Storing IPs makes this personal data under India's DPDP Act and the
GDPR. What is collected is documented on `/colophon/`. Set `GEO = ""` in
`js/track.js` to stop resolving IP entirely; everything else keeps working.

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
