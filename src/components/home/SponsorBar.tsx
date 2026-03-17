'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { sponsors } from '@/data/sponsors'

export function SponsorBar() {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useGSAP(() => {
    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 40,
      repeat: -1,
    })
  })

  // Two copies so xPercent: -50 lands exactly at the start of copy 2,
  // which is identical to copy 1 — GSAP's repeat then resets seamlessly.
  const all = [...sponsors, ...sponsors]

  return (
    <section className="border-t border-navy/10 bg-cream/60 overflow-hidden py-10">
      <p className="mb-6 text-center text-xs font-medium tracking-widest text-navy/35 uppercase">
        Partners &amp; Sponsors
      </p>

      <div
        className="relative overflow-hidden"
        aria-label="Sponsors"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.resume()}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-cream/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-cream/60 to-transparent" />

        <div ref={trackRef} className="flex items-center">
          {all.map((sponsor, i) => (
            <a
              key={`${sponsor.id}-${i}`}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={sponsor.name}
              title={sponsor.name}
              className="flex-shrink-0 flex items-center px-10 opacity-75 hover:opacity-100 transition-opacity duration-200 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-11 w-auto max-w-[160px]"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
