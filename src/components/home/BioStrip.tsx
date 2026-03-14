import Link from 'next/link'
import { CountUp } from '@/components/ui/CountUp'
import { AnimateIn } from '@/components/ui/AnimateIn'

const stats = [
  { value: 30, suffix: '+', label: 'Ski films' },
  { value: 20, suffix: '+', label: 'Years guiding' },
  { value: 54, suffix: '', label: 'Colorado 14ers' },
  { value: 4, suffix: '', label: 'Continents guided' },
]

/**
 * Dark bio / credibility strip on the home page.
 * Stats use CountUp so they animate when they scroll into view.
 * The text block uses AnimateIn for a fade+slide entrance.
 */
export function BioStrip() {
  return (
    <section className="bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <AnimateIn>
          <p className="text-xs font-medium tracking-widest text-cream/40 uppercase mb-4">
            Your Guide
          </p>
          <h2 className="font-serif text-4xl font-medium leading-tight">
            Chris Davenport
          </h2>
          <p className="mt-4 text-cream/70 leading-relaxed">
            2× World Extreme Skiing Champion. IFMGA/AMGA certified mountain guide.
            First to ski all 54 Colorado 14ers in a single season. Featured in
            30+ Warren Miller and Matchstick Productions films.
          </p>
          <p className="mt-3 text-cream/70 leading-relaxed">
            Based in Aspen, Colorado. Has guided clients in the Alps, Andes, Himalayas,
            and Antarctica for over 20 years.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center text-sm font-medium text-cream/60 hover:text-cream transition-colors"
          >
            Full bio →
          </Link>
        </AnimateIn>

        {/* Stats with CountUp */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map(({ value, suffix, label }, i) => (
            <AnimateIn key={label} delay={i * 0.1}>
              <div className="border border-cream/10 rounded-2xl p-6">
                <p className="font-serif text-4xl font-medium text-cream">
                  <CountUp value={value} suffix={suffix} />
                </p>
                <p className="mt-1 text-sm text-cream/50">{label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
