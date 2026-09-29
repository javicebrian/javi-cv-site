import { motion, type HTMLMotionProps } from 'motion/react'

type Props = HTMLMotionProps<'div'> & {
  /** Seconds to wait after entering the viewport; use to stagger siblings. */
  delay?: number
}

// Fade + rise on first scroll into view. The single entry-animation primitive:
// sections compose it instead of declaring their own variants.
export default function Reveal({ delay = 0, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
