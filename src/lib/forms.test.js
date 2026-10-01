import { describe, expect, it } from 'vitest'
import { normalizePhone, validateQuote, validateTestDrive } from './forms'

describe('normalizePhone', () => {
  it('keeps only phone digits', () => {
    expect(normalizePhone(' 765-43 210 ')).toBe('76543210')
  })
})

describe('validateQuote', () => {
  it('returns field-specific errors for an invalid quotation', () => {
    expect(validateQuote({ name: 'A', phone: '123', city: '', modelId: '', consent: false })).toEqual({
      name: 'Ingresa al menos 2 caracteres.',
      phone: 'Ingresa un teléfono de 7 u 8 dígitos.',
      city: 'Selecciona una ciudad.',
      modelId: 'Selecciona un modelo.',
      consent: 'Debes autorizar el guardado local de los datos.',
    })
  })
})

describe('validateTestDrive', () => {
  it('requires a date after today', () => {
    expect(validateTestDrive({
      name: 'Ana', phone: '76543210', city: 'La Paz', modelId: 'dolphin-mini', date: '2026-09-30', consent: true,
    }, '2026-09-30')).toEqual({ date: 'Selecciona una fecha futura.' })
  })
})
