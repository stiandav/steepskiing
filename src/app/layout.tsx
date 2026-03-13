import type { Metadata } from 'next'
import { playfair, inter } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chris Davenport — Ski Camps',
  description: 'Expert-guided ski camps led by 2x World Extreme Skiing Champion Chris Davenport. Switzerland, Chile, Japan, Antarctica.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-cream text-navy font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
