import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'urgent' | 'available' | 'sold-out'
  className?: string
}

const variantClasses = {
  default: 'bg-navy/10 text-navy',
  urgent: 'bg-red-100 text-red-700',
  available: 'bg-emerald-100 text-emerald-700',
  'sold-out': 'bg-gray-100 text-gray-500',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium tracking-wide',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
