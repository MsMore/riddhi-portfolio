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

The build checks TypeScript and creates a static export in `out/`. Publish that directory to a static host and connect riddhimore.com later. Serve the export over HTTP; this static configuration does not use `next start`.

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

The GitHub Pages workflow in `.github/workflows/deploy.yml` builds and publishes pushes to `main` once repository Pages is enabled. The custom domain is `riddhimore.com`. Account setup and DNS connection are still pending; see DEPLOYMENT.md for the exact steps and current status.

See CONTENT-SOURCES.md for source records and asset credits.
