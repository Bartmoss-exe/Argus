import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { n: '01', name: 'Web & API Pentest', tags: 'OWASP · API · Business Logic', desc: 'Teste manual profundo em aplicações web e APIs.' },
  { n: '02', name: 'Red Team Operations', tags: 'Adversary Emulation · C2 · EDR Bypass', desc: 'Operações encobertas de objetivo único: provar impacto real.' },
  { n: '03', name: 'Cloud & Active Directory', tags: 'AWS · Azure · AD · Kubernetes', desc: 'Caminhos de escalação em nuvem e diretório corporativo.' },
  { n: '04', name: 'Engenharia Social', tags: 'Phishing · Vishing · Físico', desc: 'O elo humano testado com campanhas realistas e éticas.' },
  { n: '05', name: 'Purple Team', tags: 'Detecção · MITRE ATT&CK · SOC', desc: 'Transformamos cada ataque em telemetria e detecção.' },
]

export default function Services() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-row', {
        autoAlpha: 0,
        y: 60,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="capacidades" className="relative py-24 md:py-36">
      <div className="mb-14 flex items-end justify-between px-6 md:px-10">
        <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-none tracking-[-0.03em]">
          CAPACIDADES
        </h2>
        <p className="mono hidden text-[11px] uppercase tracking-[0.3em] text-[#6f6f6f] md:block">
          [ 05 vetores de ataque ]
        </p>
      </div>

      <div className="border-b border-[#1b1b1b]">
        {SERVICES.map((s) => (
          <a
            key={s.n}
            href="#contato"
            className="svc-row group relative block overflow-hidden border-t border-[#1b1b1b]"
          >
            {/* red fill sweep */}
            <div className="absolute inset-0 origin-bottom scale-y-0 bg-[#ff2e2e] transition-transform duration-500 ease-expo group-hover:scale-y-100" />
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
