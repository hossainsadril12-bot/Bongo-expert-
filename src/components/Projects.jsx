import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Label from './Label'
import TiltImage from './TiltImage'
import { dur, ease } from '../lib/motion'

const deliverables = ['Web Design', 'Brand Identity', 'Product Design', 'Brand Strategy']

const projects = [
  {
    title: 'Next-generation AI cloud platform',
    body: 'A next-generation AI cloud platform engineered to transform raw enterprise data into real-time operational intelligence, accelerating workflow completion rates by 48%.',
    image: '/assets/proj1.png',
    alt: 'Red campaign screen reading Your Design',
    site: 'LUMINA.CLOUD',
    imageLeft: false,
  },
  {
    title: 'Nimbus AI cloud platform',
    body: 'Nimbus is an AI cloud platform that turns enterprise data into real-time operational intelligence, increasing workflow completion rates by 48%.',
    image: '/assets/proj2.png',
    alt: 'Tablet showing an orange gradient interface',
    site: 'NIMBUS.CLOUD',
    imageLeft: true,
  },
  {
    title: 'Next-generation AI cloud platform',
    body: 'A next-generation AI cloud platform engineered to transform raw enterprise data into real-time operational intelligence, accelerating workflow completion rates by 48%.',
    image: '/assets/proj3.png',
    alt: 'Desktop monitor showing a Dark Mode Aesthetics page',
    site: 'LUMINA.CLOUD',
    imageLeft: false,
  },
]

const easeOut = ease.out
const easeInOut = ease.inOut

const v = {
  row: { hidden: {}, visible: {} },
  hline: {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: dur.line, ease: easeInOut } },
  },
  vline: {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: dur.line, ease: easeInOut, delay: 0.3 } },
  },
  // Sides and top rest 8% outside the frame so the hover tilt's corners are never cropped.
  // The clip is dropped once the wipe ends so the "View project" tag can pass the frame edge.
  image: {
    hidden: { clipPath: 'inset(-8% -8% 108% -8%)' },
    visible: {
      clipPath: 'inset(-8% -8% -8% -8%)',
      transitionEnd: { clipPath: 'none' },
      transition: { duration: dur.image, ease: easeInOut, delay: 0.2 },
    },
  },
  mask: {
    hidden: { y: '105%' },
    visible: (d = 0) => ({ y: '0%', transition: { duration: dur.text, ease: easeOut, delay: d } }),
  },
  fade: {
    hidden: { opacity: 0, y: 12 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: dur.block, ease: easeOut, delay: d } }),
  },
}

// Words rise one by one through a clipping mask. pb/-mb keep descenders (the "j" in Projects) unclipped.
function MaskWords({ words, delay = 0, stagger = 0.17 }) {
  return words.map((w, i) => (
    <span key={i}>
      <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
        <motion.span className={`inline-block ${w.className ?? ''}`} variants={v.mask} custom={delay + i * stagger}>
          {w.text}
        </motion.span>
      </span>
      {i < words.length - 1 ? ' ' : ''}
    </span>
  ))
}

// `d` staggers each metadata item after the title and body have landed
function Meta({ label, children, d }) {
  return (
    <motion.div className="flex flex-col gap-2" variants={v.fade} custom={d}>
      <dt className="text-secondary">{label}</dt>
      <dd className="text-black">{children}</dd>
    </motion.div>
  )
}

function ProjectRow({ project }) {
  const { title, body, image, alt, site, imageLeft } = project
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // The photo drifts inside its frame as the row passes, slower than the page
  const drift = useTransform(scrollYProgress, [0, 1], [-18, 18])

  return (
    <motion.article
      ref={ref}
      className="group relative grid gap-7 py-7 lg:grid-cols-2 lg:items-center lg:gap-x-16 lg:py-12"
      variants={v.row}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#e6e8ee]"
        variants={v.hline}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px origin-top bg-[#e6e8ee] lg:block"
        variants={v.vline}
      />

      <motion.div className={imageLeft ? 'lg:order-1' : 'lg:order-2'} variants={v.image}>
        <TiltImage src={image} alt={alt} eager className="h-[260px] sm:h-[345px]" y={reduce ? undefined : drift} />
      </motion.div>

      <div
        className={`relative flex flex-col justify-between gap-10 lg:h-[345px] ${
          imageLeft ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <motion.span
          className="absolute top-[21px] right-0 hidden font-light tracking-[-0.32px] text-secondary xl:block"
          variants={v.fade}
          custom={1.15}
        >
          Germany
        </motion.span>
        <div className="flex flex-col gap-4 lg:max-w-[520px]">
          <h3 className="font-manrope text-[28px] leading-[1.3] font-medium tracking-[-0.64px] text-ink lg:text-[32px]">
            <MaskWords words={title.split(' ').map((text) => ({ text }))} delay={0.55} stagger={0.09} />
          </h3>
          <motion.p className="font-light leading-[1.5] tracking-[-0.32px] text-ink" variants={v.fade} custom={0.9}>
            {body}
          </motion.p>
        </div>
        <dl className="grid grid-cols-2 gap-6 text-xs leading-[1.5] tracking-[-0.24px] sm:grid-cols-3">
          <Meta label="Deliverable" d={1.2}>
            <ul className="flex flex-col gap-1">
              {deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Meta>
          <div className="flex flex-col justify-between gap-6">
            <Meta label="Industry" d={1.34}>Digital Agency</Meta>
            <Meta label="Live Site" d={1.48}>{site}</Meta>
          </div>
          <div className="flex flex-col justify-between gap-6">
            <Meta label="Published" d={1.62}>2026</Meta>
            <Meta label="Timeline" d={1.76}>8 weeks</Meta>
          </div>
        </dl>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const reduce = useReducedMotion()

  return (
    <section id="work" className="w-full bg-[#f8faff]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-[60px] lg:py-32">
        <motion.div
          className="relative flex items-end justify-between gap-6 pb-14"
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="flex flex-col gap-7">
            <motion.div variants={v.fade}>
              <Label className="text-[#0a1017]">Recent Work</Label>
            </motion.div>
            <h2 className="font-manrope text-[40px] leading-[1.3] font-semibold tracking-[-1.28px] lg:text-[64px]">
              <MaskWords
                delay={0.2}
                words={[
                  { text: 'Selected', className: 'text-ink' },
                  { text: 'Projects', className: 'text-blue-dark' },
                ]}
              />
            </h2>
          </div>
          <motion.a
            href="/projects"
            className="mb-3 shrink-0 text-base leading-[1.5] text-secondary underline underline-offset-4 transition-colors duration-500 ease-lux hover:text-ink"
            variants={v.fade}
            custom={0.8}
          >
            More (10+)
          </motion.a>
          {/* Top rule of the list draws across once the heading has landed */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#e6e8ee]"
            variants={v.hline}
          />
        </motion.div>

        <div>
          {projects.map((p, i) => (
            <ProjectRow key={i} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
