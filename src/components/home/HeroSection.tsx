import Link from 'next/link'
import Image from 'next/image'

/**
 * Full-bleed homepage hero. Placeholder ski photo from Unsplash —
 * swap with Chris Davenport hero asset when available.
 *
 * Left-aligned editorial layout on desktop matches the print-magazine
 * visual language described in the design brief.
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-navy">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1551524164-687a55dd1126?w=1800&q=85"
        alt="Chris Davenport skiing steep terrain"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay — bottom-heavy so text pops */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 pb-20 md:pb-28">
        <div className="max-w-2xl">
          {/* Credential line */}
          <p className="mb-4 text-xs font-medium tracking-widest text-cream/60 uppercase">
            IFMGA / AMGA Certified Mountain Guide · 2× World Extreme Skiing Champion
          </p>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-7xl font-medium text-cream leading-[1.05]">
            Ski the world's<br />best terrain.
          </h1>

          <p className="mt-6 text-base md:text-lg text-cream/70 leading-relaxed max-w-xl">
            Expert-guided ski camps led by Chris Davenport — Switzerland, Chile,
            Japan, and Antarctica. Small groups. World-class co-guides. Terrain
            you won't find on your own.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/ski-camps"
              className="inline-flex items-center rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-navy hover:bg-cream/90 transition-colors"
            >
              View All Camps
            </Link>
            <Link
              href="/trips/switzerland-2026"
              className="inline-flex items-center rounded-full border border-cream/40 px-7 py-3.5 text-sm font-medium text-cream hover:bg-cream/10 transition-colors"
            >
              Switzerland 2026 — 2 spots left
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2 text-cream/40">
        <span className="text-xs tracking-widest uppercase rotate-90 origin-center">
          Scroll
        </span>
      </div>
    </section>
  )
}
