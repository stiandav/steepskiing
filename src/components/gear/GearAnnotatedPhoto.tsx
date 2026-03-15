'use client'

import Image from 'next/image'
import { useState } from 'react'

interface GearPin {
  id: string
  x: number  // % from left
  y: number  // % from top
  label: string
  brand: string
  description: string
  url: string
  logo: string  // clearbit or local
}

/**
 * Pins are mapped to the real gear_map.jpg photo.
 * Chris is mid-turn in deep powder wearing:
 *   - Norrøna jacket (orange, fills upper body)
 *   - Norrøna pants (dark blue/black, lower body)
 *   - Aniiu gloves (leather, both hands visible)
 *   - Ortovox backpack (strap visible over right shoulder)
 *   - DPS skis (black tips at bottom left)
 *   - ATK bindings (at boot/ski junction)
 *   - Scarpa boots (feet area)
 *   - Ski bases treated with Mountain Flow + Phantom Glide
 */
const PINS: GearPin[] = [
  {
    id: 'jacket',
    x: 58,
    y: 30,
    label: 'Shell Jacket',
    brand: 'Norrøna',
    description: "Norrøna Lofoten GTX Pro. The jacket I've trusted in every storm from Chamonix to Antarctica. Fully waterproof, engineered for skiing, and it moves the way a ski jacket should.",
    url: 'https://norrona.com',
    logo: 'https://logo.clearbit.com/norrona.com',
  },
  {
    id: 'pants',
    x: 50,
    y: 58,
    label: 'Shell Pants',
    brand: 'Norrøna',
    description: "Norrøna Lofoten GTX Pro pants. Same family as the jacket. Articulated for skinning, tough enough for the descent.",
    url: 'https://norrona.com',
    logo: 'https://logo.clearbit.com/norrona.com',
  },
  {
    id: 'gloves-left',
    x: 28,
    y: 44,
    label: 'Gloves',
    brand: 'Aniiu',
    description: "Aniiu performance gloves. Warm, dexterous, durable. The kind of glove you forget you're wearing — which is exactly what you want on a long descent.",
    url: 'https://aniiu.com',
    logo: 'https://logo.clearbit.com/aniiu.com',
  },
  {
    id: 'backpack',
    x: 69,
    y: 22,
    label: 'Backpack',
    brand: 'Ortovox',
    description: "Ortovox backpack with integrated avalanche safety system. Beacon, probe, shovel — every backcountry day, no exceptions. The pack organizes it so there's no digging around when time matters.",
    url: 'https://www.ortovox.com/se-en/',
    logo: 'https://logo.clearbit.com/ortovox.com',
  },
  {
    id: 'skis',
    x: 22,
    y: 82,
    label: 'Skis',
    brand: 'DPS Skis',
    description: "DPS Pagoda Tour 112 RP. My go-to for ski mountaineering days — fast and confident on the descent, light enough to carry when the terrain gets vertical.",
    url: 'https://dpsskis.com',
    logo: 'https://logo.clearbit.com/dpsskis.com',
  },
  {
    id: 'bindings',
    x: 31,
    y: 72,
    label: 'Bindings',
    brand: 'ATK',
    description: "ATK tech bindings. Every gram matters when you're carrying your skis up a technical ridge. ATK gives me the weight savings without compromising the hold I need on the way down.",
    url: 'https://atkbindings.com',
    logo: 'https://logo.clearbit.com/atkbindings.com',
  },
  {
    id: 'boots',
    x: 38,
    y: 74,
    label: 'Boots',
    brand: 'SCARPA',
    description: "SCARPA Maestrale RS. My boot for alpine touring. The power transfer on steep terrain is precise, and the walk mode actually works. I've skied tens of thousands of vert in these.",
    url: 'https://scarpa.net',
    logo: 'https://logo.clearbit.com/scarpa.net',
  },
  {
    id: 'mountainflow',
    x: 17,
    y: 88,
    label: 'Ski Wax',
    brand: 'mountainflow',
    description: "mountainflow eco-wax. Plant-based, non-toxic, and as fast as anything I've used. Why would you wax your skis with something you wouldn't want in the snowpack?",
    url: 'https://mountainflow.com/',
    logo: 'https://logo.clearbit.com/mountainflow.com',
  },
  {
    id: 'phantom',
    x: 26,
    y: 86,
    label: 'Base Treatment',
    brand: 'PHANTOM Glide',
    description: "PHANTOM Glide permanent base treatment. One application, all season. My touring skis glide better and the bases stay protected without having to wax every other day.",
    url: 'https://phantomglide.com',
    logo: 'https://logo.clearbit.com/phantomglide.com',
  },
]

export function GearAnnotatedPhoto() {
  const [activePin, setActivePin] = useState<string | null>(null)
  const activeGear = PINS.find((p) => p.id === activePin)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] min-h-[600px]">
      {/* Photo with pins */}
      <div className="relative overflow-hidden bg-navy min-h-[420px] lg:min-h-[680px]">
        <Image
          src="/images/gear_map.jpg"
          alt="Chris Davenport skiing powder — gear annotated"
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 67vw, 100vw"
        />
        {/* Subtle darkening so pins read clearly over the bright snow */}
        <div className="absolute inset-0 bg-navy/10" />

        {PINS.map((pin, i) => (
          <button
            key={pin.id}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
            onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
            onMouseEnter={() => setActivePin(pin.id)}
            onMouseLeave={() => setActivePin(null)}
            aria-label={`${pin.label} — ${pin.brand}`}
          >

            {/* Numbered dot */}
            <span
              className={`relative flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold border-2 shadow-lg transition-all ${
                activePin === pin.id
                  ? 'bg-cream text-navy border-cream'
                  : 'bg-navy/70 text-cream border-cream/60 backdrop-blur-sm'
              }`}
            >
              {i + 1}
            </span>

            {/* Floating label (shows on hover, desktop only) */}
            <span
              className={`absolute left-9 top-1/2 -translate-y-1/2 hidden lg:block whitespace-nowrap rounded-lg bg-navy/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-cream shadow-xl pointer-events-none transition-all duration-200 ${
                activePin === pin.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              }`}
            >
              {pin.brand} — {pin.label}
            </span>
          </button>
        ))}
      </div>

      {/* Gear list sidebar */}
      <div className="bg-cream border-l border-navy/10 flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-navy/10 flex-shrink-0">
          <p className="text-xs font-medium uppercase tracking-widest text-navy/40">What I ski on</p>
          <p className="mt-1 text-sm text-navy/55">
            Hover or tap a number to explore the kit.
          </p>
        </div>

        {/* Active gear detail panel */}
        {activeGear && (
          <div className="px-6 py-5 border-b border-navy/10 bg-navy/[0.03] flex-shrink-0">
            <div className="flex items-start gap-3">
              {/* Brand logo */}
              <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-white border border-navy/10 flex items-center justify-center overflow-hidden p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeGear.logo}
                  alt={activeGear.brand}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    // Fallback to brand initials if logo fails to load
                    const target = e.currentTarget
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = `<span class="text-xs font-bold text-navy/50">${activeGear.brand.slice(0, 2).toUpperCase()}</span>`
                    }
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-navy">{activeGear.brand}</span>
                  <span className="text-xs text-navy/40">{activeGear.label}</span>
                </div>
                <p className="mt-2 text-xs text-navy/60 leading-relaxed">{activeGear.description}</p>
                <a
                  href={activeGear.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-navy hover:text-navy/60 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Shop {activeGear.brand} ↗
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Pin list */}
        <ul className="overflow-y-auto flex-1">
          {PINS.map((pin, i) => (
            <li key={pin.id}>
              <button
                className={`w-full text-left px-6 py-4 border-b border-navy/[0.07] transition-colors flex items-center gap-4 ${
                  activePin === pin.id ? 'bg-navy/[0.05]' : 'hover:bg-navy/[0.02]'
                }`}
                onMouseEnter={() => setActivePin(pin.id)}
                onMouseLeave={() => setActivePin(null)}
                onClick={() => window.open(pin.url, '_blank')}
              >
                {/* Number */}
                <span
                  className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                    activePin === pin.id
                      ? 'bg-navy text-cream border-navy'
                      : 'border-navy/25 text-navy/45'
                  }`}
                >
                  {i + 1}
                </span>

                {/* Brand logo */}
                <div className="flex-shrink-0 h-7 w-7 rounded bg-white border border-navy/10 flex items-center justify-center overflow-hidden p-0.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pin.logo}
                    alt={pin.brand}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-navy block leading-tight">{pin.label}</span>
                  <span className="text-xs text-navy/45">{pin.brand} ↗</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
