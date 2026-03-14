'use client'

/**
 * Page transition wrapper using Motion (formerly Framer Motion).
 *
 * WHY template.tsx AND NOT layout.tsx:
 * Next.js re-mounts template.tsx on every navigation, which means exit
 * animations actually fire. layout.tsx persists across navigations —
 * the component never unmounts, so AnimatePresence exit variants never trigger.
 *
 * The fade + subtle upward slide gives the site a refined, editorial feel
 * that complements the Playfair Display / photography-forward aesthetic.
 */

import { motion } from 'motion/react'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1], // custom ease — fast out, slow settle
      }}
    >
      {children}
    </motion.div>
  )
}
