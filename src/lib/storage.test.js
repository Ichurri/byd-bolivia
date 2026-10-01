import { describe, expect, it } from 'vitest'
import { clearDemoData, saveLead } from './storage'

function createMemoryStorage() {
  const values = new Map()
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  }
}

describe('saveLead', () => {
  it('appends a stamped quotation record', () => {
    const storage = createMemoryStorage()
    const record = saveLead('quote', { name: 'Ana' }, storage, {
      id: () => 'lead-1',
      now: () => '2026-09-30T14:00:00.000Z',
    })

    expect(record).toEqual({ name: 'Ana', id: 'lead-1', createdAt: '2026-09-30T14:00:00.000Z' })
    expect(JSON.parse(storage.getItem('byd-demo:quotes:v1'))).toEqual([record])
  })

  it('rejects an unknown request type', () => {
    expect(() => saveLead('unknown', {}, createMemoryStorage())).toThrow('Tipo de solicitud desconocido.')
  })
})

describe('clearDemoData', () => {
  it('removes quotation and test-drive records', () => {
    const storage = createMemoryStorage()
    storage.setItem('byd-demo:quotes:v1', '[]')
    storage.setItem('byd-demo:test-drives:v1', '[]')

    clearDemoData(storage)

    expect(storage.getItem('byd-demo:quotes:v1')).toBeNull()
    expect(storage.getItem('byd-demo:test-drives:v1')).toBeNull()
  })
})
