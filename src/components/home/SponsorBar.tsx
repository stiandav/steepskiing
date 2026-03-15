'use client'

import { sponsors } from '@/data/sponsors'

/**
 * Infinite left-to-right sponsor logo marquee.
 * Shows real brand logos via Clearbit API with a text fallback.
 * All logos are clickable links.
 */
export function SponsorBar() {
  const all = [...sponsors, ...sponsors, ...sponsors]

  return (
    <section className="border-t border-navy/10 bg-cream/60 overflow-hidden py-10">
      <p className="mb-6 text-center text-xs font-medium tracking-widest text-navy/35 uppercase">
        Partners &amp; Sponsors
      </p>

      <div className="relative flex overflow-hidden" aria-label="Sponsors">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-cream/60 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-cream/60 to-transparent" />

        <div className="flex shrink-0 items-center gap-14 animate-marquee">
          {all.map((sponsor, i) => (
            <a
              key={`${sponsor.id}-${i}`}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={sponsor.name}
              className="flex-shrink-0 flex items-center justify-center group transition-opacity duration-200 opacity-50 hover:opacity-100"
              title={sponsor.name}
            >
              <div className="relative h-8 w-24 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-8 max-w-[96px] object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = 'block'
                  }}
                />
                <span className="hidden text-xs font-semibold tracking-widest uppercase text-navy/70 whitespace-nowrap">
                  {sponsor.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
