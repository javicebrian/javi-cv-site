// Build guard: docs/ holds the owner's source material (reference CV with the
// postal address, LinkedIn export). It is committed to the private repo for
// documentation, but must never reach the deployed site. Vite only ships
// index.html, public/ and what src/ imports, so docs/ is out by construction;
// this check catches accidents (a PDF copied into public/, an import from docs/).
// The site has no legitimate static PDF: the CV is generated in the browser.
import { readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const DIST = 'dist'
const docs = new Set(readdirSync('docs', { recursive: true }).map((p) => String(p).split('/').pop()))

const offenders = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path)
    else if (/\.pdf$/i.test(name) || (docs.has(name) && name !== 'README.md' && name !== '.gitkeep'))
      offenders.push(relative(DIST, path))
  }
}
walk(DIST)

if (offenders.length) {
  console.error(`✗ dist/ contains files that must not be deployed:\n  ${offenders.join('\n  ')}`)
  process.exit(1)
}
console.log('✓ dist/ is clean (no PDFs, nothing from docs/)')
