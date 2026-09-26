# Abdul Rafi — Portfolio

A static Astro portfolio presenting software engineering, robotics, AI, and embedded-systems work.

## Run locally

```sh
npm install
npm run dev
```

Production validation:

```sh
npm run build
npm run preview
```

## Content map

- `src/pages/index.astro` — home sections and profile content
- `src/pages/projects.astro` — filterable project archive
- `src/pages/cv.astro` — software download and robotics view-only presentation
- `src/data/projects.ts` — project copy and repository/report URLs
- `src/components/Hero.astro` — hero content and portrait composition
- `src/styles/global.css` — design system and responsive behavior
- `public/cv/` — the two published CV files

Before deployment, update the `site` value in `astro.config.mjs` to the final production domain. The processed transparent hero portrait and its untouched source are stored in `public/images/`.
