import type { ReactNode } from 'react'
import type { InterestIconName } from '../content/types'

// 24×24 line icons in one style (2px round strokes, currentColor), so they
// re-theme with the text. `plane`, `bike` and `wrench` follow Lucide's
// (ISC licence); the rest are drawn to match.
const paths: Record<InterestIconName, ReactNode> = {
  parachute: (
    <>
      <path d="M3 10a9 7 0 0 1 18 0" />
      <path d="M3 10c1.5-1 3-1 4.5 0 1.5-1 3-1 4.5 0 1.5-1 3-1 4.5 0 1.5-1 3-1 4.5 0" />
      <path d="M3 10l8 7M21 10l-8 7M9 10.2l2.2 6.3M15 10.2l-2.2 6.3" />
      <circle cx="12" cy="19.5" r="1.8" />
    </>
  ),
  plane: (
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  ),
  diver: (
    <>
      <path d="M4 10h16a1 1 0 0 1 1 1v4a3 3 0 0 1-3 3h-2.5L14 16h-4l-1.5 2H6a3 3 0 0 1-3-3v-4a1 1 0 0 1 1-1z" />
      <path d="M12 10v6" />
      <path d="M3 12.5H2M21 12.5h1" />
      <circle cx="16.5" cy="6.5" r="1" />
      <circle cx="19" cy="3.5" r=".6" />
    </>
  ),
  bike: (
    <>
      <circle cx="18.5" cy="17.5" r="3.5" />
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="15" cy="5" r="1" />
      <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
    </>
  ),
  printer3d: (
    <>
      <path d="M4 21V3h16v18M2.5 21h19" />
      <path d="M4 7.5h16" />
      <path d="M10.5 7.5v3h3v-3M12 10.5V12" />
      <path d="M8 21v-2.5h8V21M9.5 18.5v-2h5v2" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
}

export default function InterestIcon({ name, className }: { name: InterestIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  )
}
