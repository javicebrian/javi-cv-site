import { renderToBuffer } from '@react-pdf/renderer'
import { cv } from '../content/cv'
import CvDocument from './CvDocument'
import { registerFonts, type ResolveAsset } from './fonts'

export { cvFileName } from './filename'

// Node-side entry, loaded through Vite (vite-plugins/cv-pdf.ts) so asset and
// font imports resolve exactly as they do for the site.
export function renderCv(resolveAsset: ResolveAsset) {
  registerFonts(resolveAsset)
  return renderToBuffer(<CvDocument cv={cv} year={new Date().getFullYear()} resolveAsset={resolveAsset} />)
}
