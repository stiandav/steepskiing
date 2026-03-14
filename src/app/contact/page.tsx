import type { Metadata } from 'next'
import { InquiryForm } from '@/components/contact/InquiryForm'

export const metadata: Metadata = {
  title: 'Contact — Chris Davenport Ski Camps',
  description:
    'Inquire about booking a guided ski camp with Chris Davenport. Switzerland, Chile, Japan, and Antarctica.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: context */}
        <div>
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-4">
            Get in touch
          </p>
          <h1 className="font-serif text-5xl font-medium text-navy leading-tight">
            Ready to ski?<br />Let&apos;s talk.
          </h1>
          <p className="mt-6 text-navy/60 leading-relaxed">
            We don&apos;t do online checkouts. Fill out the form and someone from the
            team will be in touch within 24–48 hours to answer questions and make
            sure the camp is the right fit.
          </p>

          <div className="mt-10 space-y-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-navy/40 mb-1">
                Email
              </p>
              <a
                href="mailto:chris@steepskiing.com"
                className="text-navy hover:text-navy/70 transition-colors"
              >
                chris@steepskiing.com
              </a>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-navy/40 mb-1">
                Based in
              </p>
              <p className="text-navy">Aspen, Colorado</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-navy/40 mb-1">
                Response time
              </p>
              <p className="text-navy/70 text-sm">Within 24–48 hours</p>
            </div>
          </div>

          {/* Social */}
          <div className="mt-10 flex gap-5">
            <a
              href="https://www.instagram.com/chris_davenport/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-navy/50 hover:text-navy transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@chrisdavenport"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-navy/50 hover:text-navy transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* Right: form */}
        <div className="rounded-2xl border border-navy/10 bg-white p-8 shadow-sm">
          <InquiryForm />
        </div>
      </div>
    </div>
  )
}
