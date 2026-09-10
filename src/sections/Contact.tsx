import { useLayoutEffect, useRef, type FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useT } from '../i18n/LanguageContext'
import { useScramble } from '../components/Scramble'

gsap.registerPlugin(ScrollTrigger)

const CONTACT_EMAIL = 'contato@arguspentest.com'
// Troque pelo link real (Cal.com, Calendly etc.) quando tiver
const SCHEDULING_URL = 'https://cal.com/arguspentest'

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
  const formTitle = useScramble(t.contact.form.title)
  const submit = useScramble(t.contact.form.submit)
  const scheduleCta = useScramble(t.contact.schedule.cta)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')
    const subject = encodeURIComponent(`[arguspentest.com] ${name}`)
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

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

      // Form and scheduling reveal when they enter the viewport
      gsap.utils.toArray<HTMLElement>('.form-reveal').forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: el,
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
    <section ref={root} id="contato" className="relative overflow-hidden px-6 pb-10 pt-16 md:px-10 md:pt-20">
      {/* faint red glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[60vh] w-[60vw] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(closest-side, #ff2e2e, transparent)' }}
        aria-hidden
      />

      <p className="cta-fade mono mb-6 text-xs uppercase tracking-[0.35em] text-[#6f6f6f]">
        <span className="text-[#ff2e2e]">{labelA}</span>
        {labelB}
      </p>

      <h2 className="relative text-[clamp(3rem,7.5vw,7rem)] font-bold leading-[0.95] tracking-[-0.03em]">
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

      <div className="cta-fade mt-8 flex flex-col gap-6 md:flex-row md:items-center">
        <a
          href="#formulario"
          className="mono group inline-flex w-fit items-center gap-4 border border-white/25 px-8 py-5 text-sm uppercase tracking-[0.25em] transition-colors duration-300 hover:border-[#ff2e2e] hover:bg-[#ff2e2e] hover:text-black"
        >
          {cta}
          <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
        </a>
        <p className="mono text-[11px] uppercase tracking-[0.25em] text-[#6f6f6f]">
          {note}
        </p>
      </div>

      {/* terminal form */}
      <div id="formulario" className="form-reveal mt-10 max-w-2xl scroll-mt-28">
        <div className="border border-white/15 bg-white/[0.02]">
          <div className="flex items-center gap-2 border-b border-white/15 px-5 py-3">
            <span className="h-2 w-2 rounded-full bg-[#ff2e2e]" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="mono ml-3 text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f]">
              {formTitle}
            </span>
          </div>
          <form onSubmit={handleSubmit} className="mono flex flex-col gap-5 p-5 text-sm md:p-6">
            <label className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-3">
              <span className="shrink-0 text-[#ff2e2e]">&gt; {t.contact.form.name}:</span>
              <input
                required
                type="text"
                name="name"
                autoComplete="name"
                className="w-full border-b border-white/15 bg-transparent py-1 text-[#f4f4f4] outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-[#ff2e2e]"
              />
            </label>
            <label className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-3">
              <span className="shrink-0 text-[#ff2e2e]">&gt; {t.contact.form.email}:</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                className="w-full border-b border-white/15 bg-transparent py-1 text-[#f4f4f4] outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-[#ff2e2e]"
              />
            </label>
            <label className="flex flex-col gap-2 md:flex-row md:gap-3">
              <span className="shrink-0 text-[#ff2e2e]">&gt; {t.contact.form.message}:</span>
              <textarea
                required
                name="message"
                rows={4}
                className="w-full resize-y border-b border-white/15 bg-transparent py-1 text-[#f4f4f4] outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-[#ff2e2e]"
              />
            </label>
            <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-center">
              <button
                type="submit"
                className="group inline-flex w-fit items-center gap-3 border border-[#ff2e2e] px-6 py-3 text-xs uppercase tracking-[0.25em] text-[#ff2e2e] transition-colors duration-300 hover:bg-[#ff2e2e] hover:text-black"
              >
                {submit}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#6f6f6f]">
                {t.contact.form.hint}
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* scheduling */}
      <div className="form-reveal mt-8 flex flex-col gap-5 md:flex-row md:items-center">
        <p className="mono text-[11px] uppercase tracking-[0.35em] text-[#6f6f6f]">
          <span className="text-[#ff2e2e]">{t.contact.schedule.label.slice(0, 2)}</span>
          {t.contact.schedule.label.slice(2)}
        </p>
        <a
          href={SCHEDULING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mono group inline-flex w-fit items-center gap-3 border border-white/25 px-6 py-3 text-xs uppercase tracking-[0.25em] transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
        >
          {scheduleCta}
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        </a>
        <p className="mono text-[10px] uppercase tracking-[0.25em] text-[#6f6f6f]">
          {t.contact.schedule.note}
        </p>
      </div>

      {/* footer */}
      <footer className="mt-32 grid grid-cols-1 gap-4 border-t border-[#1b1b1b] pt-6 md:mt-40 md:grid-cols-3 md:items-center">
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
