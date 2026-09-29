import { motion } from 'motion/react'
import Reveal from '../components/Reveal'
import Section, { type SectionProps } from '../components/Section'
import { interestUrl } from '../content/assets'
import { cv } from '../content/cv'

export default function Interests({ id }: SectionProps) {
  return (
    <Section id={id} title="Hobbies & interests">
      <ul className="grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-6">
        {cv.interests.map((h, i) => {
          const icon = interestUrl(h.icon)
          return (
            <li key={h.name}>
              <Reveal delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.04 }}
                  className="grid aspect-square place-items-center rounded-full border border-line bg-surface p-2 text-center"
                >
                  {icon && <img src={icon} alt="" className="mb-1 size-8 object-contain" />}
                  <span className="text-xs text-muted">{h.name}</span>
                </motion.div>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
