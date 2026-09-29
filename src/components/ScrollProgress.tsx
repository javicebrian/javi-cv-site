import { motion, useScroll, useSpring } from 'motion/react'

// Thin bar at the top of the viewport tracking page scroll.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return <motion.div className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent" style={{ scaleX }} />
}
