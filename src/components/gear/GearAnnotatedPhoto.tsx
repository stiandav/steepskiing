'use client'
import Image from 'next/image'
import { useState } from 'react'

interface GearPin {
  id: string
  x: number  // % from left
  y: number  // % from top
  label: string
  description: string
  url: string
  brand: string
}

const PINS: GearPin[] = [
  {
    id: 'helmet',
    x: 48,
    y: 12,
    label: 'Helmet',
    description: "POC Skull X MIPS — the same helmet I've used for years on technical descents. Non-negotiable head protection.",
    url: 'https://www.pocsports.com',
    brand: 'POC',
  },
  {
    id: 'jacket',
    x: 45,
    y: 32,
    label: 'Shell jacket',
    description: "Norrøna Lofoten GTX Pro — built for the mountains, not the resort. Waterproof, breathable, moves with you.",
    url: 'https://norrona.com',
    brand: 'Norrøna',
  },
  {
    id: 'pants',
    x: 46,
    y: 55,
    label: 'Shell pants',
    description: "Norrøna Lofoten GTX Pro pants. Same family as the jacket — fully waterproof, articulated for skinning and skiing.",
    url: 'https://norrona.com',
    brand: 'Norrøna',
  },
  {
    id: 'skis',
    x: 35,
    y: 70,
    label: 'Skis',
    description: "DPS Pagoda Tour 112 RP. Built for ski mountaineering — fast and stiff enough on the way down, light enough to carry up.",
    url: 'https://dpsskis.com',
    brand: 'DPS Skis',
  },
  {
    id: 'boots',
    x: 42,
    y: 78,
    label: 'Boots',
    description: "SCARPA Maestrale RS — my boot for alpine touring. Precision power transfer on steep terrain with walkable mode for the approach.",
    url: 'https://scarpa.net',
    brand: 'SCARPA',
  },
  {
    id: 'beacon',
    x: 55,
    y: 38,
    label: 'Beacon',
    description: "Ortovox beacon, probe, and shovel. Always on every backcountry day, every season. The technology has evolved — the commitment hasn't.",
    url: 'https://ortovox.com',
    brand: 'Ortovox',
  },
  {
    id: 'bindings',
    x: 38,
    y: 65,
    label: 'Bindings',
    description: "ATK bindings — tech bindings where weight matters without sacrificing performance on the descent.",
    url: 'https://atkbindings.com',
    brand: 'ATK',
  },
]

export function GearAnnotatedPhoto() {
  const [activePin, setActivePin] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0 min-h-[600px]">
      {/* Annotated photo */}
      <div className="relative overflow-hidden bg-navy min-h-[400px] lg:min-h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1489949439025-f5e9d8ea9f90?w=1200&q=85"
          alt="Chris Davenport in full kit on steep terrain — gear annotated"
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 67vw, 100vw"
        />
        <div className="absolute inset-0 bg-navy/20" />

        {/* Pins */}
        {PINS.map((pin, i) => (
          <button
            key={pin.id}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-200 ${
              activePin === pin.id ? 'scale-110' : 'hover:scale-110'
            }`}
            onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
            onMouseEnter={() => setActivePin(pin.id)}
            onMouseLeave={() => setActivePin(null)}
            aria-label={`View ${pin.label} details`}
          >
            {/* Pulsing ring */}
            <span
              className={`absolute inset-0 rounded-full scale-[2.5] animate-ping ${
                activePin === pin.id ? 'bg-cream/30' : 'bg-cream/15'
              }`}
            />
            {/* Number circle */}
            <span
              className={`relative flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold border-2 transition-colors ${
                activePin === pin.id
                  ? 'bg-cream text-navy border-cream'
                  : 'bg-navy/70 text-cream border-cream/50 backdrop-blur-sm'
              }`}
            >
              {i + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Gear list sidebar */}
      <div className="bg-cream border-l border-navy/10 overflow-y-auto max-h-[600px]">
        <div className="p-6 border-b border-navy/10">
          <p className="text-xs font-medium uppercase tracking-widest text-navy/40">
            What I ski on
          </p>
          <p className="mt-1 text-sm text-navy/60">
            Hover or tap a number to explore the kit.
          </p>
        </div>
        <ul>
          {PINS.map((pin, i) => (
            <li key={pin.id}>
              <button
                className={`w-full text-left px-6 py-5 border-b border-navy/[0.08] transition-colors flex gap-4 items-start ${
                  activePin === pin.id ? 'bg-navy/5' : 'hover:bg-navy/[0.03]'
                }`}
                onMouseEnter={() => setActivePin(pin.id)}
                onMouseLeave={() => setActivePin(null)}
                onClick={() => window.open(pin.url, '_blank')}
              >
                <span
                  className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold border transition-colors mt-0.5 ${
                    activePin === pin.id
                      ? 'bg-navy text-cream border-navy'
                      : 'border-navy/30 text-navy/50'
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-navy">{pin.label}</span>
                    <span className="text-xs text-navy/40 flex-shrink-0">{pin.brand} ↗</span>
                  </div>
                  <p
                    className={`mt-1 text-xs text-navy/55 leading-relaxed transition-all duration-300 overflow-hidden ${
                      activePin === pin.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {pin.description}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
