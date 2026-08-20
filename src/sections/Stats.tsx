import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 340, suffix: '+', label: 'Operações ofensivas concluídas' },
  { value: 12, suffix: '', label: 'CVEs publicados pela equipe' },
  { value: 48, suffix: 'h', label: 'Tempo médio até o primeiro crítico' },
  { value: 0, suffix: '', label: 'Vazamentos de dados de clientes' },
]

export default function Stats() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.stat-value').forEach((el) => {
        const target = Number(el.dataset.value || 0)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v))
          },
        })
      })
      gsap.from('.stat-cell', {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="border-y border-[#1b1b1b]">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`stat-cell px-6 py-12 md:px-10 md:py-16 ${i > 0 ? 'border-l border-[#1b1b1b]' : ''} ${i >= 2 ? 'border-t border-[#1b1b1b] md:border-t-0' : ''}`}
          >
            <p className="text-5xl font-bold tabular-nums tracking-tight text-white md:text-7xl">
              <span className="stat-value" data-value={s.value}>0</span>
              <span className="text-[#ff2e2e]">{s.suffix}</span>
            </p>
            <p className="mono mt-4 text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[#6f6f6f] md:text-[11px]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
