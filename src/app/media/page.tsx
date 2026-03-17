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

interface Film {
  id: string
  title: string
  year: string
  studio: string
  description: string
  href: string
  poster: string
}

const FILMS: Film[] = [
  {
    id: 'snowriders-ii',
    title: 'Snowriders II',
    year: '1997',
    studio: 'Matchstick Productions',
    description: "My earliest major feature. Matchstick was redefining what ski films could be — Snowriders II was part of the shift away from helicopter spectacle toward something rawer and more personal.",
    href: '#',
    poster: '/images/movies/snowriders2.jpg',
  },
  {
    id: 'global-storming',
    title: 'Global Storming',
    year: '1999',
    studio: 'Matchstick Productions',
    description: "A global hunt for snow in the late 1990s. The world felt bigger then — or at least it felt bigger when you had to go find the terrain yourself.",
    href: '#',
    poster: '/images/movies/global-storming.jpg',
  },
  {
    id: 'ski-movie-iii',
    title: 'Ski Movie III: The Front Line',
    year: '2002',
    studio: 'Matchstick Productions',
    description: "By 2002 MSP had become the defining franchise in ski film. A statement that the generation coming up was ready to draw serious lines.",
    href: '#',
    poster: '/images/movies/ski-movie-3.jpg',
  },
  {
    id: 'storm',
    title: 'Storm',
    year: '2002',
    studio: 'Warren Miller Entertainment',
    description: "An appearance in a Warren Miller film carried real weight then. It still does. Skiing the biggest stage in the sport.",
    href: '#',
    poster: '/images/movies/storm.jpg',
  },
  {
    id: 'mountain-town',
    title: 'Mountain Town',
    year: '2006',
    studio: 'Matchstick Productions',
    description: "A love letter to mountain culture and the communities built around skiing. This one made me think harder about what Aspen is and what we're protecting when we protect these places.",
    href: '#',
    poster: '/images/movies/mountain-town.jpg',
  },
  {
    id: 'steep',
    title: 'Steep',
    year: '2007',
    studio: 'Sweetgrass Productions',
    description: "The definitive film about big mountain skiing. Not just about skiing — about consequence, obsession, and what it means to draw a line on a mountain that will not forgive you for getting it wrong.",
    href: 'https://www.imdb.com/title/tt1003118/',
    poster: '/images/movies/steep.jpeg',
  },
  {
    id: 'playground',
    title: 'Playground',
    year: '2007',
    studio: 'Matchstick Productions',
    description: "MSP at the height of their creative run. The mountains as playground — but also as laboratory. You learn more about yourself on a mountain than anywhere else I've found.",
    href: '#',
    poster: '/images/movies/playground.jpg',
  },
  {
    id: 'claim',
    title: 'Claim: The Greatest Ski Movie... Ever!',
    year: '2008',
    studio: 'Matchstick Productions',
    description: "A bold title — and one MSP could back up. One of the most ambitious films the company ever made. The mountains demanded it.",
    href: '#',
    poster: '/images/movies/claim.jpg',
  },
  {
    id: 'skiing-everest',
    title: 'Skiing Everest',
    year: '2009',
    studio: 'Warren Miller Entertainment',
    description: "The Lhotse Face. One of the most committing descents I've attempted. This film documents what it took to get there — and what happened when we did.",
    href: '#',
    poster: '/images/movies/skiing-everest.jpg',
  },
  {
    id: 'wintervention',
    title: 'Wintervention',
    year: '2010',
    studio: 'Warren Miller Entertainment',
    description: "Warren Miller's take on an intervention — dragging people back to where they belong. The mountains are where problems get solved, not created.",
    href: '#',
    poster: '/images/movies/wintervention.jpg',
  },
  {
    id: 'australis',
    title: 'Australis',
    year: '2010',
    studio: 'Independent',
    description: "An Antarctic Ski Odyssey. The last truly wild place on earth. The skiing is almost secondary to the experience of standing somewhere the mountains have never been skied before.",
    href: '#',
    poster: '/images/movies/australis.jpg',
  },
  {
    id: 'like-theres-no-tomorrow',
    title: "Like There's No Tomorrow",
    year: '2011',
    studio: 'Matchstick Productions',
    description: "A meditation on urgency. The mountains have a way of clarifying what actually matters and making everything else noise.",
    href: '#',
    poster: '/images/movies/like-theres-no-tomorrow.png',
  },
  {
    id: 'ultimate-rush',
    title: 'Ultimate Rush — Season 1, Ep. 5: The Red Line',
    year: '2011',
    studio: 'Warren Miller Entertainment',
    description: "The only episode of the Ultimate Rush series I appear in — and it earned it. Season 1, Episode 5: The Red Line. Every frame was committed.",
    href: '#',
    poster: '/images/movies/ultimate-rush.jpg',
  },
  {
    id: 'flow-state',
    title: 'Flow State',
    year: '2012',
    studio: 'Matchstick Productions',
    description: "The psychological state every skier chases — when everything clicks and the mountain stops being an obstacle and starts being a conversation.",
    href: '#',
    poster: '/images/movies/flow-state.jpg',
  },
  {
    id: 'dispatches',
    title: 'Dispatches',
    year: '2012–',
    studio: 'Independent Series',
    description: "Field dispatches from wherever I am. The format that fit what I was actually doing — moving between mountains, sending back what I found.",
    href: '#',
    poster: '/images/movies/dispatches.jpg',
  },
  {
    id: 'days-of-my-youth',
    title: 'Days of My Youth',
    year: '2014',
    studio: 'Matchstick Productions',
    description: "A film about staying connected to why you started. After 20 years of doing this professionally, that question doesn't get easier — but it gets more important.",
    href: '#',
    poster: '/images/movies/days-of-my-youth.jpg',
  },
]

interface Photo {
  src: string
  alt: string
  location: string
  caption: string
}

const PHOTOS: Photo[] = [
  {
    src: '/images/photos/antarctica-cliff-drop.jpg',
    alt: 'Chris Davenport jumping off a cliff into Antarctic sea',
    location: 'Antarctica',
    caption: "Off the edge, into the sea. There is no run-out here — just ice, water, and commitment. One of the most surreal moments of my life.",
  },
  {
    src: '/images/photos/antarctica-ocean-edge.jpg',
    alt: 'Solitary skier at the edge of snow and Antarctic ocean',
    location: 'Antarctica',
    caption: "The line ends at the water. Skiing until there's nowhere left to go — that's what Antarctica does to you.",
  },
  {
    src: '/images/photos/antarctica-aerial.jpg',
    alt: 'Aerial view of skiers descending an Antarctic ice island',
    location: 'Antarctica',
    caption: "Aerial of our crew descending one of the most remote ice formations on the planet. The scale of this place doesn't register until you're inside it.",
  },
  {
    src: '/images/photos/antarctica-sailboat.jpg',
    alt: 'Sailboat in misty Antarctic bay with mountain reflection',
    location: 'Antarctica',
    caption: "The boat that took us in. Getting to Antarctica by sail is half the expedition — you earn the mountains before you ever get to ski them.",
  },
  {
    src: '/images/photos/alaska-glacier-camp.jpg',
    alt: 'Glacier camp below massive Alaskan peaks',
    location: 'Alaska Range',
    caption: "Camp on the glacier below the Alaska Range. Denali above, tents below, and a week of objectives ahead. This is what the approach looks like.",
  },
  {
    src: '/images/photos/alaska-ice-climb.jpg',
    alt: 'Chris Davenport ice climbing a steep couloir in Alaska',
    location: 'Alaska',
    caption: "Getting to the top of the line. Alaska demands you earn every foot — and you earn it with crampons and ice tools before you ever put on skis.",
  },
  {
    src: '/images/photos/alaska-arrival.jpg',
    alt: 'Chris Davenport reflected in a puddle at an Alaskan bush strip',
    location: 'Alaska',
    caption: "The puddle reflection at the bush strip. The rain, the small plane, the mountains waiting behind the clouds — Alaska starts like this.",
  },
  {
    src: '/images/photos/above-clouds.jpg',
    alt: 'Bootpacking a steep ridge above the clouds',
    location: 'Alps',
    caption: "Above the inversion. When the valley is socked in and you've climbed through the ceiling into blue sky — that's when the day really starts.",
  },
  {
    src: '/images/photos/chamonix-powder.jpg',
    alt: 'Chris Davenport charging powder in orange jacket under a star-burst sun',
    location: 'Chamonix, France',
    caption: "Big mountain, big snow, big sun. Chamonix in its best form — steep, fast, and lit up like a spotlight.",
  },
  {
    src: '/images/photos/cliff-air.jpg',
    alt: 'Chris Davenport launching a cliff in orange jacket',
    location: 'Alps',
    caption: "Off the lip and into the air. The commitment to leave the ground on a line like this is what big mountain skiing is really about.",
  },
  {
    src: '/images/photos/steep-face.jpg',
    alt: 'Chris Davenport skiing an extreme couloir in red jacket',
    location: 'Alps',
    caption: "Red jacket, no room for error. This is the kind of line that narrows as you descend — no second thoughts.",
  },
  {
    src: '/images/photos/rocky-couloir.jpg',
    alt: 'Chris Davenport skiing a rocky technical couloir',
    location: 'Chamonix, France',
    caption: "Rock on both sides, snow in the middle. The margin is what makes it worth doing.",
  },
  {
    src: '/images/photos/powder-sun.jpg',
    alt: 'Chris Davenport in yellow jacket skiing powder against the sun',
    location: 'Alps',
    caption: "Into the light. Deep snow, blue sky, and the sun directly in frame — the kind of shot that only happens once.",
  },
  {
    src: '/images/photos/colorado-ridge.jpg',
    alt: 'Chris Davenport on a stormy Colorado ridge with skis',
    location: 'Colorado Rockies',
    caption: "On the ridge above 13,000 feet in a storm. This is where the 14er project lived — and where it nearly ended a dozen times.",
  },
  {
    src: '/images/photos/portillo-couloir.jpg',
    alt: 'Skiing a steep couloir above the Portillo lake',
    location: 'Portillo, Chile',
    caption: "Skiing the couloir above the lake at Portillo. The commitment to stand at the top of that line — with the water below — is everything I train for.",
  },
  {
    src: '/images/photos/deep-pow.jpg',
    alt: 'Chris Davenport buried in deep powder',
    location: 'Aspen, Colorado',
    caption: "This is what a big Aspen powder day looks like from the inside.",
  },
  {
    src: '/images/photos/dps-portillo.jpg',
    alt: 'Chris Davenport holding DPS skis at Portillo with the lake behind',
    location: 'Portillo, Chile',
    caption: "New season, new skis. At Portillo with DPS — the skis I helped develop and trust on the biggest terrain I ski.",
  },
  {
    src: '/images/photos/powder-turn.jpg',
    alt: 'Chris Davenport carving a powder turn in orange jacket',
    location: 'Aspen, Colorado',
    caption: "Orange jacket, black DPS skis, pure spring snow. Aspen Snowmass on a morning when everything is exactly right.",
  },
  {
    src: '/images/photos/antarctica-glacier.jpg',
    alt: 'Chris Davenport standing on a glacier with a peak behind',
    location: 'Antarctica',
    caption: "Standing on a glacier the size of a county. That scale — the silence and the scale — stays with you.",
  },
  {
    src: '/images/photos/glacier-three.jpg',
    alt: 'Three skiers on a glacier with a mountain peak',
    location: 'North Cascades',
    caption: "Three skiers, one mountain, infinite terrain above. The Cascades have some of the best ski mountaineering in the country.",
  },
  {
    src: '/images/photos/portillo-team.jpg',
    alt: 'The Portillo camp crew at the hotel balcony',
    location: 'Portillo, Chile',
    caption: "The crew at Portillo. The hotel, the lake, the Andes — you can't stand here and not want to ski.",
  },
  {
    src: '/images/photos/everest-oxygen.jpg',
    alt: 'Chris Davenport with Red Bull helmet and oxygen mask at altitude',
    location: 'Himalaya',
    caption: "Oxygen mask on at the high camp on Lhotse. The Warren Miller Skiing Everest project put me here — and it was every bit as serious as it looks.",
  },
]

const BOOKS = [
  {
    title: "Ski the 14ers: A Visual Tribute to Colorado's 14,000-Foot Peaks from the Eyes of a Ski Mountaineer",
    author: 'Chris Davenport',
    year: '2008',
    publisher: 'Fulcrum Publishing',
    description: 'The 54 Colorado 14ers in a single ski season. Never done before. Part photographic tribute, part field journal — the whole project in one book.',
    url: 'https://www.amazon.com/Ski-14ers-2nd-Chris-Davenport-dp-0979264456/dp/0979264456/ref=dp_ob_title_bk',
    cover: '/images/books/ski-the-14ers.jpg',
  },
  {
    title: '50 Classic Ski Descents of North America',
    author: 'Chris Davenport, Art Burrows, and Penn Newhard',
    year: '2011',
    publisher: 'The Mountaineers Books',
    description: "The definitive guide to the continent's most compelling ski mountaineering objectives. Alaska to the Rockies to the Pacific Northwest volcanoes — built from decades of first-hand exploration.",
    url: 'https://www.50classicskidescents.com/',
    cover: '/images/books/NorthAmericanClassicsPublishing_50ClassicSkiDescents_FrontCover.jpg',
  },
]

const PRESS = [
  {
    outlet: 'Powder Magazine',
    headline: 'Chris Davenport Joins DPS Skis',
    year: '2022',
    description: 'Head of ambassador relations and field testing. After Peak Skis, a new chapter with the brand he\'s trusted for years.',
    url: 'https://www.powder.com/news/chris-davenport-dps-skis',
  },
  {
    outlet: 'Outside Online',
    headline: 'How Chris Davenport Raises Talented, Risk-Savvy Kids',
    year: '2016',
    description: 'The same principles I apply in the mountains, I try to bring home.',
    url: 'https://www.outsideonline.com/culture/active-families/how-chris-davenport-raises-talented-adventurous-risk-savvy-kids/',
  },
  {
    outlet: 'Outside Online',
    headline: "The Best Athlete You've Never Heard Of",
    year: '2014',
    description: 'Outside went deep on what drives a professional skier twenty years into a career.',
    url: 'https://www.outsideonline.com/1974671/peak-his-game',
  },
  {
    outlet: 'Outside Online',
    headline: 'Chris Davenport on Managing Risk',
    year: '2013',
    description: 'The framework I built for decision-making above the death zone.',
    url: 'https://www.outsideonline.com/1907176/skier-chris-davenport-managing-risk',
  },
  {
    outlet: "Men's Journal",
    headline: "The Science of Skiing the World's Most Dangerous Mountains",
    year: '2012',
    description: 'A deep look at the physical and psychological demands of extreme ski mountaineering.',
    url: 'https://www.mensjournal.com/adventure/skiing-deadliest-mountains/',
  },
  {
    outlet: 'The New York Times',
    headline: 'The Skier Who Conquered the 14ers',
    year: '2008',
    description: 'Profile following the completion of all 54 Colorado 14ers in a single ski season.',
    url: 'https://www.nytimes.com/2008/03/09/sports/09ski.html',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// STACKED GALLERY — generic, used for both films and photos
// The hover logic uses onMouseMove on the container so it's based on the
// cursor's raw X position (not which transformed DOM element is underneath).
// This prevents the "every other card skips" bug caused by GSAP-shifted hitboxes.
// ─────────────────────────────────────────────────────────────────────────────

interface GalleryCard {
  id: string
  render: (hovered: boolean) => React.ReactNode
  infoPanel: React.ReactNode
}

function StackedGallery({
  cards,
  cardW,
  cardH,
  visible,
  hint,
}: {
  cards: GalleryCard[]
  cardW: number
  cardH: number
  visible: number
  hint: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const activeIndexRef = useRef<number>(-1)

  const stackW = visible * (cards.length - 1) + cardW

  const BASE = useRef(
    cards.map((_, i) => ({
      rotation: ((i % 7) - 3) * 0.85 + (i % 2 === 0 ? 0.25 : -0.35),
      y: [0, 5, 3, 6, 2, 4, 1][i % 7],
    }))
  )

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

  const fanTo = useCallback((index: number) => {
    cardRefs.current.forEach((card, j) => {
      if (!card) return
      const base = BASE.current[j]
      if (j === index) {
        gsap.to(card, { scale: 1.08, y: -20, rotation: 0, zIndex: 100, duration: 0.28, ease: 'power2.out' })
      } else {
        const dist = j - index
        const fanX = Math.sign(dist) * Math.min(Math.abs(dist) * 14, 55)
        gsap.to(card, {
          x: fanX,
          rotation: base.rotation + Math.sign(dist) * Math.min(Math.abs(dist) * 0.45, 2.2),
          y: base.y,
          scale: 1,
          zIndex: j,
          duration: 0.28,
          ease: 'power2.out',
        })
      }
    })
  }, [])

  const resetAll = useCallback(() => {
    cardRefs.current.forEach((card, j) => {
      if (!card) return
      const base = BASE.current[j]
      gsap.to(card, { x: 0, rotation: base.rotation, y: base.y, scale: 1, zIndex: j, duration: 0.35, ease: 'power2.out' })
    })
  }, [])

  // ── Key fix: determine active card from raw cursor X, not DOM hit-testing ──
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const index = Math.max(0, Math.min(Math.floor(x / visible), cards.length - 1))
    if (index !== activeIndexRef.current) {
      activeIndexRef.current = index
      setActiveIndex(index)
      fanTo(index)
    }
  }, [cards.length, visible, fanTo])

  const handleMouseLeave = useCallback(() => {
    activeIndexRef.current = -1
    setActiveIndex(-1)
    resetAll()
  }, [resetAll])

  return (
    <>
      {/* Desktop stacked gallery */}
      <div className="hidden lg:block">
        <div
          ref={containerRef}
          className="relative cursor-pointer"
          style={{ width: `${stackW}px`, height: `${cardH + 64}px` }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[i] = el }}
              className="absolute bottom-2"
              style={{ left: `${i * visible}px`, width: `${cardW}px`, height: `${cardH}px` }}
            >
              {card.render(i === activeIndex)}
            </div>
          ))}
        </div>

        <div className="mt-8 min-h-[110px]">
          <AnimatePresence mode="wait">
            {activeIndex >= 0 ? (
              <motion.div
                key={String(activeIndex)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.14 }}
              >
                {cards[activeIndex]?.infoPanel}
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-navy/30 italic"
              >
                {hint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile grid */}
      <div className="lg:hidden grid grid-cols-3 sm:grid-cols-4 gap-3">
        {cards.map((card) => (
          <div key={card.id} style={{ height: `${cardH}px` }}>
            {card.render(false)}
          </div>
        ))}
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function MediaPage() {
  // Build film cards
  const filmCards: GalleryCard[] = FILMS.map((film) => ({
    id: film.id,
    render: () => (
      <div className="w-full h-full rounded-xl overflow-hidden shadow-xl relative ring-1 ring-black/20">
        <Image src={film.poster} alt={film.title} fill className="object-cover select-none" sizes="130px" draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <p className="text-white/90 text-[9px] font-medium leading-tight line-clamp-2">{film.title}</p>
          <p className="text-white/50 text-[8px] mt-0.5">{film.year}</p>
        </div>
      </div>
    ),
    infoPanel: (
      <div className="max-w-2xl">
        <p className="text-xs text-navy/40 uppercase tracking-widest font-medium mb-1.5">
          {film.studio} · {film.year}
        </p>
        <h3 className="font-serif text-2xl font-medium text-navy mb-2">{film.title}</h3>
        <p className="text-sm text-navy/60 leading-relaxed">{film.description}</p>
        {film.href !== '#' && (
          <a href={film.href} target="_blank" rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-navy hover:text-navy/60 transition-colors">
            View on IMDb ↗
          </a>
        )}
      </div>
    ),
  }))

  // Build photo cards
  const photoCards: GalleryCard[] = PHOTOS.map((photo) => ({
    id: photo.src,
    render: () => (
      <div className="w-full h-full rounded-xl overflow-hidden shadow-xl relative ring-1 ring-white/10">
        <Image src={photo.src} alt={photo.alt} fill className="object-cover select-none" sizes="260px" draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-xl" />
        <p className="absolute bottom-2 left-2.5 text-[9px] text-white/70 font-medium uppercase tracking-wider">
          {photo.location}
        </p>
      </div>
    ),
    infoPanel: (
      <div className="max-w-2xl">
        <p className="text-xs text-navy/40 uppercase tracking-widest font-medium mb-1.5">{photo.location}</p>
        <p className="text-sm text-navy/60 leading-relaxed">{photo.caption}</p>
      </div>
    ),
  }))

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-navy text-cream pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <p className="text-xs font-medium tracking-widest text-cream/40 uppercase mb-4">
                Film · Photography · Print
              </p>
              <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight">
                The work.
              </h1>
            </div>
            <div>
              <p className="text-cream/60 text-lg leading-relaxed">
                Films, books, photos, and a few talks. Thirty years of going to the mountains and
                trying to bring something back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Books ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 border-b border-navy/10">
        <div className="mb-10">
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">Written</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-navy">The books.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {BOOKS.map((book) => (
            <a
              key={book.title}
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-5 rounded-2xl border border-navy/10 bg-white/70 p-6 hover:border-navy/25 hover:bg-white transition-all"
            >
              <div className="flex-shrink-0 relative w-20 rounded-lg overflow-hidden shadow-md ring-1 ring-navy/10" style={{ height: '112px' }}>
                <Image src={book.cover} alt={book.title} fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-lg font-medium text-navy leading-snug group-hover:text-navy/80 transition-colors">
                  {book.title}
                </p>
                <p className="text-xs text-navy/40 uppercase tracking-widest mt-1.5">
                  {book.author} · {book.year}
                </p>
                <p className="mt-3 text-sm text-navy/60 leading-relaxed line-clamp-3">{book.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-navy/40 group-hover:text-navy/70 transition-colors">
                  Buy the book ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Photography ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 border-b border-navy/10">
        <div className="mb-10">
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">Photography</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-navy">From the field.</h2>
          <p className="mt-3 text-navy/50 max-w-lg text-sm">
            Antarctica, Alaska, the Alps, Chile, Colorado. Hover a photo to see where it was taken.
          </p>
        </div>
        <StackedGallery
          cards={photoCards}
          cardW={260}
          cardH={174}
          visible={80}
          hint={`Hover a photo — ${PHOTOS.length} shots from the field.`}
        />
      </section>

      {/* ── Filmography ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 border-b border-navy/10">
        <div className="mb-10">
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">Filmography</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-navy">The films.</h2>
          <p className="mt-3 text-navy/50 max-w-lg text-sm">
            Snowriders II in 1997 through Days of My Youth in 2014 — and the series still running.
            Hover a poster.
          </p>
        </div>
        <StackedGallery
          cards={filmCards}
          cardW={130}
          cardH={185}
          visible={52}
          hint={`Hover a poster — ${FILMS.length} films across 30 years.`}
        />
      </section>

      {/* ── Press ──────────────────────────────────────────────────────────── */}
      <section className="bg-cream/50 border-b border-navy/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <div className="mb-10">
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">Press</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-navy">In print.</h2>
          </div>
          <div className="max-w-2xl divide-y divide-navy/8">
            {PRESS.map((article) => (
              <a
                key={article.headline}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 py-5 hover:opacity-80 transition-opacity"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy leading-snug">{article.headline}</p>
                  <p className="text-xs text-navy/40 mt-0.5 uppercase tracking-widest">{article.outlet} · {article.year}</p>
                  <p className="text-xs text-navy/50 mt-1.5 leading-relaxed">{article.description}</p>
                </div>
                <span className="flex-shrink-0 text-navy/25 group-hover:text-navy/50 transition-colors text-xs pt-0.5">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEDx / Watch ───────────────────────────────────────────────────── */}
      <section className="bg-navy text-cream border-b border-cream/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-xs font-medium tracking-widest text-cream/40 uppercase mb-3">Watch</p>
              <h2 className="font-serif text-4xl font-medium mb-5">The TEDx talk.</h2>
              <p className="text-cream/60 leading-relaxed mb-6">
                &ldquo;Managing Risk&rdquo; — a framework I built for reading consequence in the mountains,
                and how the same thinking applies everywhere else. Filmed at TEDxVail.
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

          <div className="mt-16 pt-10 border-t border-cream/10 flex flex-wrap gap-4">
            {[
              { label: 'YouTube', handle: '@ChrisDavenport', url: 'https://www.youtube.com/@ChrisDavenport' },
              { label: 'Instagram', handle: '@steepskiing', url: 'https://www.instagram.com/steepskiing/' },
              { label: 'Red Bull — Faces of Dav', handle: 'Watch the series', url: 'https://www.redbull.tv/en/page/rrn:content:shows:ffd3a55c-2847-5e9f-ad84-5401972c77a9/faces-of-dav?play=false' },
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
                  <p className="text-sm font-medium text-cream/80 group-hover:text-cream transition-colors">{handle} ↗</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">Recognition</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-navy">Awards &amp;<br />honours.</h2>
          </div>
          <div className="space-y-6">
            {[
              { year: '1996 & 1997', title: 'World Extreme Skiing Champion', body: 'Back-to-back titles at the World Extreme Skiing Championships.' },
              { year: '2007', title: 'First to Ski All 54 Colorado 14ers', body: 'Completed all 54 Colorado 14ers in a single ski season — never done before.' },
              { year: '2013', title: 'TEDxVail Speaker', body: '"Managing Risk" — one of the most-watched talks from the Vail series.' },
              { year: '2015', title: 'U.S. Ski & Snowboard Hall of Fame', body: 'Inducted for contributions to alpine skiing and ski mountaineering.' },
            ].map(({ year, title, body }) => (
              <div key={title} className="flex gap-6">
                <div className="flex-shrink-0 w-20 pt-0.5">
                  <p className="text-xs font-medium text-navy/35 uppercase tracking-wide leading-tight">{year}</p>
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

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <div className="border-t border-navy/10 bg-cream/40">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 text-center">
          <p className="text-navy/50 text-sm uppercase tracking-widest mb-4">Ski the same terrain</p>
          <Link href="/ski-camps" className="inline-block font-medium text-navy border-b-2 border-navy hover:border-navy/40 transition-colors pb-0.5 text-lg">
            View upcoming camps ↗
          </Link>
        </div>
      </div>
    </>
  )
}
