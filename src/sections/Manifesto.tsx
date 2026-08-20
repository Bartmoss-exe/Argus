import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TEXT =
  'Firewall não segura um adversário determinado. Compliance não detém um exploit. Nós atacamos a sua organização primeiro — com autorização, metodologia e precisão cirúrgica — para que a sua defesa seja provada em combate, não no papel.'

export default function Manifesto() {
  const root = useRef<HTMLElement>(null)

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
        <span className="text-[#ff2e2e]">//</span> Doutrina
      </p>
      <p className="max-w-5xl text-2xl font-medium leading-snug tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
        {TEXT.split(' ').map((word, i) => (
          <span key={i} className="manifesto-word">
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}
