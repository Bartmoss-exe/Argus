import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useT } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Manifesto() {
  const root = useRef<HTMLElement>(null)
  const { t } = useT()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.manifesto-word',
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: true,
          },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative px-6 py-32 md:px-10 md:py-48">
      <p className="mono mb-10 text-[11px] uppercase tracking-[0.35em] text-[#6f6f6f]">
        <span className="text-[#ff2e2e]">{t.manifesto.label.slice(0, 2)}</span>
        {t.manifesto.label.slice(2)}
      </p>
      <p className="max-w-5xl text-2xl font-medium leading-snug tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
        {t.manifesto.text.split(' ').map((word, i) => (
          <span key={i} className="manifesto-word">
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}
