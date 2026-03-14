import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  if (price === 0) return 'Inquire for pricing'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

export function getStatusBadge(status: 'available' | 'nearly-sold-out' | 'sold-out') {
  switch (status) {
    case 'nearly-sold-out':
      return { label: 'Nearly Sold Out', variant: 'urgent' as const }
    case 'sold-out':
      return { label: 'Sold Out', variant: 'sold-out' as const }
    default:
      return { label: 'Spots Available', variant: 'available' as const }
  }
}
