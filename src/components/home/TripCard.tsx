import Link from 'next/link'
import Image from 'next/image'
import type { TripData } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { formatPrice, getStatusBadge } from '@/lib/utils'

// Real destination photos — swap with Chris's personal shots when available
const DESTINATION_IMAGES: Record<string, string> = {
  'switzerland-2026':
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
  'chile-2026':
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
  'japan-2027':
    'https://images.unsplash.com/photo-1542332213-31f87348057f?w=800&q=80',
  'antarctica-2027':
    'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&q=80',
}

interface TripCardProps {
  trip: TripData
}

export function TripCard({ trip }: TripCardProps) {
  const { label: statusLabel, variant: statusVariant } = getStatusBadge(trip.status)
  const imgSrc = DESTINATION_IMAGES[trip.slug] ?? trip.heroImage

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imgSrc}
          alt={`${trip.title} — ${trip.destination}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-navy">
            {trip.dates.label}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2">
          <Badge variant={statusVariant}>{statusLabel}</Badge>
        </div>
        <h3 className="font-serif text-xl font-medium text-navy leading-tight">{trip.title}</h3>
        <p className="mt-1 text-sm text-navy/60">{trip.destination}</p>
        <p className="mt-3 text-sm text-navy/70 leading-relaxed line-clamp-2">{trip.tagline}</p>
        <div className="mt-auto pt-5 flex items-center justify-between border-t border-navy/10">
          <span className="text-sm font-medium text-navy">{formatPrice(trip.price)}</span>
          <span className="text-xs font-medium text-navy/50 group-hover:text-navy transition-colors">View Details →</span>
        </div>
      </div>
    </Link>
  )
}
