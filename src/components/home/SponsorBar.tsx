'use client'

import { sponsors } from '@/data/sponsors'

/**
 * Infinite left-to-right sponsor logo marquee.
 * CSS-only animation — duplicates the list for seamless looping.
 * All logos are clickable links.
 */
export function SponsorBar() {
  const all = [...sponsors, ...sponsors] // duplicate for seamless loop

  return (
    <section className="border-t border-navy/10 bg-cream/50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-8 pb-3">
        <p className="mb-5 text-center text-xs font-medium tracking-widest text-navy/40 uppercase">
          Partners &amp; Sponsors
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden pb-8" aria-label="Sponsors">
        <div
          className="flex shrink-0 items-center gap-12 animate-marquee"
          aria-hidden="false"
        >
          {all.map((sponsor, i) => (
            <a
              key={`${sponsor.id}-${i}`}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={sponsor.name}
              className="whitespace-nowrap text-sm font-semibold tracking-widest uppercase text-navy/35 hover:text-navy/70 transition-colors duration-200 cursor-pointer flex-shrink-0"
            >
              {sponsor.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
