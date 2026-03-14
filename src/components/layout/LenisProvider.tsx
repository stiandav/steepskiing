'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

// Register ScrollTrigger plugin once at module level.
// Safe to call on client because this file is 'use client'.
gsap.registerPlugin(ScrollTrigger)

interface LenisProviderProps {
  children: React.ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis root options={{ autoRaf: false }}>
      <GSAPLenisBridge />
      {children}
    </ReactLenis>
  )
}

/**
 * Bridges Lenis smooth scroll to the GSAP ticker so there is exactly one
 * requestAnimationFrame loop running. Without this, Lenis and GSAP each run
 * their own RAF, causing timing conflicts and wasted CPU on mobile.
 *
 * autoRaf: false on ReactLenis disables Lenis's own RAF.
 * gsap.ticker.add drives Lenis from GSAP's single RAF loop.
 * gsap.ticker.lagSmoothing(0) prevents GSAP from throttling when the tab is
 * backgrounded (which would cause scroll position jumps on return).
 */
function GSAPLenisBridge() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const ticker = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
    }
  }, [lenis])

  return null
}
