import Link from 'next/link'
import { footerLinks } from '@/data/nav'
import { CdLogo } from '@/components/ui/CdLogo'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const col1 = footerLinks.slice(0, Math.ceil(footerLinks.length / 2))
  const col2 = footerLinks.slice(Math.ceil(footerLinks.length / 2))

  return (
    <footer className="bg-navy text-cream">
      <div className="border-b border-cream/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
          <div className="flex-1 max-w-md">
            <h2 className="font-serif text-2xl font-medium">Field notes from the mountains.</h2>
            <p className="mt-2 text-sm text-cream/60 leading-relaxed">
              I send occasional dispatches — early access to camp openings, snow reports, and things worth reading. No noise.
            </p>
          </div>
          <form action="https://app.flodesk.com/forms/REPLACE_WITH_FORM_ID/subscribe" method="POST" className="flex-1 max-w-md" aria-label="Newsletter signup">
            <input type="hidden" name="fl_form_id" value="REPLACE_WITH_FORM_ID" />
            <div className="flex gap-3">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input id="footer-email" type="email" name="email" required placeholder="your@email.com"
                className="flex-1 rounded-full border border-cream/20 bg-cream/5 px-5 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-cream/50 transition-colors" />
              <button type="submit" className="rounded-full bg-cream px-6 py-3 text-sm font-medium text-navy hover:bg-cream/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="mt-2 text-xs text-cream/40">No spam. Unsubscribe any time.</p>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link href="/" className="inline-block hover:opacity-70 transition-opacity">
              <CdLogo variant="light" />
            </Link>
            <p className="mt-4 text-sm text-cream/50 leading-relaxed max-w-xs">
              IFMGA/AMGA certified mountain guide · 2× World Extreme Skiing Champion · 54 Colorado 14ers in a single season.
            </p>
            <div className="mt-6 flex gap-5 flex-wrap">
              <a href="https://www.instagram.com/steepskiing/" target="_blank" rel="noopener noreferrer" aria-label="Instagram @steepskiing" className="text-cream/50 hover:text-cream transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://www.facebook.com/ChrisDavenport/" target="_blank" rel="noopener noreferrer" aria-label="Facebook @steepskiing" className="text-cream/50 hover:text-cream transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/chris-davenport-182a233/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-cream/50 hover:text-cream transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.youtube.com/@steepskiing" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-cream/50 hover:text-cream transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.8 8.001a2.75 2.75 0 0 0-1.935-1.946C18.2 5.6 12 5.6 12 5.6s-6.2 0-7.865.455A2.75 2.75 0 0 0 2.2 8.001 28.75 28.75 0 0 0 1.75 12a28.75 28.75 0 0 0 .45 3.999 2.75 2.75 0 0 0 1.935 1.946C5.8 18.4 12 18.4 12 18.4s6.2 0 7.865-.455a2.75 2.75 0 0 0 1.935-1.946A28.75 28.75 0 0 0 22.25 12a28.75 28.75 0 0 0-.45-3.999ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z"/></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            <ul className="space-y-3">
              {col1.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-cream/60 hover:text-cream transition-colors">{link.label}</Link></li>
              ))}
            </ul>
            <ul className="space-y-3">
              {col2.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-cream/60 hover:text-cream transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-cream/30">
          <p>© {currentYear} Chris Davenport. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-cream/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-cream/60 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
