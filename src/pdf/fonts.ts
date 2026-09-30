import { Font } from '@react-pdf/renderer'
import light from '@fontsource/open-sans/files/open-sans-latin-300-normal.woff?url'
import lightItalic from '@fontsource/open-sans/files/open-sans-latin-300-italic.woff?url'
import regular from '@fontsource/open-sans/files/open-sans-latin-400-normal.woff?url'

// Open Sans, as in the original CV (Light for text, Light Italic for labels,
// Regular for headings and role titles).

/** Maps an imported asset URL (e.g. `/src/assets/logos/google.png`) to something
 *  react-pdf can open where it runs: a file path at build time (see render.tsx). */
export type ResolveAsset = (url: string) => string

let fontsRegistered = false
export function registerFonts(resolve: ResolveAsset) {
  if (fontsRegistered) return
  fontsRegistered = true
  Font.register({
    family: 'Open Sans',
    fonts: [
      { src: resolve(light), fontWeight: 300 },
      { src: resolve(lightItalic), fontWeight: 300, fontStyle: 'italic' },
      { src: resolve(regular), fontWeight: 400 },
    ],
  })
  // The original never breaks words; react-pdf hyphenates by default.
  Font.registerHyphenationCallback((word) => [word])
}
