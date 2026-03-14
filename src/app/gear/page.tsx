import type { Metadata } from 'next'
import Link from 'next/link'
import { sponsors } from '@/data/sponsors'
import type { SponsorData } from '@/types'

export const metadata: Metadata = {
  title: 'Gear — Chris Davenport',
  description:
    "The equipment Chris Davenport skis and trusts on the world's most technical terrain.",
}

const CATEGORY_LABELS: Record<SponsorData['category'], string> = {
  skis: 'Skis',
  apparel: 'Apparel',
  boots: 'Boots',
  bindings: 'Bindings',
  resort: 'Resort Partner',
  wax: 'Wax & Glide',
  safety: 'Safety',
  advocacy: 'Advocacy',
  performance: 'Performance',
  'ski-care': 'Ski Care',
}

const CATEGORY_ORDER: SponsorData['category'][] = [
  'skis',
  'boots',
  'bindings',
  'apparel',
  'safety',
  'wax',
  'ski-care',
  'performance',
  'resort',
  'advocacy',
]

// Gear context copy — swap in real descriptions when Chris provides them
const GEAR_DESCRIPTIONS: Partial<Record<string, string>> = {
  'dps-skis':
    'DPS Skis are built for the terrain Chris seeks — deep powder, couloirs, and everything in between. The Pagoda Tour 112 RP is his go-to for ski mountaineering days.',
  norrona:
    "Norrøna outerwear is designed for the mountains, not the resort parking lot. Chris wears the Lofoten collection when conditions are at their worst.",
  scarpa:
    'SCARPA boots deliver the precision and power transfer needed on steep technical terrain. The Maestrale RS is the boot Chris returns to season after season.',
  atk:
    'ATK bindings are the choice for ski mountaineering where weight matters without sacrificing performance on the way down.',
  ortovox:
    'Ortovox avalanche safety gear — beacon, probe, shovel — is non-negotiable on any backcountry day. The technology has evolved, the commitment has not.',
  mountainflow:
    'mountainflow eco-wax is plant-based, non-toxic, and as fast as anything on the market. The right choice for skiers who care about the mountains they ski in.',
  'aspen-snowmass':
    "Chris's home mountain. Aspen Snowmass is where he trains, coaches, and pushes his skiing every season.",
}

export default function GearPage() {
  const sponsorsByCategory = CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    items: sponsors.filter((s) => s.category === category),
  })).filter(({ items }) => items.length > 0)

  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-4">
            Equipment
          </p>
          <h1 className="font-serif text-6xl md:text-7xl font-medium text-navy leading-tight">
            What Chris<br />skis on.
          </h1>
          <p className="mt-6 text-navy/60 text-lg leading-relaxed">
            After 30+ years in the mountains, the kit has been refined down to
            what actually works on technical terrain. These are the brands that
            Chris uses, trusts, and is proud to represent.
          </p>
        </div>
      </section>

      {/* Gear by category */}
      <section className="border-t border-navy/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 space-y-16">
          {sponsorsByCategory.map(({ category, label, items }) => (
            <div key={category}>
              <h2 className="font-serif text-xl font-medium text-navy mb-6">
                {label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {items.map((sponsor) => {
                  const description =
                    GEAR_DESCRIPTIONS[sponsor.id] ??
                    sponsor.description ??
                    null

                  return (
                    <a
                      key={sponsor.id}
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex gap-6 rounded-2xl border border-navy/10 p-6 hover:border-navy/25 hover:shadow-sm transition-all"
                    >
                      {/* Logo placeholder */}
                      <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-navy/5 flex items-center justify-center">
                        <span className="text-xs font-bold text-navy/40 uppercase">
                          {sponsor.name.slice(0, 2)}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-navy text-sm">
                            {sponsor.name}
                          </h3>
                          <span className="text-xs text-navy/30 group-hover:text-navy/50 transition-colors">
                            ↗
                          </span>
                        </div>
                        {description && (
                          <p className="mt-2 text-sm text-navy/60 leading-relaxed">
                            {description}
                          </p>
                        )}
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Note about kit */}
      <section className="bg-cream/50 border-y border-navy/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14">
          <div className="max-w-xl">
            <h2 className="font-serif text-2xl font-medium text-navy mb-3">
              A note on gear at camp
            </h2>
            <p className="text-navy/60 leading-relaxed">
              You don&apos;t need any specific brands to ski with Chris. What matters
              is that your equipment fits properly and is appropriate for the
              terrain. We&apos;ll send a full recommended kit list when you book.
              Questions? Email{' '}
              <a
                href="mailto:chris@steepskiing.com"
                className="text-navy hover:underline"
              >
                chris@steepskiing.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 text-center">
        <p className="text-navy/60">
          Ski the same terrain →{' '}
          <Link href="/ski-camps" className="text-navy font-medium hover:underline">
            View upcoming camps
          </Link>
        </p>
      </div>
    </>
  )
}
