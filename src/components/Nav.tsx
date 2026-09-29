import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { sections } from '../sections'

const navItems = sections.filter((s) => s.nav)

// Sticky header. Highlights the section currently in view.
export default function Nav() {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    // A section counts as active while it crosses the middle band of the viewport.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/70 backdrop-blur">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm font-semibold">
          cebrian.io
        </a>
        <ul className="hidden gap-1 text-sm md:flex">
          {navItems.map(({ id, label }) => (
            <li key={id} className="relative">
              <a
                href={`#${id}`}
                className={`relative z-10 block rounded-full px-3 py-1.5 transition-colors ${
                  active === id ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {label}
              </a>
              {active === id && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-surface" />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
