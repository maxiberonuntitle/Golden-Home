export interface ShareContent {
  title: string
  text: string
  url: string
}

export type ShareResult = 'shared' | 'copied' | 'cancelled' | 'failed'

function canUseNativeShare(content: ShareContent): boolean {
  if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') {
    return false
  }

  if (typeof navigator.canShare === 'function') {
    try {
      return navigator.canShare(content)
    } catch {
      return false
    }
  }

  return true
}

/** Tries the OS share sheet. Returns null when native share is unavailable. */
export async function tryNativeShare(content: ShareContent): Promise<ShareResult | null> {
  if (!canUseNativeShare(content)) return null

  try {
    await navigator.share(content)
    return 'shared'
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return 'cancelled'
    }
    return null
  }
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Fall through to legacy path.
  }

  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

export function getShareLinks(content: ShareContent) {
  const message = `${content.text}\n${content.url}`
  const encodedMessage = encodeURIComponent(message)
  const encodedUrl = encodeURIComponent(content.url)
  const encodedTitle = encodeURIComponent(content.title)

  return {
    /** Opens WhatsApp so the user picks who to send to (no fixed destination). */
    whatsapp: `https://wa.me/?text=${encodedMessage}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedMessage}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(content.text)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
  }
}
