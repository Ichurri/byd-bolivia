import { describe, expect, it } from 'vitest'

import { assetUrl } from './assets'

describe('assetUrl', () => {
  it('prefixes public assets with the GitHub Pages base path', () => {
    expect(assetUrl('vehicles/dolphin.webp', '/byd-bolivia/')).toBe(
      '/byd-bolivia/vehicles/dolphin.webp',
    )
  })

  it('normalizes leading slashes without duplicating separators', () => {
    expect(assetUrl('/vehicles/shark.webp', '/byd-bolivia/')).toBe(
      '/byd-bolivia/vehicles/shark.webp',
    )
  })
})
