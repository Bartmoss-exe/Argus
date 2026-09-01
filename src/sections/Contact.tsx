import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useT } from '../i18n/LanguageContext'
import { useScramble } from '../components/Scramble'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const root = useRef<HTMLElement>(null)
  const { t } = useT()

  const labelA = useScramble(t.contact.label.slice(0, 2))
  const labelB = useScramble(t.contact.label.slice(2))
  const line1 = useScramble(t.contact.line1)
  const line2a = useScramble(t.contact.line2a)
  const line2hl = useScramble(t.contact.line2hl)
  const cta = useScramble(t.contact.cta)
  const note = useScramble(t.contact.note)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic title with bidirectional scrub
      gsap.fromTo(
        '.cta-line span',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: root.current,
            start: 'top 65%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )

      // Fade elements; reverse only when scrolling back above the start
      gsap.utils.toArray<HTMLElement>('.cta-fade').forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: root.current,
              start: 'top 55%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // Footer links stagger reveal
      gsap.utils.toArray<HTMLElement>('.footer-link').forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 15 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: '.footer-links',
              start: 'top bottom',
              toggleActions: 'play none none reverse',
            },
          }
        )
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
        <span className="text-[#ff2e2e]">{labelA}</span>
        {labelB}
      </p>

      <h2 className="relative text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.95] tracking-[-0.03em]">
        <span className="cta-line block overflow-hidden">
          <span className="block">{line1}</span>
        </span>
        <span className="cta-line block overflow-hidden">
          <span className="block">
            {line2a} <span className="text-stroke-red">{line2hl}</span>
            {t.contact.line2suffix}
          </span>
        </span>
      </h2>

      <div className="cta-fade mt-12 flex flex-col gap-6 md:flex-row md:items-center">
        <a
          href="mailto:contato@arguspentest.com"
          className="mono group inline-flex w-fit items-center gap-4 border border-white/25 px-8 py-5 text-sm uppercase tracking-[0.25em] transition-colors duration-300 hover:border-[#ff2e2e] hover:bg-[#ff2e2e] hover:text-black"
        >
          {cta}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
        <p className="mono text-[11px] uppercase tracking-[0.25em] text-[#6f6f6f]">
          {note}
        </p>
      </div>

      {/* footer */}
      <footer className="mt-32 grid grid-cols-1 gap-4 border-t border-[#1b1b1b] pt-6 md:grid-cols-3 md:items-center">
        <p className="footer-link mono text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f] md:justify-self-start">
          {t.contact.footer}
        </p>
        <div className="footer-links mono flex gap-6 text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f] md:justify-self-center">
          {[
            { name: 'LinkedIn', href: 'https://www.linkedin.com/company/arguspentest' },
            { name: 'GitHub', href: 'https://github.com/arguspentest' },
            { name: 'X', href: 'https://x.com/arguspentest' },
          ].map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link group relative transition-colors hover:text-white"
            >
              {s.name}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>
        <p className="footer-link mono text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f] md:justify-self-end">
          {t.contact.tagline.replace('.', '')}<span className="text-[#ff2e2e]">.</span>
        </p>
      </footer>
    </section>
  )
}
