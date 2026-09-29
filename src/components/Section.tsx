import type { ReactNode } from 'react'
import Reveal from './Reveal'

export interface SectionProps {
  id: string
}

// Common frame for every content section: anchor id, width, spacing, heading.
export default function Section({ id, title, children }: SectionProps & { title: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="mb-12 font-mono text-sm tracking-widest text-accent uppercase">{title}</h2>
      </Reveal>
      {children}
    </section>
  )
}
