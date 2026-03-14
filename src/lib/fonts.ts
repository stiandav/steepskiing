import { Cormorant_Garamond, Inter } from 'next/font/google'

/**
 * Cormorant Garamond — elegant, personal serif with beautiful italic.
 * More expressive than Playfair, closer to the editorial feel of sites
 * like codytownsend.com. Used for all headings and display text.
 */
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

/**
 * Inter — clean, legible sans for body copy, labels, and UI text.
 */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// Back-compat alias (layout.tsx imports as `playfair`)
export const playfair = cormorant
