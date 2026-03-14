'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { TripCard } from './TripCard'
import type { TripData } from '@/types'

gsap.registerPlugin(ScrollTrigger)

interface TripGridProps {
  trips: TripData[]
}

/**
 * Animated trip card grid.
 * Cards stagger in with a fade + slide-up when the section enters the viewport.
 */
export function TripGrid({ trips }: TripGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const grid = gridRef.current
    if (!grid) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const cards = grid.querySelectorAll('[data-trip-card]')

    gsap.from(cards, {
      opacity: 0,
      y: 40,
      duration: 0.65,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
        once: true,
      },
    })
  }, [])

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      {trips.map((trip) => (
        <div key={trip.slug} data-trip-card>
          <TripCard trip={trip} />
        </div>
      ))}
    </div>
  )
}
