import type { Metadata } from 'next'
import Link from 'next/link'
import { sponsors } from '@/data/sponsors'
import type { SponsorData } from '@/types'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { GearAnnotatedPhoto } from '@/components/gear/GearAnnotatedPhoto'

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
  'ski-care': 'Ski Care',
  safety: 'Safety',
  advocacy: 'Advocacy',
  performance: 'Performance',
  'partner': 'Partners',
}

// Two visual columns: left gets the core kit, right gets care/partners/advocacy.
// Defined as separate ordered lists so we can render them side-by-side.
const LEFT_CATEGORIES: SponsorData['category'][] = [
  'skis',
  'boots',
  'bindings',
  'apparel',
  'safety',
]

const RIGHT_CATEGORIES: SponsorData['category'][] = [
  'ski-care',
  'performance',
  'resort',
  'partner',
  'advocacy',
]

const CATEGORY_ORDER: SponsorData['category'][] = [...LEFT_CATEGORIES, ...RIGHT_CATEGORIES]

const GEAR_DESCRIPTIONS: Partial<Record<string, string>> = {
  'dps-skis':
    "DPS Skis are built for the terrain I seek — deep powder, couloirs, and everything in between. The Pagoda Tour 112 RP is my go-to for ski mountaineering days when I need a ski that performs both ways: up and down.",
  norrona:
    "Norrøna builds the best ski mountaineering outerwear I've found. The Lofoten line is technical in a way that actually matters — waterproof, articulated for big movement, and designed by people who ski in serious conditions. I've worn it from Chamonix to Antarctica.",
  aniiu:
    "Aniiu builds tough, high-performance gloves. They hold up in real conditions and keep my hands warm without sacrificing dexterity. That's the whole job.",
  scarpa:
    "SCARPA boots deliver the precision and power transfer I need on steep technical terrain. I've returned to the Maestrale RS season after season — it's the right tool for ski mountaineering where every edge hold matters.",
  atk:
    "ATK bindings are my choice for ski mountaineering where weight matters without sacrificing performance on the descent. When I'm carrying my skis on a technical ridge, every gram is felt.",
  ortovox:
    "Ortovox avalanche safety — beacon, probe, shovel — is non-negotiable on any backcountry day I ski. The technology has evolved dramatically since I started, but the commitment to carrying and knowing how to use it hasn't.",
  mountainflow:
    "mountainflow makes the poles I ski with. Lightweight, reliable, and built for the terrain I spend time on.",
  'phantom-glide':
    "PHANTOM Glide is a permanent base treatment I use on my touring skis. One application lasts the season — and it glides as well as any kick wax without the mess.",
  revelshine:
    "Revelshine is a wine worth drinking. I've poured it on top of peaks and at home after long days in the mountains. Good skiing deserves good wine.",
  outeru:
    "OuterU is the recovery and performance side of my training. Keeping the body ready for the demands of ski mountaineering is as important as the skiing itself.",
  'aspen-snowmass':
    "Aspen Snowmass is home. It's where I train, where I push my skiing every season, and where my kids learned to ski. There's no place I know better.",
  pow:
    "Protect Our Winters is the most important organization in skiing. The mountains I've built my career on are changing. POW does something real about it — they move policy, they move votes, they move the needle. Get involved.",
}

function CategoryGroup({
  category,
  label,
  items,
  groupIndex,
}: {
  category: SponsorData['category']
  label: string
  items: SponsorData[]
  groupIndex: number
}) {
  return (
    <div key={category}>
      <AnimateIn delay={groupIndex * 0.05}>
        <h3 className="font-serif text-xl font-medium text-navy mb-5 pb-3 border-b border-navy/10">
          {label}
        </h3>
      </AnimateIn>
      {/* Single-item categories: full-width card. Multi-item: 2-col grid */}
      <div className={`grid gap-4 ${items.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {items.map((sponsor, itemIndex) => {
          const description = GEAR_DESCRIPTIONS[sponsor.id] ?? sponsor.description ?? null
          return (
            <AnimateIn key={sponsor.id} delay={groupIndex * 0.05 + itemIndex * 0.07}>
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-5 rounded-2xl border border-navy/10 p-5 hover:border-navy/25 hover:shadow-sm transition-all h-full"
              >
                <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-white border border-navy/10 flex items-center justify-center overflow-hidden p-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-navy text-sm">{sponsor.name}</h4>
                    <span className="text-xs text-navy/30 group-hover:text-navy/50 transition-colors">↗</span>
                  </div>
                  {description && (
                    <p className="mt-1.5 text-sm text-navy/60 leading-relaxed">{description}</p>
                  )}
                </div>
              </a>
            </AnimateIn>
          )
        })}
      </div>
    </div>
  )
}

export default function GearPage() {
  const allByCategory = CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    items: sponsors.filter((s) => s.category === category),
  })).filter(({ items }) => items.length > 0)

  const leftGroups = allByCategory.filter((g) => LEFT_CATEGORIES.includes(g.category))
  const rightGroups = allByCategory.filter((g) => RIGHT_CATEGORIES.includes(g.category))

  return (
    <>
      {/* Hero — two-column so gear map is visible on load */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-28 pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-4">
              Equipment
            </p>
            <h1 className="font-serif text-6xl md:text-7xl font-medium text-navy leading-tight">
              Thirty years of<br />dialing in the kit.
            </h1>
          </div>
          <div>
            <p className="text-navy/60 text-lg leading-relaxed">
              I&apos;ve refined what I carry and ski on down to what actually works when the
              terrain gets serious. These are the brands I use, trust, and am proud to
              represent. I don&apos;t use brands I don&apos;t believe in.
            </p>
            <p className="mt-4 text-navy/60 leading-relaxed">
              Nothing on this list is here because of a deal — it&apos;s here because
              I&apos;d be skiing on it regardless.
            </p>
          </div>
        </div>
      </section>

      {/* Annotated photo — full width, edge-to-edge */}
      <section className="border-t border-navy/10">
        <GearAnnotatedPhoto />
      </section>

      {/* Gear by category */}
      <section className="border-t border-navy/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-20 space-y-16">
          <AnimateIn>
            <div className="max-w-xl">
              <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-3">
                Full kit
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-navy">
                Every brand I&apos;ve chosen to stand behind.
              </h2>
              <p className="mt-4 text-navy/55 leading-relaxed">
                After three decades of ski mountaineering, expeditions, and guiding, the list has
                gotten shorter — and more considered. I don&apos;t carry brands I don&apos;t believe in.
              </p>
            </div>
          </AnimateIn>

          {/* Two-column layout: core kit left, care/partners/advocacy right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-12">
            <div className="space-y-12">
              {leftGroups.map(({ category, label, items }, i) => (
                <CategoryGroup key={category} category={category} label={label} items={items} groupIndex={i} />
              ))}
            </div>
            <div className="space-y-12">
              {rightGroups.map(({ category, label, items }, i) => (
                <CategoryGroup key={category} category={category} label={label} items={items} groupIndex={leftGroups.length + i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* A note on gear at camp */}
      <section className="bg-cream/50 border-y border-navy/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14 md:py-16">
          <AnimateIn>
            <div className="max-w-xl">
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-navy mb-4">
                A note on gear on trips with Chris.
              </h2>
              <p className="text-navy/60 leading-relaxed mb-4">
                You don&apos;t need my specific brands to ski with me. What matters is that your
                equipment fits properly, is appropriate for the terrain, and that you know how to
                use it. I&apos;ve seen people ski beautifully in all manner of kit — and I&apos;ve
                seen people get into trouble in the latest and most expensive gear on the market.
              </p>
              <p className="text-navy/60 leading-relaxed">
                Happy to answer any gear or equipment questions.{' '}
                <a
                  href="mailto:chris@steepskiing.com"
                  className="text-navy font-medium hover:underline"
                >
                  Email me directly.
                </a>
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 text-center">
        <AnimateIn>
          <p className="text-navy/50 text-sm uppercase tracking-widest mb-4">
            Ski the same terrain
          </p>
          <Link
            href="/ski-camps"
            className="inline-block font-medium text-navy border-b-2 border-navy hover:border-navy/40 transition-colors pb-0.5 text-lg"
          >
            View upcoming camps ↗
          </Link>
        </AnimateIn>
      </div>
    </>
  )
}
