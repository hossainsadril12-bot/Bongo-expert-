import { motion, useReducedMotion } from 'motion/react'
import { dur, ease } from '../lib/motion'

// Fades and lifts content in once as it enters the viewport. Static under prefers-reduced-motion.
export default function Reveal({ children, delay = 0, y = 32, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: dur.block, delay, ease: ease.out }}
    >
      {children}
    </motion.div>
  )
}
