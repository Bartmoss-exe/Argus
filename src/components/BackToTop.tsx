import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUp } from 'lucide-react'
import type Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

interface BackToTopProps {
  lenis: Lenis | null
}

export default function BackToTop({ lenis }: BackToTopProps) {
  const [visible, setVisible] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const show = ScrollTrigger.create({
      trigger: document.body,
      start: 'top -50%',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setVisible(self.scroll() > window.innerHeight * 0.5)
      },
    })
    return () => show.kill()
  }, [])

  useEffect(() => {
    if (!btnRef.current) return
    gsap.to(btnRef.current, {
      autoAlpha: visible ? 1 : 0,
      scale: visible ? 1 : 0.8,
      y: visible ? 0 : 20,
      duration: 0.4,
      ease: 'power3.out',
    })
  }, [visible])

  const handleClick = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2.5 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      data-hover
      className="fixed right-6 bottom-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#050505]/80 text-white opacity-0 backdrop-blur-sm transition-colors duration-300 hover:border-[#ff2e2e] hover:bg-[#ff2e2e] hover:text-black md:right-10"
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
