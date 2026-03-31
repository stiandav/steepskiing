'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { navLinks } from '@/data/nav'

interface NavOverlayProps {
  onClose: () => void
}

export function NavOverlay({ onClose }: NavOverlayProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const photoTiles = [
    {
      src: '/images/photos/antarctica-cliff-drop.jpg',
      alt: 'Chris Davenport jumping off a cliff into Antarctic sea',
    },
    {
      src: '/images/photos/chamonix-powder.jpg',
      alt: 'Chris Davenport charging powder under a star-burst sun in Chamonix',
    },
    {
      src: '/images/photos/above-clouds.jpg',
      alt: 'Bootpacking a steep ridge above the clouds',
    },
  ]

  return (
    <motion.div
      className="fixed inset-0 z-40 flex overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/95 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 flex w-full">
        {/* Left: nav links */}
        <div className="flex flex-1 flex-col justify-center px-10 md:px-20 pt-24 pb-12">
          <motion.ul
            className="space-y-2"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              hidden: {},
            }}
          >
            {navLinks.map((link) => (
              <motion.li
                key={link.href}
                variants={{
                  hidden: { opacity: 0, x: -24 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {link.children ? (
                  <div>
                    <button
                      onClick={() => setExpandedItem(expandedItem === link.href ? null : link.href)}
                      className="flex items-center gap-3 font-serif text-4xl md:text-6xl font-medium text-cream hover:text-cream/70 transition-colors leading-tight"
                    >
                      {link.label}
                      <span
                        className={`text-2xl md:text-3xl text-cream/50 transition-transform duration-200 ${expandedItem === link.href ? 'rotate-180' : ''}`}
                      >
                        ›
                      </span>
                    </button>
                    {expandedItem === link.href && (
                      <ul className="mt-2 ml-4 space-y-1">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block text-xl md:text-2xl font-medium text-cream/60 hover:text-cream transition-colors leading-tight py-0.5"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block font-serif text-4xl md:text-6xl font-medium text-cream hover:text-cream/70 transition-colors leading-tight"
                  >
                    {link.label}
                  </Link>
                )}
              </motion.li>
            ))}
          </motion.ul>

          {/* Bottom CTA */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            <Link
              href="/contact"
              onClick={onClose}
              className="inline-flex items-center rounded-full border border-cream/50 px-7 py-3 text-sm font-medium text-cream hover:bg-cream hover:text-navy transition-colors"
            >
              Book a Camp
            </Link>
            <p className="mt-4 text-sm text-cream/50">
              steepskiing.com ·{' '}
              <a
                href="mailto:chris@chrisdavenport.com"
                className="hover:text-cream/80 transition-colors"
              >
                chris@chrisdavenport.com
              </a>
            </p>
          </motion.div>
        </div>

        {/* Right: photo tiles — hidden on small screens */}
        <motion.div
          className="hidden lg:flex w-72 xl:w-96 flex-col gap-3 p-8 pt-28"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {photoTiles.map((tile, i) => (
            <div
              key={i}
              className="relative flex-1 overflow-hidden rounded-lg"
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 384px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
