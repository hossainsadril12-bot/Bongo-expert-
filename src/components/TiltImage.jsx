import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import useMediaQuery from '../hooks/useMediaQuery'

// Heavier and slower than default: the card leans toward the pointer rather than snapping
const springCfg = { stiffness: 80, damping: 20, mass: 1 }

// Last known cursor position, shared by every TiltImage. Scrolling moves the page under a
// still cursor without firing pointer events, so hover has to be re-checked against this.
const cursor = { x: -1, y: -1 }
if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      cursor.x = e.clientX
      cursor.y = e.clientY
    },
    { passive: true },
  )
  document.addEventListener('pointerleave', () => {
    cursor.x = -1
    cursor.y = -1
  })
}

// Image that tilts toward the pointer in 3D, with a small "View project" tag that follows it.
// Pointer-and-hover devices only; static under reduced motion or on touch.
// `y` is an optional scroll-linked motion value that drifts the photo inside its frame.
// `eager` skips lazy loading, for images that play a reveal the moment they scroll in.
export default function TiltImage({ src, alt, className = '', label = 'View project', y, eager = false }) {
  const reduce = useReducedMotion()
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const active = canHover && !reduce

  const frame = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const hover = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), springCfg)
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), springCfg)
  const tagX = useSpring(useMotionValue(0), { stiffness: 180, damping: 26 })
  const tagY = useSpring(useMotionValue(0), { stiffness: 180, damping: 26 })
  const tagScale = useSpring(hover, { stiffness: 140, damping: 22 })
  // Hover zoom follows this image's own hover state, not CSS :hover on the whole row, which
  // Chrome only re-evaluates after scrolling stops and so fired at random moments
  const imgScale = useSpring(useTransform(hover, [0, 1], [1.12, 1.16]), { stiffness: 40, damping: 20 })

  const leave = () => {
    if (hover.get() === 0) return
    px.set(0.5)
    py.set(0.5)
    hover.set(0)
  }

  // Hit-test against the untilted outer frame (a rotated rect would skew the maths)
  const sync = () => {
    const el = frame.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = cursor.x - r.left
    const y = cursor.y - r.top
    const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height
    if (!inside) return leave()
    if (hover.get() === 0) {
      // Start the tag at the cursor; springing from 0,0 made it fly in from the corner
      tagX.jump(x + 14)
      tagY.jump(y + 14)
    }
    hover.set(1)
    px.set(x / r.width)
    py.set(y / r.height)
    tagX.set(x + 14)
    tagY.set(y + 14)
  }

  // Scrolling slides the page under a still cursor. Re-running the hit-test here made every image
  // that passed under the pointer tilt and flash its tag, so scrolling ends the hover instead;
  // the next real pointer move picks it back up.
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', () => {
    if (active) leave()
  })

  useEffect(() => {
    if (!active) return
    const onMove = () => sync()
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
    // sync only reads refs and motion values, so it never goes stale
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  if (!active) {
    return (
      <div className={`overflow-hidden rounded-lg ${className}`}>
        <motion.img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          className={`size-full object-cover ${y ? 'scale-[1.12]' : ''}`}
          style={y ? { y } : undefined}
        />
      </div>
    )
  }

  return (
    <div ref={frame} className={`relative [perspective:1100px] ${className}`}>
      <motion.div
        className="relative size-full cursor-pointer overflow-hidden rounded-lg"
        style={{ rotateX, rotateY }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          className="size-full object-cover"
          style={y ? { y, scale: imgScale } : { scale: imgScale }}
        />
      </motion.div>
      {/* The tag lives outside the tilted card: inside it, the card's clipping cut it off at the
          edges, and a backdrop blur re-rendered under a 3D transform caused frame hitches */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-blue-dark shadow-[0_4px_16px_rgba(10,16,21,0.18)]"
        style={{ x: tagX, y: tagY, scale: tagScale, opacity: tagScale }}
      >
        {label}
      </motion.span>
    </div>
  )
}
