import Link from 'next/link'
import Image from 'next/image'
import type { TripData } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { formatPrice, getStatusBadge } from '@/lib/utils'

// Placeholder images per destination (swap with real assets)
const PLACEHOLDER_IMAGES: Record<string, string> = {
  'switzerland-2026':
    'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&q=80',
  'chile-2026':
    'https://images.unsplash.com/photo-1547201240-67e2f55a3085?w=800&q=80',
  'japan-2027':
    'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80',
  'antarctica-2027':
    'https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=800&q=80',
}

interface TripCardProps {
  trip: TripData
}

export function TripCard({ trip }: TripCardProps) {
  const { label: statusLabel, variant: statusVariant } = getStatusBadge(trip.status)
  const imgSrc = PLACEHOLDER_IMAGES[trip.slug] ?? trip.heroImage

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imgSrc}
          alt={`${trip.title} — ${trip.destination}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

        {/* Dates badge */}
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-navy">
            {trip.dates.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2">
          <Badge variant={statusVariant}>{statusLabel}</Badge>
        </div>

        <h3 className="font-serif text-xl font-medium text-navy leading-tight">
          {trip.title}
        </h3>
        <p className="mt-1 text-sm text-navy/60">{trip.destination}</p>

        <p className="mt-3 text-sm text-navy/70 leading-relaxed line-clamp-2">
          {trip.tagline}
        </p>

        <div className="mt-auto pt-5 flex items-center justify-between border-t border-navy/10">
          <span className="text-sm font-medium text-navy">
            {formatPrice(trip.price)}
          </span>
          <span className="text-xs font-medium text-navy/50 group-hover:text-navy transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  )
}
