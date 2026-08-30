import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

export type ScrollDirection = 'up' | 'down' | null

export function useScrollDirection(lenis?: Lenis | null) {
  const [direction, setDirection] = useState<ScrollDirection>(null)
  const lastScroll = useRef(0)

  useEffect(() => {
    if (!lenis) return

    const handleScroll = (e: { scroll: number; velocity: number }) => {
      const current = e.scroll
      const prev = lastScroll.current
      lastScroll.current = current

      if (Math.abs(e.velocity) < 0.5) {
        setDirection(null)
        return
      }

      if (current > prev) setDirection('down')
      else if (current < prev) setDirection('up')
    }

    lenis.on('scroll', handleScroll)
    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [lenis])

  return direction
}
