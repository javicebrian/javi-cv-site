// Shape of the CV. All site copy lives in `cv.ts` against these types, so
// sections stay pure layout and a content edit never touches a component.
// Modelled on docs/JaviCebrianCV.pdf (structure) + docs/Profile (1).pdf (long text).

export interface Link {
  label: string
  href: string
}

/** A paragraph, or a titled bullet list (e.g. one per product inside a role). */
export type Block = string | { title: string; items: string[] }

export interface Role {
  company: string
  title: string
  /** Free text, e.g. "Nov 2023". */
  start: string
  /** Omit for the current role. */
  end?: string
  location?: string
  /** One or two lines — the short CV blurb, always visible. */
  summary: string
  /** Extended text, shown when the role is expanded. */
  details?: Block[]
  tags?: string[]
  /** File name under src/assets/logos/. Falls back to a monogram. */
  logo?: string
}

export interface Skill {
  name: string
  /** 1–10, as drawn with dots in the PDF CV. */
  level: number
}

export interface Education {
  school: string
  degree: string
  start?: string
  end?: string
  note?: string
}

export interface Language {
  name: string
  label: string
  /** 0–1, drives the ring. */
  proficiency: number
}

export interface Achievement {
  title: string
  date: string
  detail: string
  /** File name under src/assets/achievements/: an alpha mask, painted in the theme colour. */
  image?: string
}

/** Icons drawn inline in components/InterestIcon.tsx (so they follow the theme). */
export type InterestIconName = 'parachute' | 'plane' | 'diver' | 'bike' | 'printer3d' | 'wrench'

export interface Interest {
  name: string
  icon: InterestIconName
}

export interface CV {
  name: string
  tagline: string
  headline: string
  location: string
  /** Public URL printed in the PDF header. */
  website: string
  /** Short personal statement: the PDF's version (must fit its one page). */
  statement: string[]
  /** Long version, shown on the web. */
  about: string[]
  links: Link[]
  experience: Role[]
  /** Roles only in the extended profile; shown as a compact list. */
  earlierExperience: Role[]
  technologies: Skill[]
  knowledge: string[]
  education: Education[]
  languages: Language[]
  achievements: Achievement[]
  interests: Interest[]
  contact: { email: string; cta: string }
}
