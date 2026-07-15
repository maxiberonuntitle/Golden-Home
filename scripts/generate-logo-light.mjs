import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { PNG } from 'pngjs'

const root = process.cwd()
const input = join(root, 'public/logo-hero.png')
const output = join(root, 'public/logo-light.png')

const GOLD = [201, 169, 98]
const INK = [26, 26, 26]

function rgbToHsl(r, g, b) {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2

  if (max === min) return [0, 0, l]

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h

  switch (max) {
    case rn:
      h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
      break
    case gn:
      h = ((bn - rn) / d + 2) / 6
      break
    default:
      h = ((rn - gn) / d + 4) / 6
      break
  }

  return [h * 360, s, l]
}

function isTextPixel(r, g, b) {
  const [, s, l] = rgbToHsl(r, g, b)
  return l > 0.68 && s < 0.22
}

function isGoldPixel(r, g, b) {
  const [h, s, l] = rgbToHsl(r, g, b)
  if (l > 0.68 && s < 0.22) return false
  if (l < 0.05) return false

  const warm = r > g && g >= b
  const goldHue = h >= 15 && h <= 62

  return (
    (goldHue && s > 0.08 && l > 0.06) ||
    (warm && r - b > 6 && l > 0.05 && l < 0.78)
  )
}

function maxChannel(r, g, b) {
  return Math.max(r, g, b)
}

function countMask(mask, width, height, x, y, value) {
  let count = 0

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue
      const nx = x + dx
      const ny = y + dy
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
      if (mask[ny * width + nx] === value) count++
    }
  }

  return count
}

const png = PNG.sync.read(readFileSync(input))
const { width, height, data } = png
const mask = new Uint8Array(width * height)

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2
    const r = data[idx]
    const g = data[idx + 1]
    const b = data[idx + 2]
    const i = y * width + x

    if (isTextPixel(r, g, b)) mask[i] = 2
    else if (isGoldPixel(r, g, b)) mask[i] = 1
    else mask[i] = 0
  }
}

for (let pass = 0; pass < 4; pass++) {
  const next = Uint8Array.from(mask)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x
      if (mask[i] !== 0) continue

      const idx = i << 2
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]
      const peak = maxChannel(r, g, b)
      const goldNeighbors = countMask(mask, width, height, x, y, 1)

      if (goldNeighbors >= 1 && peak > 12 && peak < 220 && r >= g - 8 && g >= b - 8) {
        next[i] = 1
      }
    }
  }

  mask.set(next)
}

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = y * width + x
    if (mask[i] !== 0) continue

    const idx = i << 2
    const peak = maxChannel(data[idx], data[idx + 1], data[idx + 2])
    const goldNeighbors = countMask(mask, width, height, x, y, 1)

    if (peak < 24 && goldNeighbors >= 5) {
      mask[i] = 3
    }
  }
}

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = y * width + x
    const idx = i << 2
    const type = mask[i]

    if (type === 2 || type === 3) {
      data[idx] = INK[0]
      data[idx + 1] = INK[1]
      data[idx + 2] = INK[2]
      data[idx + 3] = 255
      continue
    }

    if (type === 1) {
      data[idx] = GOLD[0]
      data[idx + 1] = GOLD[1]
      data[idx + 2] = GOLD[2]
      data[idx + 3] = 255
      continue
    }

    data[idx] = 0
    data[idx + 1] = 0
    data[idx + 2] = 0
    data[idx + 3] = 0
  }
}

writeFileSync(output, PNG.sync.write(png))
console.log(`Created ${output} (${width}x${height})`)
