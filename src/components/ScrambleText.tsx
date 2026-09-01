import { useScramble } from './Scramble'

/** Hook wrapper for use inside loops/maps (stable component boundary). */
export function ScrambleText({ text, duration }: { text: string; duration?: number }) {
  return <>{useScramble(text, duration)}</>
}
