import Link from 'next/link'
import Image from 'next/image'
import { AnimateIn } from '@/components/ui/AnimateIn'

/**
 * Dark bio strip on the home page.
 * Portrait photo on the right replaces the animated stats grid.
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

        <AnimateIn delay={0.15} className="relative h-[480px] rounded-2xl overflow-hidden">
          <Image
            src="/images/guides/chris_portrait.avif"
            alt="Chris Davenport — mountain guide and professional skier"
            fill
            className="object-cover object-top"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
        </AnimateIn>
      </div>
    </section>
  )
}
