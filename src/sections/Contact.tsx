import Reveal from '../components/Reveal'
import Section, { type SectionProps } from '../components/Section'
import { cv } from '../content/cv'

const YEAR = new Date().getFullYear()

export default function Contact({ id }: SectionProps) {
  return (
    <Section id={id} title="Contact">
      <Reveal>
        <p className="text-3xl font-semibold md:text-4xl">{cv.contact.cta}</p>
        <a href={`mailto:${cv.contact.email}`} className="mt-6 inline-block text-accent hover:underline">
          {cv.contact.email}
        </a>
      </Reveal>
      <footer className="mt-24 font-mono text-xs text-muted">© {YEAR} cebrian.io</footer>
    </Section>
  )
}
