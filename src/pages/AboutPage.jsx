import { useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Agentation } from 'agentation'
import { ArrowUpRight, Crosshair, Lightning, Path, Infinity as InfinityIcon } from '@phosphor-icons/react'
import useSmoothScroll from '../hooks/useSmoothScroll'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Label from '../components/Label'
import { dur, ease } from '../lib/motion'
import { type } from '../lib/type'

// Layout follows the Somerstone About page (docs/reference/somerstone-about/design.md), skinned in
// Bongo tokens. Copy comes from docs/content/about-us.md. The hero image is a brand image for now:
// swap in a real team photo (and add a team grid) once names and portraits are confirmed.

const values = [
  { Icon: Path, text: 'We bring clarity to complex ideas, so every screen is easy to understand.' },
  { Icon: Crosshair, text: 'We consider every detail and remove anything that does not serve the product.' },
  { Icon: Lightning, text: 'We move with the focus and speed of a small senior team.' },
  { Icon: InfinityIcon, text: 'We build work that stays relevant long after design trends fade.' },
]

const services = [
  {
    name: 'Design',
    role: 'Brand and interface',
    body: 'Brand identity and interface design that make a product clear at first glance.',
    image: '/assets/design-card.png',
    alt: 'Lunetra brand identity card',
  },
  {
    name: 'Web Development',
    role: 'Websites',
    body: 'Fast, accessible, responsive websites built to convert and easy for your team to run.',
    image: '/assets/web-dev-card.webp',
    alt: 'Portrait in warm orange light from the Aurelio website',
  },
  {
    name: 'App Development',
    role: 'Mobile and web apps',
    body: 'Mobile and web apps that turn a complex workflow into a few confident taps.',
    image: '/assets/app-dev-card.webp',
    alt: 'Voxie AI voice editor app on a phone',
  },
  {
    name: 'AI Consultant',
    role: 'Applied AI',
    body: 'Practical AI for your product: where it helps, where it does not, and how to ship it responsibly.',
    image: '/assets/ai-consult-card.webp',
    alt: 'AURA halo logo on an indigo gradient',
  },
]

// Body grey on navy, 8.9:1 (same as the /projects plates)
const navyMuted = 'text-[#aab1bd]'

const v = {
  mask: {
    hidden: { y: '105%' },
    visible: (d = 0) => ({ y: '0%', transition: { duration: dur.text, ease: ease.out, delay: d } }),
  },
  fade: {
    hidden: { opacity: 0, y: 16 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: dur.block, ease: ease.out, delay: d } }),
  },
  // The photo is uncovered from the bottom up, like a print being lifted into view
  wipe: {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    visible: (d = 0) => ({
      clipPath: 'inset(0% 0 0 0)',
      transition: { duration: dur.image, ease: ease.inOut, delay: d },
    }),
  },
}

function Line({ children, d }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span className="block" variants={v.mask} custom={d}>
        {children}
      </motion.span>
    </span>
  )
}

function AboutHero({ reduce }) {
  return (
    <section className="bg-[#f8faff]">
      <div className="mx-auto max-w-[1440px] px-5 pt-9 lg:px-[60px]">
        <Navbar page="about" delay={0.2} />

        <motion.div
          className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1fr_minmax(0,540px)] lg:items-end lg:gap-16"
          initial={reduce ? false : 'hidden'}
          animate="visible"
        >
          <div className="flex flex-col gap-6 lg:pb-[150px]">
            <motion.div variants={v.fade} custom={0.2}>
              <Label className="text-[#0a1017]">About Bongo</Label>
            </motion.div>
            <h1 className={`${type.display} text-ink`}>
              <Line d={0.3}>The team behind</Line>{' '}
              <Line d={0.45}>
                the <span className="text-blue-dark">work.</span>
              </Line>
            </h1>
            <motion.p
              className={`max-w-[440px] ${type.body} text-ink`}
              variants={v.fade}
              custom={0.9}
            >
              We turn complex ideas into intuitive, high-performance digital products for teams who plan to be around
              for a while.
            </motion.p>
          </div>

          {/* Desktop: the photo hangs into the navy band below, tying who we are to why we exist */}
          <motion.div
            className="relative z-10 -mb-24 overflow-hidden rounded-2xl lg:-mb-[220px]"
            variants={v.wipe}
            custom={0.4}
          >
            <img
              src="/assets/about-img2.png"
              alt="Figure in a white jacket moving through blue light"
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Purpose({ reduce }) {
  return (
    <section className="bg-[#0a1015] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 lg:px-[60px] lg:pb-32">
        {/* First row shares the hero's columns: the card crosses the band's top edge, the right column
            leaves room for the hanging photo */}
        <div className="grid pt-32 lg:grid-cols-[1fr_minmax(0,540px)] lg:gap-16 lg:pt-0">
          <motion.div
            className="relative z-10 max-w-[440px] rounded-lg border border-white/10 bg-[#141c26] p-6 shadow-[0_0_24px_rgba(10,16,21,0.3)] lg:-mt-20 lg:ml-auto lg:self-start"
            initial={reduce ? false : 'hidden'}
            animate="visible"
            variants={v.fade}
            custom={1.3}
          >
            <p className={type.body}>
              We work with ambitious teams to turn complex ideas into products that are intuitive, purposeful and
              distinctly modern.
            </p>
            <a
              href="/#contact"
              className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-light"
            >
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              <span className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-700 after:ease-lux group-hover:after:scale-x-0">
                Start a Project
              </span>
            </a>
          </motion.div>
          <span className="hidden lg:block lg:min-h-[220px]" />
        </div>

        <motion.div
          className="mt-16 flex max-w-[1000px] flex-col gap-6 lg:mt-20"
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div variants={v.fade}>
            <Label className="text-white">Our purpose</Label>
          </motion.div>
          <h2 className={type.h2Regular}>
            <Line d={0.15}>Clarity is a design decision</Line>
          </h2>
          <motion.p className={`max-w-[560px] ${type.body} ${navyMuted}`} variants={v.fade} custom={0.5}>
            Too many digital products ask people to work them out. We do the hard thinking up front, so the result
            feels obvious: if something does not help a person understand, decide or act, we remove it.
          </motion.p>
        </motion.div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, text }, i) => (
            <motion.li
              key={text}
              data-testid="value-card"
              className="flex min-h-[200px] flex-col justify-between gap-8 rounded-lg border border-white/10 bg-[#141c26] p-7"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: dur.block, ease: ease.out, delay: i * 0.15 }}
            >
              <Icon size={36} weight="light" className="text-blue-light" aria-hidden="true" />
              <p className={`${type.body} text-[#d5d9e0]`}>{text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Team({ reduce }) {
  return (
    <section className="bg-[#f8faff]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 lg:px-[60px] lg:py-32">
        <motion.div
          className="mx-auto flex max-w-[860px] flex-col items-center gap-6 text-center"
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className={`${type.h2Regular} text-ink`}>
            <Line d={0}>
              A small senior team, <span className="text-blue-dark">on purpose.</span>
            </Line>
          </h2>
          <motion.p className={`max-w-[560px] ${type.body} text-ink`} variants={v.fade} custom={0.4}>
            The people you meet in the first call are the people who design, build and ship your product. Four
            disciplines, one team, nothing handed down a chain.
          </motion.p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-[1000px] gap-x-[18px] gap-y-12 md:grid-cols-2">
          {services.map((s, i) => (
            <motion.article
              key={s.name}
              className="flex flex-col gap-5"
              initial={reduce ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div className="overflow-hidden rounded-lg" variants={v.wipe} custom={(i % 2) * 0.15}>
                <img src={s.image} alt={s.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </motion.div>
              <motion.div className="flex flex-col gap-3" variants={v.fade} custom={0.6 + (i % 2) * 0.15}>
                <p className={`${type.meta} text-secondary`}>{s.role}</p>
                <h3 className={`${type.h3} text-ink`}>{s.name}</h3>
                <p className={`max-w-[440px] ${type.body} text-ink`}>{s.body}</p>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  useSmoothScroll()
  const reduce = useReducedMotion()
  useEffect(() => {
    document.title = 'About Bongo Expert: Digital Product Agency for Ambitious Teams'
  }, [])

  return (
    <>
      <main className="w-full overflow-x-clip">
        <AboutHero reduce={reduce} />
        <Purpose reduce={reduce} />
        <Team reduce={reduce} />
        <Footer page="about" />
      </main>
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}
