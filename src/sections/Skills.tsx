import { motion } from 'motion/react'
import Reveal from '../components/Reveal'
import Section, { type SectionProps } from '../components/Section'
import { cv } from '../content/cv'

const DOTS = 10

// The PDF's dot scale, filling in left to right when the row scrolls into view.
function Dots({ level, label }: { level: number; label: string }) {
  return (
    <div className="flex gap-1.5" role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={DOTS} aria-valuenow={level}>
      {Array.from({ length: DOTS }, (_, i) => (
        // Colour comes from classes, not the animation: Motion would bake the
        // resolved colour into an inline style and it would miss theme switches.
        <motion.span
          key={i}
          className={`size-2.5 rounded-full ${i < level ? 'bg-accent' : 'bg-line'}`}
          initial={{ opacity: 0.25, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
        />
      ))}
    </div>
  )
}

export default function Skills({ id }: SectionProps) {
  return (
    <Section id={id} title="Skills">
      <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
        <div>
          <h3 className="mb-6 font-mono text-xs text-muted">01 Technologies</h3>
          <ul className="space-y-3">
            {cv.technologies.map((s) => (
              <li key={s.name}>
                <Reveal className="flex items-center justify-between gap-4">
                  <span className="text-sm">{s.name}</span>
                  <Dots level={s.level} label={s.name} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-6 font-mono text-xs text-muted">02 Knowledge</h3>
          <ul className="flex flex-col items-start gap-2">
            {cv.knowledge.map((k, i) => (
              <li key={k}>
                <Reveal delay={i * 0.05} className="rounded-md bg-surface px-3 py-1.5 text-sm text-muted">
                  {k}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
