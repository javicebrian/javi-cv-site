import { motion } from 'motion/react'
import Reveal from '../components/Reveal'
import { SectionTitle } from '../components/Section'
import { cv } from '../content/cv'

// The PDF's proficiency rings, drawn on scroll.
function Ring({ value }: { value: number }) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
      <circle cx="50" cy="50" r="44" fill="none" stroke="var(--color-line)" strokeWidth="6" />
      <motion.circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: value }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </svg>
  )
}

// Rendered inside EducationLanguages, not as a section of its own.
export default function Languages() {
  return (
    <div id="languages">
      <SectionTitle>Languages</SectionTitle>
      <ul className="flex flex-wrap gap-6 sm:gap-8">
        {cv.languages.map((l) => (
          <li key={l.name}>
            <Reveal className="relative grid size-36 place-items-center sm:size-40 text-center">
              <Ring value={l.proficiency} />
              <div>
                <p className="font-semibold tracking-wide uppercase">{l.name}</p>
                <p className="text-sm text-muted">{l.label}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}
