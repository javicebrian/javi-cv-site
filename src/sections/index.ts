import type { ComponentType } from 'react'
import type { SectionProps } from '../components/Section'
import About from './About'
import Contact from './Contact'
import Experience from './Experience'
import Hero from './Hero'
import Projects from './Projects'
import Skills from './Skills'

// Page order and nav entries in one place. `nav: false` keeps a section out of
// the menu (the hero is reached via the logo).
export const sections: { id: string; label: string; nav: boolean; Component: ComponentType<SectionProps> }[] = [
  { id: 'top', label: 'Home', nav: false, Component: Hero },
  { id: 'about', label: 'About', nav: true, Component: About },
  { id: 'experience', label: 'Experience', nav: true, Component: Experience },
  { id: 'skills', label: 'Skills', nav: true, Component: Skills },
  { id: 'projects', label: 'Projects', nav: true, Component: Projects },
  { id: 'contact', label: 'Contact', nav: true, Component: Contact },
]
