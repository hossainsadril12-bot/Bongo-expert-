import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Agentation } from 'agentation'
import useSmoothScroll from '../hooks/useSmoothScroll'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TiltImage from '../components/TiltImage'
import { dur, ease } from '../lib/motion'

// Layout follows the Algorix /projects page (docs/reference/algorix-projects/design.md),
// skinned in Bongo tokens: Manrope/Inter, ink, blue-dark accent, #f8faff surface, navy #0a1015 plates.

const projects = [
  {
    title: 'AI Customer Support Bot',
    body: 'Built a conversational AI assistant that resolves customer queries and routes complex issues to the team.',
    tag: 'Automation',
    year: '2026',
    image: '/assets/proj1.png',
    alt: 'Red campaign screen reading Your Design',
  },
  {
    title: 'Predictive Analytics Platform',
    body: 'Built a predictive analytics platform that turns raw market data into real-time, actionable forecasts.',
    tag: 'Data Analytics',
    year: '2026',
    image: '/assets/proj2.png',
    alt: 'Tablet showing an orange gradient interface',
  },
  {
    title: 'Smart Vision System',
    body: 'Built a computer vision system that inspects products in real time and flags defects instantly on the line.',
    tag: 'Computer Vision',
    year: '2026',
    image: '/assets/proj3.png',
    alt: 'Desktop monitor showing a Dark Mode Aesthetics page',
  },
  {
    title: 'Workflow Automation System',
    body: 'Built a workflow automation system that connects intake, routing, and status updates into one seamless pipeline.',
    tag: 'Automation',
    year: '2026',
    image: '/assets/work1.png',
    alt: 'Blue poster of a face lit red inside a focus frame',
  },
]

// Back to front. Fixed angles: the pile reads as a deliberate stack, not a random scatter.
const fan = [
  { src: '/assets/design-card.png', rotate: -16, x: -34 },
  { src: '/assets/ai-consult-card.webp', rotate: -10, x: -22 },
  { src: '/assets/app-dev-card.webp', rotate: -5, x: -10 },
  { src: '/assets/web-dev-card.webp', rotate: 0, x: 0 },
]

// Plate body grey: lightest step that still reads as secondary, 8.9:1 on the navy plate
const plateMuted = 'text-[#aab1bd]'

const v = {
  mask: {
    hidden: { y: '105%' },
    visible: (d = 0) => ({ y: '0%', transition: { duration: dur.text, ease: ease.out, delay: d } }),
  },
  fade: {
    hidden: { opacity: 0, y: 16 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: dur.block, ease: ease.out, delay: d } }),
  },
  // Sides and top rest 8% outside the frame so the hover tilt's corners are never cropped
  image: {
    hidden: { clipPath: 'inset(-8% -8% 108% -8%)' },
    visible: (d = 0) => ({
      clipPath: 'inset(-8% -8% -8% -8%)',
      transitionEnd: { clipPath: 'none' },
      transition: { duration: dur.image, ease: ease.inOut, delay: d },
    }),
  },
}

// One headline word or line rising through a clipping mask
function Rise({ children, d, className = '' }) {
  return (
    <span className={`inline-block overflow-hidden pb-[0.08em] align-bottom ${className}`}>
      <motion.span className="inline-block" variants={v.mask} custom={d}>
        {children}
      </motion.span>
    </span>
  )
}

// Leans left as it opens, so it sits right of centre to keep clear of "Success".
// The stack opens from one upright pile to its fixed angles: there is more work behind the top card
function PhotoFan() {
  return (
    <span aria-hidden="true" className="relative mx-auto hidden h-[300px] w-[230px] translate-x-10 lg:block">
      {fan.map((f, i) => (
        <motion.img
          key={f.src}
          src={f.src}
          alt=""
          className="absolute inset-0 size-full rounded-lg object-cover shadow-[0_16px_40px_rgba(10,16,21,0.16)]"
          style={{ transformOrigin: '50% 100%' }}
          variants={{
            hidden: { opacity: 0, y: 40, rotate: 0, x: 0 },
            visible: {
              opacity: 1,
              y: 0,
              rotate: f.rotate,
              x: f.x,
              transition: {
                opacity: { duration: dur.block, ease: ease.out, delay: 0.5 },
                y: { duration: dur.block, ease: ease.out, delay: 0.5 },
                rotate: { duration: dur.image, ease: ease.out, delay: 1.1 + (fan.length - 1 - i) * 0.08 },
                x: { duration: dur.image, ease: ease.out, delay: 1.1 + (fan.length - 1 - i) * 0.08 },
              },
            },
          }}
        />
      ))}
    </span>
  )
}

function ProjectsHero() {
  const reduce = useReducedMotion()

  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-9 pb-16 lg:px-[60px] lg:pb-20">
      <Navbar page="projects" delay={0.2} />

      <motion.div
        className="relative mt-14 lg:mt-16"
        initial={reduce ? false : 'hidden'}
        animate="visible"
      >
        <h1 className="text-center font-manrope text-[38px] leading-[1.1] font-normal tracking-[-0.02em] text-ink sm:text-[72px] lg:text-[clamp(72px,7.5vw,112px)] lg:leading-none">
          <Rise d={0.3}>Real-World AI</Rise>{' '}
          <span className="flex flex-wrap justify-center gap-x-[0.25em] lg:mt-6 lg:grid lg:grid-cols-[1fr_380px_1fr] lg:items-start lg:gap-x-6">
            <Rise d={0.45} className="lg:justify-self-end lg:pt-6">
              Success
            </Rise>{' '}
            <PhotoFan />
            <Rise d={0.6} className="text-blue-dark lg:justify-self-start lg:pt-6">
              Stories
            </Rise>
          </span>
        </h1>

        {/* Desktop: sits in the empty lower half of the two side columns, beside the photo stack */}
        <div className="mt-6 flex flex-col items-center lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:grid lg:grid-cols-[1fr_380px_1fr] lg:items-end lg:gap-x-6">
          <motion.div className="hidden justify-self-end lg:mr-16 lg:block" variants={v.fade} custom={1.5}>
            <div className="-rotate-[8deg] rounded-lg bg-blue-light px-7 py-6 shadow-[0_12px_32px_rgba(2,66,190,0.10)]">
              <p className="font-manrope text-[56px] leading-none font-normal tracking-[-1.5px] text-blue-dark">150+</p>
              <p className="mt-2 text-sm leading-[1.5] text-ink">Projects delivered</p>
            </div>
          </motion.div>
          <span className="hidden lg:block" />
          <motion.p
            className="max-w-[340px] text-center text-base leading-[1.6] font-light text-ink lg:pb-2 lg:text-left"
            variants={v.fade}
            custom={1.3}
          >
            From automation to predictive analytics, we’ve helped businesses across industries ship AI systems that
            deliver measurable results, fast.
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const { title, body, tag, year, image, alt } = project
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // The photo drifts inside its frame as the card passes, slower than the page
  const drift = useTransform(scrollYProgress, [0, 1], [-18, 18])
  // The right-hand column follows its neighbour a beat later
  const lag = (index % 2) * 0.15

  return (
    <motion.article
      ref={ref}
      className="flex flex-col gap-2.5"
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={v.image} custom={0.1 + lag}>
        <TiltImage src={image} alt={alt} eager className="aspect-[585/530] w-full" y={reduce ? undefined : drift} />
      </motion.div>
      <motion.div
        className="grid flex-1 gap-5 rounded-lg bg-[#0a1015] p-6 md:grid-cols-[1fr_auto] md:gap-10 lg:p-[30px]"
        variants={v.fade}
        custom={0.7 + lag}
      >
        <div className="flex flex-col gap-3">
          <h3 className="font-manrope text-2xl leading-[1.3] font-medium tracking-[-0.48px] text-white">{title}</h3>
          <p className={`max-w-[420px] leading-[1.6] font-light ${plateMuted}`}>{body}</p>
        </div>
        <dl className="flex gap-6 text-sm leading-[1.5] md:flex-col md:gap-2 md:pt-1.5 md:text-right">
          <div>
            <dt className="sr-only">Category</dt>
            <dd className="text-blue-light">{tag}</dd>
          </div>
          <div>
            <dt className="sr-only">Year</dt>
            <dd className={plateMuted}>{year}</dd>
          </div>
        </dl>
      </motion.div>
    </motion.article>
  )
}

function ProjectGrid() {
  return (
    <section aria-label="Projects" className="mx-auto max-w-[1440px] px-5 pb-24 lg:px-[60px] lg:pb-32">
      <div className="grid gap-[30px] md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}

export default function ProjectsPage() {
  useSmoothScroll()
  useEffect(() => {
    document.title = 'Projects | Bongo Expert'
  }, [])

  return (
    <>
      <main className="w-full overflow-x-clip bg-[#f8faff]">
        <ProjectsHero />
        <ProjectGrid />
        <Footer page="projects" />
      </main>
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}
