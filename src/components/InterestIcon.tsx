import { interestIcons } from '../content/icons'
import type { InterestIconName } from '../content/types'

// currentColor strokes, so the icon re-themes with the text around it.
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
      {interestIcons[name].map((s, i) => ('d' in s ? <path key={i} d={s.d} /> : <circle key={i} {...s} />))}
    </svg>
  )
}
