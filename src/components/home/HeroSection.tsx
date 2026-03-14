'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Full-bleed homepage hero with GSAP parallax on the background image.
 *
 * The image scrolls at 40% of the page scroll speed, creating a depth
 * effect that keeps the hero feeling dynamic as the user moves down.
 *
 * Headline and credential line animate in on mount with a staggered fade.
 *
 * Placeholder ski photo from Unsplash — swap `src` with Chris's real hero
 * asset when available.
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

    // Parallax: image drifts upward at 40% scroll rate
    if (!prefersReduced) {
      gsap.to(image, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Content fades out slightly faster as user scrolls
      gsap.to(content, {
        opacity: 0,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '40% top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Entrance: staggered reveal of headline children
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from(content.querySelectorAll('[data-hero-item]'), {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-end overflow-hidden bg-navy"
    >
      {/* Background image — wrapped in div so GSAP only moves the image, not text */}
      <div ref={imageRef} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1551524164-687a55dd1126?w=1800&q=85"
          alt="Chris Davenport skiing steep terrain"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 pb-20 md:pb-28"
      >
        <div className="max-w-2xl">
          <p
            data-hero-item
            className="mb-4 text-xs font-medium tracking-widest text-cream/60 uppercase"
          >
            IFMGA / AMGA Certified Mountain Guide · 2× World Extreme Skiing Champion
          </p>

          <h1
            data-hero-item
            className="font-serif text-5xl md:text-7xl font-medium text-cream leading-[1.05]"
          >
            Ski the world&apos;s<br />best terrain.
          </h1>

          <p
            data-hero-item
            className="mt-6 text-base md:text-lg text-cream/70 leading-relaxed max-w-xl"
          >
            Expert-guided ski camps led by Chris Davenport — Switzerland, Chile,
            Japan, and Antarctica. Small groups. World-class co-guides. Terrain
            you won&apos;t find on your own.
          </p>

          <div data-hero-item className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/ski-camps"
              className="inline-flex items-center rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-navy hover:bg-cream/90 transition-colors"
            >
              View All Camps
            </Link>
            <Link
              href="/trips/switzerland-2026"
              className="inline-flex items-center rounded-full border border-cream/40 px-7 py-3.5 text-sm font-medium text-cream hover:bg-cream/10 transition-colors"
            >
              Switzerland 2026 — 2 spots left
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue with pulse animation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3">
        <span className="text-[10px] tracking-widest text-cream/30 uppercase">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-cream/30 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
