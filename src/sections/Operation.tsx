import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PHASES = [
  {
    img: '/img/seq-recon.png',
    index: '01',
    title: 'RECON',
    desc: 'Mapeamos a sua superfície de ataque como um adversário real: OSINT, enumeração de infraestrutura, footprint completo — antes que alguém faça isso por você.',
    log: '> nmap -sS --top-ports 1000 alvo.corp … 14 portas abertas',
  },
  {
    img: '/img/seq-exploit.png',
    index: '02',
    title: 'EXPLORAÇÃO',
    desc: 'Nada de scanners de prateleira. Engenharia de exploit sob medida, cadeias de ataque manuais e bypass de defesas modernas — EDR, WAF, MFA.',
    log: '> exploit/multi/handler → sessão aberta em 10.0.4.17',
  },
  {
    img: '/img/seq-escalate.png',
    index: '03',
    title: 'ESCALAÇÃO',
    desc: 'De um único foothold ao domínio total: movimento lateral, escalada de privilégio e persistência — documentando cada salto da cadeia.',
    log: '> getsystem … NT AUTHORITY\\SYSTEM — domínio comprometido',
  },
  {
    img: '/img/seq-report.png',
    index: '04',
    title: 'RELATÓRIO',
    desc: 'Cada achado com evidência reproduzível, impacto de negócio e plano de remediação acionável. Depois, retestamos de graça até fechar.',
    log: '> report.pdf — 47 achados, 12 críticos, 0 falsos positivos',
  },
]

export default function Operation() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=380%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Odometer counter: continuous 01 → 04
      tl.to('.op-counter-col', { yPercent: -75, duration: 4 }, 0)

      // Vertical progress fill
      tl.fromTo('.op-progress-fill', { scaleY: 0 }, { scaleY: 1, duration: 4 }, 0)

      PHASES.forEach((_, i) => {
        // Camera push on each image during its segment
        tl.fromTo(`.op-img-${i}`, { scale: 1.02 }, { scale: 1.14, duration: 1 }, i)

        // Cinematic wipe reveal for incoming frames
        if (i > 0) {
          tl.fromTo(
            `.op-img-${i}`,
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0% 0 0 0)', duration: 0.4, ease: 'power2.inOut' },
            i - 0.2,
          )
        }

        // Scan sweep across the frame each phase
        tl.fromTo(
          '.op-sweep',
          { top: '-2%', opacity: 1 },
          { top: '102%', opacity: 0.6, duration: 0.9 },
          i,
        )

        // Text blocks in / out
        tl.fromTo(
          `.op-text-${i}`,
          { autoAlpha: 0, y: 48 },
          { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power2.out' },
          i + 0.08,
        )
        if (i < PHASES.length - 1) {
          tl.to(`.op-text-${i}`, { autoAlpha: 0, y: -48, duration: 0.28, ease: 'power2.in' }, i + 0.72)
        }
      })

      // Header micro-reveal when section enters
      gsap.from('.op-head', {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="operacao" className="relative h-[100svh] overflow-hidden bg-[#050505]">
      {/* header */}
      <div className="op-head absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-20 md:px-10">
        <p className="mono text-[11px] uppercase tracking-[0.35em] text-white">
          A operação <span className="text-[#ff2e2e]">— 04 fases</span>
        </p>
        <p className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f]">
          <span className="blink inline-block h-1.5 w-1.5 rounded-full bg-[#ff2e2e]" />
          feed ao vivo
        </p>
      </div>

      <div className="grid h-full grid-cols-1 items-center gap-6 px-6 pt-24 pb-10 md:grid-cols-[1.15fr_auto_1fr] md:gap-12 md:px-10">
        {/* frame */}
        <div className="scanlines relative aspect-[16/10] w-full overflow-hidden border border-[#1b1b1b] bg-black md:aspect-auto md:h-[62vh]">
          {PHASES.map((p, i) => (
            <img
              key={p.index}
              src={p.img}
              alt={p.title}
              className={`op-img-${i} absolute inset-0 h-full w-full object-cover will-change-transform`}
              style={i > 0 ? { clipPath: 'inset(100% 0 0 0)' } : undefined}
            />
          ))}
          {/* scan sweep */}
          <div className="op-sweep absolute inset-x-0 z-10 h-[2px] bg-[#ff2e2e] shadow-[0_0_18px_2px_rgba(255,46,46,0.8)]" />
          {/* corner brackets */}
          <div className="pointer-events-none absolute inset-3 z-10">
            <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-white/50" />
            <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-white/50" />
            <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/50" />
            <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/50" />
          </div>
        </div>

        {/* progress line + odometer */}
        <div className="relative hidden h-[62vh] w-px bg-[#1b1b1b] md:block">
          <div className="op-progress-fill absolute inset-0 origin-top bg-[#ff2e2e]" />
          <div className="absolute -left-[1.35rem] top-0 h-10 overflow-hidden">
            <div className="op-counter-col flex h-[10rem] flex-col will-change-transform">
              {PHASES.map((p) => (
                <span key={p.index} className="mono flex h-10 items-center text-sm tabular-nums text-white">
                  {p.index}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* text stack */}
        <div className="relative h-[38vh] md:h-[62vh]">
          {PHASES.map((p, i) => (
            <div key={p.index} className={`op-text-${i} absolute inset-0 flex flex-col justify-center opacity-0`}>
              <span className="text-stroke-faint text-[clamp(4rem,8vw,7.5rem)] font-bold leading-none">
                {p.index}
              </span>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
                {p.title}
                <span className="text-[#ff2e2e]">_</span>
              </h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#8a8a8a] md:text-base">{p.desc}</p>
              <p className="mono mt-6 border-l-2 border-[#ff2e2e] pl-4 text-[11px] leading-relaxed text-[#6f6f6f] md:text-xs">
                {p.log}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
