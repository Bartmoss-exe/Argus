import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useT } from '../i18n/LanguageContext'
import { LANGS, type Lang } from '../i18n/dict'
import { useScrollDirection } from '../hooks/useScrollDirection'
import { useScramble } from '../components/Scramble'
import type Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/* Bandeiras em SVG inline — emoji de bandeira não renderiza no Windows */
function Flag({ lang }: { lang: Lang }) {
  const common = 'h-[11px] w-4 rounded-[2px] ring-1 ring-white/20'
  switch (lang) {
    case 'en':
      return (
        <svg viewBox="0 0 24 16" className={common} aria-label="English">
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0l24 16M24 0L0 16" stroke="#fff" strokeWidth="3.2" />
          <path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.3" />
          <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5.2" />
          <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="2.8" />
        </svg>
      )
    case 'es':
      return (
        <svg viewBox="0 0 24 16" className={common} aria-label="Español">
          <rect width="24" height="16" fill="#AA151B" />
          <rect y="4" width="24" height="8" fill="#F1BF00" />
        </svg>
      )
    case 'pt':
      return (
        <svg viewBox="0 0 24 16" className={common} aria-label="Português">
          <rect width="24" height="16" fill="#E42518" />
          <rect width="9.6" height="16" fill="#046A38" />
          <circle cx="9.6" cy="8" r="3.1" fill="#FFE900" stroke="#E42518" strokeWidth="0.7" />
        </svg>
      )
    case 'fr':
      return (
        <svg viewBox="0 0 24 16" className={common} aria-label="Français">
          <rect width="8" height="16" fill="#0055A4" />
          <rect x="8" width="8" height="16" fill="#fff" />
          <rect x="16" width="8" height="16" fill="#EF4135" />
        </svg>
      )
  }
}

interface NavbarProps {
  lenis: Lenis | null
}

export default function Navbar({ lenis }: NavbarProps) {
  const { lang, setLang, t } = useT()
  const direction = useScrollDirection(lenis)
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)

  const navOperation = useScramble(t.nav.operation)
  const navCapabilities = useScramble(t.nav.capabilities)
  const navContact = useScramble(t.nav.contact)
  const navCta = useScramble(t.nav.cta)

  // Hide/show based on scroll direction
  useEffect(() => {
    if (!navRef.current) return
    if (direction === 'down') {
      setHidden(true)
      gsap.to(navRef.current, { yPercent: -100, duration: 0.4, ease: 'power3.out' })
    } else if (direction === 'up') {
      setHidden(false)
      gsap.to(navRef.current, { yPercent: 0, duration: 0.4, ease: 'power3.out' })
    }
  }, [direction])

  // Scroll progress bar
  useEffect(() => {
    if (!progressRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <header
        ref={navRef}
        className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
        style={{ background: hidden ? 'rgba(5,5,5,0.95)' : 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)' }}
      >
        <nav className="flex items-center justify-between px-6 py-5 text-white md:px-10">
          <a href="#" className="flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight">ARGUS</span>
            <span className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff2e2e]">Pentest</span>
          </a>

          <div className="mono hidden items-center gap-8 text-[11px] uppercase tracking-[0.25em] md:flex">
            {[
              { href: '#operacao', label: navOperation },
              { href: '#capacidades', label: navCapabilities },
              { href: '#contato', label: navContact },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative opacity-60 transition-opacity duration-300 hover:opacity-100"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* language switcher com bandeiras */}
            <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/50 px-2 py-1.5 backdrop-blur-sm">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  data-hover
                  title={l.toUpperCase()}
                  className={`flex items-center gap-1.5 rounded-full px-2 py-1 transition-all duration-300 ${
                    lang === l
                      ? 'bg-white/10 opacity-100 shadow-[inset_0_0_0_1px_rgba(255,46,46,0.6)]'
                      : 'opacity-45 hover:opacity-90'
                  }`}
                >
                  <Flag lang={l} />
                  <span className="mono hidden text-[10px] uppercase tracking-[0.15em] text-white sm:inline">
                    {l}
                  </span>
                </button>
              ))}
            </div>

            <a
              href="#contato"
              className="mono border border-white/40 px-3 py-2 text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 hover:bg-white hover:text-black md:px-4 md:text-[11px]"
            >
              {navCta}
            </a>
          </div>
        </nav>

        {/* Scroll progress bar */}
        <div className="h-px w-full bg-transparent">
          <div
            ref={progressRef}
            className="h-full origin-left bg-[#ff2e2e]"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </header>
    </>
  )
}
