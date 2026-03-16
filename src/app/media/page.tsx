'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { motion, AnimatePresence } from 'motion/react'

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const MOUNTAIN_PATHS = [
  '0,185 22,108 42,140 68,62 92,120 130,185',
  '0,185 32,88 58,132 82,58 112,98 130,185',
  '0,185 26,118 52,84 82,122 108,98 130,185',
  '0,185 18,128 46,92 68,128 92,78 130,185',
  '0,185 28,68 58,112 90,68 112,100 130,185',
  '0,185 20,98 52,132 76,68 102,108 130,185',
]

interface Film {
  id: string
  title: string
  year: string
  studio: string
  description: string
  href: string
  c1: string
  c2: string
}

const FILMS: Film[] = [
  {
    id: 'snowriders-ii',
    title: 'Snowriders II',
    year: '1997',
    studio: 'Matchstick Productions',
    description: "My earliest major feature. Matchstick was redefining what ski films could be — Snowriders II was part of the shift away from helicopter spectacle toward something rawer and more personal.",
    href: '#',
    c1: '#0f1e3d', c2: '#1e3a6e',
  },
  {
    id: 'global-storming',
    title: 'Global Storming',
    year: '1999',
    studio: 'Matchstick Productions',
    description: "A global hunt for snow in the late 1990s. The world felt bigger then — or at least it felt bigger when you had to go find the terrain yourself.",
    href: '#',
    c1: '#0d2619', c2: '#1a4a2e',
  },
  {
    id: 'ski-movie-iii',
    title: 'Ski Movie III',
    year: '2002',
    studio: 'Matchstick Productions',
    description: "The Front Line. By 2002 MSP had become the defining franchise in ski film. A statement that the generation coming up was ready to draw serious lines.",
    href: '#',
    c1: '#2a0d0d', c2: '#4a1a1a',
  },
  {
    id: 'storm',
    title: 'Storm',
    year: '2002',
    studio: 'Warren Miller Entertainment',
    description: "An appearance in a Warren Miller film carried real weight then. It still does. Skiing the biggest stage in the sport.",
    href: '#',
    c1: '#0d0d2a', c2: '#1a1a4a',
  },
  {
    id: 'mountain-town',
    title: 'Mountain Town',
    year: '2006',
    studio: 'Matchstick Productions',
    description: "A love letter to mountain culture and the communities built around skiing. This one made me think harder about what Aspen is and what we're protecting when we protect these places.",
    href: '#',
    c1: '#1e1a0d', c2: '#3a331a',
  },
  {
    id: 'steep',
    title: 'Steep',
    year: '2007',
    studio: 'Sweetgrass Productions',
    description: "The definitive film about big mountain skiing. Not just about skiing — about consequence, obsession, and what it means to draw a line on a mountain that will not forgive you for getting it wrong.",
    href: 'https://www.imdb.com/title/tt1003118/',
    c1: '#1a0505', c2: '#3a0a0a',
  },
  {
    id: 'playground',
    title: 'Playground',
    year: '2007',
    studio: 'Matchstick Productions',
    description: "MSP at the height of their creative run. The mountains as playground — but also as laboratory. You learn more about yourself on a mountain than anywhere else I've found.",
    href: '#',
    c1: '#051a0a', c2: '#0a3319',
  },
  {
    id: 'skiing-everest',
    title: 'Skiing Everest',
    year: '2009',
    studio: 'Warren Miller Entertainment',
    description: "The Lhotse Face. One of the most committing descents I've attempted. This film documents what it took to get there — and what happened when we did.",
    href: '#',
    c1: '#050d1a', c2: '#0a1a33',
  },
  {
    id: 'wintervention',
    title: 'Wintervention',
    year: '2010',
    studio: 'Warren Miller Entertainment',
    description: "Warren Miller's take on an intervention — dragging people back to where they belong. The mountains are where problems get solved, not created.",
    href: '#',
    c1: '#0d0d26', c2: '#1a1a4a',
  },
  {
    id: 'the-story',
    title: 'The Story',
    year: '2010',
    studio: 'Matchstick Productions',
    description: "Every skier has a story. MSP stepped back to ask what those stories add up to — what they mean when you string them together across a career.",
    href: '#',
    c1: '#200d33', c2: '#3a1a5a',
  },
  {
    id: 'australis',
    title: 'Australis',
    year: '2010',
    studio: 'Independent',
    description: "An Antarctic Ski Odyssey. The last truly wild place on earth. The skiing is almost secondary to the experience of standing somewhere the mountains have never been skied before.",
    href: '#',
    c1: '#051426', c2: '#0a2a4d',
  },
  {
    id: 'like-theres-no-tomorrow',
    title: "Like There's No Tomorrow",
    year: '2011',
    studio: 'Matchstick Productions',
    description: "A meditation on urgency. The mountains have a way of clarifying what actually matters and making everything else noise.",
    href: '#',
    c1: '#0d2014', c2: '#1a3d26',
  },
  {
    id: 'ultimate-rush',
    title: 'Ultimate Rush',
    year: '2011–2017',
    studio: 'Warren Miller Entertainment',
    description: "Six years chasing the world's most consequential skiing. The concept — that there's always a bigger line — drove the whole thing forward.",
    href: '#',
    c1: '#26050d', c2: '#4d0a1a',
  },
  {
    id: 'the-red-line',
    title: 'The Red Line',
    year: '2012',
    studio: 'Warren Miller Entertainment',
    description: "The line between acceptable risk and the unacceptable. I've thought about that line my entire career. This film gave me a chance to examine it directly.",
    href: '#',
    c1: '#330505', c2: '#590a0a',
  },
  {
    id: 'flow-state',
    title: 'Flow State',
    year: '2012',
    studio: 'Matchstick Productions',
    description: "The psychological state every skier chases — when everything clicks and the mountain stops being an obstacle and starts being a conversation.",
    href: '#',
    c1: '#051f1f', c2: '#0a3d3d',
  },
  {
    id: 'dispatches',
    title: 'Dispatches',
    year: '2012–',
    studio: 'Independent Series',
    description: "Field dispatches from wherever I am. The format that fit what I was actually doing — moving between mountains, sending back what I found.",
    href: '#',
    c1: '#0d1726', c2: '#1a2e4d',
  },
  {
    id: 'the-final-cut',
    title: 'The Final Cut',
    year: '2013',
    studio: 'Matchstick Productions',
    description: "MSP's defining final major film. An era of ski film ended here — and it was a good one.",
    href: '#',
    c1: '#1a1a1a', c2: '#333333',
  },
  {
    id: 'the-line',
    title: 'The Line',
    year: '2014–',
    studio: 'Ongoing Series',
    description: "An ongoing series about finding and skiing the world's most committing lines. The title says everything — there's always another one worth finding.",
    href: '#',
    c1: '#111827', c2: '#1f2a3d',
  },
  {
    id: 'days-of-my-youth',
    title: 'Days of My Youth',
    year: '2014',
    studio: 'Matchstick Productions',
    description: "A film about staying connected to why you started. After 20 years of doing this professionally, that question doesn't get easier — but it gets more important.",
    href: '#',
    c1: '#0d1a26', c2: '#1a3347',
  },
]

const PHOTOS = [
  { src: '/images/hero_shot.jpg', alt: 'Chris Davenport on steep terrain' },
  { src: '/images/ant.jpg', alt: 'Antarctica expedition' },
  { src: '/images/portillo.jpg', alt: 'Portillo, Chile' },
  { src: '/images/japow.png', alt: 'Japan powder' },
  { src: '/images/switz.webp', alt: 'Engelberg, Switzerland' },
  { src: '/images/gear_map.jpg', alt: 'Deep powder run' },
]

const PRESS = [
  {
    outlet: 'Powder Magazine',
    headline: 'Chris Davenport Joins DPS Skis',
    year: '2022',
    description: 'Head of ambassador relations and field testing. After Peak Skis, a new chapter.',
    url: 'https://www.powder.com',
  },
  {
    outlet: 'Outside Online',
    headline: 'How Chris Davenport Raises Talented, Risk-Savvy Kids',
    year: '2016',
    description: 'The same principles I apply in the mountains, I try to bring home.',
    url: 'https://www.outsideonline.com/2086471/how-chris-davenport-raises-talented-adventurous-risk-savvy-kids',
  },
  {
    outlet: 'Outside Online',
    headline: "The Best Athlete You've Never Heard Of",
    year: '2014',
    description: 'Outside went deep on what drives a professional skier twenty years into a career.',
    url: 'https://www.outsideonline.com/outdoor-adventure/snow-sports/peak-his-game/',
  },
  {
    outlet: 'Outside Online',
    headline: 'Chris Davenport on Managing Risk',
    year: '2013',
    description: 'The framework I built for decision-making above the death zone.',
    url: 'https://www.outsideonline.com/outdoor-adventure/snow-sports/skier-chris-davenport-managing-risk',
  },
  {
    outlet: "Men's Journal",
    headline: "The Science of Skiing the World's Most Dangerous Mountains",
    year: '2012',
    description: 'A deep look at the physical and psychological demands of extreme ski mountaineering.',
    url: 'https://www.mensjournal.com',
  },
  {
    outlet: 'The New York Times',
    headline: 'The Skier Who Conquered the 14ers',
    year: '2008',
    description: 'Profile following the completion of all 54 Colorado 14ers in a single ski season.',
    url: 'https://www.nytimes.com',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// FILM COVER — styled poster
// ─────────────────────────────────────────────────────────────────────────────

function FilmCover({ film, index }: { film: Film; index: number }) {
  const path = MOUNTAIN_PATHS[index % MOUNTAIN_PATHS.length]
  return (
    <div
      className="w-full h-full rounded-xl overflow-hidden shadow-2xl select-none relative"
      style={{ background: `linear-gradient(158deg, ${film.c1} 0%, ${film.c2} 100%)` }}
    >
      {/* Mountain fill */}
      <svg
        viewBox="0 0 130 185"
        className="absolute inset-0 w-full h-full opacity-[0.13]"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <polygon points={path} fill="white" />
      </svg>

      {/* Scan-line texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 4px)',
        }}
      />

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col justify-between p-3">
        <p className="text-[6px] font-semibold tracking-[0.16em] text-white/40 uppercase leading-tight line-clamp-1">
          {film.studio}
        </p>
        <div>
          <h3 className="font-serif text-[12px] font-medium leading-tight text-white/95 line-clamp-3">
            {film.title}
          </h3>
          <p className="text-[9px] text-white/45 mt-1.5 font-medium tracking-wide">{film.year}</p>
        </div>
      </div>

      {/* Inner ring */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FILM GALLERY — GSAP stacked book-style
// ─────────────────────────────────────────────────────────────────────────────

const CARD_W = 130
const CARD_H = 185
const VISIBLE = 52 // px visible per card in the stack
const STACK_W = VISIBLE * (FILMS.length - 1) + CARD_W // ≈ 1006px

function FilmGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeFilm, setActiveFilm] = useState<Film | null>(null)

  // Per-card base rotation + vertical offset (stable ref, never changes)
  const BASE = useRef(
    FILMS.map((_, i) => ({
      rotation: ((i % 7) - 3) * 0.85 + (i % 2 === 0 ? 0.25 : -0.35),
      y: [0, 5, 3, 6, 2, 4, 1][i % 7],
    }))
  )

  // Set initial transforms once on mount
  useGSAP(
    () => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const { rotation, y } = BASE.current[i]
        gsap.set(card, { rotation, y, x: 0, scale: 1, zIndex: i })
      })
    },
    { scope: containerRef }
  )

  const handleEnter = useCallback((index: number) => {
    setActiveFilm(FILMS[index])
    cardRefs.current.forEach((card, j) => {
      if (!card) return
      const base = BASE.current[j]
      if (j === index) {
        gsap.to(card, {
          scale: 1.1,
          y: -22,
          rotation: 0,
          zIndex: 100,
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        const dist = j - index
        const fanX = Math.sign(dist) * Math.min(Math.abs(dist) * 14, 55)
        gsap.to(card, {
          x: fanX,
          rotation: base.rotation + Math.sign(dist) * Math.min(Math.abs(dist) * 0.45, 2.2),
          y: base.y,
          scale: 1,
          zIndex: j,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    })
  }, [])

  const handleLeave = useCallback(() => {
    setActiveFilm(null)
    cardRefs.current.forEach((card, j) => {
      if (!card) return
      const base = BASE.current[j]
      gsap.to(card, {
        x: 0,
        rotation: base.rotation,
        y: base.y,
        scale: 1,
        zIndex: j,
        duration: 0.38,
        ease: 'power2.out',
      })
    })
  }, [])

  return (
    <>
      {/* ── Desktop: stacked gallery ─────────────────────────────── */}
      <div className="hidden lg:block">
        <div
          ref={containerRef}
          className="relative"
          style={{ width: `${STACK_W}px`, height: `${CARD_H + 64}px` }}
          onMouseLeave={handleLeave}
        >
          {FILMS.map((film, i) => (
            <div
              key={film.id}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              className="absolute bottom-2 cursor-pointer"
              style={{ left: `${i * VISIBLE}px`, width: `${CARD_W}px`, height: `${CARD_H}px` }}
              onMouseEnter={() => handleEnter(i)}
            >
              <Link
                href={film.href}
                target={film.href !== '#' ? '_blank' : '_self'}
                rel={film.href !== '#' ? 'noopener noreferrer' : undefined}
                aria-label={`${film.title} (${film.year})`}
              >
                <FilmCover film={film} index={i} />
              </Link>
            </div>
          ))}
        </div>

        {/* Animated info panel */}
        <div className="mt-8 min-h-[110px]">
          <AnimatePresence mode="wait">
            {activeFilm ? (
              <motion.div
                key={activeFilm.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.16 }}
                className="max-w-2xl"
              >
                <p className="text-xs text-navy/40 uppercase tracking-widest font-medium mb-1.5">
                  {activeFilm.studio} · {activeFilm.year}
                </p>
                <h3 className="font-serif text-2xl font-medium text-navy mb-2">
                  {activeFilm.title}
                </h3>
                <p className="text-sm text-navy/60 leading-relaxed">{activeFilm.description}</p>
                {activeFilm.href !== '#' && (
                  <a
                    href={activeFilm.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-navy hover:text-navy/60 transition-colors"
                  >
                    View on IMDb ↗
                  </a>
                )}
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-navy/30 italic"
              >
                Hover a cover — {FILMS.length} films across 30 years.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile / tablet: grid ────────────────────────────────── */}
      <div className="lg:hidden grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {FILMS.map((film, i) => (
          <Link
            key={film.id}
            href={film.href}
            target={film.href !== '#' ? '_blank' : '_self'}
            rel={film.href !== '#' ? 'noopener noreferrer' : undefined}
            className="block hover:scale-105 transition-transform duration-200"
            style={{ height: '160px' }}
            aria-label={`${film.title} (${film.year})`}
          >
            <FilmCover film={film} index={i} />
          </Link>
        ))}
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function MediaPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-navy text-cream pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <p className="text-xs font-medium tracking-widest text-cream/40 uppercase mb-4">
                Film · Photography · Print
              </p>
              <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight">
                30 years<br /><em>on film.</em>
              </h1>
            </div>
            <div>
              <p className="text-cream/65 text-lg leading-relaxed">
                19 feature films. 36 Warren Miller and Matchstick Productions appearances.
                A TEDx talk on risk and decision-making. Books, magazine features, and
                dispatches from the mountains I&apos;ve spent my career on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filmography ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="mb-10">
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">
            Filmography
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-navy">
            The films.
          </h2>
          <p className="mt-3 text-navy/55 max-w-lg">
            From Snowriders II in 1997 through Days of My Youth in 2014 — and the series
            still running. Hover a cover to read about the film.
          </p>
        </div>

        <FilmGallery />
      </section>

      {/* ── TEDx / Watch ───────────────────────────────────────────────────── */}
      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-xs font-medium tracking-widest text-cream/40 uppercase mb-3">
                Watch
              </p>
              <h2 className="font-serif text-4xl font-medium mb-5">
                The TEDx talk.
              </h2>
              <p className="text-cream/60 leading-relaxed mb-6">
                &ldquo;Managing Risk&rdquo; — a framework I built for reading consequence in the mountains,
                and how the same thinking applies everywhere else. Filmed at TEDxVail.
                One of the most honest things I&apos;ve put on record about why I do this and how I stay alive doing it.
              </p>
              <a
                href="https://www.youtube.com/watch?v=zyet9fPS24k"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-medium text-cream hover:bg-cream/10 transition-colors"
              >
                Watch on YouTube ↗
              </a>
            </div>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-navy/50 ring-1 ring-cream/10">
              <iframe
                src="https://www.youtube.com/embed/zyet9fPS24k"
                title="Chris Davenport — Managing Risk | TEDxVail"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Additional channels */}
          <div className="mt-16 pt-10 border-t border-cream/10 flex flex-wrap gap-4">
            {[
              { label: 'YouTube', handle: '@ChrisDavenport', url: 'https://www.youtube.com/@ChrisDavenport' },
              { label: 'Instagram', handle: '@steepskiing', url: 'https://www.instagram.com/steepskiing/' },
              { label: 'Red Bull', handle: 'Faces of Dav series', url: 'https://www.redbull.com' },
            ].map(({ label, handle, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-cream/5 hover:bg-cream/10 border border-cream/10 px-5 py-4 transition-colors group"
              >
                <div>
                  <p className="text-[10px] text-cream/40 uppercase tracking-widest">{label}</p>
                  <p className="text-sm font-medium text-cream/80 group-hover:text-cream transition-colors">
                    {handle} ↗
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photography ────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-10">
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">
            Photography
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-navy">
            From the field.
          </h2>
          <p className="mt-3 text-navy/55 max-w-lg">
            Chile, Antarctica, Japan, Switzerland, Colorado. The places that define the program.
          </p>
        </div>

        {/* Horizontal scroll */}
        <div className="overflow-x-auto pb-2 pl-6 lg:pl-10">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {PHOTOS.map((photo, i) => (
              <div
                key={photo.src}
                className="relative flex-shrink-0 rounded-2xl overflow-hidden bg-navy/10"
                style={{
                  width: i % 3 === 0 ? '400px' : i % 3 === 1 ? '310px' : '355px',
                  height: '272px',
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
            ))}
            <div className="flex-shrink-0 w-6 lg:w-10" />
          </div>
        </div>
      </section>

      {/* ── Written Media ──────────────────────────────────────────────────── */}
      <section className="bg-cream/50 border-t border-navy/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <div className="mb-12">
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">
              Written
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-navy">
              Books &amp; press.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Books — update titles/details below */}
            <div>
              <h3 className="font-serif text-2xl font-medium text-navy mb-6 pb-3 border-b border-navy/10">
                Books
              </h3>
              <div className="space-y-5">
                {[
                  {
                    title: 'REPLACE_WITH_BOOK_1_TITLE',
                    year: 'YEAR',
                    publisher: 'PUBLISHER',
                    description: 'Replace this with the book description.',
                    url: '#',
                  },
                  {
                    title: 'REPLACE_WITH_BOOK_2_TITLE',
                    year: 'YEAR',
                    publisher: 'PUBLISHER',
                    description: 'Replace this with the book description.',
                    url: '#',
                  },
                ].map((book) => (
                  <a
                    key={book.title}
                    href={book.url}
                    className="group flex gap-5 rounded-2xl border border-navy/10 bg-white/70 p-6 hover:border-navy/25 hover:bg-white transition-all block"
                  >
                    <div className="flex gap-5 items-start">
                      <div className="flex-shrink-0 w-1.5 rounded-full bg-navy/20 group-hover:bg-navy/40 transition-colors self-stretch min-h-[3rem]" />
                      <div>
                        <p className="font-serif text-lg font-medium text-navy leading-tight group-hover:text-navy/80 transition-colors">
                          {book.title}
                        </p>
                        <p className="text-xs text-navy/40 uppercase tracking-widest mt-1">
                          {book.publisher} · {book.year}
                        </p>
                        <p className="mt-3 text-sm text-navy/60 leading-relaxed">
                          {book.description}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Press */}
            <div>
              <h3 className="font-serif text-2xl font-medium text-navy mb-6 pb-3 border-b border-navy/10">
                Press
              </h3>
              <div className="divide-y divide-navy/8">
                {PRESS.map((article) => (
                  <a
                    key={article.headline}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 py-5 hover:opacity-80 transition-opacity"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy leading-snug">
                        {article.headline}
                      </p>
                      <p className="text-xs text-navy/40 mt-0.5 uppercase tracking-widest">
                        {article.outlet} · {article.year}
                      </p>
                      <p className="text-xs text-navy/50 mt-1.5 leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-navy/25 group-hover:text-navy/50 transition-colors text-xs pt-0.5">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Awards ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">
              Recognition
            </p>
            <h2 className="font-serif text-4xl font-medium text-navy">
              Awards &amp;<br />honours.
            </h2>
          </div>
          <div className="space-y-6">
            {[
              {
                year: '1996 & 1997',
                title: 'World Extreme Skiing Champion',
                body: 'Back-to-back titles at the World Extreme Skiing Championships.',
              },
              {
                year: '2007',
                title: 'First to Ski All 54 Colorado 14ers',
                body: 'Completed all 54 Colorado 14ers in a single ski season — never done before.',
              },
              {
                year: '2013',
                title: 'TEDxVail Speaker',
                body: '"Managing Risk" — one of the most-watched talks from the Vail series.',
              },
              {
                year: '2015',
                title: 'U.S. Ski & Snowboard Hall of Fame',
                body: 'Inducted for contributions to alpine skiing and ski mountaineering.',
              },
            ].map(({ year, title, body }) => (
              <div key={title} className="flex gap-6">
                <div className="flex-shrink-0 w-20 pt-0.5">
                  <p className="text-xs font-medium text-navy/35 uppercase tracking-wide leading-tight">
                    {year}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-navy leading-snug">{title}</p>
                  <p className="text-sm text-navy/55 mt-1 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
