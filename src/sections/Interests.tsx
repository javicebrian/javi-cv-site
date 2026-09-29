import { motion } from 'motion/react'
import InterestIcon from '../components/InterestIcon'
import Reveal from '../components/Reveal'
import Section, { type SectionProps } from '../components/Section'
import { cv } from '../content/cv'

export default function Interests({ id }: SectionProps) {
  return (
    <Section id={id} title="Hobbies & interests">
      <ul className="grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-6">
        {cv.interests.map((h, i) => (
          <li key={h.name}>
            <Reveal delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4, scale: 1.04 }}
                className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-full border border-line bg-surface p-2 text-center transition-colors hover:border-accent/50"
              >
                <InterestIcon
                  name={h.icon}
                  className="size-7 text-fg transition-transform duration-300 group-hover:-rotate-8 group-hover:text-accent sm:size-8"
                />
                <span className="text-[11px] leading-tight text-muted sm:text-xs">{h.name}</span>
              </motion.div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
