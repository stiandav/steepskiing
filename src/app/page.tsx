import { HeroSection } from '@/components/home/HeroSection'
import { TripGrid } from '@/components/home/TripGrid'
import { BioStrip } from '@/components/home/BioStrip'
import { SponsorBar } from '@/components/home/SponsorBar'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { trips } from '@/data/trips'
import { testimonials } from '@/data/testimonials'
import Link from 'next/link'

export default function Home() {
  const sortedTrips = [...trips].sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <>
      {/* Hero — full-bleed, floats behind nav */}
      <HeroSection />

      {/* Trips grid */}
      <section id="camps" className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28">
        <AnimateIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-3">
              2026 &amp; 2027 Seasons
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-navy leading-tight">
              Guided ski camps.
            </h2>
          </div>
          <Link href="/ski-camps" className="text-sm font-medium text-navy/60 hover:text-navy transition-colors">
            View all camps →
          </Link>
        </AnimateIn>
        <TripGrid trips={sortedTrips} />
      </section>

      {/* Bio strip with CountUp stats */}
      <BioStrip />

      {/* Testimonial */}
      {testimonials.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 lg:px-10 py-20 md:py-28 text-center">
          <AnimateIn>
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-8">From the field</p>
            <blockquote className="font-serif text-2xl md:text-3xl font-medium text-navy leading-relaxed">
              &ldquo;{testimonials[0].quote}&rdquo;
            </blockquote>
            <footer className="mt-6 text-sm text-navy/50">
              — {testimonials[0].author}, {testimonials[0].trip}
              {testimonials[0].year && ` (${testimonials[0].year})`}
            </footer>
          </AnimateIn>
        </section>
      )}

      <SponsorBar />
    </>
  )
}
