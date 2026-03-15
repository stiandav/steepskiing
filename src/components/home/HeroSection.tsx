'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Full-bleed homepage hero. Uses the real Chris Davenport aerial powder shot.
 * Photo is predominantly light grey-blue (steep open face) so all text is
 * dark navy. A cream wash at the bottom adds just enough contrast for the
 * headline without obscuring the vast slope behind it.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    const image = imageRef.current
    const content = contentRef.current
    if (!section || !image || !content) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Subtle parallax — image rises slowly as the user scrolls down
    gsap.to(image, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Content fades and rises on exit
    gsap.to(content, {
      opacity: 0,
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: '45% top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Entrance stagger
    gsap.from(content.querySelectorAll('[data-hero-item]'), {
      opacity: 0,
      y: 22,
      duration: 1.1,
      stagger: 0.13,
      ease: 'power3.out',
      delay: 0.2,
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-end overflow-hidden bg-cream"
    >
      {/* Background — scale-110 gives GSAP room to move without revealing edges */}
      <div ref={imageRef} className="absolute inset-0 scale-125">
        <Image
          src="/images/hero_shot.jpg"
          alt="Chris Davenport skiing steep open terrain from above"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Cream wash at the bottom so dark text reads cleanly over the light slope */}
      <div className="absolute inset-0 bg-gradient-to-t from-cream/70 via-cream/10 to-transparent" />

      {/* Content — dark text against the light background */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 pb-24 md:pb-32"
      >
        <div className="max-w-2xl">
          <p
            data-hero-item
            className="mb-4 text-xs font-medium tracking-widest text-navy/55 uppercase"
          >
            IFMGA / AMGA Certified Mountain Guide · 2× World Extreme Skiing Champion
          </p>

          <h1
            data-hero-item
            className="font-serif text-6xl md:text-8xl font-light text-navy leading-[1.0]"
          >
            Ski the world&apos;s<br />
            <em>best terrain.</em>
          </h1>

          <p
            data-hero-item
            className="mt-6 text-base md:text-lg text-navy/65 leading-relaxed max-w-xl"
          >
            I lead small-group ski camps in the places I love most — Portillo, the Swiss Alps,
            Japan&apos;s Lotte Arai, and Antarctica. Terrain unlike anywhere else.
          </p>

          <div data-hero-item className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/ski-camps"
              className="inline-flex items-center rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-cream hover:bg-navy/85 transition-colors"
            >
              View All Camps
            </Link>
            <Link
              href="/trips/chile-2026"
              className="inline-flex items-center rounded-full border border-navy/40 px-7 py-3.5 text-sm font-medium text-navy hover:bg-navy/8 transition-colors"
            >
              Portillo, Chile 2026 — filling fast
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue — dark since background is light */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3">
        <span className="text-[10px] tracking-widest text-navy/30 uppercase">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-navy/30 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
