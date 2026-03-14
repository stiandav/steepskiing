'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Full-bleed homepage hero — extends behind the fixed nav (no top margin).
 * GSAP parallax on the background image (yPercent -20).
 * Headline children stagger in on load.
 *
 * Portillo Chile is the featured camp. Swap photo with real Chris shot when available.
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

    if (!prefersReduced) {
      gsap.to(image, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      })

      gsap.to(content, {
        opacity: 0,
        y: -40,
        ease: 'none',
        scrollTrigger: { trigger: section, start: '40% top', end: 'bottom top', scrub: true },
      })

      gsap.from(content.querySelectorAll('[data-hero-item]'), {
        opacity: 0,
        y: 28,
        duration: 1,
        stagger: 0.14,
        ease: 'power3.out',
        delay: 0.15,
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-end overflow-hidden bg-navy">
      {/* Background — scale-110 gives GSAP room to move */}
      <div ref={imageRef} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1565992441121-4367776cd009?w=1800&q=85"
          alt="Chris Davenport skiing steep deep powder"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Heavy bottom gradient so text always pops */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-navy/5" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 pb-24 md:pb-32">
        <div className="max-w-2xl">
          <p data-hero-item className="mb-4 text-xs font-medium tracking-widest text-cream/55 uppercase">
            IFMGA / AMGA Certified Mountain Guide · 2× World Extreme Skiing Champion
          </p>

          <h1 data-hero-item className="font-serif text-6xl md:text-8xl font-light text-cream leading-[1.0]">
            Ski the world&apos;s<br />
            <em>best terrain.</em>
          </h1>

          <p data-hero-item className="mt-6 text-base md:text-lg text-cream/70 leading-relaxed max-w-xl">
            I lead small-group ski camps in the places I love most — Portillo, the Swiss Alps,
            Japan&apos;s Lotte Arai, and Antarctica. Terrain you won&apos;t find on your own.
          </p>

          <div data-hero-item className="mt-8 flex flex-wrap gap-4">
            <Link href="/ski-camps"
              className="inline-flex items-center rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-navy hover:bg-cream/90 transition-colors">
              View All Camps
            </Link>
            <Link href="/trips/chile-2026"
              className="inline-flex items-center rounded-full border border-cream/40 px-7 py-3.5 text-sm font-medium text-cream hover:bg-cream/10 transition-colors">
              Portillo, Chile 2026 — filling fast
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3">
        <span className="text-[10px] tracking-widest text-cream/30 uppercase">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-cream/30 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
