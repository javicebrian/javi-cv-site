import Reveal from '../components/Reveal'
import Section, { type SectionProps } from '../components/Section'
import { cv } from '../content/cv'

export default function Skills({ id }: SectionProps) {
  return (
    <Section id={id} title="Skills">
      <div className="grid gap-8 sm:grid-cols-2">
        {cv.skills.map((g, i) => (
          <Reveal key={g.name} delay={i * 0.08}>
            <h3 className="mb-3 font-semibold">{g.name}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className="rounded-md bg-surface px-3 py-1 text-sm text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
