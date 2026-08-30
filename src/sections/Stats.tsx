import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useT } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
  { value: 340, suffix: '+' },
  { value: 12, suffix: '' },
  { value: 48, suffix: 'h' },
  { value: 0, suffix: '' },
]

export default function Stats() {
  const root = useRef<HTMLElement>(null)
  const { t } = useT()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation with scrub for bidirectional counting
      gsap.utils.toArray<HTMLElement>('.stat-value').forEach((el) => {
        const target = Number(el.dataset.value || 0)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 1,
          },
          onUpdate: () => {
            if (el) el.textContent = String(Math.round(obj.v))
          },
        })
      })

      // Bidirectional reveal for stat cells
      gsap.utils.toArray<HTMLElement>('.stat-cell').forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 60%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      })

      // Parallax on the numbers for scroll depth
      gsap.utils.toArray<HTMLElement>('.stat-number-wrap').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 15 },
          {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="border-y border-[#1b1b1b]">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {VALUES.map((s, i) => (
          <div
            key={i}
            className={`stat-cell px-6 py-12 md:px-10 md:py-16 ${i > 0 ? 'border-l border-[#1b1b1b]' : ''} ${i >= 2 ? 'border-t border-[#1b1b1b] md:border-t-0' : ''}`}
          >
            <div className="stat-number-wrap">
              <p className="text-5xl font-bold tabular-nums tracking-tight text-white md:text-7xl">
                <span className="stat-value" data-value={s.value}>0</span>
                <span className="text-[#ff2e2e]">{s.suffix}</span>
              </p>
            </div>
            <p className="mono mt-4 text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[#6f6f6f] md:text-[11px]">
              {t.stats.labels[i]}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
