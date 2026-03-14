import type { Metadata } from 'next'
import { TripCard } from '@/components/home/TripCard'
import { trips } from '@/data/trips'

export const metadata: Metadata = {
  title: 'Ski Camps — Chris Davenport',
  description:
    'Expert-guided ski camps led by Chris Davenport and world-class co-guides. Switzerland, Chile, Japan, and Antarctica.',
}

export default function SkiCampsPage() {
  const sortedTrips = [...trips].sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-4">
          2026 &amp; 2027 Seasons
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-medium text-navy leading-tight max-w-2xl">
          Ski the world&apos;s most remarkable terrain.
        </h1>
        <p className="mt-6 text-navy/60 leading-relaxed max-w-xl">
          Small groups. World-class co-guides. Terrain that demands an expert eye to
          navigate safely. Each camp is personally led by Chris Davenport.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {sortedTrips.map((trip) => (
          <TripCard key={trip.slug} trip={trip} />
        ))}
      </div>

      {/* What to expect */}
      <div className="mt-24 border-t border-navy/10 pt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            title: 'Expert Guiding',
            body: 'Every camp is co-led by IFMGA/AMGA certified guides with decades of experience on technical mountain terrain.',
          },
          {
            title: 'Small Groups',
            body: 'Maximum 8–10 guests per camp. You get real attention, real coaching, and real access to terrain tailored to your level.',
          },
          {
            title: 'Email Inquiry Only',
            body: "We don't do online checkouts. A quick email exchange ensures the camp is the right fit before you commit.",
          },
        ].map(({ title, body }) => (
          <div key={title}>
            <h3 className="font-serif text-lg font-medium text-navy">{title}</h3>
            <p className="mt-2 text-sm text-navy/60 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
