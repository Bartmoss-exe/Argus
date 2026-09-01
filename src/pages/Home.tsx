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
import SectionDivider from '../components/SectionDivider'
import BackToTop from '../components/BackToTop'
import { LanguageProvider } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const handleDone = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    const lenisInstance = new Lenis({ lerp: 0.09, smoothWheel: true })
    setLenis(lenisInstance)
    lenisInstance.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenisInstance.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenisInstance.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    if (loaded) ScrollTrigger.refresh()
  }, [loaded])

  return (
    <div className="grain relative bg-black text-[#f4f4f4]">
      <Cursor />
      {!loaded && <Loader onDone={handleDone} />}
      <LanguageProvider>
        <Navbar lenis={lenis} />
        <main>
          <Hero start={loaded} />
          <SectionDivider direction="left" />
          <Operation />
          <SectionDivider direction="right" />
          <Manifesto />
          <SectionDivider direction="center" />
          <Services />
          <SectionDivider direction="left" />
          <Stats />
          <SectionDivider direction="right" />
          <Contact />
        </main>
        <BackToTop lenis={lenis} />
      </LanguageProvider>
    </div>
  )
}
