'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { navLinks } from '@/data/nav'
import { NavOverlay } from './NavOverlay'

/**
 * StickyNav — fixed top navbar.
 *
 * Transparent over the hero; gains a cream background (with blur) once the
 * user scrolls past 5% of the page. Uses useScrollProgress (backed by Lenis)
 * rather than a raw window listener so the opacity stays smooth.
 *
 * Hamburger ↔ close icon toggles NavOverlay full-screen menu.
 */
export function StickyNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const progress = useScrollProgress()

  // Start fading in the background after the first 5% of scroll
  const scrolled = progress > 0.05

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 h-20"
        animate={{
          backgroundColor: scrolled
            ? 'rgba(245, 240, 235, 0.92)' // cream with opacity
            : 'rgba(245, 240, 235, 0)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-serif text-lg font-semibold tracking-wide text-navy hover:opacity-70 transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            Chris Davenport
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium tracking-wide text-navy/80 hover:text-navy transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center rounded-full border border-navy px-5 py-2 text-sm font-medium text-navy hover:bg-navy hover:text-cream transition-colors"
            >
              Book a Camp
            </Link>

            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-navy/10 transition-colors md:hidden"
            >
              <HamburgerIcon open={menuOpen} />
            </button>

            {/* Mobile-only hamburger (always visible, desktop hidden) */}
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="hidden md:flex relative h-9 w-9 items-center justify-center rounded-full hover:bg-navy/10 transition-colors ml-2"
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <NavOverlay onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5">
      <span
        className={`absolute left-0 h-0.5 w-full bg-navy transition-all duration-200 ${
          open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-navy transition-all duration-200 ${
          open ? 'w-0 opacity-0' : 'w-full opacity-100'
        }`}
      />
      <span
        className={`absolute left-0 h-0.5 w-full bg-navy transition-all duration-200 ${
          open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
        }`}
      />
    </span>
  )
}
