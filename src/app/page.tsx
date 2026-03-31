import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { TripGrid } from '@/components/home/TripGrid'
import { BioStrip } from '@/components/home/BioStrip'
import { SponsorBar } from '@/components/home/SponsorBar'
import { AnimateIn } from '@/components/ui/AnimateIn'
import NewsletterForm from '@/components/home/NewsletterForm'
import { trips } from '@/data/trips'
import { testimonials } from '@/data/testimonials'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Chris Davenport — Steep Skiing & Guided Ski Camps',
  description:
    '2× World Extreme Skiing Champion. Small-group ski camps in Portillo, Switzerland, Japan, and Antarctica.',
  openGraph: {
    title: 'Chris Davenport — Steep Skiing & Guided Ski Camps',
    description:
      'Small-group ski camps led by a 2× World Extreme Skiing Champion. Portillo, the Swiss Alps, Japan, and Antarctica.',
    url: 'https://steepskiing.com',
    siteName: 'Steep Skiing',
    images: [
      {
        url: 'https://steepskiing.com/images/hero_shot.jpg',
        width: 1200,
        height: 630,
        alt: 'Chris Davenport skiing steep open terrain from above',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chris Davenport — Steep Skiing & Guided Ski Camps',
    description:
      'Small-group ski camps led by a 2× World Extreme Skiing Champion. Portillo, the Swiss Alps, Japan, and Antarctica.',
    images: ['https://steepskiing.com/images/hero_shot.jpg'],
  },
}

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
      <NewsletterForm />
    </>
  )
}
