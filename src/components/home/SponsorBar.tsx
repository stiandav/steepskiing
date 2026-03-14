import { sponsors } from '@/data/sponsors'

/**
 * Horizontal scrolling sponsor / partner logo bar.
 * Logos are inline SVG stubs — swap paths once real SVG assets are provided.
 */
export function SponsorBar() {
  // Show just the primary sponsors on the home page
  const featured = sponsors.slice(0, 8)

  return (
    <section className="border-t border-navy/10 bg-cream/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
        <p className="mb-6 text-center text-xs font-medium tracking-widest text-navy/40 uppercase">
          Partners &amp; Sponsors
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {featured.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={sponsor.name}
              className="text-navy/40 hover:text-navy/70 transition-colors text-sm font-medium tracking-wide uppercase"
            >
              {sponsor.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
