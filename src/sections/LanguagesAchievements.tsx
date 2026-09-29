import Section, { type SectionProps } from '../components/Section'
import Achievements from './Achievements'
import Languages from './Languages'

// Two short PDF blocks side by side: each alone left a large empty band.
export default function LanguagesAchievements({ id }: SectionProps) {
  return (
    <Section id={id}>
      <div className="grid gap-16 md:grid-cols-2 md:gap-12">
        <Languages />
        <Achievements />
      </div>
    </Section>
  )
}
