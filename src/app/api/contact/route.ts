import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Destination email — override via env var for easy config without redeploy
const TO_EMAIL = process.env.INQUIRY_TO_EMAIL ?? 'chris@steepskiing.com'
const FROM_EMAIL = process.env.INQUIRY_FROM_EMAIL ?? 'inquiries@steepskiing.com'

interface InquiryBody {
  firstName?: string
  lastName?: string
  email?: string
  trip?: string
  experience?: string
  message?: string
}

const TRIP_LABELS: Record<string, string> = {
  'switzerland-2026': 'Switzerland — March 14–21, 2026',
  'chile-2026': 'Chile — August 15–22, 2026',
  'japan-2027': 'Japan — February 1–7, 2027',
  'antarctica-2027': 'Antarctica — Oct 24–Nov 5, 2027',
  general: 'General inquiry',
}

export async function POST(request: Request) {
  let body: InquiryBody

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { firstName, lastName, email, trip, experience, message } = body

  // Basic validation
  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { error: 'First name, last name, and email are required.' },
      { status: 422 },
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 422 })
  }

  const tripLabel = TRIP_LABELS[trip ?? ''] ?? trip ?? 'Not specified'

  const emailHtml = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1B2A4A;">
      <h2 style="font-size: 24px; font-weight: normal; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px;">
        New Camp Inquiry — steepskiing.com
      </h2>

      <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 140px; font-size: 13px;">Name</td>
          <td style="padding: 8px 0; font-size: 14px;">${firstName} ${lastName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Email</td>
          <td style="padding: 8px 0; font-size: 14px;">
            <a href="mailto:${email}" style="color: #1B2A4A;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Camp</td>
          <td style="padding: 8px 0; font-size: 14px;">${tripLabel}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Experience</td>
          <td style="padding: 8px 0; font-size: 14px;">${experience ?? 'Not specified'}</td>
        </tr>
      </table>

      ${
        message
          ? `<div style="margin-top: 24px; padding: 16px; background: #F5F0EB; border-radius: 8px;">
               <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">Message</p>
               <p style="margin: 0; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
             </div>`
          : ''
      }

      <p style="margin-top: 32px; font-size: 12px; color: #9ca3af;">
        Sent from steepskiing.com contact form
      </p>
    </div>
  `

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Camp Inquiry: ${firstName} ${lastName} — ${tripLabel}`,
      html: emailHtml,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json(
      { error: 'Failed to send email. Please try emailing directly.' },
      { status: 500 },
    )
  }
}
