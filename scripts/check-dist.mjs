// Build guard: docs/ holds the owner's source material (reference CV with the
// postal address, LinkedIn export). It is committed to the private repo for
// documentation, but must never reach the deployed site. Vite only ships
// index.html, public/ and what src/ imports, so docs/ is out by construction;
// this check catches accidents (a PDF copied into public/, an import from docs/).
// The only legitimate PDF is the CV generated at build time from cv.ts
// (vite-plugins/cv-pdf.ts): `<Name>-CV.pdf` at the dist root, produced by
// react-pdf. Any other PDF fails the build.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const DIST = 'dist'
// docs/ is absent in the GitHub copy of the repo (see scripts/publish-github.sh).
const docs = new Set(
  existsSync('docs') ? readdirSync('docs', { recursive: true }).map((p) => String(p).split('/').pop()) : [],
)

const isGeneratedCv = (path, name) =>
  dirOf(path) === DIST && /-CV\.pdf$/.test(name) && /\n\d+ 0 obj\s*\(react-pdf\)/.test(readFileSync(path, 'latin1')) // Producer string
const dirOf = (path) => path.slice(0, path.lastIndexOf('/'))

const offenders = []
let cvs = 0
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path)
    else if (docs.has(name) && name !== 'README.md' && name !== '.gitkeep') offenders.push(relative(DIST, path))
    else if (/\.pdf$/i.test(name)) {
      if (isGeneratedCv(path, name)) cvs++
      else offenders.push(relative(DIST, path))
    }
  }
}
walk(DIST)
if (cvs !== 1) offenders.push(`expected exactly one generated CV PDF, found ${cvs}`)

if (offenders.length) {
  console.error(`✗ dist/ contains files that must not be deployed:\n  ${offenders.join('\n  ')}`)
  process.exit(1)
}
console.log('✓ dist/ is clean (only the generated CV PDF, nothing from docs/)')
