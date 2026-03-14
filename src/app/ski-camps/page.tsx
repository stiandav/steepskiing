import type { Metadata } from 'next'
import { TripCard } from '@/components/home/TripCard'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { trips } from '@/data/trips'

export const metadata: Metadata = {
  title: 'Ski Camps — Chris Davenport',
  description:
    'Expert-guided ski camps across four of the world\'s greatest ski destinations. Portillo, Switzerland, Japan, and Antarctica.',
}

export default function SkiCampsPage() {
  const sortedTrips = [...trips].sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-28 pb-20">
      <AnimateIn className="mb-16">
        <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-4">
          2026 &amp; 2027 Seasons
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-light text-navy leading-tight max-w-2xl">
          The camps I&apos;ve built my career around.
        </h1>
        <p className="mt-6 text-navy/60 leading-relaxed max-w-xl text-lg">
          Every destination on this list is somewhere I&apos;ve spent years — sometimes decades —
          understanding the terrain, the snow, and the best way to experience it safely.
          These aren&apos;t package tours. They&apos;re expeditions I put my name on.
        </p>
      </AnimateIn>

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
            body: 'Every camp is co-led by IFMGA/AMGA certified guides with decades of experience on technical mountain terrain. I hand-pick every co-guide personally.',
          },
          {
            title: 'Group sizes vary by camp',
            body: "Portillo runs 20–30 guests to make the most of that iconic terrain. Other destinations like Antarctica and Japan are much smaller. Check each trip for details.",
          },
          {
            title: 'DM or email me directly',
            body: "I don't do online checkouts. Reach out via Instagram (@steepskiing) or email — a quick conversation makes sure the camp is the right fit before you commit.",
          },
        ].map(({ title, body }) => (
          <AnimateIn key={title}>
            <h3 className="font-serif text-xl font-medium text-navy">{title}</h3>
            <p className="mt-2 text-sm text-navy/60 leading-relaxed">{body}</p>
          </AnimateIn>
        ))}
      </div>
    </div>
  )
}
