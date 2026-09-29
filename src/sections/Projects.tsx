import { motion } from 'motion/react'
import Reveal from '../components/Reveal'
import Section, { type SectionProps } from '../components/Section'
import { cv } from '../content/cv'

export default function Projects({ id }: SectionProps) {
  return (
    <Section id={id} title="Projects">
      <div className="grid gap-6 sm:grid-cols-2">
        {cv.projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <motion.a
              href={p.href}
              target={p.href ? '_blank' : undefined}
              rel="noreferrer"
              whileHover={{ y: -4 }}
              className="block h-full rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/50"
            >
              <h3 className="font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted">{p.description}</p>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
