import type { ReactNode } from 'react'
import Reveal from './Reveal'

export interface SectionProps {
  id: string
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <h2 className="mb-12 font-mono text-sm tracking-widest text-accent uppercase">{children}</h2>
    </Reveal>
  )
}

// Common frame for every content section: anchor id, width, spacing, heading.
// Without `title`, the section brings its own headings (e.g. a two-column block).
export default function Section({ id, title, children }: SectionProps & { title?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </section>
  )
}
