import { useRef } from 'react'
import { useScroll } from 'motion/react'
import { Agentation } from 'agentation'
import useSmoothScroll from './hooks/useSmoothScroll'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Design from './components/Design'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useSmoothScroll()
  const aboutRef = useRef(null)
  // 0 when About's top sits at the viewport bottom, 1 once it has slid up over the pinned hero
  const { scrollYProgress: heroCover } = useScroll({
    target: aboutRef,
    offset: ['start end', 'start start'],
  })

  return (
    <>
      {/* overflow-x-clip, not hidden: hidden would make <main> a scroll container and break sticky */}
      <main className="w-full overflow-x-clip">
        <div className="relative">
          <Hero cover={heroCover} />
          <div ref={aboutRef} className="relative z-10 shadow-[0_-24px_60px_rgba(10,16,21,0.18)]">
            <About />
          </div>
        </div>
        <Projects />
        <Design />
        <Process />
        <Contact />
        <Footer />
      </main>
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}
