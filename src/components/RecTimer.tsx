import { useEffect, useRef, useState } from 'react'

const COOKIE = 'argus_rec'
const MAX_AGE = 60 * 60 * 24 // 24h

function readSeconds(): number {
  const m = document.cookie.match(/(?:^|;\s*)argus_rec=(\d+)/)
  return m ? Number(m[1]) : 0
}

function saveSeconds(v: number) {
  document.cookie = `${COOKIE}=${v}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax`
}

export default function RecTimer() {
  const [seconds, setSeconds] = useState(0)
  const secRef = useRef(0)

  useEffect(() => {
    secRef.current = readSeconds()
    setSeconds(secRef.current)

    let interval: number | undefined
    const start = () => {
      if (interval !== undefined) return
      interval = window.setInterval(() => {
        secRef.current += 1
        setSeconds(secRef.current)
      }, 1000)
    }
    const stop = () => {
      if (interval !== undefined) {
        clearInterval(interval)
        interval = undefined
      }
    }
    const onVisibility = () => {
      if (document.hidden) {
        stop()
        saveSeconds(secRef.current)
      } else {
        start()
      }
    }
    const onPageHide = () => saveSeconds(secRef.current)

    if (!document.hidden) start()
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', onPageHide)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onPageHide)
    }
  }, [])

  const hh = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <>
      REC {hh}:{mm}:{ss}
    </>
  )
}
