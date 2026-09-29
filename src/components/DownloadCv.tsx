import { motion } from 'motion/react'
import { useState } from 'react'
import { downloadCv, preloadCv } from '../pdf/download'

type State = 'idle' | 'busy' | 'error'

const icon = (
  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
  </svg>
)

const spinner = (
  <motion.svg
    viewBox="0 0 24 24"
    className="size-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
    aria-hidden
  >
    <path d="M21 12a9 9 0 1 1-6.2-8.56" />
  </motion.svg>
)

const labels: Record<State, string> = { idle: 'Download CV', busy: 'Generating…', error: 'Retry download' }

// Floating action button: generates the PDF CV from cv.ts on click. Round when
// idle; the label slides out on hover/focus and stays out while generating.
export default function DownloadCv() {
  const [state, setState] = useState<State>('idle')

  const onClick = async () => {
    if (state === 'busy') return
    setState('busy')
    try {
      await downloadCv()
      setState('idle')
    } catch (e) {
      console.error('CV PDF generation failed', e)
      setState('error')
    }
  }

  const open = state !== 'idle'

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onPointerEnter={preloadCv}
      onFocus={preloadCv}
      aria-busy={state === 'busy'}
      aria-label={labels[state]}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.6 }}
      className="group fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex h-14 items-center rounded-full bg-accent px-4 text-bg shadow-lg shadow-black/25 focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none sm:right-8 sm:bottom-8"
    >
      {state === 'busy' ? spinner : icon}
      <span
        className={`overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out ${
          open ? 'ml-2 max-w-40' : 'max-w-0 group-hover:ml-2 group-hover:max-w-40 group-focus-visible:ml-2 group-focus-visible:max-w-40'
        }`}
      >
        {labels[state]}
      </span>
    </motion.button>
  )
}
