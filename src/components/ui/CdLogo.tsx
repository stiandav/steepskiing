import { cn } from '@/lib/utils'

interface CdLogoProps {
  className?: string
  /** 'dark' = navy on cream (default), 'light' = cream on navy */
  variant?: 'dark' | 'light'
}

/**
 * Chris Davenport wordmark logo.
 * Mountain terrain line above the name — minimal, editorial.
 * Use variant="light" on dark backgrounds.
 */
export function CdLogo({ className, variant = 'dark' }: CdLogoProps) {
  const color = variant === 'light' ? 'text-cream' : 'text-navy'

  return (
    <div className={cn('flex flex-col items-start gap-0.5', color, className)}>
      {/* Mountain terrain line */}
      <svg
        viewBox="0 0 88 16"
        className="w-20 h-3.5"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="0,14 14,5 26,11 40,1 54,11 66,6 88,14" />
      </svg>

      {/* Wordmark */}
      <span className="font-serif text-[11px] font-semibold tracking-[0.22em] leading-none uppercase">
        Chris Davenport
      </span>
    </div>
  )
}
