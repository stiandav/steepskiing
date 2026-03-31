'use client'

import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface InquiryFormProps {
  /** Pre-select a trip in the dropdown */
  defaultTrip?: string
  /** Compact mode for embedding inside trip pages */
  compact?: boolean
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function InquiryForm({ defaultTrip = '', compact = false }: InquiryFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const successRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (status === 'success' && successRef.current) {
      gsap.from(successRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [status])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? 'Something went wrong')
      }

      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Try emailing directly.')
    }
  }

  if (status === 'success') {
    return (
      <div ref={successRef} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="text-2xl">✓</p>
        <h3 className="mt-2 font-serif text-xl font-medium text-emerald-800">
          Inquiry received!
        </h3>
        <p className="mt-2 text-sm text-emerald-700">
          Received — I&apos;ll be in touch soon.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-xl border border-navy/20 bg-white px-4 py-3 text-sm text-navy placeholder-navy/40 focus:outline-none focus:border-navy/50 transition-colors'
  const labelClass = 'mb-1.5 block text-xs font-medium tracking-wide text-navy/60 uppercase'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {!compact && (
        <h2 className="font-serif text-2xl font-medium text-navy">
          Interested? Let&apos;s talk.
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className={inputClass}
            placeholder="Jane"
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className={inputClass}
            placeholder="Smith"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="jane@example.com"
        />
      </div>

      <div>
        <label htmlFor="trip" className={labelClass}>Which camp are you interested in?</label>
        <select
          id="trip"
          name="trip"
          defaultValue={defaultTrip}
          className={inputClass}
        >
          <option value="">Select a camp…</option>
          <option value="chile-2026">Portillo, Chile — August 15–22, 2026</option>
          <option value="japan-2027">Japan — January 31–February 7, 2027</option>
          <option value="switzerland-2027">Switzerland — March 13–20, 2027</option>
          <option value="antarctica-2027">Antarctica — Oct 24–Nov 5, 2027</option>
          <option value="private-week">Private week — Alaska, Japan, Chile, or custom</option>
          <option value="general">General inquiry / not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="experience" className={labelClass}>Skiing experience</label>
        <select id="experience" name="experience" className={inputClass}>
          <option value="">Select…</option>
          <option value="advanced">Advanced — confident on steep/off-piste</option>
          <option value="expert">Expert — seeking challenging terrain</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message (optional)</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputClass}
          placeholder="Any questions, availability concerns, or context about your skiing background…"
        />
      </div>

      {status === 'error' && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-full bg-navy px-8 py-4 text-sm font-medium text-cream hover:bg-navy/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Inquiry'}
      </button>

      <p className="text-center text-xs text-navy/40">
        Or email directly:{' '}
        <a href="mailto:chris@chrisdavenport.com" className="underline hover:text-navy/70">
          chris@chrisdavenport.com
        </a>
      </p>
    </form>
  )
}
