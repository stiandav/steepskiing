import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { InquiryForm } from '@/components/contact/InquiryForm'

export const metadata: Metadata = {
  title: 'Private Ski Weeks — Chris Davenport',
  description: 'Book a private ski week with Chris Davenport anywhere in the world — Alaska heli-skiing, Japan, Chile, the Alps, Greenland, and beyond.',
}

const destinations = [
  {
    name: 'Alaska Heli-Skiing',
    tagline: 'Spring 2027 — Spring powder in the Chugach or Tordrillo Mountains.',
    detail: 'Chris partners with Pulseline Adventures and 3rd Edge Heli (Greg Harm). Untracked lines, world-class terrain, and the Alaska experience.',
    highlight: 'Spring 2027 — inquire for availability',
  },
  {
    name: 'Portillo, Chile',
    tagline: 'Private week at the most iconic resort in South America.',
    detail: 'The Andes in August. Empty slopes, high altitude, and the legendary Hotel Portillo. Build on what the group camps offer with fully custom objectives.',
    highlight: 'August window',
  },
  {
    name: 'Japan — Lotte Arai',
    tagline: 'The deepest powder on the planet, privately guided.',
    detail: 'Same resort as the group JAPOW camp, but on your schedule with your group. Late January and February for peak snowfall.',
    highlight: 'January–February window',
  },
  {
    name: 'Swiss Alps — Engelberg',
    tagline: 'Private week in one of Europe\'s best kept secrets.',
    detail: 'Access the same terrain as the group camp with full flexibility. Spring conditions or peak season — the Kempinski or Schweitzerhof await.',
    highlight: 'March window',
  },
  {
    name: 'Greenland & Norway',
    tagline: 'Arctic skiing — fjord descents, ski touring, remote first descents.',
    detail: 'Some of the most spectacular ski mountaineering terrain on the planet. Technical, committing, and unlike anywhere else.',
    highlight: 'April–May window',
  },
  {
    name: 'Aspen — Day Guiding',
    tagline: 'Home terrain. Expert local knowledge.',
    detail: 'Chris is based in Aspen and available for guided days at Aspen Mountain, Highlands, and Snowmass. The best way to experience the mountain.',
    highlight: 'December–April',
  },
  {
    name: 'CMH Heli-Skiing',
    tagline: 'Canadian powder with the best heli operation in the world.',
    detail: 'Chris guides private groups at Canadian Mountain Holidays — the gold standard for heli-skiing. Access to extraordinary terrain in British Columbia.',
    highlight: 'January–April window',
  },
  {
    name: 'Anywhere the snow is deep',
    tagline: 'Morocco, Svalbard, Patagonia, the Himalayas — ask.',
    detail: 'If there\'s snow and great terrain, Chris has likely been there. Reach out with your dream destination and he\'ll tell you if it\'s doable.',
    highlight: 'Fully custom',
  },
]

export default function PrivateGuidingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-cream pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <p className="text-xs font-medium tracking-widest text-cream/40 uppercase mb-4">Private Guiding</p>
              <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight">
                Private<br /><em>ski weeks.</em>
              </h1>
              <p className="mt-6 text-cream/70 text-lg leading-relaxed">
                Making your ski dreams come true, anywhere in the world — from Svalbard to Patagonia,
                Morocco to Alaska. No fixed dates, no group minimums, fully on your terms.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#inquire"
                  className="inline-flex items-center rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-navy hover:bg-cream/90 transition-colors">
                  Inquire Now
                </a>
                <Link href="/ski-camps"
                  className="inline-flex items-center rounded-full border border-cream/30 px-7 py-3.5 text-sm font-medium text-cream hover:bg-cream/10 transition-colors">
                  View Group Camps
                </Link>
              </div>
            </AnimateIn>

            {/* Portrait photo */}
            <AnimateIn delay={0.15}>
              <div className="relative h-[520px] rounded-3xl overflow-hidden">
                <Image
                  src="/images/photos/chris/DSC00405.jpg"
                  alt="Chris Davenport at Portillo, Chile"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <AnimateIn>
          <div className="max-w-2xl">
            <p className="text-navy/70 text-lg leading-relaxed">
              Beyond the group camps, Chris is available for private weeks anywhere in the world.
              Whether it&apos;s a small group of close friends, a corporate retreat, or a solo
              guided experience — private guiding means your schedule, your objectives, and
              Chris&apos;s full attention.
            </p>
            <p className="mt-4 text-navy/70 leading-relaxed">
              Chris has guided in the Alps, Andes, Himalayas, Antarctica, Alaska, Greenland,
              Japan, and beyond. He knows the terrain, the operators, and the logistics.
              You just have to show up and ski.
            </p>
          </div>
        </AnimateIn>
      </section>

      {/* Destinations grid */}
      <section className="bg-cream/50 border-y border-navy/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <AnimateIn>
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-3">Destinations</p>
            <h2 className="font-serif text-3xl font-medium text-navy mb-12">Where Chris guides privately</h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {destinations.map((dest, i) => (
              <AnimateIn key={dest.name} delay={i * 0.05}>
                <div className="rounded-2xl border border-navy/10 bg-white p-6 h-full">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif text-xl font-medium text-navy leading-tight">{dest.name}</h3>
                    <span className="flex-shrink-0 text-xs font-medium text-navy/40 bg-navy/5 rounded-full px-3 py-1 whitespace-nowrap">
                      {dest.highlight}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-navy/70 mb-2">{dest.tagline}</p>
                  <p className="text-sm text-navy/55 leading-relaxed">{dest.detail}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Alaska feature callout */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <AnimateIn>
          <div className="rounded-3xl bg-navy text-cream p-10 md:p-14">
            <p className="text-xs font-medium tracking-widest text-cream/40 uppercase mb-3">Featured</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
              Heli Ski Alaska<br /><em>Spring 2027</em>
            </h2>
            <p className="text-cream/70 leading-relaxed max-w-xl mb-4">
              Chris partners with two world-class Alaska heli-ski operations: <strong className="text-cream">Pulseline Adventures</strong> and <strong className="text-cream">3rd Edge Heli</strong> (with guide Greg Harm).
              Spring in Alaska means consolidating snowpack, lower avalanche risk, and extraordinary
              powder in the Chugach or Tordrillo Mountains. Inquire for dates and group pricing.
            </p>
            <a href="#inquire"
              className="inline-flex items-center rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-navy hover:bg-cream/90 transition-colors">
              Inquire About Alaska
            </a>
          </div>
        </AnimateIn>
      </section>

      {/* Inquiry form */}
      <section id="inquire" className="bg-cream/50 border-t border-navy/10">
        <div className="mx-auto max-w-2xl px-6 lg:px-10 py-20">
          <AnimateIn>
            <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-3">Get in Touch</p>
            <h2 className="font-serif text-3xl font-medium text-navy mb-8">
              Tell me where you want to ski.
            </h2>
            <InquiryForm defaultTrip="private-week" compact />
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
