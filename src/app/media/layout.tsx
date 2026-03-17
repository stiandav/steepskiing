import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media — Chris Davenport',
  description:
    'Films, photography, books, and press. Thirty years of ski mountaineering documented — from Snowriders II to Antarctica.',
  openGraph: {
    title: 'Media — Chris Davenport',
    description:
      'Films, photography, books, and press. Thirty years of ski mountaineering documented.',
    url: 'https://steepskiing.com/media',
    siteName: 'Steep Skiing',
    images: [
      {
        url: 'https://steepskiing.com/images/photos/chamonix-powder.jpg',
        width: 1200,
        height: 630,
        alt: 'Chris Davenport charging powder in Chamonix',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media — Chris Davenport',
    description:
      'Films, photography, books, and press. Thirty years of ski mountaineering documented.',
    images: ['https://steepskiing.com/images/photos/chamonix-powder.jpg'],
  },
}

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
