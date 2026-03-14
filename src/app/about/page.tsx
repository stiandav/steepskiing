import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { guides } from '@/data/guides'
import { testimonials } from '@/data/testimonials'

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
  {
    year: '1993',
    event: 'First Warren Miller film appearance. Begins competing on the World Extreme Skiing circuit.',
  },
  {
    year: '1996–97',
    event: 'Wins back-to-back World Extreme Skiing Championships. Establishes himself as one of the world\'s elite big mountain skiers.',
  },
  {
    year: '2003',
    event: 'Earns AMGA (American Mountain Guides Association) certification, later becoming IFMGA certified — the highest international standard for mountain guiding.',
  },
  {
    year: '2007',
    event: 'Completes all 54 Colorado 14ers in a single ski season — a first in history. The project becomes a landmark in ski mountaineering.',
  },
  {
    year: '2010s',
    event: 'Continues filming for Warren Miller and Matchstick Productions while building the guided ski camp program. Skis Antarctica, the Himalayas, and remote first descents worldwide.',
  },
  {
    year: '2024',
    event: '31st consecutive Warren Miller film appearance. Running guided ski camps across four continents with an all-star lineup of co-guides.',
  },
]

export default function AboutPage() {
  const chris = guides.find((g) => g.id === 'chris-davenport')
  const coGuides = guides.filter((g) => g.id !== 'chris-davenport')

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-medium tracking-widest text-cream/40 uppercase mb-4">
                Head Guide
              </p>
              <h1 className="font-serif text-6xl md:text-7xl font-medium leading-tight">
                Chris<br />Davenport
              </h1>
              <p className="mt-6 text-cream/70 text-lg leading-relaxed">
                Two-time World Extreme Skiing Champion. IFMGA/AMGA certified
                mountain guide. The first person to ski all 54 Colorado 14ers
                in a single season.
              </p>
              <p className="mt-4 text-cream/70 leading-relaxed">
                For over 30 years, Chris has been one of the defining figures
                in professional skiing — pushing standards in big mountain
                competition, ski mountaineering, and now expert-guided ski camps
                for those who want to ski the world&apos;s finest terrain with someone
                who has skied it first.
              </p>
              <Link
                href="/ski-camps"
                className="mt-8 inline-flex items-center rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-navy hover:bg-cream/90 transition-colors"
              >
                View Upcoming Camps
              </Link>
            </div>

            {/* Photo placeholder */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden bg-navy/50">
              <Image
                src="https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&q=80"
                alt="Chris Davenport skiing steep terrain"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <h2 className="font-serif text-3xl font-medium text-navy mb-10">
          Credentials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {credentials.map(({ label, value }) => (
            <div key={label} className="flex gap-6 rounded-xl border border-navy/10 p-5">
              <span className="text-xs font-medium uppercase tracking-wide text-navy/40 w-36 flex-shrink-0 pt-0.5">
                {label}
              </span>
              <span className="text-sm text-navy leading-relaxed">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream/50 border-y border-navy/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <h2 className="font-serif text-3xl font-medium text-navy mb-12">
            Career highlights
          </h2>
          <div className="space-y-0">
            {timeline.map(({ year, event }, i) => (
              <div key={year} className="flex gap-8 pb-10 relative">
                {/* Vertical line */}
                {i < timeline.length - 1 && (
                  <div className="absolute left-[3.25rem] top-6 bottom-0 w-px bg-navy/10" />
                )}
                <div className="font-serif text-sm font-medium text-navy/40 w-20 flex-shrink-0 pt-0.5">
                  {year}
                </div>
                <div className="relative">
                  <div className="absolute -left-[1.85rem] top-1.5 h-2 w-2 rounded-full bg-navy/30" />
                  <p className="text-navy/70 leading-relaxed">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-guides */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="mb-12">
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-3">
            The team
          </p>
          <h2 className="font-serif text-3xl font-medium text-navy">
            World-class co-guides
          </h2>
          <p className="mt-3 text-navy/60 max-w-xl">
            Each camp is co-led by elite ski athletes and certified guides.
            Not coaches hired for the season — collaborators Chris has skied
            alongside for decades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coGuides.map((guide) => (
            <div
              key={guide.id}
              className="rounded-2xl border border-navy/10 overflow-hidden"
            >
              <div className="relative h-48 bg-navy/10">
                <Image
                  src="https://images.unsplash.com/photo-1547201240-67e2f55a3085?w=600&q=80"
                  alt={guide.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-medium text-navy">{guide.name}</h3>
                <p className="text-xs text-navy/40 mt-0.5 mb-3">{guide.role}</p>
                <p className="text-sm text-navy/60 leading-relaxed">{guide.bio}</p>
                {guide.instagram && (
                  <a
                    href={`https://instagram.com/${guide.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex text-xs text-navy/40 hover:text-navy transition-colors"
                  >
                    @{guide.instagram}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <p className="text-xs font-medium tracking-widest text-cream/40 uppercase mb-10">
            From guests
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <blockquote key={t.author} className="space-y-4">
                <p className="font-serif text-lg text-cream/90 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="text-xs text-cream/40">
                  — {t.author}, {t.trip}
                  {t.year && ` (${t.year})`}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 lg:px-10 py-20 text-center">
        <h2 className="font-serif text-3xl font-medium text-navy">
          Ready to ski with Chris?
        </h2>
        <p className="mt-4 text-navy/60">
          Switzerland 2026 has two spots remaining. Chile, Japan, and Antarctica
          are open for inquiry.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/ski-camps"
            className="rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-cream hover:bg-navy/90 transition-colors"
          >
            View All Camps
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-navy px-7 py-3.5 text-sm font-medium text-navy hover:bg-navy hover:text-cream transition-colors"
          >
            Send an Inquiry
          </Link>
        </div>
      </section>
    </>
  )
}
