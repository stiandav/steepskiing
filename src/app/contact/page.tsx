import type { Metadata } from 'next'
import { InquiryForm } from '@/components/contact/InquiryForm'

export const metadata: Metadata = {
  title: 'Contact — Chris Davenport',
  description:
    'Reach out about a guided ski camp. I personally read every inquiry and will be in touch within 48 hours.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-28 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <p className="text-xs font-medium tracking-widest text-navy/40 uppercase mb-4">
            Get in touch
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-navy leading-tight">
            Ready to ski?<br /><em>Let&apos;s talk.</em>
          </h1>
          <p className="mt-6 text-navy/60 leading-relaxed">
            Fill out the form below or slide into my DMs on Instagram — I&apos;m
            at <a href="https://www.instagram.com/steepskiing/" target="_blank" rel="noopener noreferrer"
              className="text-navy hover:underline">@steepskiing</a>. I personally read every inquiry
            and will be in touch within 24–48 hours to answer questions and make sure
            the camp is the right fit for you.
          </p>

          <div className="mt-10 space-y-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-navy/40 mb-1">Email</p>
              <a href="mailto:chris@steepskiing.com" className="text-navy hover:text-navy/70 transition-colors">
                chris@steepskiing.com
              </a>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-navy/40 mb-1">Instagram</p>
              <a href="https://www.instagram.com/steepskiing/" target="_blank" rel="noopener noreferrer"
                className="text-navy hover:text-navy/70 transition-colors">@steepskiing</a>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-navy/40 mb-1">Based in</p>
              <p className="text-navy">Aspen, Colorado</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-navy/40 mb-1">Response time</p>
              <p className="text-navy/70 text-sm">I&apos;ll be in touch within 24–48 hours</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-navy/10 bg-white p-8 shadow-sm">
          <InquiryForm />
        </div>
      </div>
    </div>
  )
}
