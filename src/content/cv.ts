import type { CV } from './types'

// PLACEHOLDER — to be filled from docs/Profile (1).pdf. Keep the copy in English.
export const cv: CV = {
  name: 'Your Name',
  headline: 'One line on what you do.',
  location: 'City, Country',
  about: ['A short paragraph about you.'],
  links: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
  experience: [
    {
      company: 'Company',
      title: 'Role',
      start: '2020',
      highlights: ['What you shipped or changed.'],
      tags: ['Tag'],
    },
  ],
  skills: [{ name: 'Group', items: ['Skill'] }],
  projects: [{ name: 'Project', description: 'What it is.' }],
  education: [{ school: 'School', degree: 'Degree' }],
  contact: { cta: 'Get in touch.' },
}
