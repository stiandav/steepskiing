'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface CarouselImage {
  src: string
  alt: string
}

interface CampCarouselProps {
  images: CarouselImage[]
  children?: React.ReactNode
}

export function CampCarousel({ images, children }: CampCarouselProps) {
  const [current, setCurrent] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => {
      if (!paused.current) {
        setCurrent((prev) => (prev + 1) % images.length)
      }
    }, 5000)
    return () => clearInterval(id)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <section
      className="relative h-[75vh] min-h-[500px] flex items-end bg-navy overflow-hidden"
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
    >
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent z-10" />

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-cream' : 'w-1.5 bg-cream/40 hover:bg-cream/60'
              }`}
            />
          ))}
        </div>
      )}

      {children && (
        <div className="relative z-20 w-full">{children}</div>
      )}
    </section>
  )
}
