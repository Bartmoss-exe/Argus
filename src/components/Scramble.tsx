import { useEffect, useRef, useState } from 'react'

const CHARS = '!<>-_\\/[]{}=+*^?#@$%&'

/**
 * Scrambles `text` through random glyphs whenever it changes,
 * locking characters left-to-right until it settles on the new value.
 * Runs on requestAnimationFrame and cleans up on unmount — safe and cheap.
 */
export function useScramble(text: string, duration = 1600): string {
  const [display, setDisplay] = useState(text)
  const rafRef = useRef<number | undefined>(undefined)
  const mountedRef = useRef(false)

  useEffect(() => {
    // first render: show the text as-is, no scramble on page load
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      // hold: first 25% of the time everything scrambles before locking starts
      const lockP = Math.max(0, (p - 0.25) / 0.75)
      const locked = Math.floor(lockP * text.length)
      let out = text.slice(0, locked)
      for (let i = locked; i < text.length; i++) {
        out += text[i] === ' ' ? ' ' : CHARS[(Math.random() * CHARS.length) | 0]
      }
      setDisplay(out)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current)
    }
  }, [text, duration])

  return display
}
