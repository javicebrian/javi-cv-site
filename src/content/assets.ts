// Images referenced by file name from cv.ts. Dropping a file into the folder is
// enough: Vite picks it up here, hashes and optimises it at build time.
const glob = (files: Record<string, string>) =>
  Object.fromEntries(Object.entries(files).map(([path, url]) => [path.split('/').pop()!, url]))

const logos = glob(import.meta.glob('../assets/logos/*.{svg,png,jpg,jpeg,webp}', { eager: true, import: 'default' }))
const achievements = glob(
  import.meta.glob('../assets/achievements/*.{svg,png,jpg,jpeg,webp}', { eager: true, import: 'default' }),
)
const interests = glob(import.meta.glob('../assets/interests/*.{svg,png,jpg,jpeg,webp}', { eager: true, import: 'default' }))

export const logoUrl = (file?: string) => (file ? logos[file] : undefined)
export const achievementUrl = (file?: string) => (file ? achievements[file] : undefined)
export const interestUrl = (file?: string) => (file ? interests[file] : undefined)
