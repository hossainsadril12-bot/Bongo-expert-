import { motion, useReducedMotion } from 'motion/react'
import MobileMenu from './MobileMenu'
import { dur, ease } from '../lib/motion'
import { navLinks, pageHrefs } from '../lib/nav'

// No spring bounce here: luxury motion settles, it never wobbles
const arrive = { duration: dur.block, ease: ease.out }

// The site header: logo + links pill on the left, "Start a Project" on the right, menu button on phones.
// `page` picks the link targets (anchors on home, links back home elsewhere); `delay` times the slide-in.
export default function Navbar({ page = 'home', delay = 0.8 }) {
  const reduce = useReducedMotion()
  const init = (v) => (reduce ? false : v)
  const links = navLinks(page)
  const hrefs = pageHrefs(page)

  return (
    <header className="flex items-center justify-between gap-4">
      <motion.nav
        aria-label="Primary"
        className="flex h-[72px] items-center gap-9 rounded-[60px] bg-white px-1 py-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.08)]"
        initial={init({ x: -56, opacity: 0 })}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ...arrive, delay }}
      >
        <a href={hrefs.home} className="relative block size-[65px] shrink-0" aria-label="Bongo home">
          <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[#3a7dff] from-[7%] to-[#234b99] to-[89%]" />
          <img
            src="/assets/logo-mark.svg"
            alt=""
            className="absolute left-[17.5px] top-[13.75px] h-[36.25px] w-[35.5px]"
          />
        </a>
        <ul className="hidden items-center gap-6 pr-6 text-lg sm:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                aria-current={l.active ? 'page' : undefined}
                className={`relative inline-block py-1 transition-colors duration-500 ease-lux after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-current after:transition-transform after:duration-700 after:ease-lux ${
                  l.active
                    ? 'font-medium text-blue-dark after:scale-x-100'
                    : 'text-black after:origin-right after:scale-x-0 hover:text-blue-normal hover:after:origin-left hover:after:scale-x-100'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>

      <motion.a
        href={hrefs.contact}
        className="hidden h-14 shrink-0 items-center rounded-full border border-white bg-white/80 px-6 text-base text-blue-dark shadow-[0_0_2px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-[background-color,box-shadow,scale] duration-500 ease-lux hover:bg-white hover:shadow-[0_4px_16px_rgba(2,66,190,0.18)] active:scale-[0.98] sm:inline-flex"
        initial={init({ x: 56, opacity: 0 })}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ...arrive, delay: delay + 0.2 }}
      >
        Start a Project
      </motion.a>
      {/* Phones: the links don't fit the nav pill, so they move into a menu behind this button */}
      <MobileMenu
        links={links}
        homeHref={hrefs.home}
        contactHref={hrefs.contact}
        buttonMotion={{
          initial: init({ x: 56, opacity: 0 }),
          animate: { x: 0, opacity: 1 },
          transition: { ...arrive, delay: delay + 0.2 },
        }}
      />
    </header>
  )
}
