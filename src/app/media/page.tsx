import type { Metadata } from 'next'
import Link from 'next/link'
import { films } from '@/data/films'
import type { FilmData } from '@/types'
import { CountUp } from '@/components/ui/CountUp'
import { AnimateIn } from '@/components/ui/AnimateIn'

export const metadata: Metadata = {
  title: 'Media — Chris Davenport',
  description:
    '36 Warren Miller and Matchstick Productions film appearances spanning three decades of professional skiing. Photos, press coverage, and career awards.',
}

const DECADES: FilmData['decade'][] = ['2020s', '2010s', '2000s', '1990s']
const DECADE_LABELS: Record<FilmData['decade'], string> = {
  '2020s': 'The 2020s',
  '2010s': 'The 2010s',
  '2000s': 'The 2000s',
  '1990s': 'The 1990s',
}

const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=600&q=80',
    alt: 'Aerial view of steep ski terrain',
    span: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1547201240-67e2f55a3085?w=600&q=80',
    alt: 'Skier in deep powder',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&q=80',
    alt: 'Mountain summit approach',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=600&q=80',
    alt: 'Steep couloir skiing',
    span: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=80',
    alt: 'Alpine ridge line',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1540599167856-04dd7743e6b8?w=600&q=80',
    alt: 'Skier in backcountry terrain',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1565992441121-4367776cd009?w=600&q=80',
    alt: 'High altitude snowfield',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80',
    alt: 'Skier descending steep face',
    span: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1489949439025-f5e9d8ea9f90?w=600&q=80',
    alt: 'Ski mountaineering approach',
    span: '',
  },
]

const PRESS = [
  {
    outlet: 'Warren Miller Entertainment',
    headline: 'Three Decades on Film: A Career Retrospective',
    year: '2023',
    description:
      "Warren Miller produced a short doc on what it's been like to ski for their cameras since 1993. Surreal to watch.",
    url: '#',
  },
  {
    outlet: "Men's Journal",
    headline: 'What It Takes to Ski Professionally for 30 Years',
    year: '2019',
    description:
      "Longevity in action sports isn't talked about enough. This piece got at something real about how I've stayed healthy and motivated.",
    url: '#',
  },
  {
    outlet: 'Outside Online',
    headline: 'Chris Davenport on Ski Mountaineering and the Future of Adventure',
    year: '2015',
    description:
      'A longer conversation about what drives a professional skier twenty years into a career, and why the mountains still feel new.',
    url: '#',
  },
  {
    outlet: 'National Geographic Adventure',
    headline: 'Last Wild Mountains: Skiing the Edges of the Map',
    year: '2010',
    description:
      "An expedition piece covering some of the most remote terrain I've ever skied — places that don't have names on maps.",
    url: '#',
  },
  {
    outlet: 'Powder Magazine',
    headline: 'The Man Who Skied All 54 Colorado 14ers',
    year: '2007',
    description:
      'The story of how I decided to link every fourteener in a single season — on skis. The planning, the weather, the close calls.',
    url: '#',
  },
  {
    outlet: 'Skiing Magazine',
    headline: 'The World Extreme Skiing Champion You Should Know',
    year: '1997',
    description:
      "Profile after back-to-back world titles. It felt strange to be the subject. I was still figuring out who I was as an athlete.",
    url: '#',
  },
]

const AWARDS = [
  {
    year: '1996',
    title: 'World Extreme Skiing Champion',
    body: 'World Extreme Skiing Championships',
    note: 'First title. Valdez, Alaska.',
  },
  {
    year: '1997',
    title: 'World Extreme Skiing Champion',
    body: 'World Extreme Skiing Championships',
    note: 'Defended the title. Back-to-back wins in Valdez.',
  },
  {
    year: '2007',
    title: 'Colorado 14ers Record',
    body: 'Self-documented ascent and descent',
    note: 'First skier to descend all 54 Colorado peaks above 14,000 feet.',
  },
  {
    year: '2013',
    title: '30-Year Achievement Recognition',
    body: 'Warren Miller Entertainment',
    note: 'Recognized for an unbroken three-decade run of film appearances.',
  },
  {
    year: '2018',
    title: 'Lifetime Achievement',
    body: 'Ski Racing Media',
    note: 'For sustained contributions to professional skiing and mountain culture.',
  },
  {
    year: '2023',
    title: 'Pioneer Award',
    body: 'Backcountry Magazine',
    note:
      'Recognized for opening new terrain and influencing the next generation of ski mountaineers.',
  },
]

export default function MediaPage() {
  const filmsByDecade = DECADES.map((decade) => ({
    decade,
    films: films.filter((f) => f.decade === decade).sort((a, b) => a.year - b.year),
  }))

  const totalFilms = films.length
  const warrenMillerCount = films.filter(
    (f) => f.production === 'Warren Miller Entertainment',
  ).length
  const mspCount = films.filter((f) => f.production === 'Matchstick Productions').length

  return (
    <>
      {/* ── Hero / Stats header ─────────────────────────────────────── */}
      <section className="bg-navy text-cream pt-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-36 pb-20">
          <AnimateIn>
            <p className="text-xs font-medium tracking-widest text-cream/40 uppercase mb-5">
              Archive
            </p>
            <h1 className="font-serif text-6xl md:text-8xl font-medium leading-none tracking-tight">
              On screen<br />
              <span className="text-cream/50">since 1993.</span>
            </h1>
            <p className="mt-8 text-cream/60 text-lg max-w-2xl leading-relaxed">
              I&apos;ve been on screen since 1993 — Warren Miller films, Matchstick Productions,
              magazine spreads, and expedition footage from every corner of the ski world.
              What follows is the full record.
            </p>
          </AnimateIn>

          {/* Animated stats row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-cream/10 pt-10">
            <div>
              <p className="font-serif text-6xl font-medium text-cream">
                <CountUp value={totalFilms} />
              </p>
              <p className="text-sm text-cream/40 mt-2 tracking-wide">Film appearances</p>
            </div>
            <div>
              <p className="font-serif text-6xl font-medium text-cream">
                <CountUp value={warrenMillerCount} />
              </p>
              <p className="text-sm text-cream/40 mt-2 tracking-wide">Warren Miller</p>
            </div>
            <div>
              <p className="font-serif text-6xl font-medium text-cream">
                <CountUp value={mspCount} />
              </p>
              <p className="text-sm text-cream/40 mt-2 tracking-wide">Matchstick Productions</p>
            </div>
            <div>
              <p className="font-serif text-6xl font-medium text-cream">
                <CountUp value={32} suffix="+" />
              </p>
              <p className="text-sm text-cream/40 mt-2 tracking-wide">Years on screen</p>
            </div>
          </div>
        </div>

        {/* Sticky filter tab bar — cosmetic anchor links */}
        <div className="sticky top-16 z-30 bg-navy/95 backdrop-blur-sm border-t border-cream/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <nav className="flex gap-8 overflow-x-auto hide-scrollbar">
              {[
                { label: 'Films', href: '#films' },
                { label: 'Photos', href: '#photos' },
                { label: 'Press & Coverage', href: '#press' },
                { label: 'Awards', href: '#awards' },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="py-4 text-sm font-medium text-cream/50 hover:text-cream whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-cream/30"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ── Films — decade rows ────────────────────────────────────── */}
      <section id="films" className="pt-20 pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">
              Film credits
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-navy leading-tight">
              The films.
            </h2>
            <p className="mt-4 text-navy/60 max-w-xl leading-relaxed">
              Every film I&apos;ve appeared in, grouped by decade. Warren Miller ran the show for
              most of it — Matchstick came into the picture in the 2000s and pushed things in
              a different direction.
            </p>
          </AnimateIn>

          {/* Legend */}
          <div className="mt-8 flex items-center gap-6">
            <span className="inline-flex items-center gap-2 text-xs text-navy/50">
              <span className="h-2.5 w-2.5 rounded-full bg-navy/25 inline-block" />
              Warren Miller Entertainment
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-amber-700">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400 inline-block" />
              Matchstick Productions
            </span>
          </div>
        </div>

        {/* Decade scroll rows */}
        <div className="mt-14 space-y-16">
          {filmsByDecade.map(({ decade, films: decadeFilms }) => {
            if (decadeFilms.length === 0) return null
            return (
              <div key={decade}>
                <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-5">
                  <AnimateIn>
                    <h3 className="font-serif text-3xl font-medium text-navy">
                      {DECADE_LABELS[decade]}
                      <span className="ml-3 text-base font-sans font-normal text-navy/30">
                        {decadeFilms.length} films
                      </span>
                    </h3>
                  </AnimateIn>
                </div>

                {/* Horizontal scroll row */}
                <div className="snap-x snap-mandatory overflow-x-auto flex gap-4 pb-4 px-6 lg:px-10 -mx-0">
                  {decadeFilms.map((film) => (
                    <div
                      key={`${film.title}-${film.year}`}
                      className="snap-start flex-shrink-0 w-52 rounded-2xl border border-navy/10 bg-white/60 p-5 hover:border-navy/30 hover:bg-white/90 transition-all group"
                    >
                      <p className="text-xs text-navy/30 font-medium tracking-widest mb-3">
                        {film.year}
                      </p>
                      <p className="text-base font-medium text-navy leading-snug group-hover:text-navy/80 transition-colors">
                        {film.title}
                      </p>
                      <div className="mt-4">
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                            film.production === 'Warren Miller Entertainment'
                              ? 'bg-navy/8 text-navy/60'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {film.production === 'Warren Miller Entertainment' ? 'WME' : 'MSP'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Photos — masonry-style grid ───────────────────────────── */}
      <section id="photos" className="pt-20 pb-20 border-t border-navy/8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">
              Photography
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-navy leading-tight">
              In the frame.
            </h2>
            <p className="mt-4 text-navy/60 max-w-xl leading-relaxed">
              Decades of expedition photography from ski mountaineers, cinematographers,
              and the occasional self-timer on a tripod at 14,000 feet.
            </p>
          </AnimateIn>

          {/* Masonry-style grid using CSS columns */}
          <div className="mt-10 columns-2 md:columns-3 gap-3 space-y-3">
            {PHOTOS.map((photo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <div key={i} className="break-inside-avoid overflow-hidden rounded-xl bg-navy/10">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Press & Coverage ───────────────────────────────────────── */}
      <section id="press" className="bg-navy/4 border-t border-navy/8 pt-20 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">
              Press &amp; coverage
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-navy leading-tight">
              In print.
            </h2>
          </AnimateIn>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRESS.map(({ outlet, headline, year, description, url }) => (
              <a
                key={`${outlet}-${year}`}
                href={url}
                className="group rounded-2xl border border-navy/10 bg-white/70 p-6 hover:border-navy/25 hover:bg-white transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium uppercase tracking-widest text-navy/40">
                    {outlet}
                  </span>
                  <span className="text-xs text-navy/30 ml-3 flex-shrink-0">{year}</span>
                </div>
                <p className="text-base font-medium text-navy leading-snug group-hover:text-navy/80 transition-colors flex-1">
                  {headline}
                </p>
                <p className="mt-3 text-sm text-navy/50 leading-relaxed">{description}</p>
                <span className="mt-4 text-xs font-medium text-navy/30 group-hover:text-navy/60 transition-colors">
                  Read →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards — vertical timeline ─────────────────────────────── */}
      <section id="awards" className="pt-20 pb-24 border-t border-navy/8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">
              Career honors
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-navy leading-tight">
              The record.
            </h2>
            <p className="mt-4 text-navy/60 max-w-xl leading-relaxed">
              Awards matter less than the skiing. But they mark the moments when
              something landed — when the work got recognized by people who understood
              what it took.
            </p>
          </AnimateIn>

          <div className="mt-14 relative">
            {/* Timeline line */}
            <div className="absolute left-16 top-0 bottom-0 w-px bg-navy/10 hidden md:block" />

            <div className="space-y-8">
              {AWARDS.map(({ year, title, body, note }) => (
                <AnimateIn key={`${year}-${title}`}>
                  <div className="flex gap-8 items-start">
                    {/* Year */}
                    <div className="flex-shrink-0 w-14 text-right">
                      <span className="font-serif text-lg font-medium text-navy/40">{year}</span>
                    </div>

                    {/* Dot */}
                    <div className="flex-shrink-0 relative hidden md:flex items-start">
                      <div className="mt-1.5 h-3 w-3 rounded-full bg-navy ring-4 ring-cream" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 rounded-2xl border border-navy/10 bg-white/60 p-6">
                      <p className="font-medium text-navy text-base leading-snug">{title}</p>
                      <p className="text-xs text-navy/40 mt-1 uppercase tracking-widest">{body}</p>
                      {note && (
                        <p className="mt-3 text-sm text-navy/55 leading-relaxed">{note}</p>
                      )}
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────────── */}
      <div className="bg-navy text-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-serif text-3xl md:text-4xl font-medium">
              Ski it, don&apos;t just watch it.
            </p>
            <p className="mt-2 text-cream/50 leading-relaxed">
              The films are one thing. Being out there is another.
            </p>
          </div>
          <Link
            href="/ski-camps"
            className="flex-shrink-0 rounded-full bg-cream text-navy px-8 py-4 text-sm font-medium hover:bg-cream/90 transition-colors"
          >
            View upcoming camps
          </Link>
        </div>
      </div>
    </>
  )
}
