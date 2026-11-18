# Riddhi More — Electric Notebook

A responsive portfolio built with Next.js, TypeScript, and Tailwind CSS. It uses a balanced layout, bright lime accents, hand-drawn icons, light/dark themes, and expandable résumé content.

## Run locally

Use Node.js 22 LTS or newer. In this folder:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Dependencies are already installed in the working project, so only `npm run dev` is needed there.

## Build

```sh
npm run build
```

The build checks TypeScript and creates a static export in `out/`. GitHub Actions publishes that directory to riddhimore.com. Serve the export over HTTP; this static configuration does not use `next start`.

## Layout

Landing → About → AI development process → Experience timeline → Education → Projects & publications → Skills and certifications → Contact.

About, the process, experience, and education have narrower reading widths. The contact banner spans the full page, with its content aligned to the page gutters. Projects and skills use wider two-column layouts with generous outer margins. Project columns flow independently: expanding a card moves only the cards below it in the same column, with no gaps in the other column. The project layout preserves source and keyboard order and recalculates for filters, expanded content, and screen size. Education stays in a single column, and timeline dates use handwriting. All layouts adapt to narrow screens.

Nine experience entries, two education entries, eight projects, and four publication records. Full responsibilities, methods, results, and source links are available in expandable entries.

## Interactions

- Mouse-responsive notebook background; doodles shift with the pointer and lift, tilt, and grow as it approaches.
- Process tabs show one step at a time, with a heading and description.
- Custom SVG cursor for precise pointing devices.
- Bulb theme toggle with a saved local preference.
- Project filters, individual expansion, and Expand all / Collapse all controls.
- Skill stickers reveal experience and link to related projects.
- Project links reveal and open the correct entry even after filtering.
- Reading progress at the top.

Reduced-motion mode responds directly without easing. Touch users get a static background. Controls support keyboards. No photo, mascot, external API, or backend is required.

## Editing

- `app/content.ts`: career, education, projects, papers, process, and contact.
- `app/page.tsx`: sections, timeline, and page content.
- `app/globals.css`: grids, responsive layout, typography, and theme colors.
- `app/interactive-notebook.tsx`: pointer-responsive canvas and doodles.
- `app/theme-toggle.tsx`: theme preference.
- `app/project-shelf.tsx`: project grid, filtering, and expandable details.
- `app/tech-stack.tsx`: skill categories and project connections.
- `app/notebook-controls.tsx`: process, expansion controls, and reading progress.
- `app/doodle-data.ts`: normalized paths from the Doodle Icons pack.
- `app/layout.tsx`: metadata, locally hosted fonts, and initial theme.

## Validation

Production build and TypeScript checks pass. Desktop, tablet, and 320px phone layouts were checked without horizontal overflow. Doodle motion, theme switching, filtering, project expansion, skill links, and internal anchors were verified. The fresh browser preview has no runtime warnings or errors.

## Publishing

The site is live at [riddhimore.com](https://riddhimore.com), hosted on GitHub Pages with HTTPS. The [source repository](https://github.com/MsMore/riddhi-portfolio) publishes automatically when changes reach `main`. Domain registration and DNS remain at Hostinger. See DEPLOYMENT.md for deployment and DNS details.

See CONTENT-SOURCES.md for source records and asset credits.

## Demonstrations

- `/compass/`: a password-protected unit-volume analytics prototype, with two Excel inputs, synthetic treatment events, lag selection, chronological forecast evaluation and real open-source browser AI.
- `/deck/`: **From AI to Business Value**, a password-protected six-slide presentation built around project, stakeholder, capability, metrics and delivery diagrams. The viewer contains only slides and discreet navigation/presentation icons, with keyboard navigation and fullscreen mode.

Both routes use the existing static GitHub Pages deployment. Brand Compass loads its WebLLM/Qwen3 model only after the visitor chooses **Load AI on this device**. The first load downloads several GB; later visits may reuse browser-cached files. A compatible WebGPU browser and enough GPU memory are required for AI; analytics remain available without loading a model. No API key or per-request AI service fee is required. Questions, retrieval, calculations and inference run in the visitor's browser.

Before presenting, load and test the model in the browser you will use on the final `riddhimore.com/compass/` URL. A localhost test or a different browser profile does not warm that site's model cache. Generated explanations require human review; chart values are supplied by bounded analytical functions. The demo includes no Amgen data, internal code or clinical advice.

Model-written interpretation is qualitative. Exact unit volumes, lag results, forecast dates and evaluation metrics appear in calculated chat views. Unsolicited action lists are withheld unless the question requests strategy or recommendations. Predictive associations do not establish clinical or commercial causation. Synthetic dose values are demonstration units, not medical guidance.

The dashboard summarizes 60 monthly observations and a synthetic five-year population of 2,369,871 events with 64 columns. The clinical Excel file contains a clearly labeled 3,000-row sample. The complete population is available as six calendar-year CSV.gz downloads after unlocking; those files are fetched only when requested. Rolling one-step holdout scores and fixed-origin unseen-quarter scores are labeled separately.

The repository contains a generic unlock screen and prebuilt encrypted app/download packages. Application sources and the package builder are kept in the owner's separate local authoring workspace. Password-derived AES-GCM keys and decrypted content remain in page memory; reload, close/reopen, and back/forward restoration require unlocking again. Passwords and keys are not written to browser storage. Use **Lock app** to clear the current page immediately. Downloaded files remain on the visitor's device. This is static password protection, without accounts, server-side rate limits or identity-based access. Previously published versions can remain in Git history; the current deployment does not serve their plaintext assets.

The new pages use scoped styles. `trailingSlash: true` emits route folders with `index.html` for GitHub Pages. The portfolio landing page retains its content and interactions.
