'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TimelineEvent {
  year: string
  event: string
}

interface TimelineSectionProps {
  items: TimelineEvent[]
}

/**
 * Animated career timeline.
 * Each row staggers in from the left as it enters the viewport.
 */
export function TimelineSection({ items }: TimelineSectionProps) {
  const listRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const list = listRef.current
    if (!list) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const rows = list.querySelectorAll('[data-timeline-row]')

    rows.forEach((row, i) => {
      gsap.from(row, {
        opacity: 0,
        x: -24,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 90%',
          once: true,
        },
        delay: i * 0.04,
      })
    })
  }, [])

  return (
    <div ref={listRef} className="space-y-0">
      {items.map(({ year, event }, i) => (
        <div key={year} data-timeline-row className="flex gap-8 pb-10 relative">
          {i < items.length - 1 && (
            <div className="absolute left-[3.25rem] top-6 bottom-0 w-px bg-navy/10" />
          )}
          <div className="font-serif text-sm font-medium text-navy/40 w-20 flex-shrink-0 pt-0.5">
            {year}
          </div>
          <div className="relative">
            <div className="absolute -left-[1.85rem] top-1.5 h-2 w-2 rounded-full bg-navy/30" />
            <p className="text-navy/70 leading-relaxed">{event}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
