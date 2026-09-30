# cebrian.io

Personal website and CV of **Javi Cebrián**, Product Engineer.

Live at **https://cebrian.io**

A single animated page built from one typed content file, plus a PDF CV
generated at build time from that same content, so the site and the PDF never
drift apart.

- **https://cebrian.io/download** opens the CV in the browser's PDF viewer
- **https://cebrian.io/Javi-Cebrian-CV.pdf** is the file itself

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first `@theme` tokens, light/dark)
- [Motion](https://motion.dev) for scroll reveals, layout and theme transitions
- [@react-pdf/renderer](https://react-pdf.org) for the PDF CV, rendered in Node during the build

## Develop

Requires Node 22.

```bash
npm install
npm run dev      # http://localhost:5176 (also serves /download and the PDF, rendered live)
npm run build    # type-check, build to dist/ + the CV PDF, then check dist/ for stray files
npm run lint     # oxlint
```

## Where things live

| Path | What |
|---|---|
| `src/content/cv.ts` | **All the copy**: experience, skills, education, languages, achievements, interests. Edit this to update both the site and the PDF. |
| `src/content/types.ts` | The shape of the CV. |
| `src/sections/` | One component per section of the page. |
| `src/pdf/CvDocument.tsx` | The one-page A4 PDF layout. |
| `vite-plugins/cv-pdf.ts` | Renders the PDF during `vite build` (and on request in dev) and writes `/download`. |
| `src/assets/` | Company logos and achievement badges, referenced by file name from `cv.ts`. |
| `src/index.css` | Design tokens for both themes. |

## Deploy

Every push to `main` builds the site and publishes `dist/` to GitHub Pages
(`.github/workflows/deploy.yml`), served at the custom domain `cebrian.io`.
