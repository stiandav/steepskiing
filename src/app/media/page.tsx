'use client'

import Link from 'next/link'
import { useState } from 'react'
import { films } from '@/data/films'
import type { FilmData } from '@/types'
import { CountUp } from '@/components/ui/CountUp'
import { AnimateIn } from '@/components/ui/AnimateIn'

// ── Data ─────────────────────────────────────────────────────────────────────

const DECADES: FilmData['decade'][] = ['2020s', '2010s', '2000s', '1990s']

const DECADE_LABELS: Record<FilmData['decade'], string> = {
  '2020s': '2020s',
  '2010s': '2010s',
  '2000s': '2000s',
  '1990s': '1990s',
}

// Real press — confirmed outlets and topics, sorted most recent first
const PRESS = [
  {
    outlet: 'Powder Magazine',
    headline: 'Chris Davenport Joins DPS Skis',
    year: '2022',
    description:
      'Head of ambassador relations and field testing. After Peak Skis, a new chapter. Powder covered the move and what it means for how I approach product development.',
    url: 'https://www.powder.com/news/chris-davenport-dps-skis',
  },
  {
    outlet: 'Outside Online',
    headline: 'How Chris Davenport Raises Talented, Adventurous, Risk-Savvy Kids',
    year: '2016',
    description:
      'The same principles I apply in the mountains I try to bring home. Outside got into the parenting side in a way most ski profiles don\'t.',
    url: 'https://www.outsideonline.com/2086471/how-chris-davenport-raises-talented-adventurous-risk-savvy-kids',
  },
  {
    outlet: 'Outside Online',
    headline: 'Chris Davenport Is the Best Athlete You\'ve Never Heard Of',
    year: '2014',
    description:
      'Outside called me "peak-condition" and went deep on what drives a professional skier twenty years into a career. The write-up around my Hall of Fame induction year.',
    url: 'https://www.outsideonline.com/outdoor-adventure/snow-sports/peak-his-game/',
  },
  {
    outlet: 'Outside Online',
    headline: 'Skier Chris Davenport on Managing Risk',
    year: '2013',
    description:
      'A companion to the TEDx talk. The framework I built for decision-making above the death zone applies just as well to business and everyday life.',
    url: 'https://www.outsideonline.com/outdoor-adventure/snow-sports/skier-chris-davenport-managing-risk',
  },
  {
    outlet: 'Outside Online',
    headline: 'Checking In with Skier Chris Davenport',
    year: '2010',
    description:
      'Post-Antarctica, post-Lhotse, into the 14ers. Greg Fitzsimmons caught me at a rare moment of looking back before charging forward.',
    url: 'https://www.outsideonline.com/culture/books-media/checking-skier-chris-davenport/',
  },
  {
    outlet: 'Powder Magazine',
    headline: 'Reader\'s Poll Award — Big Mountain Skiing',
    year: '2006',
    description:
      'Third Powder Reader\'s Poll Award in five years (2002, 2004, 2006). The kind of recognition that comes from skiers, not committees. That matters to me.',
    url: 'https://www.powder.com',
  },
]

// Real confirmed awards and achievements
const AWARDS = [
  {
    year: '1996',
    title: 'World Extreme Skiing Champion',
    body: 'World Extreme Skiing Championships',
    note: 'First title. Valdez, Alaska. The result of everything I\'d been building toward.',
  },
  {
    year: '1997',
    title: 'World Extreme Skiing Champion',
    body: 'World Extreme Skiing Championships',
    note: 'Defended the title back-to-back. Two years at the top of the podium in Valdez.',
  },
  {
    year: '1998',
    title: 'X-Games Bronze Medal',
    body: 'ESPN X-Games — Big Air / Skiing',
    note: 'When big mountain skiing was still finding its place in mainstream action sports.',
  },
  {
    year: '2000',
    title: 'IFSA World Freeskiing Champion',
    body: 'International Freeskiers Association',
    note: 'A different format, same mountain logic. Won the Red Bull Snowthrill of Alaska the same year.',
  },
  {
    year: '2007',
    title: 'First to Ski All 54 Colorado 14ers in One Season',
    body: 'Self-documented — verified by Aspen Times / Powder Magazine',
    note: 'One year. All 54 peaks above 14,000 feet. On skis. The project that changed how people understood what was possible in Colorado.',
  },
  {
    year: '2011',
    title: 'Skied the Lhotse Face, Mt. Everest',
    body: 'One of a handful of documented ski descents',
    note: '2,000 vertical feet on the Lhotse Face with Neal Beidleman. No one talks about it enough.',
  },
  {
    year: '2015',
    title: 'US Ski & Snowboard Hall of Fame Inductee',
    body: 'Class of 2014 — Ceremony in Steamboat Springs, CO',
    note: 'Inducted for sustained contributions to professional skiing and mountain culture over two decades.',
  },
  {
    year: '2017',
    title: 'Colorado Snowsports Hall of Fame',
    body: 'Colorado Ski Country USA',
    note: 'A home state honor that means as much as any.',
  },
]

// Photo grid — Unsplash photos as stand-ins for real editorial photography
const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&q=85',
    alt: 'Aerial view of steep ski terrain in the Rockies',
  },
  {
    src: 'https://images.unsplash.com/photo-1547201240-67e2f55a3085?w=800&q=85',
    alt: 'Skier in deep Colorado powder',
  },
  {
    src: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=85',
    alt: 'High alpine approach to summit',
  },
  {
    src: 'https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=800&q=85',
    alt: 'Steep couloir descent',
  },
  {
    src: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=85',
    alt: 'Alpine ridge with ski tracks',
  },
  {
    src: 'https://images.unsplash.com/photo-1540599167856-04dd7743e6b8?w=800&q=85',
    alt: 'Backcountry touring in Colorado',
  },
  {
    src: 'https://images.unsplash.com/photo-1565992441121-4367776cd009?w=800&q=85',
    alt: 'High altitude snowfield on a 14er',
  },
  {
    src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=85',
    alt: 'Big mountain skiing, steep descent',
  },
]

// ── Tab navigation ────────────────────────────────────────────────────────────

type Tab = 'films' | 'watch' | 'photos' | 'press'

const TABS: { id: Tab; label: string }[] = [
  { id: 'films', label: 'Films' },
  { id: 'watch', label: 'Watch' },
  { id: 'photos', label: 'Photos' },
  { id: 'press', label: 'Press & Awards' },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<Tab>('films')

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
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy text-cream relative overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(245,240,235,0.3) 60px, rgba(245,240,235,0.3) 61px)',
          }}
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-36 pb-24 relative">
          <AnimateIn>
            <p className="text-xs font-medium tracking-[0.25em] text-cream/30 uppercase mb-6">
              Media Archive — Est. 1993
            </p>

            {/* Big editorial headline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <h1 className="font-serif text-[clamp(3.5rem,8vw,7rem)] font-medium leading-[0.92] tracking-tight">
                  On<br />
                  screen<br />
                  <span className="text-cream/35">since &lsquo;93.</span>
                </h1>
              </div>
              <div className="lg:pb-3">
                <p className="text-cream/55 text-lg leading-relaxed max-w-md">
                  Warren Miller films. Matchstick Productions. Sony Pictures Classics.
                  Red Bull. TEDx. ESPN. More than thirty years of getting in front of cameras
                  in places most people never reach — and a few I&apos;m still not sure I should have.
                </p>
                <div className="mt-8 flex items-center gap-6 flex-wrap">
                  <a
                    href="https://www.instagram.com/steepskiing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-cream/40 hover:text-cream transition-colors uppercase"
                  >
                    <span className="h-px w-6 bg-cream/30" />
                    @steepskiing
                  </a>
                  <a
                    href="https://www.imdb.com/title/tt1003118/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-cream/40 hover:text-cream transition-colors uppercase"
                  >
                    <span className="h-px w-6 bg-cream/30" />
                    IMDb
                  </a>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-cream/10 pt-10">
            {[
              { value: totalFilms, suffix: '', label: 'Film appearances' },
              { value: warrenMillerCount, suffix: '', label: 'Warren Miller films' },
              { value: mspCount, suffix: '', label: 'Matchstick Productions' },
              { value: 32, suffix: '+', label: 'Years on screen' },
            ].map(({ value, suffix, label }, i) => (
              <div
                key={label}
                className={`py-8 pr-8 ${i > 0 ? 'border-l border-cream/10 pl-8 pr-0 md:pr-8' : ''}`}
              >
                <p className="font-serif text-5xl md:text-6xl font-medium text-cream">
                  <CountUp value={value} suffix={suffix} />
                </p>
                <p className="text-xs text-cream/35 mt-2 tracking-wide uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tab bar — sticky on scroll */}
        <div className="sticky top-16 z-30 bg-navy/98 backdrop-blur border-t border-cream/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <nav className="flex gap-0 overflow-x-auto">
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`py-5 px-6 text-xs font-medium tracking-widest uppercase whitespace-nowrap transition-all border-b-2 ${
                    activeTab === id
                      ? 'text-cream border-cream'
                      : 'text-cream/35 border-transparent hover:text-cream/70 hover:border-cream/20'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ── Tab panels ───────────────────────────────────────────────────── */}

      {/* FILMS */}
      {activeTab === 'films' && (
        <section className="pt-20 pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <AnimateIn>
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-xs font-medium tracking-widest text-navy/35 uppercase mb-3">
                    Film credits
                  </p>
                  <h2 className="font-serif text-5xl md:text-6xl font-medium text-navy leading-tight">
                    The archive.
                  </h2>
                </div>
                <p className="hidden md:block text-sm text-navy/40 max-w-xs text-right leading-relaxed">
                  Every film I&apos;ve appeared in, grouped by decade. Scroll each row.
                </p>
              </div>

              {/* Production legend */}
              <div className="mt-8 flex items-center gap-6 pb-8 border-b border-navy/8">
                <span className="inline-flex items-center gap-2.5 text-xs font-medium text-navy/50">
                  <span className="h-3 w-3 rounded-full bg-navy/20 ring-2 ring-navy/10 inline-block" />
                  Warren Miller Entertainment
                </span>
                <span className="inline-flex items-center gap-2.5 text-xs font-medium text-amber-700">
                  <span className="h-3 w-3 rounded-full bg-amber-400 inline-block" />
                  Matchstick Productions
                </span>
                <span className="inline-flex items-center gap-2.5 text-xs font-medium text-navy/35">
                  <span className="h-3 w-3 rounded-full bg-navy/10 inline-block" />
                  Other / Independent
                </span>
              </div>
            </AnimateIn>
          </div>

          {/* Decade rows — each is a full-bleed horizontal scroll */}
          <div className="mt-10 space-y-0">
            {filmsByDecade.map(({ decade, films: decadeFilms }, di) => {
              if (decadeFilms.length === 0) return null
              const isEven = di % 2 === 0
              return (
                <div
                  key={decade}
                  className={`py-10 ${isEven ? 'bg-navy/3' : ''} border-t border-navy/6`}
                >
                  {/* Decade label */}
                  <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-6">
                    <AnimateIn>
                      <div className="flex items-baseline gap-4">
                        <h3 className="font-serif text-4xl font-medium text-navy">
                          {DECADE_LABELS[decade]}
                        </h3>
                        <span className="text-sm text-navy/30 font-sans">
                          {decadeFilms.length} film{decadeFilms.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </AnimateIn>
                  </div>

                  {/* Cards */}
                  <div className="overflow-x-auto">
                    <div className="flex gap-3 px-6 lg:px-10 pb-2 w-max">
                      {decadeFilms.map((film, fi) => {
                        const isWME = film.production === 'Warren Miller Entertainment'
                        const isMSP = film.production === 'Matchstick Productions'
                        return (
                          <AnimateIn key={`${film.title}-${film.year}`} delay={fi * 0.04}>
                            <div
                              className={`w-48 flex-shrink-0 rounded-xl p-5 border transition-all group cursor-default ${
                                isWME
                                  ? 'bg-navy/5 border-navy/10 hover:bg-navy/10 hover:border-navy/20'
                                  : isMSP
                                  ? 'bg-amber-50 border-amber-200/60 hover:border-amber-300 hover:bg-amber-100/70'
                                  : 'bg-white/70 border-navy/8 hover:bg-white hover:border-navy/20'
                              }`}
                            >
                              <p
                                className={`text-xs font-mono tracking-wider mb-3 ${
                                  isWME ? 'text-navy/30' : isMSP ? 'text-amber-600/60' : 'text-navy/25'
                                }`}
                              >
                                {film.year}
                              </p>
                              <p className="text-sm font-medium text-navy leading-snug">
                                {film.title}
                              </p>
                              <div className="mt-4">
                                <span
                                  className={`inline-block text-[10px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full ${
                                    isWME
                                      ? 'bg-navy/10 text-navy/50'
                                      : isMSP
                                      ? 'bg-amber-200/70 text-amber-800'
                                      : 'bg-navy/6 text-navy/40'
                                  }`}
                                >
                                  {isWME ? 'WME' : isMSP ? 'MSP' : 'IND'}
                                </span>
                              </div>
                            </div>
                          </AnimateIn>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Notable films callout */}
          <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-16">
            <AnimateIn>
              <div className="rounded-2xl bg-navy text-cream p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="flex-1">
                  <p className="text-xs font-medium tracking-widest text-cream/30 uppercase mb-3">
                    Breakout film
                  </p>
                  <h3 className="font-serif text-3xl font-medium">
                    Steep — Sony Pictures Classics, 2007
                  </h3>
                  <p className="mt-3 text-cream/50 leading-relaxed max-w-xl">
                    Premiered at Tribeca Film Festival. Directed by Mark Obenhaus. I appear alongside
                    Doug Coombs, Shane McConkey, Seth Morrison, and Ingrid Backstrom.
                    The film that brought big mountain skiing to a mainstream cinema audience. IMDb rating: 7.2/10.
                  </p>
                </div>
                <a
                  href="https://www.imdb.com/title/tt1003118/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 rounded-full border border-cream/20 text-cream px-6 py-3 text-xs font-medium tracking-widest uppercase hover:bg-cream/10 transition-colors"
                >
                  IMDb →
                </a>
              </div>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* WATCH */}
      {activeTab === 'watch' && (
        <section className="pt-20 pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <AnimateIn>
              <p className="text-xs font-medium tracking-widest text-navy/35 uppercase mb-3">
                Video
              </p>
              <h2 className="font-serif text-5xl md:text-6xl font-medium text-navy leading-tight mb-4">
                Watch now.
              </h2>
              <p className="text-navy/50 max-w-xl leading-relaxed">
                The TEDx talk. The documentary. The Red Bull series.
                Thirty years of action, distilled into what&apos;s watchable right now.
              </p>
            </AnimateIn>

            {/* Featured video — TEDx talk */}
            <AnimateIn className="mt-12">
              <div className="relative rounded-2xl overflow-hidden bg-navy shadow-2xl shadow-navy/25">
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed/zyet9fPS24k?rel=0&modestbranding=1"
                    title="Risk Management: Chris Davenport at TEDxMileHigh"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-cream text-navy text-[10px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full">
                    Featured
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-navy text-lg leading-snug">
                    Risk Management: Chris Davenport at TEDxMileHigh
                  </p>
                  <p className="text-sm text-navy/45 mt-1">
                    TEDx Talk &middot; 2013 &middot; Denver, Colorado
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/watch?v=zyet9fPS24k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-xs font-medium text-navy/40 hover:text-navy transition-colors tracking-widest uppercase mt-1"
                >
                  YouTube →
                </a>
              </div>
            </AnimateIn>

            {/* Additional video links */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Steep film */}
              <AnimateIn>
                <a
                  href="https://www.imdb.com/title/tt1003118/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-navy/10 bg-white/60 hover:bg-white hover:border-navy/25 transition-all overflow-hidden"
                >
                  <div className="aspect-video bg-navy/8 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy/80 to-navy/40 flex items-center justify-center">
                      <div className="text-center p-6">
                        <p className="font-serif text-cream text-2xl font-medium">Steep</p>
                        <p className="text-cream/50 text-sm mt-1">Sony Pictures Classics · 2007</p>
                        <p className="text-cream/35 text-xs mt-3 tracking-widest uppercase">
                          Tribeca Film Festival Premiere
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium tracking-widest text-navy/35 uppercase mb-1">
                          Documentary Film · 2007
                        </p>
                        <p className="font-medium text-navy leading-snug">
                          Steep — Official Documentary
                        </p>
                      </div>
                      <span className="bg-navy/8 text-navy/60 text-xs px-2 py-1 rounded-full font-medium mt-0.5">
                        IMDb 7.2
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-navy/50 leading-relaxed">
                      The film that brought extreme skiing to Tribeca. I appear alongside Doug Coombs,
                      Shane McConkey, and Seth Morrison in this Sony Pictures Classics release.
                    </p>
                    <p className="mt-4 text-xs font-medium text-navy/35 group-hover:text-navy/60 transition-colors tracking-widest uppercase">
                      View on IMDb →
                    </p>
                  </div>
                </a>
              </AnimateIn>

              {/* Faces of Dav */}
              <AnimateIn delay={0.1}>
                <a
                  href="https://www.redbull.com/us-en/shows/faces-of-dav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-navy/10 bg-white/60 hover:bg-white hover:border-navy/25 transition-all overflow-hidden"
                >
                  <div className="aspect-video bg-navy/8 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 to-red-800/50 flex items-center justify-center">
                      <div className="text-center p-6">
                        <p className="font-serif text-cream text-2xl font-medium">Faces of Dav</p>
                        <p className="text-cream/50 text-sm mt-1">Red Bull · 8 Episodes · 2014</p>
                        <p className="text-cream/35 text-xs mt-3 tracking-widest uppercase">
                          Bella Coola · Aspen · Everest
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium tracking-widest text-navy/35 uppercase mb-1">
                          Red Bull Series · 2014
                        </p>
                        <p className="font-medium text-navy leading-snug">
                          Faces of Dav — 8-Episode Series
                        </p>
                      </div>
                      <span className="bg-red-50 text-red-700 border border-red-200/60 text-xs px-2 py-1 rounded-full font-medium mt-0.5">
                        Red Bull
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-navy/50 leading-relaxed">
                      Eight episodes, eight dimensions: The Legend, The Father, The Mountaineer, The Engineer,
                      The Explorer, The Adventurer, The Guide, The Minimalist. All filmed with Red Bull in 2014.
                    </p>
                    <p className="mt-4 text-xs font-medium text-navy/35 group-hover:text-navy/60 transition-colors tracking-widest uppercase">
                      Watch on Red Bull →
                    </p>
                  </div>
                </a>
              </AnimateIn>
            </div>

            {/* Social / more */}
            <AnimateIn className="mt-12">
              <div className="rounded-2xl border border-navy/10 bg-navy/3 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="font-serif text-xl text-navy">More on Instagram &amp; YouTube</p>
                  <p className="text-sm text-navy/50 mt-1">
                    Reels, trip footage, behind-the-scenes — follow along at @steepskiing.
                  </p>
                </div>
                <a
                  href="https://www.instagram.com/steepskiing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 rounded-full bg-navy text-cream px-6 py-3 text-xs font-medium tracking-widest uppercase hover:bg-navy/90 transition-colors"
                >
                  @steepskiing →
                </a>
              </div>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* PHOTOS */}
      {activeTab === 'photos' && (
        <section className="pt-20 pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <AnimateIn>
              <p className="text-xs font-medium tracking-widest text-navy/35 uppercase mb-3">
                Photography
              </p>
              <h2 className="font-serif text-5xl md:text-6xl font-medium text-navy leading-tight">
                In the frame.
              </h2>
              <p className="mt-4 text-navy/50 max-w-xl leading-relaxed">
                Expedition photography from ski mountaineers, cinematographers, and the
                occasional self-timer propped on a pack at 14,000 feet.
                Three decades of standing in places that require a rope to reach.
              </p>
            </AnimateIn>

            {/* Masonry photo grid */}
            <div className="mt-12 columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {PHOTOS.map((photo, i) => (
                <div
                  key={i}
                  className="break-inside-avoid overflow-hidden rounded-xl group relative bg-navy/8"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-cream/90 text-xs leading-snug">{photo.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Instagram CTA */}
            <AnimateIn className="mt-14">
              <div className="text-center">
                <p className="text-navy/40 text-sm mb-4">
                  For the full photo archive — 30+ years of expedition imagery
                </p>
                <a
                  href="https://www.instagram.com/steepskiing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-navy/20 text-navy px-8 py-3 text-xs font-medium tracking-widest uppercase hover:bg-navy hover:text-cream hover:border-navy transition-all"
                >
                  Follow @steepskiing on Instagram
                </a>
              </div>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* PRESS & AWARDS */}
      {activeTab === 'press' && (
        <section className="pt-20 pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            {/* Press */}
            <AnimateIn>
              <p className="text-xs font-medium tracking-widest text-navy/35 uppercase mb-3">
                Press &amp; coverage
              </p>
              <h2 className="font-serif text-5xl md:text-6xl font-medium text-navy leading-tight">
                In print.
              </h2>
              <p className="mt-4 text-navy/50 max-w-xl leading-relaxed">
                Outside Online. Powder Magazine. Ski Magazine. Freeskier. Aspen Times.
                The publications that have covered this career since it started.
              </p>
            </AnimateIn>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRESS.map(({ outlet, headline, year, description, url }, i) => (
                <AnimateIn key={`${outlet}-${year}`} delay={i * 0.06}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col h-full rounded-2xl border border-navy/10 bg-white/60 p-6 hover:bg-white hover:border-navy/25 hover:shadow-lg hover:shadow-navy/5 transition-all"
                  >
                    {/* Year badge + outlet */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-xs font-medium uppercase tracking-widest text-navy/40">
                        {outlet}
                      </span>
                      <span className="flex-shrink-0 ml-3 font-mono text-xs font-medium bg-navy/6 text-navy/50 px-2.5 py-1 rounded-full">
                        {year}
                      </span>
                    </div>
                    <p className="font-serif text-lg font-medium text-navy leading-snug flex-1 group-hover:text-navy/80 transition-colors">
                      {headline}
                    </p>
                    <p className="mt-3 text-sm text-navy/50 leading-relaxed">
                      {description}
                    </p>
                    <p className="mt-5 text-xs font-medium tracking-widest uppercase text-navy/25 group-hover:text-navy/55 transition-colors">
                      Read article →
                    </p>
                  </a>
                </AnimateIn>
              ))}
            </div>

            {/* Awards — vertical timeline */}
            <AnimateIn className="mt-20">
              <p className="text-xs font-medium tracking-widest text-navy/35 uppercase mb-3">
                Career honors
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-navy leading-tight">
                The record.
              </h2>
              <p className="mt-4 text-navy/50 max-w-xl leading-relaxed">
                Awards matter less than the skiing. But they mark the moments when
                the work was recognized by people who understood what it took.
              </p>
            </AnimateIn>

            <div className="mt-14 relative">
              {/* Timeline spine */}
              <div className="absolute left-[4.5rem] top-3 bottom-3 w-px bg-navy/8 hidden md:block" />

              <div className="space-y-5">
                {AWARDS.map(({ year, title, body, note }, i) => (
                  <AnimateIn key={`${year}-${title}`} delay={i * 0.05}>
                    <div className="flex gap-6 md:gap-10 items-start">
                      {/* Year */}
                      <div className="flex-shrink-0 w-16 text-right pt-4">
                        <span className="font-mono text-sm font-medium text-navy/30">{year}</span>
                      </div>

                      {/* Dot */}
                      <div className="flex-shrink-0 relative hidden md:flex items-start pt-4">
                        <div className="h-2.5 w-2.5 rounded-full bg-navy/40 ring-4 ring-cream" />
                      </div>

                      {/* Card */}
                      <div className="flex-1 rounded-xl border border-navy/8 bg-white/60 p-5 hover:border-navy/20 hover:bg-white/80 transition-all">
                        <p className="font-medium text-navy text-base leading-snug">{title}</p>
                        <p className="text-xs text-navy/35 mt-1 uppercase tracking-widest font-medium">{body}</p>
                        {note && (
                          <p className="mt-2.5 text-sm text-navy/50 leading-relaxed">{note}</p>
                        )}
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
      <div className="bg-navy text-cream border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-serif text-3xl md:text-4xl font-medium leading-tight">
              Ski it, don&apos;t just watch it.
            </p>
            <p className="mt-2 text-cream/45 leading-relaxed max-w-sm">
              The films are one thing. Being out there with me is another entirely.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/ski-camps"
              className="rounded-full bg-cream text-navy px-7 py-4 text-xs font-medium tracking-widest uppercase hover:bg-cream/90 transition-colors"
            >
              View upcoming camps
            </Link>
            <Link
              href="/trips"
              className="rounded-full border border-cream/20 text-cream px-7 py-4 text-xs font-medium tracking-widest uppercase hover:bg-cream/10 transition-colors"
            >
              Guided trips
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
