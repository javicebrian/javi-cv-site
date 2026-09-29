import Reveal from '../components/Reveal'
import Section, { type SectionProps } from '../components/Section'
import { cv } from '../content/cv'

export default function About({ id }: SectionProps) {
  return (
    <Section id={id} title="Personal statement">
      <div className="space-y-5 text-lg leading-relaxed text-muted">
        {cv.about.map((p, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <p className={i === 0 ? 'text-xl text-fg md:text-2xl' : undefined}>{p}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
