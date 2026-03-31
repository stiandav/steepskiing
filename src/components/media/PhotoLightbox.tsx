'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface LightboxPhoto {
  src: string
  alt: string
  caption?: string
  location?: string
}

interface PhotoLightboxProps {
  photo: LightboxPhoto | null
  onClose: () => void
}

export function PhotoLightbox({ photo, onClose }: PhotoLightboxProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-4xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <button
              onClick={onClose}
              aria-label="Close lightbox"
              className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors text-sm font-medium"
            >
              Close ✕
            </button>

            <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-contain rounded-xl"
                sizes="(min-width: 1024px) 896px, 100vw"
              />
            </div>

            {(photo.caption || photo.location) && (
              <div className="mt-4 px-1">
                {photo.location && (
                  <p className="text-xs font-medium uppercase tracking-widest text-white/40 mb-1">
                    {photo.location}
                  </p>
                )}
                {photo.caption && (
                  <p className="text-sm text-white/70 leading-relaxed">{photo.caption}</p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
