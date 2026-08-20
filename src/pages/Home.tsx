import { useCallback, useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor from '../components/Cursor'
import Loader from '../sections/Loader'
import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'
import Operation from '../sections/Operation'
import Manifesto from '../sections/Manifesto'
import Services from '../sections/Services'
import Stats from '../sections/Stats'
import Contact from '../sections/Contact'
import { LanguageProvider } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const handleDone = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (loaded) ScrollTrigger.refresh()
  }, [loaded])

  return (
    <div className="grain relative bg-[#050505] text-[#f4f4f4]">
      <Cursor />
      {!loaded && <Loader onDone={handleDone} />}
      <LanguageProvider>
        <Navbar />
        <main>
          <Hero start={loaded} />
          <Operation />
          <Manifesto />
          <Services />
          <Stats />
          <Contact />
        </main>
      </LanguageProvider>
    </div>
  )
}
