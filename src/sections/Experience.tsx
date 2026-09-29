import Reveal from '../components/Reveal'
import Section, { type SectionProps } from '../components/Section'
import { cv } from '../content/cv'

export default function Experience({ id }: SectionProps) {
  return (
    <Section id={id} title="Experience">
      <ol className="relative space-y-12 border-l border-line pl-8">
        {cv.experience.map((r) => (
          <li key={`${r.company}-${r.start}`} className="relative">
            <span className="absolute top-2 -left-[2.3rem] size-2.5 rounded-full bg-accent" />
            <Reveal>
              <p className="font-mono text-xs text-muted">
                {r.start} — {r.end ?? 'Present'}
                {r.location && ` · ${r.location}`}
              </p>
              <h3 className="mt-1 text-xl font-semibold">
                {r.title} <span className="text-muted">· {r.company}</span>
              </h3>
              {r.summary && <p className="mt-3 text-muted">{r.summary}</p>}
              <ul className="mt-3 list-disc space-y-1 pl-5 text-muted marker:text-line">
                {r.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              {r.tags && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
