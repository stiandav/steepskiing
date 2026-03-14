import type { Metadata } from 'next'
import Image from 'next/image'
import { cormorant, inter } from '@/lib/fonts'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { StickyNav } from '@/components/layout/StickyNav'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chris Davenport — Ski Camps',
  description: 'Expert-guided ski camps led by 2x World Extreme Skiing Champion Chris Davenport. Portillo, Switzerland, Japan, Antarctica.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-cream text-navy font-sans antialiased">
        <LenisProvider>
          {/* Fixed mountain background — subtle at 15% opacity so text stays readable */}
          <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2400&q=60"
              alt=""
              fill
              priority
              className="object-cover object-center opacity-[0.07]"
              sizes="100vw"
            />
          </div>

          <StickyNav />
          {/* No pt-20 — hero pages run under the nav, interior pages manage their own top spacing */}
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
