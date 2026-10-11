import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

const FROM = '#b3b3b3'
const TO = '#0242be'

function Word({ word, index, total, progress }) {
  const start = index / total
  const end = (index + 1) / total
  const color = useTransform(progress, [start, end], [FROM, TO])
  return (
    <motion.span style={{ color }} className="inline-block">
      {word}
    </motion.span>
  )
}

// One sentence that fills from grey to blue word by word as it scrolls through the viewport.
// Under prefers-reduced-motion it renders fully blue with no scroll effect.
export default function ScrollText({ text, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.55'],
  })
  const words = text.split(' ')

  if (reduce) {
    return (
      <p ref={ref} className={`${className} text-blue-dark`}>
        {text}
      </p>
    )
  }

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <Word word={word} index={i} total={words.length} progress={scrollYProgress} />
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}
