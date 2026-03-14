'use client'

import { useState, useEffect } from 'react'
import { useLenis } from 'lenis/react'

/**
 * Returns the current scroll progress as a value between 0 and 1.
 * Used by StickyNav to adjust background opacity as the user scrolls past
 * the hero section.
 *
 * Uses Lenis's scroll callback rather than a raw window scroll listener
 * so the value stays in sync with the smoothed scroll position.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)
  const lenis = useLenis(({ progress: p }) => {
    setProgress(p)
  })

  // Fallback: if Lenis is not yet mounted, read native scroll position
  useEffect(() => {
    if (lenis) return

    function handleScroll() {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? scrolled / total : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lenis])

  return progress
}

/**
 * Returns the raw scroll Y position in pixels, updated via Lenis.
 * Useful for components that need pixel-level precision (e.g. parallax offsets).
 */
export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0)

  useLenis(({ scroll }) => {
    setScrollY(scroll)
  })

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}
