import Reveal from '../components/Reveal'
import Section, { type SectionProps } from '../components/Section'
import { achievementUrl } from '../content/assets'
import { cv } from '../content/cv'

export default function Achievements({ id }: SectionProps) {
  return (
    <Section id={id} title="Achievements">
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {cv.achievements.map((a, i) => {
          const img = achievementUrl(a.image)
          return (
            <li key={a.title}>
              <Reveal delay={i * 0.08} className="flex h-full gap-5 rounded-xl border border-line bg-surface p-5">
                {img && <img src={img} alt="" className="size-16 shrink-0 object-contain" />}
                <div>
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="mt-1 font-mono text-xs text-muted">{a.date}</p>
                  <p className="mt-3 text-2xl font-bold text-accent">{a.detail}</p>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
