import Link from 'next/link'
import { footerLinks } from '@/data/nav'

/**
 * Footer — site-wide footer with:
 * - Newsletter signup (Flodesk embed placeholder — swap in real form ID)
 * - Navigation link grid
 * - Social links + legal copy
 *
 * Flodesk: replace the action URL and hidden field value with the real
 * form ID from your Flodesk dashboard under Forms → Embed → HTML.
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  // Split footer links into two columns
  const col1 = footerLinks.slice(0, Math.ceil(footerLinks.length / 2))
  const col2 = footerLinks.slice(Math.ceil(footerLinks.length / 2))

  return (
    <footer className="bg-navy text-cream">
      {/* Newsletter band */}
      <div className="border-b border-cream/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
          <div className="flex-1 max-w-md">
            <h2 className="font-serif text-2xl font-medium">
              Conditions. Beta. New Camps.
            </h2>
            <p className="mt-2 text-sm text-cream/60 leading-relaxed">
              Chris sends occasional field notes from the mountains — early access
              to camp openings, snow reports, and links worth reading.
            </p>
          </div>

          {/* Flodesk signup form */}
          {/* Replace action URL with your real Flodesk endpoint */}
          <form
            action="https://app.flodesk.com/forms/REPLACE_WITH_FORM_ID/subscribe"
            method="POST"
            className="flex-1 max-w-md"
            aria-label="Newsletter signup"
          >
            {/* Hidden field required by Flodesk */}
            <input type="hidden" name="fl_form_id" value="REPLACE_WITH_FORM_ID" />

            <div className="flex gap-3">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="flex-1 rounded-full border border-cream/20 bg-cream/5 px-5 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-cream/50 transition-colors"
              />
              <button
                type="submit"
                className="rounded-full bg-cream px-6 py-3 text-sm font-medium text-navy hover:bg-cream/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
            <p className="mt-2 text-xs text-cream/40">
              No spam. Unsubscribe any time.
            </p>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="font-serif text-xl font-semibold hover:opacity-70 transition-opacity"
            >
              Chris Davenport
            </Link>
            <p className="mt-3 text-sm text-cream/50 leading-relaxed max-w-xs">
              IFMGA/AMGA certified mountain guide · 2× World Extreme Skiing
              Champion · 54 Colorado 14ers in 14 days.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.instagram.com/chris_davenport/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-cream/50 hover:text-cream transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.youtube.com/@chrisdavenport"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-cream/50 hover:text-cream transition-colors"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            <ul className="space-y-3">
              {col1.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {col2.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-cream/30">
          <p>© {currentYear} Chris Davenport. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-cream/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cream/60 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Minimal inline SVG icons to avoid an icon library dependency
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.8 8.001a2.75 2.75 0 0 0-1.935-1.946C18.2 5.6 12 5.6 12 5.6s-6.2 0-7.865.455A2.75 2.75 0 0 0 2.2 8.001 28.75 28.75 0 0 0 1.75 12a28.75 28.75 0 0 0 .45 3.999 2.75 2.75 0 0 0 1.935 1.946C5.8 18.4 12 18.4 12 18.4s6.2 0 7.865-.455a2.75 2.75 0 0 0 1.935-1.946A28.75 28.75 0 0 0 22.25 12a28.75 28.75 0 0 0-.45-3.999ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
    </svg>
  )
}
