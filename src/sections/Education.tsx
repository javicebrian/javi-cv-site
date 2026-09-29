import Reveal from '../components/Reveal'
import Section, { type SectionProps } from '../components/Section'
import { cv } from '../content/cv'

export default function Education({ id }: SectionProps) {
  return (
    <Section id={id} title="Education">
      <ul className="space-y-6">
        {cv.education.map((e) => (
          <li key={e.school + e.degree}>
            <Reveal>
              {e.start && (
                <p className="font-mono text-xs text-muted">
                  {e.start} — {e.end}
                </p>
              )}
              <h3 className="mt-1 text-lg font-semibold">{e.degree}</h3>
              <p className="text-muted">
                {e.school}
                {e.note && ` · ${e.note}`}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
