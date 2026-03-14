'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  /** Delay before the element starts animating (seconds). Useful for stagger groups. */
  delay?: number
  /** Y-offset to start from (px). Default 32. */
  from?: number
  /** Duration (seconds). Default 0.7. */
  duration?: number
  /** ScrollTrigger start position. Default 'top 88%'. */
  start?: string
}

/**
 * Wraps children in a scroll-triggered fade + slide-up reveal.
 * Uses useGSAP for automatic ScrollTrigger cleanup on unmount.
 *
 * Respects prefers-reduced-motion: skips the animation and renders
 * children fully visible immediately.
 */
export function AnimateIn({
  children,
  className,
  delay = 0,
  from = 32,
  duration = 0.7,
  start = 'top 88%',
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.from(el, {
      opacity: 0,
      y: from,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        once: true, // fires once — no re-animation on scroll back up
      },
    })
  }, [])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
