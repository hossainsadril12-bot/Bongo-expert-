import { useRef } from 'react'
import { cubicBezier, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import BlurWords from './BlurWords'
import useMediaQuery from '../hooks/useMediaQuery'

// The photo ships pre-blurred (contact-bg-blur.jpg) instead of using backdrop-filter:
// a live full-screen blur would be recomputed on every frame while the frame grows.
function Backdrop({ scale }) {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform"
        style={scale ? { scale } : undefined}
      >
        <img
          src="/assets/contact-bg-blur.jpg"
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover object-[center_45%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[rgba(21,21,21,0.24)]" />
    </>
  )
}

const headingClass =
  'text-center font-manrope leading-[0.95] font-bold tracking-[-0.02em] text-white whitespace-nowrap'
const buttonClass =
  'inline-flex items-center justify-center rounded-full border border-white bg-white/[0.16] text-center leading-none tracking-[-0.4px] text-white transition-[background-color,color,scale] duration-500 ease-lux hover:bg-white hover:text-[#0a1015] active:scale-[0.98]'

const smooth = cubicBezier(0.65, 0, 0.35, 1)

// Pinned: the panel opens from an inset rounded card to the full screen while the heading and
// button grow with it, then everything holds before the page moves on.
function PinnedContact() {
  const ref = useRef(null)
  // Progress runs only while the frame is pinned: 0 = just stuck to the top, 1 = about to release.
  // It arrives as a small framed card, then grows to cover the screen while it holds still.
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Eased mapping: growth starts gently, carries through the middle, and settles softly at full size
  const ease = { ease: smooth }
  const clipPath = useTransform(
    p,
    [0, 0.65],
    ['inset(24% 22% 24% 22% round 40px)', 'inset(0% 0% 0% 0% round 0px)'],
    ease,
  )
  const imageScale = useTransform(p, [0, 0.75], [1.3, 1], ease)
  const headingScale = useTransform(p, [0, 0.7], [0.38, 1], ease)
  const buttonScale = useTransform(p, [0.05, 0.75], [0.55, 1], ease)
  const buttonY = useTransform(p, [0.05, 0.75], [-70, 0], ease)

  return (
    <section id="contact" ref={ref} className="relative h-[280vh] w-full bg-[#0b0b0b]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath }}>
          <Backdrop scale={imageScale} />
          <div className="relative flex h-full flex-col items-center justify-center gap-[clamp(32px,5vh,56px)] px-5">
            <motion.div style={{ scale: headingScale }}>
              <BlurWords
                as="h2"
                stagger={0.1}
                className={`${headingClass} text-[clamp(96px,12.5vw,220px)]`}
                text="GET IN TOUCH"
              />
            </motion.div>
            <motion.div style={{ scale: buttonScale, y: buttonY }}>
              <a href="mailto:hello@bongo.expert" className={`${buttonClass} h-20 px-12 text-2xl`}>
                Start a Project
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Small screens and reduced motion: a plain full-height panel at the final sizes.
function StaticContact() {
  return (
    <section id="contact" className="relative min-h-[600px] w-full overflow-hidden bg-[#0b0b0b] lg:h-[100dvh]">
      <Backdrop />
      <div className="relative flex min-h-[600px] flex-col items-center justify-center gap-8 px-5 lg:h-full">
        <BlurWords
          as="h2"
          stagger={0.1}
          className={`${headingClass} text-[48px] sm:text-[96px]`}
          text="GET IN TOUCH"
        />
        <a href="mailto:hello@bongo.expert" className={`${buttonClass} h-16 px-10 text-xl`}>
          Start a Project
        </a>
      </div>
    </section>
  )
}

export default function Contact() {
  const reduce = useReducedMotion()
  const roomy = useMediaQuery('(min-width: 1024px) and (min-height: 640px)')
  return roomy && !reduce ? <PinnedContact /> : <StaticContact />
}
