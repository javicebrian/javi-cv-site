import Reveal from '../components/Reveal'
import Section, { type SectionProps } from '../components/Section'
import { cv } from '../content/cv'

export default function About({ id }: SectionProps) {
  return (
    <Section id={id} title="About">
      <div className="space-y-5 text-lg leading-relaxed text-muted">
        {cv.about.map((p, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
