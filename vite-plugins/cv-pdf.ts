import { mkdir, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { createServer, type Plugin, type ViteDevServer } from 'vite'

// Builds the CV PDF from src/content/cv.ts with react-pdf, in Node:
//   build → dist/<Name>-CV.pdf, plus dist/download/index.html redirecting to it
//   dev   → serves the same two URLs, rendered on each request
//   preview → `/download` redirects to `/download/`, as GitHub Pages does
// so https://<site>/download opens the CV in the browser's PDF viewer and the
// file always matches the content it was built from.

const ENTRY = '/src/pdf/render.tsx'

type RenderModule = {
  renderCv: (resolveAsset: (url: string) => string) => Promise<Buffer>
  cvFileName: () => string
}

// Imported assets come back as root-relative URLs (`/src/assets/…`,
// `/node_modules/…`); react-pdf in Node wants file paths. data: URIs pass through.
const toPath = (root: string) => (url: string) =>
  url.startsWith('/@fs/') ? url.slice(4) : url.startsWith('/') ? join(root, url) : url

const redirectPage = (target: string) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>CV — opening…</title>
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${target}" />
    <script>location.replace(${JSON.stringify(target)})</script>
  </head>
  <body style="font-family: system-ui, sans-serif; padding: 2rem">
    <a href="${target}">Open the CV (PDF)</a>
  </body>
</html>
`

const load = async (server: ViteDevServer) => (await server.ssrLoadModule(ENTRY)) as RenderModule

export default function cvPdf(): Plugin {
  let root = process.cwd()
  let outDir = 'dist'
  let isBuild = false

  return {
    name: 'cv-pdf',
    configResolved(config) {
      root = config.root
      outDir = resolve(config.root, config.build.outDir)
      isBuild = config.command === 'build'
    },

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = (req.url ?? '').split('?')[0]
        try {
          if (path === '/download' || path === '/download/') {
            const { cvFileName } = await load(server)
            res.writeHead(302, { Location: `/${cvFileName()}` }).end()
          } else if (path.endsWith('-CV.pdf')) {
            const { cvFileName, renderCv } = await load(server)
            const name = cvFileName()
            if (path !== `/${name}`) return next()
            const pdf = await renderCv(toPath(root))
            res.writeHead(200, {
              'Content-Type': 'application/pdf',
              'Content-Disposition': `inline; filename="${name}"`,
              'Cache-Control': 'no-store',
            })
            res.end(pdf)
          } else next()
        } catch (e) {
          next(e)
        }
      })
    },

    // `vite preview` serves dist/ but falls back to the SPA for `/download`;
    // GitHub Pages redirects it to `/download/` (the folder). Mirror that.
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if ((req.url ?? '').split('?')[0] === '/download') res.writeHead(301, { Location: '/download/' }).end()
        else next()
      })
    },

    async closeBundle() {
      if (!isBuild) return
      // A throwaway SSR server just to load the render entry with Vite's resolution.
      const server = await createServer({
        root,
        configFile: false,
        server: { middlewareMode: true, hmr: false, ws: false },
        appType: 'custom',
        logLevel: 'error',
      })
      try {
        const { cvFileName, renderCv } = await load(server)
        const name = cvFileName()
        const pdf = await renderCv(toPath(root))
        await writeFile(join(outDir, name), pdf)
        await mkdir(join(outDir, 'download'), { recursive: true })
        await writeFile(join(outDir, 'download', 'index.html'), redirectPage(`../${name}`))
        console.log(`✓ cv-pdf: ${name} (${(pdf.length / 1024).toFixed(0)} kB) + download/index.html`)
      } finally {
        await server.close()
      }
    },
  }
}
