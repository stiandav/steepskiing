'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { navLinks } from '@/data/nav'

interface NavOverlayProps {
  onClose: () => void
}

/**
 * NavOverlay — full-screen navigation menu.
 *
 * Split-screen layout:
 * - Left: staggered nav links + contact CTA
 * - Right: 3 editorial ski photography tiles (placeholder images,
 *   swap with real assets via the heroImage paths once available)
 *
 * Uses Motion for entry/exit animations. The parent (StickyNav) wraps
 * this in AnimatePresence so the exit animation fires on close.
 */
export function NavOverlay({ onClose }: NavOverlayProps) {
  const photoTiles = [
    {
      src: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=600&q=80',
      alt: 'Steep ski descent in the Alps',
    },
    {
      src: 'https://images.unsplash.com/photo-1547201240-67e2f55a3085?w=600&q=80',
      alt: 'Powder skiing in deep snow',
    },
    {
      src: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&q=80',
      alt: 'Mountain guide leading skiers on a ridge',
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
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block font-serif text-4xl md:text-6xl font-medium text-cream hover:text-cream/70 transition-colors leading-tight"
                >
                  {link.label}
                </Link>
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
                href="mailto:info@steepskiing.com"
                className="hover:text-cream/80 transition-colors"
              >
                info@steepskiing.com
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
