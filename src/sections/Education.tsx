import Reveal from '../components/Reveal'
import { SectionTitle } from '../components/Section'
import { cv } from '../content/cv'

// Rendered inside EducationLanguages, not as a section of its own.
export default function Education() {
  return (
    <div>
      <SectionTitle>Education</SectionTitle>
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
              <p className="text-muted">{e.school}</p>
              {e.note && <p className="mt-1 text-sm text-muted">{e.note}</p>}
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}
