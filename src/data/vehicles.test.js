import { describe, expect, it } from 'vitest'
import { vehicles } from './vehicles'

describe('vehicles', () => {
  it('contains seven uniquely identified models', () => {
    expect(vehicles).toHaveLength(7)
    expect(new Set(vehicles.map((vehicle) => vehicle.id)).size).toBe(7)
  })

  it('marks invented prices as demo references', () => {
    const invented = vehicles.filter((vehicle) => vehicle.priceStatus === 'demo')

    expect(invented.length).toBeGreaterThan(0)
    expect(invented.every((vehicle) => vehicle.price > 0)).toBe(true)
  })

  it('provides comparison fields and accessible images', () => {
    for (const vehicle of vehicles) {
      expect(vehicle).toMatchObject({
        name: expect.any(String),
        price: expect.any(Number),
        rangeKm: expect.any(Number),
        lengthMm: expect.any(Number),
        powerHp: expect.any(Number),
        image: expect.stringContaining(`${import.meta.env.BASE_URL}vehicles/`),
        imageAlt: expect.stringContaining(vehicle.name),
        features: expect.any(Array),
      })
      expect(vehicle.features).toHaveLength(3)
    }
  })
})
