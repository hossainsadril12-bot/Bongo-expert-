import { motion, useReducedMotion, useTransform } from 'motion/react'
import BlurWords from './BlurWords'
import Navbar from './Navbar'
import StartButton from './StartButton'
import { dur, ease, stagger } from '../lib/motion'

// No spring bounce here: luxury motion settles, it never wobbles
const arrive = { duration: dur.block, ease: ease.out }

const lines = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger.lines, delayChildren: 0.6 } },
}
const line = {
  hidden: { opacity: 0, y: 48, filter: 'blur(12px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.9, ease: ease.out } },
}

// `cover` is 0 while the hero is fully visible and 1 once the next section has slid over it.
export default function Hero({ cover }) {
  const reduce = useReducedMotion()
  const init = (v) => (reduce ? false : v)

  const contentY = useTransform(cover, [0, 1], [0, -140])
  const contentOpacity = useTransform(cover, [0, 0.75], [1, 0])
  const dim = useTransform(cover, [0, 1], [0, 0.55])

  return (
    <section className="sticky top-0 h-[100dvh] min-h-[640px] w-full overflow-hidden bg-[#0a1015]">
      {/* No scroll zoom on the video: scaling a playing 1080p video every frame dropped scrolling to ~40fps */}
      <div className="absolute inset-0">
        {/* Static hero image for now. The intro/loop videos (hero-intro.mp4, hero-loop.mp4) are
            still in public/assets if the video background comes back. */}
        <img
          src="/assets/hero.png"
          alt=""
          fetchPriority="high"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover object-[75%_center]"
        />
      </div>
      {/* Load-in: the photo lifts out of darkness, like a light being brought up */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#0a1015]"
        initial={init({ opacity: 1 })}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.2, ease: ease.out }}
      />
      {/* Phones: copy stacks over the face, so lighten from the top down. Tablets: copy sits beside it, so lighten from the left. */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/55 via-55% to-transparent sm:hidden" aria-hidden="true" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-white/70 via-white/30 to-transparent sm:block lg:hidden" aria-hidden="true" />
      {/* Scroll: the hero darkens as the next section covers it */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#0a1015]"
        style={{ opacity: reduce ? 0 : dim }}
      />

      <motion.div
        className="relative mx-auto flex h-full max-w-[1440px] flex-col px-5 pt-9 lg:px-[60px]"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <Navbar page="home" delay={0.8} />

        <div className="mt-[clamp(40px,9vh,100px)] flex flex-col gap-9 text-[#252525]">
          <motion.h1
            className="font-manrope text-[56px] leading-none font-normal tracking-[-1.28px] sm:text-[96px] lg:text-[clamp(88px,13.5vh,128px)] lg:tracking-[-2.56px]"
            initial={init('hidden')}
            animate="visible"
            variants={lines}
          >
            <motion.span variants={line} className="block">
              Built for
            </motion.span>
            <motion.span variants={line} className="block">
              what’s
            </motion.span>
            <motion.span variants={line} className="block text-blue-dark">
              next
            </motion.span>
          </motion.h1>
          <BlurWords
            immediate
            delay={1.4}
            stagger={0.05}
            className="max-w-[364px] text-base leading-[1.5]"
            text="We turn complex ideas into intuitive, high-performance digital experiences."
          />
        </div>

        <motion.div
          className="mt-[clamp(28px,5vh,48px)] pb-10"
          initial={init({ y: 24, opacity: 0 })}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...arrive, delay: 1.9 }}
        >
          <StartButton />
        </motion.div>
      </motion.div>
    </section>
  )
}
