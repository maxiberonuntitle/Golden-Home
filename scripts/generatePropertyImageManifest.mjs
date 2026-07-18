import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PROPERTIES_DIR = path.join(ROOT, 'public', 'properties')
const OUT_FILE = path.join(ROOT, 'src', 'generated', 'propertyImages.manifest.ts')
export const MAX_PROPERTY_IMAGES = 20

const IMAGE_PATTERN = /^(\d{1,2})\.(png|jpe?g|webp)$/i

export function listPropertyImages(slug, dir) {
  if (!fs.existsSync(dir)) return []

  const byIndex = new Map()

  for (const file of fs.readdirSync(dir)) {
    const match = IMAGE_PATTERN.exec(file)
    if (!match) continue

    const index = Number.parseInt(match[1], 10)
    if (index < 1 || index > MAX_PROPERTY_IMAGES) continue

    byIndex.set(index, file)
  }

  const images = []
  for (let index = 1; index <= MAX_PROPERTY_IMAGES; index += 1) {
    const file = byIndex.get(index)
    if (!file) break
    images.push(`/properties/${slug}/${file}`)
  }

  return images
}

export function generatePropertyImageManifest() {
  /** @type {Record<string, string[]>} */
  const manifest = {}

  if (fs.existsSync(PROPERTIES_DIR)) {
    for (const slug of fs.readdirSync(PROPERTIES_DIR)) {
      const dir = path.join(PROPERTIES_DIR, slug)
      if (!fs.statSync(dir).isDirectory()) continue

      const images = listPropertyImages(slug, dir)
      if (images.length > 0) {
        manifest[slug] = images
      }
    }
  }

  const content = `/* Auto-generated — do not edit. Updated when running dev/build or adding photos. */
export const propertyImagesManifest: Record<string, readonly string[]> = ${JSON.stringify(manifest, null, 2)} as const

export function getManifestImagesForSlug(slug: string): readonly string[] {
  return propertyImagesManifest[slug] ?? []
}
`

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
  fs.writeFileSync(OUT_FILE, content)

  return manifest
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isDirectRun) {
  const manifest = generatePropertyImageManifest()
  const total = Object.values(manifest).reduce((sum, images) => sum + images.length, 0)
  console.log(`Generated property image manifest (${Object.keys(manifest).length} properties, ${total} images).`)
}
