import { motion } from 'motion/react'
import { cvFileName } from '../pdf/filename'

const icon = (
  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
  </svg>
)

// Floating action button: downloads the PDF CV, which the build generates from
// cv.ts (vite-plugins/cv-pdf.ts). Round when idle; the label slides out on
// hover/focus.
export default function DownloadCv() {
  const file = cvFileName()
  return (
    <motion.a
      href={`./${file}`}
      download={file}
      aria-label="Download CV"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.6 }}
      className="group fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex h-14 items-center rounded-full bg-accent px-4 text-bg shadow-lg shadow-black/25 focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none sm:right-8 sm:bottom-8"
    >
      {icon}
      <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out group-hover:ml-2 group-hover:max-w-40 group-focus-visible:ml-2 group-focus-visible:max-w-40">
        Download CV
      </span>
    </motion.a>
  )
}
