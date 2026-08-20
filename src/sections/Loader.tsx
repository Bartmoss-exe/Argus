import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const BOOT_LINES = [
  '> argus.core — initializing offensive modules',
  '> loading exploit chains ................ OK',
  '> resolving targets .................... OK',
  '> engagement authorization ............. CONFIRMED',
  '> access granted_',
]

export default function Loader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)
  const [lines, setLines] = useState(0)

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setLines((l) => {
        if (l >= BOOT_LINES.length) {
          clearInterval(lineTimer)
          return l
        }
        return l + 1
      })
    }, 320)

    const counter = { v: 0 }
    const tween = gsap.to(counter, {
      v: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (pctRef.current) pctRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
        if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`
      },
      onComplete: () => {
        gsap.to(ref.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          delay: 0.25,
          onComplete: onDone,
        })
      },
    })

    return () => {
      clearInterval(lineTimer)
      tween.kill()
    }
  }, [onDone])

  return (
    <div ref={ref} className="fixed inset-0 z-[95] flex flex-col justify-between bg-[#050505] p-6 md:p-10">
      <div className="mono text-[11px] uppercase tracking-[0.3em] text-[#6f6f6f]">
        ARGUS://boot_sequence
      </div>

      <div className="mono space-y-2 text-xs text-[#8a8a8a] md:text-sm">
        {BOOT_LINES.slice(0, lines).map((line, i) => (
          <p key={i} className={i === BOOT_LINES.length - 1 ? 'text-[#ff2e2e]' : ''}>
            {line}
            {i === lines - 1 && <span className="blink">█</span>}
          </p>
        ))}
      </div>

      <div className="flex items-end justify-between gap-8">
        <div className="h-px flex-1 bg-[#1b1b1b]">
          <div ref={barRef} className="h-px origin-left scale-x-0 bg-[#ff2e2e]" />
        </div>
        <span ref={pctRef} className="mono text-5xl font-light tabular-nums text-white md:text-7xl">
          000
        </span>
      </div>
    </div>
  )
}
