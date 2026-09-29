import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

// Light/dark theme. The first value is picked by the inline script in
// index.html (stored choice, else the OS preference); this module takes over
// from there. Until the visitor clicks the toggle, the OS preference is followed
// live; after that, their choice is stored and wins.

export type Theme = 'light' | 'dark'

const KEY = 'theme'
const lightQuery = matchMedia('(prefers-color-scheme: light)')

function stored(): Theme | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

function store(t: Theme) {
  try {
    localStorage.setItem(KEY, t)
  } catch {
    // private mode / blocked storage: the choice just won't persist
  }
}

const system = (): Theme => (lightQuery.matches ? 'light' : 'dark')

function apply(t: Theme) {
  const root = document.documentElement
  root.dataset.theme = t
  // Browser chrome (mobile address bar) follows the page background.
  const bg = getComputedStyle(root).getPropertyValue('--color-bg').trim()
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg)
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.dataset.theme as Theme | undefined) ?? stored() ?? system(),
  )

  useEffect(() => apply(theme), [theme])

  useEffect(() => {
    const onChange = () => stored() || setTheme(system())
    lightQuery.addEventListener('change', onChange)
    return () => lightQuery.removeEventListener('change', onChange)
  }, [])

  /** Flip the theme; `origin` (viewport px) is where the reveal circle starts. */
  const toggle = (origin?: { x: number; y: number }) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    store(next)
    const commit = () => {
      apply(next)
      flushSync(() => setTheme(next))
    }

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduced || !origin) return commit()

    const { x, y } = origin
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    document.startViewTransition(commit).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  return { theme, toggle }
}
