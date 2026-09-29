import type { ComponentType } from 'react'
import type { SectionProps } from '../components/Section'
import About from './About'
import Contact from './Contact'
import Achievements from './Achievements'
import EducationLanguages from './EducationLanguages'
import Experience from './Experience'
import Hero from './Hero'
import Interests from './Interests'
import Skills from './Skills'

// Page order and nav entries in one place. Blocks follow docs/JaviCebrianCV.pdf;
// the PDF's two columns become one scroll, with Work experience (its right
// column) moved up right after the statement. `nav: false` keeps a section out of
// the menu — the menu only lists the main stops.
export const sections: { id: string; label: string; nav: boolean; Component: ComponentType<SectionProps> }[] = [
  { id: 'top', label: 'Home', nav: false, Component: Hero },
  { id: 'about', label: 'About', nav: true, Component: About },
  { id: 'experience', label: 'Experience', nav: true, Component: Experience },
  { id: 'skills', label: 'Skills', nav: true, Component: Skills },
  { id: 'education', label: 'Education & languages', nav: false, Component: EducationLanguages },
  { id: 'achievements', label: 'Achievements', nav: false, Component: Achievements },
  { id: 'interests', label: 'Interests', nav: true, Component: Interests },
  { id: 'contact', label: 'Contact', nav: true, Component: Contact },
]
