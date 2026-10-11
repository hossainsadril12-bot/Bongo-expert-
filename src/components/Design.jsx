import { useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import BlurWords from './BlurWords'
import useMediaQuery from '../hooks/useMediaQuery'
import { dur, ease as eases } from '../lib/motion'

// One entry per service. Leave `background` / `card` as null until the artwork exists:
// the service then shows the brand gradient and a labelled empty frame instead of an image.
const services = [
  {
    id: 'design',
    title: 'Design',
    background: '/assets/design-bg.png',
    card: '/assets/design-card.png',
    cardAlt: 'Lunetra brand identity card',
  },
  { id: 'web-development', title: 'Web Development', background: null, card: null, cardAlt: '' },
  { id: 'app-development', title: 'App Development', background: null, card: null, cardAlt: '' },
  { id: 'ai-consultant', title: 'AI Consultant', background: null, card: null, cardAlt: '' },
]

const ease = eases.out
const brandGradient = 'bg-gradient-to-br from-[#0a1015] via-[#0b2f6e] to-[#0246ca]'
const cardBase = 'h-[400px] w-[312px] rounded-lg shadow-[0_0_0_4px_rgba(255,255,255,0.12)]'

function Card({ service, className = '' }) {
  return service.card ? (
    <img
      src={service.card}
      alt={service.cardAlt}
      loading="lazy"
      className={`${cardBase} object-cover ${className}`}
    />
  ) : (
    <div
      className={`${cardBase} flex items-center justify-center border border-dashed border-white/30 bg-white/[0.04] text-sm text-white/60 ${className}`}
    >
      Image coming soon
    </div>
  )
}

function Backdrop({ service }) {
  if (!service.background) return null
  return (
    <>
      <img src={service.background} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-[rgba(32,32,32,0.12)] backdrop-blur-[12px]" />
    </>
  )
}

/* ---------- Pinned: one frame stays on screen, services crossfade as you scroll ---------- */

function Layer({ service, active }) {
  const words = service.title.split(' ')
  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: active ? dur.block : dur.exit, ease }}
      aria-hidden={!active}
      style={{ pointerEvents: active ? 'auto' : 'none' }}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ scale: active ? 1 : 1.06 }}
        transition={{ duration: 2, ease }}
      >
        <Backdrop service={service} />
      </motion.div>

      <div className="relative mx-auto flex h-full max-w-[1440px] items-center px-[60px]">
        <h2 className="max-w-[36%] font-manrope text-[64px] leading-[1.1] font-semibold tracking-[-1.28px] text-white">
          {words.map((w, i) => (
            <span key={i}>
              <motion.span
                className="inline-block"
                initial={false}
                animate={
                  active
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 16, filter: 'blur(10px)' }
                }
                transition={{ duration: active ? dur.text : dur.exit, ease, delay: active ? 0.3 + i * 0.1 : 0 }}
              >
                {w}
              </motion.span>
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h2>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={false}
          animate={
            active
              ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, y: 40, scale: 0.96, filter: 'blur(8px)' }
          }
          transition={{ duration: active ? dur.image : dur.exit, ease, delay: active ? 0.35 : 0 }}
        >
          <Card service={service} />
        </motion.div>
      </div>
    </motion.div>
  )
}

function PinnedServices() {
  const ref = useRef(null)
  const n = services.length
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Each service owns one screen of scroll; switch at the halfway point between them
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.min(n - 1, Math.max(0, Math.round(p * (n - 1))))
    setActive((prev) => (prev === i ? prev : i))
  })

  return (
    <section id="services" ref={ref} className="relative" style={{ height: `${n * 100}dvh` }}>
      {/* Anchors at each service's scroll slot so #web-development etc. land on the right frame */}
      {services.map((s, i) => (
        <div key={s.id} id={s.id} className="absolute left-0 h-px w-px" style={{ top: `${i * 100}dvh` }} />
      ))}

      <div className={`sticky top-0 h-[100dvh] overflow-hidden ${brandGradient}`}>
        {services.map((s, i) => (
          <Layer key={s.id} service={s} active={i === active} />
        ))}
      </div>
    </section>
  )
}

/* ---------- Stacked fallback: small screens and reduced motion ---------- */

function ServicePanel({ service }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const cardY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section
      id={service.id}
      ref={ref}
      className={`relative min-h-[800px] w-full overflow-hidden ${brandGradient}`}
    >
      <Backdrop service={service} />
      <div className="relative mx-auto flex min-h-[800px] max-w-[1440px] flex-col justify-center gap-12 px-5 py-20">
        <BlurWords
          as="h2"
          stagger={0.08}
          className="font-manrope text-[48px] leading-[1.1] font-semibold tracking-[-1.28px] text-white sm:text-[64px]"
          text={service.title}
        />
        <motion.div className="self-center" style={reduce ? undefined : { y: cardY }}>
          <Card service={service} />
        </motion.div>
      </div>
    </section>
  )
}

export default function Design() {
  const reduce = useReducedMotion()
  const roomy = useMediaQuery('(min-width: 1024px) and (min-height: 640px)')

  if (roomy && !reduce) return <PinnedServices />

  return (
    <div id="services">
      {services.map((s) => (
        <ServicePanel key={s.id} service={s} />
      ))}
    </div>
  )
}
