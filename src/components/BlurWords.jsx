import { motion, useReducedMotion } from 'motion/react'
import { dur, ease, stagger as staggers } from '../lib/motion'

const container = {
  hidden: {},
  // Delay lives in the variant: a transition prop on the element would be overridden by it
  visible: ({ stagger, delay }) => ({ transition: { staggerChildren: stagger, delayChildren: delay } }),
}

const word = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 14 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: dur.text, ease: ease.out },
  },
}

// Heading or paragraph whose words resolve from blurred to sharp, left to right, once in view.
// `segments` lets parts of the line carry their own class; `{ br: true }` forces a line break.
// Screen readers get the plain sentence; the animated words are aria-hidden.
export default function BlurWords({
  as = 'p',
  text,
  segments,
  className = '',
  stagger = staggers.words,
  delay = 0,
  immediate = false,
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const parts = segments ?? [{ text }]
  const plain = parts.map((s) => (s.br ? ' ' : s.text)).join(' ').replace(/\s+/g, ' ').trim()

  const trigger = immediate
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once: true, amount: 0.4 } }

  return (
    <Tag
      className={className}
      initial={reduce ? false : 'hidden'}
      {...trigger}
      variants={container}
      custom={{ stagger, delay }}
    >
      <span className="sr-only">{plain}</span>
      {parts.map((seg, si) =>
        seg.br ? (
          <br key={si} />
        ) : (
          <span key={si} className={seg.className} aria-hidden="true">
            {seg.text.split(' ').map((w, wi, arr) => (
              <span key={wi}>
                <motion.span variants={word} className="inline-block will-change-[filter,transform]">
                  {w}
                </motion.span>
                {wi < arr.length - 1 || si < parts.length - 1 ? ' ' : ''}
              </span>
            ))}
          </span>
        ),
      )}
    </Tag>
  )
}
