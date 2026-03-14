import type { Metadata } from 'next'
import Link from 'next/link'
import { films } from '@/data/films'
import type { FilmData } from '@/types'

export const metadata: Metadata = {
  title: 'Media — Chris Davenport',
  description:
    '36 Warren Miller and Matchstick Productions film appearances spanning three decades of professional skiing.',
}

const DECADES: FilmData['decade'][] = ['2020s', '2010s', '2000s', '1990s']

const PRODUCTION_COLORS: Record<FilmData['production'], string> = {
  'Warren Miller Entertainment': 'bg-navy/10 text-navy',
  'Matchstick Productions': 'bg-amber-100 text-amber-800',
  Other: 'bg-gray-100 text-gray-600',
}

export default function MediaPage() {
  const filmsByDecade = DECADES.map((decade) => ({
    decade,
    films: films
      .filter((f) => f.decade === decade)
      .sort((a, b) => b.year - a.year),
  }))

  const totalFilms = films.length
  const warrenMillerCount = films.filter(
    (f) => f.production === 'Warren Miller Entertainment',
  ).length
  const mspCount = films.filter(
    (f) => f.production === 'Matchstick Productions',
  ).length

  return (
    <>
      {/* Header */}
      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <p className="text-xs font-medium tracking-widest text-cream/40 uppercase mb-4">
            Film archive
          </p>
          <h1 className="font-serif text-6xl md:text-7xl font-medium leading-tight">
            On screen<br />since 1993.
          </h1>
          <p className="mt-6 text-cream/70 text-lg max-w-xl leading-relaxed">
            {totalFilms} film appearances across Warren Miller Entertainment
            and Matchstick Productions — a career-long record of skiing at the
            edge of what&apos;s possible.
          </p>

          {/* Stats row */}
          <div className="mt-12 flex flex-wrap gap-10">
            <div>
              <p className="font-serif text-5xl font-medium text-cream">{totalFilms}</p>
              <p className="text-sm text-cream/40 mt-1">Total films</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-medium text-cream">{warrenMillerCount}</p>
              <p className="text-sm text-cream/40 mt-1">Warren Miller</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-medium text-cream">{mspCount}</p>
              <p className="text-sm text-cream/40 mt-1">Matchstick Productions</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-medium text-cream">32</p>
              <p className="text-sm text-cream/40 mt-1">Years</p>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder photo/video section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 border-b border-navy/10">
        <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-6">
          Photography
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=600&q=80',
            'https://images.unsplash.com/photo-1547201240-67e2f55a3085?w=600&q=80',
            'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&q=80',
            'https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=600&q=80',
            'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=80',
            'https://images.unsplash.com/photo-1540599167856-04dd7743e6b8?w=600&q=80',
          ].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy/10">
              {/* Using regular img for placeholder grid to avoid Unsplash domain bloat */}
              <img
                src={src}
                alt={`Ski photography ${i + 1}`}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-navy/30 text-center">
          Placeholder images — real photography assets will be added
        </p>
      </section>

      {/* Film archive by decade */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="flex items-center justify-between mb-10">
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase">
            Film credits
          </p>
          <div className="flex gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-navy/50">
              <span className="h-2 w-2 rounded-full bg-navy/20 inline-block" />
              Warren Miller
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-amber-700">
              <span className="h-2 w-2 rounded-full bg-amber-300 inline-block" />
              Matchstick Productions
            </span>
          </div>
        </div>

        <div className="space-y-14">
          {filmsByDecade.map(({ decade, films: decadeFilms }) => {
            if (decadeFilms.length === 0) return null
            return (
              <div key={decade}>
                <h2 className="font-serif text-2xl font-medium text-navy mb-6">
                  {decade}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {decadeFilms.map((film) => (
                    <div
                      key={`${film.title}-${film.year}`}
                      className="flex items-center justify-between rounded-xl border border-navy/10 px-5 py-4 hover:border-navy/25 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-navy">
                          {film.title}
                        </p>
                        <p className="text-xs text-navy/40 mt-0.5">{film.year}</p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${PRODUCTION_COLORS[film.production]}`}
                      >
                        {film.production === 'Warren Miller Entertainment'
                          ? 'WME'
                          : film.production === 'Matchstick Productions'
                          ? 'MSP'
                          : 'Other'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Press / links */}
      <section className="bg-cream/50 border-t border-navy/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-6">
            Press &amp; coverage
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                outlet: 'Powder Magazine',
                headline: 'The Man Who Skied All 54 Colorado 14ers',
                url: 'https://www.powder.com',
              },
              {
                outlet: 'Outside Online',
                headline: 'Chris Davenport on Ski Mountaineering and the Future of Adventure',
                url: 'https://www.outsideonline.com',
              },
              {
                outlet: 'Warren Miller Entertainment',
                headline: 'Three Decades on Film',
                url: 'https://warrenmiller.com',
              },
            ].map(({ outlet, headline, url }) => (
              <a
                key={outlet}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-navy/10 p-6 hover:border-navy/25 transition-colors"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-navy/40 mb-2">
                  {outlet}
                </p>
                <p className="text-sm text-navy group-hover:text-navy/70 transition-colors leading-relaxed">
                  {headline}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 text-center">
        <p className="text-navy/60">
          Ski with Chris in person →{' '}
          <Link href="/ski-camps" className="text-navy font-medium hover:underline">
            View upcoming camps
          </Link>
        </p>
      </div>
    </>
  )
}
