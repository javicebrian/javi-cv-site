import { motion } from 'motion/react'
import type { SectionProps } from '../components/Section'
import { cv } from '../content/cv'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

// First screen. Plays on load (not on scroll), children staggered.
export default function Hero({ id }: SectionProps) {
  return (
    <section id={id} className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-4xl flex-col justify-center px-6">
      <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}>
        <motion.p variants={item} className="mb-4 font-mono text-sm text-accent">
          {cv.location}
        </motion.p>
        <motion.h1 variants={item} className="text-5xl font-bold tracking-tight md:text-7xl">
          {cv.name}
        </motion.h1>
        <motion.p variants={item} className="mt-6 max-w-2xl text-xl text-muted md:text-2xl">
          {cv.headline}
        </motion.p>
        <motion.ul variants={item} className="mt-10 flex flex-wrap gap-4 text-sm">
          {cv.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer" className="text-muted underline-offset-4 hover:text-fg hover:underline">
                {l.label}
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}
