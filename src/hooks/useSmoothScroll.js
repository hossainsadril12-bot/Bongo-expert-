import { useEffect } from 'react'
import Lenis from 'lenis'

// Nav/anchor jumps get a fixed 2s ease-in-out, so a long jump doesn't crawl.
export const anchorScroll = {
  duration: 2,
  easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2),
}

// The live Lenis instance (null under reduced motion), so overlays like the mobile menu can pause it
let current = null
export const getLenis = () => current

// Eased wheel scrolling (Lenis). Skipped entirely under prefers-reduced-motion.
export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    // Low lerp = long, soft glide after each wheel tick; wheelMultiplier < 1 = less distance per notch.
    // Together they read as slow and weighted ("luxury") rather than snappy.
    const lenis = new Lenis({ lerp: 0.055, wheelMultiplier: 0.8, anchors: anchorScroll })
    current = lenis
    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      current = null
    }
  }, [])
}
