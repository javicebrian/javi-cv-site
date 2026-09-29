// Shape of the CV. All site copy lives in `cv.ts` against these types, so
// sections stay pure layout and a content edit never touches a component.

export interface Link {
  label: string
  href: string
}

export interface Role {
  company: string
  title: string
  /** Free text, e.g. "2021" or "Mar 2021". */
  start: string
  /** Omit for the current role. */
  end?: string
  location?: string
  summary?: string
  highlights: string[]
  tags?: string[]
}

export interface SkillGroup {
  name: string
  items: string[]
}

export interface Project {
  name: string
  description: string
  href?: string
  tags?: string[]
}

export interface Education {
  school: string
  degree: string
  start?: string
  end?: string
}

export interface CV {
  name: string
  headline: string
  location?: string
  about: string[]
  links: Link[]
  experience: Role[]
  skills: SkillGroup[]
  projects: Project[]
  education: Education[]
  contact: { email?: string; cta: string }
}
