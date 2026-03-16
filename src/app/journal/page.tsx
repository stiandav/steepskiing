import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'

export const metadata: Metadata = {
  title: 'Journal — Chris Davenport',
  description:
    'Field notes, trip dispatches, and things worth reading. Subscribe for occasional updates from the mountains.',
}

const POSTS = [
  {
    href: '#',
    image: '/images/portillo.jpg',
    imageAlt: 'Skier descending steep mountain face',
    date: 'March 10, 2026',
    category: 'Trip Report',
    title: 'Portillo is as good as it gets — here\'s why',
    excerpt:
      'I\'ve been skiing Portillo since 2004 and it keeps pulling me back. The terrain, the altitude, the people — and a hotel that hasn\'t changed in fifty years.',
  },
  {
    href: '#',
    image: '/images/ant.jpg',
    imageAlt: 'Skis laid out on snow',
    date: 'February 28, 2026',
    category: 'Gear',
    title: 'The skis I\'m bringing to Antarctica this year',
    excerpt:
      'Antarctica is not a place to experiment. I\'ve made equipment choices I feel confident in — and I\'ll tell you exactly what they are and why.',
  },
  {
    href: '#',
    image: 'https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=800&q=80',
    imageAlt: 'Lofoten Islands mountain ridgeline',
    date: 'January 15, 2026',
    category: 'Expedition',
    title: 'What a week in the Lofoten Islands taught me about avalanche risk',
    excerpt:
      'The Lofotens are one of the most beautiful places I\'ve ever skied. They\'re also genuinely dangerous. Here\'s what changed in how I think about consequence.',
  },
]

const READING = [
  {
    title: 'The history of heli-skiing in Canada',
    source: 'Outside Online',
    url: '#',
    note: 'The story of how heli-skiing went from radical to mainstream. Worth understanding where it all started — Bell and the Bugaboos changed everything.',
  },
  {
    title: 'How climate change is rewriting the ski season',
    source: 'The Guardian',
    url: '#',
    note: 'A serious piece, and a necessary one. The mountains I\'ve skied my whole life are changing. Ignoring that isn\'t an option.',
  },
  {
    title: 'Inside the avalanche forecasting system that saves lives',
    source: 'Wired',
    url: '#',
    note: 'The science behind avalanche forecasting is more sophisticated than most skiers realize. This piece made me appreciate the people doing that work.',
  },
  {
    title: 'Antarctica\'s mountains are waiting. Very few have skied them.',
    source: 'National Geographic',
    url: '#',
    note: 'This is the frontier. I\'ve been thinking about the Antarctic range for years. This piece captures why it matters beyond just the skiing.',
  },
]

const FIELD_NOTES = [
  {
    date: 'March 8',
    year: '2026',
    note: 'Portillo is confirmed for July 2026. Four spots left. If you\'ve been on the fence, now\'s the time. Genuinely cannot oversell this place.',
  },
  {
    date: 'February 20',
    year: '2026',
    note: 'Antarctica planning is in full swing. Logistics for these trips take years. The terrain down there has been living in my head for a long time.',
  },
  {
    date: 'February 3',
    year: '2026',
    note: 'Japan powder season is winding down, but what a run. Hokkaido delivered. Already talking to the team about 2027 dates.',
  },
  {
    date: 'January 12',
    year: '2026',
    note: 'Engelberg is in good shape. The north-facing shots above the Titlis are holding cold snow all the way to the valley. Rare for this time of year.',
  },
  {
    date: 'December 28',
    year: '2025',
    note: 'Finished the year in Colorado. The 14ers are still there, still holding me accountable. Best thing I ever did for my skiing.',
  },
]

export default function JournalPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-28 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <AnimateIn>
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">
              Field notes
            </p>
            <h1 className="font-serif text-6xl md:text-7xl font-medium text-navy leading-none tracking-tight">
              The Journal.
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.1} className="lg:pt-8">
            <p className="text-navy/60 text-lg leading-relaxed">
              I write when I have something worth saying — field notes from expeditions,
              gear decisions, things I&apos;m seeing out there. No schedule, just when
              something&apos;s worth putting down.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── Recent posts ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-20 border-b border-navy/8">
        <AnimateIn>
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">
            Recent
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-navy leading-tight mb-8">
            Latest writing.
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <AnimateIn key={post.title} delay={i * 0.08}>
              <Link
                href={post.href}
                className="group block rounded-2xl border border-navy/10 bg-white/60 overflow-hidden hover:border-navy/25 hover:bg-white/90 transition-all"
              >
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden bg-navy/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium uppercase tracking-widest text-navy/40">
                      {post.category}
                    </span>
                    <span className="text-navy/20">·</span>
                    <span className="text-xs text-navy/40">{post.date}</span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-navy leading-snug group-hover:text-navy/80 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-navy/55 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-block text-xs font-medium text-navy/40 group-hover:text-navy/70 transition-colors">
                    Read more →
                  </span>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── What I'm reading ─────────────────────────────────────── */}
      <section className="bg-cream/60 border-b border-navy/8 pt-20 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimateIn>
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">
              Worth your time
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-navy leading-tight mb-12">
              What I&apos;m reading.
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {READING.map(({ title, source, url, note }) => (
              <a
                key={title}
                href={url}
                className="group rounded-2xl border border-navy/10 bg-white/70 p-6 hover:border-navy/25 hover:bg-white transition-all flex gap-5 items-start"
              >
                {/* Decorative line */}
                <div className="flex-shrink-0 mt-1.5 w-0.5 h-full min-h-[3rem] bg-navy/10 group-hover:bg-navy/25 transition-colors rounded-full" />
                <div>
                  <p className="font-medium text-navy leading-snug group-hover:text-navy/80 transition-colors">
                    {title}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-widest text-navy/35 mt-1">
                    {source}
                  </p>
                  <p className="mt-3 text-sm text-navy/55 leading-relaxed">{note}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Field notes archive ───────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-24">
        <AnimateIn>
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-2">
            Short dispatches
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-navy leading-tight mb-12">
            Field notes.
          </h2>
        </AnimateIn>

        <div className="max-w-2xl divide-y divide-navy/8">
          {FIELD_NOTES.map(({ date, year, note }) => (
            <AnimateIn key={`${date}-${year}`}>
              <div className="py-6">
                <p className="text-xs font-medium text-navy/35 tracking-widest mb-2 uppercase">
                  {date}, {year}
                </p>
                <p className="text-navy/75 leading-relaxed">{note}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Nudge toward camps */}
        <div className="mt-16 pt-12 border-t border-navy/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-2xl font-medium text-navy">
              Ready to be out there yourself?
            </p>
            <p className="mt-1 text-navy/50">
              The camps are where the real stories happen.
            </p>
          </div>
          <Link
            href="/ski-camps"
            className="flex-shrink-0 rounded-full bg-navy px-8 py-3.5 text-sm font-medium text-cream hover:bg-navy/90 transition-colors"
          >
            View upcoming camps
          </Link>
        </div>
      </section>

      {/* ── Newsletter — bottom ─────────────────────────────────── */}
      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <div className="max-w-xl">
            <AnimateIn>
              <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight">
                Get it in<br />your inbox.
              </h2>
              <p className="mt-5 text-cream/60 text-base leading-relaxed">
                I send occasional dispatches — early access to new camps, trip notes,
                snow reports from wherever I am. No algorithm. Just email.
              </p>
            </AnimateIn>
            <form
              action="https://app.flodesk.com/forms/REPLACE_WITH_FORM_ID/subscribe"
              method="POST"
              className="mt-8"
            >
              <input type="hidden" name="fl_form_id" value="REPLACE_WITH_FORM_ID" />
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 rounded-full bg-white/10 border border-cream/20 px-5 py-3.5 text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/50 focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  className="rounded-full bg-cream text-navy px-7 py-3.5 text-sm font-medium hover:bg-cream/90 transition-colors flex-shrink-0"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-3 text-xs text-cream/30">
                No spam, unsubscribe any time.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
