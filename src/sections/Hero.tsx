import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ start }: { start: boolean }) {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!start) return
    const ctx = gsap.context(() => {
      // Entrance: lines clip-reveal
      gsap.to('.hero-line span', {
        y: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.14,
        delay: 0.15,
      })
      gsap.to('.hero-fade', {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.7,
      })
      // Vertical hairlines scale from top
      gsap.to('.hero-vline', {
        scaleY: 1,
        duration: 1.6,
        ease: 'power3.inOut',
        stagger: 0.12,
        delay: 0.3,
      })
      // Globe: slow float + entrance
      gsap.fromTo(
        '.hero-globe',
        { autoAlpha: 0, scale: 1.15 },
        { autoAlpha: 1, scale: 1, duration: 2, ease: 'power2.out', delay: 0.4 },
      )
      gsap.to('.hero-globe img', {
        y: 24,
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      // Scroll parallax out
      gsap.to('.hero-globe', {
        yPercent: 18,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-title-wrap', {
        yPercent: -30,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [start])

  return (
    <section ref={root} className="relative flex h-[100svh] flex-col justify-between overflow-hidden">
      {/* vertical hairlines */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {[25, 50, 75].map((left) => (
          <div
            key={left}
            className="hero-vline absolute top-0 h-full w-px origin-top scale-y-0 bg-white/[0.06]"
            style={{ left: `${left}%` }}
          />
        ))}
      </div>

      {/* globe */}
      <div className="hero-globe pointer-events-none absolute -right-[12vw] top-1/2 w-[62vw] max-w-[900px] -translate-y-1/2 opacity-0 md:-right-[6vw] md:w-[48vw]">
        <img
          src="/img/seq-recon.png"
          alt=""
          className="w-full [mask-image:radial-gradient(closest-side,black_55%,transparent_100%)]"
        />
      </div>

      {/* title */}
      <div className="hero-title-wrap relative z-10 flex flex-1 flex-col justify-center px-6 md:px-10">
        <p className="hero-fade mono mb-6 translate-y-4 text-[11px] uppercase tracking-[0.35em] text-[#ff2e2e] opacity-0">
          Segurança ofensiva // est. 2016
        </p>
        <h1 className="text-[clamp(3.4rem,12.5vw,11.5rem)] font-bold leading-[0.92] tracking-[-0.03em]">
          <span className="hero-line block overflow-hidden">
            <span className="block translate-y-full">ATACAMOS</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="text-stroke block translate-y-full">PRIMEIRO<span className="text-stroke-red">.</span></span>
          </span>
        </h1>
        <p className="hero-fade mt-8 max-w-md translate-y-4 text-sm leading-relaxed text-[#8a8a8a] opacity-0 md:text-base">
          Pentest, red team e emulação de adversário para empresas que não podem
          falhar. Encontramos o caminho do atacante — antes do atacante.
        </p>
      </div>

      {/* bottom meta bar */}
      <div className="relative z-10 flex items-end justify-between px-6 pb-6 md:px-10">
        <div className="hero-fade mono translate-y-4 text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f] opacity-0">
          São Paulo — Global
        </div>
        <div className="hero-fade mono flex translate-y-4 items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f] opacity-0">
          <span className="blink inline-block h-1.5 w-1.5 rounded-full bg-[#ff2e2e]" />
          REC 00:00:00
        </div>
        <div className="hero-fade mono translate-y-4 text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f] opacity-0">
          Scroll para infiltrar ↓
        </div>
      </div>
    </section>
  )
}
