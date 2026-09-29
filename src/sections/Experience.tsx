import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import Logo from '../components/Logo'
import Reveal from '../components/Reveal'
import Section, { type SectionProps } from '../components/Section'
import Tags from '../components/Tags'
import { cv } from '../content/cv'
import type { Block, Role } from '../content/types'

const period = (r: Role) => `${r.start} — ${r.end ?? 'Present'}`

function Details({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4 pt-4 text-muted">
      {blocks.map((b, i) =>
        typeof b === 'string' ? (
          <p key={i}>{b}</p>
        ) : (
          <div key={i}>
            <h4 className="mb-1 font-semibold text-fg">{b.title}</h4>
            <ul className="list-disc space-y-1 pl-5 marker:text-line">
              {b.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ),
      )}
    </div>
  )
}

function RoleCard({ role }: { role: Role }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex gap-5">
      <Logo company={role.company} file={role.logo} />
      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs text-muted">
          {period(role)}
          {role.location && ` · ${role.location}`}
        </p>
        <h3 className="mt-1 text-lg font-semibold">
          {role.title} <span className="text-muted">@ {role.company}</span>
        </h3>
        <p className="mt-2 text-muted">{role.summary}</p>
        <AnimatePresence initial={false}>
          {open && role.details && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <Details blocks={role.details} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Tags tags={role.tags} />
          {role.details && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="font-mono text-xs text-accent hover:underline"
            >
              {open ? 'Less' : 'More'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Experience({ id }: SectionProps) {
  return (
    <Section id={id} title="Work experience">
      <ol className="space-y-12">
        {cv.experience.map((r) => (
          <li key={`${r.company}-${r.start}`}>
            <Reveal>
              <RoleCard role={r} />
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal>
        <h3 className="mt-20 mb-6 font-mono text-xs tracking-widest text-muted uppercase">Earlier</h3>
      </Reveal>
      <ol className="divide-y divide-line border-y border-line">
        {cv.earlierExperience.map((r, i) => (
          <li key={`${r.company}-${r.start}`}>
            <Reveal delay={i * 0.04} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <span className="font-mono text-xs text-muted sm:pt-1">{period(r)}</span>
              <div>
                <p className="font-medium">
                  {r.title} <span className="text-muted">@ {r.company}</span>
                </p>
                <p className="mt-1 text-sm text-muted">{r.summary}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
