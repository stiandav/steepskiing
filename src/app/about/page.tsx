import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { guides } from '@/data/guides'
import { testimonials } from '@/data/testimonials'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { TimelineSection } from '@/components/about/TimelineSection'

export const metadata: Metadata = {
  title: 'About Chris Davenport — Ski Guide & Mountain Athlete',
  description:
    '2× World Extreme Skiing Champion, IFMGA/AMGA certified mountain guide, and one of the most accomplished ski mountaineers in history.',
}

const credentials = [
  { label: 'Certification', value: 'IFMGA / AMGA Certified Mountain Guide' },
  { label: 'World Championships', value: '2× World Extreme Skiing Champion (1996, 1997)' },
  { label: 'Colorado 14ers', value: 'All 54 in a single season — a first in history' },
  { label: 'Ski films', value: '36 Warren Miller & Matchstick Productions appearances' },
  { label: 'Based', value: 'Aspen, Colorado' },
  { label: 'Guiding since', value: 'Early 2000s — Alps, Andes, Himalayas, Antarctica' },
]

const timeline = [
  { year: '1993', event: 'First Warren Miller film appearance. Begins competing on the World Extreme Skiing circuit.' },
  { year: '1996–97', event: 'Wins back-to-back World Extreme Skiing Championships. Establishes myself as one of the world\'s elite big mountain skiers.' },
  { year: '2003', event: 'Earns AMGA certification, later becoming IFMGA certified — the highest international standard for mountain guiding.' },
  { year: '2007', event: 'Completes all 54 Colorado 14ers in a single ski season — a first in history. Still one of the things I\'m most proud of.' },
  { year: '2010s', event: 'Continue filming for Warren Miller and Matchstick Productions while building the guided ski camp program. Antarctica, the Himalayas, remote first descents worldwide.' },
  { year: '2024', event: '31st consecutive Warren Miller film appearance. Running guided ski camps across four continents with the best co-guides in the business.' },
]

// Unique photos per guide — swap with real headshots
const GUIDE_PHOTOS: Record<string, string> = {
  'mike-douglas':     '/images/guides/mike.jpg',
  'ingrid-backstrom': '/images/guides/ingrid.jpg',
  'cody-townsend':    '/images/guides/cody.jpg',
  'elyse-saugstad':   '/images/guides/elyse.jpg',
  'tatsuya-tayagaki': '/images/guides/tatsuya.jpg',
}

export default function AboutPage() {
  const coGuides = guides.filter((g) => g.id !== 'chris-davenport')

  return (
    <>
      {/* Hero — portrait photo of Chris on the right */}
      <section className="relative overflow-hidden bg-navy text-cream pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <p className="text-xs font-medium tracking-widest text-cream/40 uppercase mb-4">Head Guide</p>
              <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight">
                Chris<br /><em>Davenport</em>
              </h1>
              <p className="mt-6 text-cream/70 text-lg leading-relaxed">
                Two-time World Extreme Skiing Champion. IFMGA/AMGA certified mountain guide.
                First to ski all 54 Colorado 14ers in a single season.
              </p>
              <p className="mt-4 text-cream/70 leading-relaxed">
                I&apos;ve spent 30+ years as one of the defining figures in professional skiing —
                pushing standards in big mountain competition, ski mountaineering, and now
                expert-guided ski camps for people who want to ski the world&apos;s finest terrain.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/ski-camps"
                  className="inline-flex items-center rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-navy hover:bg-cream/90 transition-colors">
                  View My Camps
                </Link>
                <a href="https://www.instagram.com/steepskiing/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-cream/30 px-7 py-3.5 text-sm font-medium text-cream hover:bg-cream/10 transition-colors">
                  @steepskiing
                </a>
              </div>
            </AnimateIn>

            {/* Portrait */}
            <AnimateIn delay={0.2} className="relative h-[520px] rounded-3xl overflow-hidden">
              <Image
                src="/images/guides/chris_portrait.avif"
                alt="Chris Davenport — professional skier and mountain guide"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-10">
        <AnimateIn>
          <h2 className="font-serif text-3xl font-medium text-navy mb-10">Credentials</h2>
        </AnimateIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {credentials.map(({ label, value }, i) => (
            <AnimateIn key={label} delay={i * 0.06}>
              <div className="flex gap-6 rounded-xl border border-navy/10 p-5">
                <span className="text-xs font-medium uppercase tracking-wide text-navy/40 w-36 flex-shrink-0 pt-0.5">{label}</span>
                <span className="text-sm text-navy leading-relaxed">{value}</span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream/50 border-y border-navy/10 mt-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <AnimateIn>
            <h2 className="font-serif text-3xl font-medium text-navy mb-12">Career highlights</h2>
          </AnimateIn>
          <TimelineSection items={timeline} />
        </div>
      </section>

      {/* Co-guides */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <AnimateIn className="mb-12">
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-3">The team</p>
          <h2 className="font-serif text-3xl font-medium text-navy">My co-guides</h2>
          <p className="mt-3 text-navy/60 max-w-xl">
            These aren&apos;t instructors I hired for the season. They&apos;re world-class pro skiers
            and certified guides I&apos;ve skied alongside for decades. They&apos;re friends who
            happen to be some of the best in the business.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coGuides.map((guide, i) => (
            <AnimateIn key={guide.id} delay={i * 0.08}>
              <div className="rounded-2xl border border-navy/10 overflow-hidden h-full">
                <div className="relative h-52 bg-navy/10">
                  <Image
                    src={GUIDE_PHOTOS[guide.id] ?? 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=600&q=80'}
                    alt={guide.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-medium text-navy">{guide.name}</h3>
                  <p className="text-xs text-navy/40 mt-0.5 mb-3">{guide.role}</p>
                  <p className="text-sm text-navy/60 leading-relaxed">{guide.bio}</p>
                  {guide.instagram && (
                    <a href={`https://instagram.com/${guide.instagram}`} target="_blank" rel="noopener noreferrer"
                      className="mt-3 inline-flex text-xs text-navy/40 hover:text-navy transition-colors">
                      @{guide.instagram} ↗
                    </a>
                  )}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <p className="text-xs font-medium tracking-widest text-cream/40 uppercase mb-10">From guests</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <blockquote key={t.author} className="space-y-4">
                <p className="font-serif text-xl text-cream/90 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <footer className="text-xs text-cream/40">
                  — {t.author}, {t.trip}{t.year && ` (${t.year})`}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 lg:px-10 py-20 text-center">
        <AnimateIn>
          <h2 className="font-serif text-4xl font-light text-navy">
            Ready to ski with me?
          </h2>
          <p className="mt-4 text-navy/60">
            Portillo 2026 is filling up. Chile, Switzerland, Japan, and Antarctica are open for inquiry.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/ski-camps"
              className="rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-cream hover:bg-navy/90 transition-colors">
              View All Camps
            </Link>
            <Link href="/contact"
              className="rounded-full border border-navy px-7 py-3.5 text-sm font-medium text-navy hover:bg-navy hover:text-cream transition-colors">
              Send an Inquiry
            </Link>
          </div>
        </AnimateIn>
      </section>
    </>
  )
}
