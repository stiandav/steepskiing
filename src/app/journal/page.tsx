import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Journal — Chris Davenport',
  description: 'Field notes, trip reports, and dispatches from the mountains.',
}

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-4">
          Field notes
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-medium text-navy leading-tight">
          Journal
        </h1>
        <p className="mt-6 text-navy/60 text-lg leading-relaxed">
          Trip reports, conditions, and occasional dispatches from the mountains.
          Coming soon.
        </p>
        <p className="mt-4 text-navy/50 leading-relaxed">
          In the meantime, subscribe to the newsletter for early access to camp
          openings and field notes delivered directly.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/"
            className="rounded-full border border-navy px-6 py-3 text-sm font-medium text-navy hover:bg-navy hover:text-cream transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/ski-camps"
            className="rounded-full bg-navy px-6 py-3 text-sm font-medium text-cream hover:bg-navy/90 transition-colors"
          >
            View upcoming camps
          </Link>
        </div>
      </div>
    </div>
  )
}
