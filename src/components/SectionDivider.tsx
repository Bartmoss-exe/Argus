import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface SectionDividerProps {
  direction?: 'left' | 'right' | 'center'
  className?: string
}

export default function SectionDivider({ direction = 'center', className = '' }: SectionDividerProps) {
  const lineRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!lineRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          },
        },
      )
    }, lineRef)
    return () => ctx.revert()
  }, [])

  const origin = direction === 'left' ? 'left center' : direction === 'right' ? 'right center' : 'center center'

  return (
    <div className={`relative py-8 ${className}`}>
      <div
        ref={lineRef}
        className="mx-auto h-px w-full max-w-[calc(100%-3rem)] bg-[#1b1b1b] md:max-w-[calc(100%-5rem)]"
        style={{ transformOrigin: origin }}
      />
    </div>
  )
}
