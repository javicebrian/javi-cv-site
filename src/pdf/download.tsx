import { cv } from '../content/cv'

// react-pdf and the document are ~1.5 MB; they are only fetched when a visitor
// asks for the PDF (or hovers the button, see `preloadCv`).
const load = () => Promise.all([import('@react-pdf/renderer'), import('./CvDocument')])

export const preloadCv = () => void load()

export const cvFileName = () =>
  `${cv.name.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-')}-CV.pdf`

/** Render the CV from cv.ts to a PDF in the browser and save it. */
export async function downloadCv() {
  const [{ pdf }, { default: CvDocument }] = await load()
  const blob = await pdf(<CvDocument cv={cv} year={new Date().getFullYear()} />).toBlob()
  const url = URL.createObjectURL(blob)
  const a = Object.assign(document.createElement('a'), { href: url, download: cvFileName() })
  document.body.append(a)
  a.click()
  a.remove()
  // Give the browser a moment to start the download before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}
