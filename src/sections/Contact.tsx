import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-line span', {
        yPercent: 110,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
      })
      gsap.from('.cta-fade', {
        autoAlpha: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 55%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="contato" className="relative overflow-hidden px-6 pb-10 pt-32 md:px-10 md:pt-48">
      {/* faint red glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[60vh] w-[60vw] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(closest-side, #ff2e2e, transparent)' }}
        aria-hidden
      />

      <p className="cta-fade mono mb-8 text-[11px] uppercase tracking-[0.35em] text-[#6f6f6f]">
        <span className="text-[#ff2e2e]">//</span> Canal seguro aberto
      </p>

      <h2 className="relative text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.95] tracking-[-0.03em]">
        <span className="cta-line block overflow-hidden">
          <span className="block">PRONTO PARA</span>
        </span>
        <span className="cta-line block overflow-hidden">
          <span className="block">
            SER <span className="text-stroke-red">TESTADO</span>?
          </span>
        </span>
      </h2>

      <div className="cta-fade mt-12 flex flex-col gap-6 md:flex-row md:items-center">
        <a
          href="mailto:ops@argussec.io"
          className="mono group inline-flex w-fit items-center gap-4 border border-white/25 px-8 py-5 text-sm uppercase tracking-[0.25em] transition-colors duration-300 hover:border-[#ff2e2e] hover:bg-[#ff2e2e] hover:text-black"
        >
          Iniciar operação
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
        <p className="mono text-[11px] uppercase tracking-[0.25em] text-[#6f6f6f]">
          ops@argussec.io — PGP disponível · resposta em 24h
        </p>
      </div>

      {/* footer */}
      <footer className="mt-32 flex flex-col gap-4 border-t border-[#1b1b1b] pt-6 md:flex-row md:items-center md:justify-between">
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f]">
          © 2026 ARGUS — Segurança Ofensiva
        </p>
        <div className="mono flex gap-6 text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f]">
          <a href="#" className="transition-colors hover:text-white">LinkedIn</a>
          <a href="#" className="transition-colors hover:text-white">GitHub</a>
          <a href="#" className="transition-colors hover:text-white">X</a>
        </div>
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f]">
          Atacamos primeiro<span className="text-[#ff2e2e]">.</span>
        </p>
      </footer>
    </section>
  )
}
