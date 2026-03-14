import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { trips } from '@/data/trips'
import { guides } from '@/data/guides'
import { Badge } from '@/components/ui/Badge'
import { InquiryForm } from '@/components/contact/InquiryForm'
import { formatPrice, getStatusBadge } from '@/lib/utils'

// Placeholder images per destination
const PLACEHOLDER_IMAGES: Record<string, string> = {
  'switzerland-2026':
    'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=1600&q=85',
  'chile-2026':
    'https://images.unsplash.com/photo-1547201240-67e2f55a3085?w=1600&q=85',
  'japan-2027':
    'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1600&q=85',
  'antarctica-2027':
    'https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=1600&q=85',
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const trip = trips.find((t) => t.slug === slug)
  if (!trip) return {}
  return {
    title: `${trip.title} — Chris Davenport Ski Camps`,
    description: trip.tagline,
  }
}

export default async function TripPage({ params }: Props) {
  const { slug } = await params
  const trip = trips.find((t) => t.slug === slug)
  if (!trip) notFound()

  const tripGuides = trip.guideIds
    .map((id) => guides.find((g) => g.id === id))
    .filter(Boolean)

  const { label: statusLabel, variant: statusVariant } = getStatusBadge(trip.status)
  const heroSrc = PLACEHOLDER_IMAGES[trip.slug] ?? trip.heroImage

  return (
    <>
      {/* Hero */}
      <section className="relative h-[75vh] min-h-[500px] flex items-end bg-navy overflow-hidden">
        <Image
          src={heroSrc}
          alt={`${trip.title} — ${trip.destination}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 pb-14">
          <Badge variant={statusVariant} className="mb-4">
            {statusLabel}
          </Badge>
          <h1 className="font-serif text-5xl md:text-7xl font-medium text-cream leading-tight">
            {trip.title}
          </h1>
          <p className="mt-2 text-xl text-cream/70">{trip.destination}</p>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left: details */}
          <div className="lg:col-span-2 space-y-14">

            {/* Quick stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Dates', value: trip.dates.label },
                { label: 'Duration', value: `${trip.duration} ski days` },
                { label: 'Price', value: formatPrice(trip.price) },
                {
                  label: 'Group size',
                  value: trip.spotsRemaining
                    ? `${trip.spotsRemaining} of ${trip.spotsTotal} spots left`
                    : `Max ${trip.spotsTotal} guests`,
                },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl border border-navy/10 p-4">
                  <p className="text-xs text-navy/40 uppercase tracking-wide">{label}</p>
                  <p className="mt-1 text-sm font-medium text-navy">{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="font-serif text-2xl font-medium text-navy mb-4">
                About this camp
              </h2>
              <p className="text-navy/70 leading-relaxed">{trip.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="font-serif text-2xl font-medium text-navy mb-4">
                Highlights
              </h2>
              <ul className="space-y-3">
                {trip.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-navy/70">
                    <span className="mt-0.5 text-navy/30">—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Included / Not included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-lg font-medium text-navy mb-3">
                  Included
                </h3>
                <ul className="space-y-2">
                  {trip.included.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-navy/70">
                      <span className="text-emerald-600 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-navy mb-3">
                  Not included
                </h3>
                <ul className="space-y-2">
                  {trip.notIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-navy/70">
                      <span className="text-navy/30 mt-0.5">×</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Logistics */}
            {trip.logistics && (
              <div>
                <h2 className="font-serif text-2xl font-medium text-navy mb-4">
                  Getting there &amp; accommodation
                </h2>
                {trip.logistics.travel && (
                  <div className="mb-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-navy/40 mb-1">
                      Travel
                    </p>
                    <p className="text-navy/70">{trip.logistics.travel}</p>
                  </div>
                )}
                {trip.logistics.accommodation && (
                  <div className="mb-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-navy/40 mb-1">
                      Accommodation
                    </p>
                    <p className="text-navy/70">{trip.logistics.accommodation}</p>
                  </div>
                )}
                {trip.logistics.hotelOptions && (
                  <div className="mt-4 space-y-3">
                    {trip.logistics.hotelOptions.map((hotel) => (
                      <div
                        key={hotel.name}
                        className="rounded-xl border border-navy/10 p-4"
                      >
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-navy text-sm">{hotel.name}</p>
                          <span className="text-xs text-navy/40">{hotel.tier}</span>
                        </div>
                        {hotel.description && (
                          <p className="mt-1 text-sm text-navy/60">{hotel.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Guides */}
            {tripGuides.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-medium text-navy mb-6">
                  Your guides
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tripGuides.map((guide) => {
                    if (!guide) return null
                    return (
                      <div key={guide.id} className="flex gap-4 rounded-xl border border-navy/10 p-5">
                        <div className="relative h-16 w-16 flex-shrink-0 rounded-full overflow-hidden bg-navy/10">
                          {guide.image && (
                            <Image
                              src={guide.image}
                              alt={guide.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-navy">{guide.name}</p>
                          <p className="text-xs text-navy/50 mb-2">{guide.role}</p>
                          <p className="text-sm text-navy/60 leading-relaxed line-clamp-3">
                            {guide.bio}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: sticky inquiry form */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-navy/10 bg-white p-8 shadow-sm">
              {trip.status === 'sold-out' ? (
                <div className="text-center py-6">
                  <p className="font-serif text-lg text-navy">This camp is sold out.</p>
                  <p className="mt-2 text-sm text-navy/60">
                    Inquire to join the waitlist or ask about future dates.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex rounded-full bg-navy px-6 py-3 text-sm text-cream hover:bg-navy/90 transition-colors"
                  >
                    Join Waitlist
                  </Link>
                </div>
              ) : (
                <InquiryForm defaultTrip={trip.slug} compact />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-navy/10 bg-cream/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-navy/60 text-sm">
            Questions? Email{' '}
            <a href="mailto:chris@steepskiing.com" className="text-navy hover:underline">
              chris@steepskiing.com
            </a>
          </p>
          <Link
            href="/ski-camps"
            className="text-sm font-medium text-navy/60 hover:text-navy transition-colors"
          >
            ← View all camps
          </Link>
        </div>
      </div>
    </>
  )
}
