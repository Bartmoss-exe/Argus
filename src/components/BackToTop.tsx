import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUp } from 'lucide-react'
import type Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

interface BackToTopProps {
  lenis: Lenis | null
}

const RADIUS = 21
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function BackToTop({ lenis }: BackToTopProps) {
  const [visible, setVisible] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const show = ScrollTrigger.create({
      trigger: document.body,
      start: 'top -50%',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const scrollY = self.scroll()
        setVisible(scrollY > window.innerHeight * 0.5)
        if (ringRef.current) {
          const max = document.documentElement.scrollHeight - window.innerHeight
          const progress = max > 0 ? Math.min(scrollY / max, 1) : 0
          ringRef.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - progress))
        }
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
      className="group fixed bottom-8 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#050505]/80 text-white opacity-0 backdrop-blur-sm transition-colors duration-300 hover:border-[#ff2e2e] md:right-10"
      aria-label="Voltar ao topo"
    >
      {/* scroll progress ring */}
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden>
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />
        <circle
          ref={ringRef}
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="#ff2e2e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
      </svg>
      <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#ff2e2e]" />
    </button>
  )
}
