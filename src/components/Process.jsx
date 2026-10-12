import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Label from './Label'
import Reveal from './Reveal'
import BlurWords from './BlurWords'
import useMediaQuery from '../hooks/useMediaQuery'

const steps = [
  {
    n: '01',
    title: 'Discover',
    body: 'We go deep into your brand, market, audience and competitors to uncover what they have missed.',
    image: '/assets/step1.png',
  },
  {
    n: '02',
    title: 'Strategize',
    body: 'We build a precise roadmap: channels, budget, messaging, and milestones, before a single dollar is spent.',
    image: '/assets/step2.png',
  },
  {
    n: '03',
    title: 'Execute',
    body: 'Our team of designers, strategists, and media buyers launches every campaign with obsessive detail.',
    image: '/assets/step3.png',
  },
  {
    n: '04',
    title: 'Optimize',
    body: 'We track every metric, kill what doesn’t work, scale what does, and report everything transparently.',
    image: '/assets/step4.png',
  },
]

// On hover-capable devices the title and description stay hidden until the card is hovered or
// keyboard-focused. Touch screens can't hover, so they always show the content.
// Enter: 700ms soft ease-out, description 120ms after the title. Exit: 400ms, no delay.
const reveal =
  'transition-[opacity,translate] duration-[400ms] ease-lux [@media(hover:hover)]:translate-y-5 [@media(hover:hover)]:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:duration-700 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:duration-700 motion-reduce:translate-y-0'

function Card({ step, last }) {
  return (
    <article
      tabIndex={0}
      className="group relative flex h-[442px] flex-col justify-between overflow-hidden rounded-lg px-4 py-8 outline-none focus-visible:ring-2 focus-visible:ring-white/80"
    >
      <img
        src={step.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-[scale] duration-[1400ms] ease-lux group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      {/* Scrim darkens in with the text so it stays readable over the photo */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/75 via-black/30 to-transparent transition-opacity duration-700 ease-lux [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" />
      {last}
      <p className="relative text-right font-manrope text-[64px] leading-[0.92] font-semibold tracking-[-1.28px]">
        {step.n}
      </p>
      <div className="relative flex flex-col gap-[26px]">
        <h3 className={`font-manrope text-[32px] leading-[0.95] font-semibold tracking-[-0.64px] ${reveal}`}>
          {step.title}
        </h3>
        <p
          className={`text-base leading-[1.3] tracking-[-0.32px] ${reveal} group-hover:delay-[120ms] group-focus-visible:delay-[120ms]`}
        >
          {step.body}
        </p>
      </div>
    </article>
  )
}

// Each card rises into place in its own slice of the pinned scroll, one after another.
function PinnedCard({ step, index, total, progress }) {
  const start = 0.06 + index * 0.17
  const range = [start, start + 0.22]
  const y = useTransform(progress, range, ['70vh', '0vh'])
  const opacity = useTransform(progress, range, [0, 1])
  const accent = useTransform(progress, [0.82, 0.94], [0, 1])
  const isLast = index === total - 1

  return (
    <motion.li style={{ y, opacity }}>
      <Card
        step={step}
        last={
          isLast ? (
            <motion.div
              aria-hidden="true"
              style={{ opacity: accent }}
              className="pointer-events-none absolute inset-0 rounded-lg border-2 border-[#4f84ea] bg-[#0258fd]/25"
            />
          ) : null
        }
      />
    </motion.li>
  )
}

export default function Process() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const roomy = useMediaQuery('(min-width: 1280px) and (min-height: 760px)')
  const pinned = roomy && !reduce
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const heading = (
    <>
      <Label>Working Process</Label>
      <BlurWords
        as="h2"
        stagger={0.09}
        className="mt-7 max-w-[558px] font-manrope text-[40px] leading-[0.95] font-semibold tracking-[-1.28px] lg:text-[64px]"
        text="A disciplined path to launch"
      />
    </>
  )

  if (pinned) {
    return (
      <section id="process" ref={ref} className="relative h-[280vh] w-full bg-[#0b0b0b] text-white">
        <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden bg-gradient-to-b from-[#054893] from-[11%] to-[#0b0b0b] to-[92%]">
          <div className="mx-auto w-full max-w-[1440px] px-[60px]">
            {heading}
            <ol className="mt-[clamp(40px,7vh,96px)] grid grid-cols-4 gap-4">
              {steps.map((s, i) => (
                <PinnedCard key={s.n} step={s} index={i} total={steps.length} progress={scrollYProgress} />
              ))}
            </ol>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="process"
      ref={ref}
      className="w-full bg-gradient-to-b from-[#054893] from-[11%] to-[#0b0b0b] to-[92%] text-white"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-[60px] lg:py-32">
        {heading}
        <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-[96px] xl:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.18}>
                <Card step={s} />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
