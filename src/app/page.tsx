import { HeroSection } from '@/components/home/HeroSection'
import { TripCard } from '@/components/home/TripCard'
import { SponsorBar } from '@/components/home/SponsorBar'
import { trips } from '@/data/trips'
import { testimonials } from '@/data/testimonials'
import Link from 'next/link'

export default function Home() {
  const sortedTrips = [...trips].sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <>
      <HeroSection />

      {/* Trips grid */}
      <section id="camps" className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-3">
              2026 &amp; 2027 Seasons
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-navy leading-tight">
              Guided ski camps.
            </h2>
          </div>
          <Link
            href="/ski-camps"
            className="text-sm font-medium text-navy/60 hover:text-navy transition-colors"
          >
            View all camps →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {sortedTrips.map((trip) => (
            <TripCard key={trip.slug} trip={trip} />
          ))}
        </div>
      </section>

      {/* Credibility / bio strip */}
      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-medium tracking-widest text-cream/40 uppercase mb-4">
              Your Guide
            </p>
            <h2 className="font-serif text-4xl font-medium leading-tight">
              Chris Davenport
            </h2>
            <p className="mt-4 text-cream/70 leading-relaxed">
              2× World Extreme Skiing Champion. IFMGA/AMGA certified mountain guide.
              First to ski all 54 Colorado 14ers in a single season. Featured in
              30+ Warren Miller and Matchstick Productions films.
            </p>
            <p className="mt-3 text-cream/70 leading-relaxed">
              Based in Aspen, Colorado. Has guided clients in the Alps, Andes, Himalayas,
              and Antarctica for over 20 years.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center text-sm font-medium text-cream/60 hover:text-cream transition-colors"
            >
              Full bio →
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: '30+', label: 'Ski films' },
              { value: '20+', label: 'Years guiding' },
              { value: '54', label: 'Colorado 14ers' },
              { value: '4', label: 'Continents guided' },
            ].map(({ value, label }) => (
              <div key={label} className="border border-cream/10 rounded-2xl p-6">
                <p className="font-serif text-4xl font-medium text-cream">{value}</p>
                <p className="mt-1 text-sm text-cream/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {testimonials.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 lg:px-10 py-20 md:py-28 text-center">
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-8">
            From the field
          </p>
          <blockquote className="font-serif text-2xl md:text-3xl font-medium text-navy leading-relaxed">
            &ldquo;{testimonials[0].quote}&rdquo;
          </blockquote>
          <footer className="mt-6 text-sm text-navy/50">
            — {testimonials[0].author}, {testimonials[0].trip}
            {testimonials[0].year && ` (${testimonials[0].year})`}
          </footer>
        </section>
      )}

      <SponsorBar />
    </>
  )
}
