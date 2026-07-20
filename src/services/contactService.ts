import { COMPANY } from '@/utils/constants'

export interface ContactMessagePayload {
  name: string
  email: string
  phone: string
  message: string
  /** Honeypot anti-spam: must stay empty */
  website?: string
}

/**
 * Envía el mensaje del formulario a COMPANY.email vía FormSubmit (AJAX).
 * La primera vez, FormSubmit manda un correo de activación a la bandeja de la empresa.
 */
export async function sendContactMessage(data: ContactMessagePayload): Promise<void> {
  if (data.website?.trim()) {
    // Bot detected — fingir éxito sin enviar
    return
  }

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(COMPANY.email)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      _subject: `Nuevo contacto web — ${data.name}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: data.email,
    }),
  })

  const result = (await response.json().catch(() => null)) as {
    success?: boolean | string
    message?: string
  } | null

  const ok =
    response.ok &&
    (result?.success === true || result?.success === 'true')

  if (!ok) {
    throw new Error(result?.message || 'No se pudo enviar el mensaje')
  }
}
