import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useT } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const root = useRef<HTMLElement>(null)
  const { t } = useT()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Bidirectional reveal: elements animate in on scroll down, out on scroll up
      ScrollTrigger.batch('.svc-row', {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { autoAlpha: 0, y: 60 },
            { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 }
          )
        },
        onLeave: (elements) => {
          gsap.to(elements, { autoAlpha: 0.3, y: -20, duration: 0.6, ease: 'power2.in', stagger: 0.05 })
        },
        onEnterBack: (elements) => {
          gsap.to(elements, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 })
        },
        onLeaveBack: (elements) => {
          gsap.to(elements, { autoAlpha: 0.3, y: 20, duration: 0.6, ease: 'power2.in', stagger: 0.05 })
        },
        start: 'top 75%',
        end: 'bottom 25%',
      })

      // Title reveal with scrub for bidirectional feel
      gsap.fromTo(
        '.svc-title',
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.svc-title',
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="capacidades" className="relative py-24 md:py-36">
      <div className="mb-14 flex items-end justify-between px-6 md:px-10">
        <h2 className="svc-title text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-none tracking-[-0.03em]">
          {t.services.title}
        </h2>
        <p className="mono hidden text-[11px] uppercase tracking-[0.3em] text-[#6f6f6f] md:block">
          {t.services.meta}
        </p>
      </div>

      <div className="border-b border-[#1b1b1b]">
        {t.services.items.map((s) => (
          <a
            key={s.n}
            href="#contato"
            className="svc-row group relative block overflow-hidden border-t border-[#1b1b1b]"
          >
            {/* red fill sweep */}
            <div className="ease-expo absolute inset-0 origin-bottom scale-y-0 bg-[#ff2e2e] transition-transform duration-500 group-hover:scale-y-100" />
            <div className="relative z-10 grid grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-7 transition-colors duration-500 group-hover:text-black md:grid-cols-[6rem_1fr_1fr_auto] md:px-10 md:py-9">
              <span className="mono text-xs text-[#6f6f6f] transition-colors duration-500 group-hover:text-black/70">
                /{s.n}
              </span>
              <h3 className="text-2xl font-bold tracking-tight md:text-4xl">{s.name}</h3>
              <p className="mono hidden text-[11px] uppercase tracking-[0.2em] text-[#6f6f6f] transition-colors duration-500 group-hover:text-black/70 md:block">
                {s.tags}
              </p>
              <span className="text-2xl transition-transform duration-500 group-hover:translate-x-0 group-hover:-translate-y-0 md:translate-x-3 md:translate-y-3 md:text-3xl">
                ↗
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
