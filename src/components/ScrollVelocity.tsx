import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollVelocityProps {
  children: React.ReactNode
  intensity?: number
  className?: string
}

export default function ScrollVelocity({ children, intensity = 40, className = '' }: ScrollVelocityProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { skewY: 0 },
        {
          skewY: intensity * 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
            onUpdate: (self) => {
              if (!ref.current) return
              const velocity = self.getVelocity()
              const skewAmount = gsap.utils.clamp(-intensity, intensity, velocity / 300)
              gsap.to(ref.current, { skewY: skewAmount, duration: 0.3, ease: 'power2.out' })
            },
          },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [intensity])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
