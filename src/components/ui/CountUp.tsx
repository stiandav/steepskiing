'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CountUpProps {
  /** The target number to count up to */
  value: number
  /** Suffix appended after the number (e.g. '+', '×', '') */
  suffix?: string
  /** Prefix before the number (e.g. '$') */
  prefix?: string
  /** Duration in seconds. Default 1.8. */
  duration?: number
  /** CSS class for the displayed number */
  className?: string
}

/**
 * Animated counter that counts from 0 to `value` when it enters the viewport.
 * Uses GSAP's built-in snap for clean integer display.
 *
 * Respects prefers-reduced-motion (renders final value immediately).
 */
export function CountUp({
  value,
  suffix = '',
  prefix = '',
  duration = 1.8,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.textContent = `${prefix}${value}${suffix}`
      return
    }

    const obj = { val: 0 }

    gsap.to(obj, {
      val: value,
      duration,
      ease: 'power2.out',
      snap: { val: 1 },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate() {
        el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`
      },
      onComplete() {
        // Ensure exact final value
        el.textContent = `${prefix}${value}${suffix}`
      },
    })
  }, [value, suffix, prefix, duration])

  return (
    <span ref={ref} className={className}>
      {/* Server-rendered final value (no layout shift) */}
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
