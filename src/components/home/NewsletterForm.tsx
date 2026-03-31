/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect } from 'react'

const FORM_ID = '69cb1e9e0866d839895894d3'

export default function NewsletterForm() {
  useEffect(() => {
    const existingScript = document.querySelector('script[src*="flodesk"]')
    if (!existingScript) {
      ;(function (w: any, d: any, t: any, h: any, s: any, n: any) {
        w.FlodeskObject = n
        const fn = function () {
          ;(w[n].q = w[n].q || []).push(arguments)
        }
        w[n] = w[n] || fn
        const f = d.getElementsByTagName(t)[0]
        const v = '?v=' + Math.floor(new Date().getTime() / (120 * 1000)) * 60
        const sm = d.createElement(t)
        sm.async = true
        sm.type = 'module'
        sm.src = h + s + '.mjs' + v
        f.parentNode.insertBefore(sm, f)
        const sn = d.createElement(t)
        sn.async = true
        sn.noModule = true
        sn.src = h + s + '.js' + v
        f.parentNode.insertBefore(sn, f)
      })(window, document, 'script', 'https://assets.flodesk.com', '/universal', 'fd')
    }

    ;(window as any).fd('form', {
      formId: FORM_ID,
      containerEl: `#fd-form-${FORM_ID}`,
    })
  }, [])

  return <div id={`fd-form-${FORM_ID}`}></div>
}
