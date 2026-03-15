'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { navLinks } from '@/data/nav'
import { NavOverlay } from './NavOverlay'
import { CdLogo } from '@/components/ui/CdLogo'

export function StickyNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const progress = useScrollProgress()
  const scrolled = progress > 0.05
  // When at top of page, render as light (cream) text over the hero image.
  // Once the user scrolls, switch to the frosted cream backdrop + navy text.
  const overHero = !scrolled

  return (
    <>
      {/* Gradient scrim — visible only when over hero, ensures cream text
          reads on both light-snow and dark-navy hero backgrounds */}
      <div
        className="fixed top-0 left-0 right-0 z-40 h-32 pointer-events-none transition-opacity duration-300"
        style={{ opacity: overHero ? 1 : 0,
                 background: 'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0) 100%)' }}
      />

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 h-20"
        animate={{
          backgroundColor: scrolled ? 'rgba(245, 240, 235, 0.94)' : 'rgba(245, 240, 235, 0)',
          backdropFilter: scrolled ? 'blur(14px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" aria-label="Chris Davenport — home" onClick={() => setMenuOpen(false)}
            className="transition-opacity hover:opacity-70">
            <CdLogo variant={overHero ? 'light' : 'dark'} />
          </Link>

          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    overHero
                      ? 'text-cream/90 hover:text-cream'
                      : 'text-navy/70 hover:text-navy'
                  }`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link href="/contact"
              className={`hidden md:inline-flex items-center rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                overHero
                  ? 'border-cream/70 text-cream hover:bg-cream hover:text-navy'
                  : 'border-navy text-navy hover:bg-navy hover:text-cream'
              }`}>
              Inquire
            </Link>
            {/* Mobile hamburger */}
            <button aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}
              onClick={() => setMenuOpen((p) => !p)}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors md:hidden ${
                overHero ? 'hover:bg-white/20' : 'hover:bg-navy/10'
              }`}>
              <HamburgerIcon open={menuOpen} light={overHero} />
            </button>
            {/* Desktop hamburger */}
            <button aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}
              onClick={() => setMenuOpen((p) => !p)}
              className={`hidden md:flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                overHero ? 'hover:bg-white/20' : 'hover:bg-navy/10'
              }`}>
              <HamburgerIcon open={menuOpen} light={overHero} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && <NavOverlay onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function HamburgerIcon({ open, light }: { open: boolean; light: boolean }) {
  const bar = light ? 'bg-cream' : 'bg-navy'
  return (
    <span className="relative block h-4 w-5">
      <span className={`absolute left-0 h-0.5 w-full ${bar} transition-all duration-200 ${open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
      <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 ${bar} transition-all duration-200 ${open ? 'w-0 opacity-0' : 'w-full opacity-100'}`} />
      <span className={`absolute left-0 h-0.5 w-full ${bar} transition-all duration-200 ${open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
    </span>
  )
}
