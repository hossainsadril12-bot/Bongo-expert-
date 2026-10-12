import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { anchorScroll, getLenis } from '../hooks/useSmoothScroll'
import { ease } from '../lib/motion'
import StartButton from './StartButton'

// Phone-only menu (below `sm`). A native modal <dialog> gives Escape-to-close, a focus trap and an inert
// page behind it; it's portalled to <body> so the hero's scroll transforms never touch it.
// The panel's header row mirrors the hero header exactly, so the hamburger appears to turn into the close button.

const roundButton =
  'flex size-14 shrink-0 items-center justify-center rounded-full border border-white bg-white/80 text-blue-dark shadow-[0_0_2px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-[background-color,scale] duration-500 ease-lux hover:bg-white active:scale-[0.96]'

function lockPage(locked) {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
  const lenis = getLenis()
  if (lenis) locked ? lenis.stop() : lenis.start()
}

function scrollToHash(href) {
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(href === '#' ? 0 : href, anchorScroll)
  else if (href === '#') window.scrollTo(0, 0)
  else document.querySelector(href)?.scrollIntoView()
}

export default function MobileMenu({ links, buttonMotion }) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    dialogRef.current?.showModal()
    lockPage(true)
  }, [open])

  // Release the page if the menu unmounts while open (e.g. hot reload, rotating to tablet width)
  useEffect(() => () => lockPage(false), [])

  // Close on any link: release the page straight away so the glide runs while the panel lifts away
  const go = (e, href) => {
    e.preventDefault()
    lockPage(false)
    scrollToHash(href)
    setOpen(false)
  }

  const panel = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 } }
    : {
        initial: { clipPath: 'inset(0 0 100% 0)' },
        animate: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.9, ease: ease.inOut } },
        exit: { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.6, ease: ease.inOut } },
      }
  const rise = (i) =>
    reduce
      ? {}
      : {
          initial: { y: '110%' },
          animate: { y: '0%', transition: { duration: 1.2, ease: ease.out, delay: 0.35 + i * 0.08 } },
          exit: { y: '110%', transition: { duration: 0.4, ease: ease.inOut } },
        }

  return (
    <>
      <motion.button
        type="button"
        className={`${roundButton} sm:hidden`}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        {...buttonMotion}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M3 8h16M3 14h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </motion.button>

      {createPortal(
        <dialog
          id="mobile-menu"
          ref={dialogRef}
          aria-label="Menu"
          className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-transparent sm:hidden"
          onCancel={(e) => {
            e.preventDefault()
            setOpen(false)
          }}
        >
          <AnimatePresence
            onExitComplete={() => {
              dialogRef.current?.close()
              lockPage(false)
            }}
          >
            {open && (
              <motion.div key="panel" className="flex h-full flex-col bg-white px-5 pt-9 pb-10" {...panel}>
                <div className="flex h-[72px] items-center justify-between gap-4">
                  <a href="#" className="relative ml-1 block size-[65px] shrink-0" aria-label="Bongo home" onClick={(e) => go(e, '#')}>
                    <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[#3a7dff] from-[7%] to-[#234b99] to-[89%]" />
                    <img src="/assets/logo-mark.svg" alt="" className="absolute left-[17.5px] top-[13.75px] h-[36.25px] w-[35.5px]" />
                  </a>
                  <button type="button" className={roundButton} aria-label="Close menu" onClick={() => setOpen(false)}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <path d="M5.5 5.5l11 11M16.5 5.5l-11 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <nav aria-label="Mobile" className="mt-[clamp(32px,8vh,72px)]">
                  <ul className="flex flex-col">
                    {links.map((l, i) => (
                      <li key={l.label} className="overflow-hidden border-b border-black/[0.08]">
                        <motion.a
                          href={l.href}
                          onClick={(e) => go(e, l.href)}
                          className="block py-4 font-manrope text-[40px] leading-none font-medium tracking-[-0.02em] text-ink transition-colors duration-500 ease-lux active:text-blue-normal"
                          {...rise(i)}
                        >
                          {l.label}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <motion.div
                  className="mt-auto"
                  {...(reduce
                    ? {}
                    : {
                        initial: { opacity: 0, y: 16 },
                        animate: { opacity: 1, y: 0, transition: { duration: 1.2, ease: ease.out, delay: 0.75 } },
                        exit: { opacity: 0, transition: { duration: 0.3 } },
                      })}
                >
                  <StartButton onClick={(e) => go(e, '#contact')} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </dialog>,
        document.body,
      )}
    </>
  )
}
