// src/types/index.ts

export interface TripData {
  slug: string
  title: string                    // e.g. "Europe's Best Secret"
  subtitle: string                 // e.g. "Engelberg, Switzerland"
  tagline: string                  // one-line hook
  dates: {
    start: string                  // ISO 8601: "2026-03-14"
    end: string
    label: string                  // Human: "March 14–21, 2026"
  }
  price: number                    // USD
  depositAmount: number
  currency: 'USD'
  spotsTotal: number
  spotsRemaining?: number
  urgencyLabel?: string            // "Nearly sold out — Next departure March 14"
  heroImage: string                // path under /public/
  destination: string              // "Engelberg, Switzerland"
  country: string                  // "Switzerland"
  verticalFeet?: number
  duration: number                 // skiing days
  guideIds: string[]               // references GuideData.id
  description: string              // multi-sentence trip description
  highlights: string[]
  included: string[]
  notIncluded: string[]
  logistics?: {
    travel?: string
    accommodation?: string
    hotelOptions?: Array<{ name: string; tier: string; description?: string }>
  }
  inquiryEmails: string[]
  bookingContacts?: Array<{ name: string; email: string; role?: string }>
  status: 'available' | 'nearly-sold-out' | 'sold-out'
  sortOrder: number               // chronological sort (1 = earliest)
}

export interface SponsorData {
  id: string
  name: string
  logo: string                    // path under /public/images/sponsors/
  url: string
  category:
    | 'skis'
    | 'apparel'
    | 'boots'
    | 'bindings'
    | 'resort'
    | 'wax'
    | 'safety'
    | 'advocacy'
    | 'performance'
    | 'ski-care'
  description?: string            // optional gear context for Gear page
}

export interface GuideData {
  id: string
  name: string
  role: string                    // "Co-guide" | "Head Guide" | "Local Guide"
  bio: string                     // 2–4 sentences
  image: string                   // path under /public/images/guides/
  instagram?: string              // handle without @
  tripIds?: string[]              // which trips this guide appears on
}

export interface FilmData {
  title: string
  year: number
  production: 'Warren Miller Entertainment' | 'Matchstick Productions' | 'Other'
  url?: string
  decade: '1990s' | '2000s' | '2010s' | '2020s'
}

export interface TestimonialData {
  quote: string
  author: string
  trip: string                    // display name of trip
  year?: number
}

export interface NavLink {
  label: string
  href: string
  external?: boolean
}
