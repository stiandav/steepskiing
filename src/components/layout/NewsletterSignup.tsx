'use client'

import { useState } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-sm text-cream/70 leading-relaxed">
        You&apos;re in — I&apos;ll be in touch from the mountains.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-md" aria-label="Newsletter signup">
      <div className="flex gap-3">
        <label htmlFor="footer-email" className="sr-only">Email address</label>
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 rounded-full border border-cream/20 bg-cream/5 px-5 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-cream/50 transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-full bg-cream px-6 py-3 text-sm font-medium text-navy hover:bg-cream/90 transition-colors whitespace-nowrap disabled:opacity-60"
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-2 text-xs text-red-300">Something went wrong — try again or email chris@chrisdavenport.com</p>
      )}
      {status !== 'error' && (
        <p className="mt-2 text-xs text-cream/40">No spam. Unsubscribe any time.</p>
      )}
    </form>
  )
}
