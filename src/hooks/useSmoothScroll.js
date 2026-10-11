import { useEffect } from 'react'
import Lenis from 'lenis'

// Eased wheel scrolling (Lenis). Skipped entirely under prefers-reduced-motion.
export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.075, anchors: true })
    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}
