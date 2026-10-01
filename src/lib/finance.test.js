import { describe, expect, it } from 'vitest'
import { calculateMonthlyPayment, validateFinanceInput } from './finance'

describe('calculateMonthlyPayment', () => {
  it('splits zero-interest capital evenly', () => {
    expect(calculateMonthlyPayment({ price: 30000, downPayment: 6000, months: 48, annualRate: 0 })).toBe(500)
  })

  it('calculates an amortized positive-interest payment', () => {
    expect(calculateMonthlyPayment({ price: 30000, downPayment: 6000, months: 48, annualRate: 8.5 })).toBeCloseTo(591.56, 2)
  })
})

describe('validateFinanceInput', () => {
  it('rejects a down payment equal to price and out-of-range terms', () => {
    expect(validateFinanceInput({ price: 30000, downPayment: 30000, months: 96, annualRate: 45 })).toEqual({
      downPayment: 'La inicial debe ser menor al precio.',
      months: 'El plazo debe estar entre 12 y 84 meses.',
      annualRate: 'La tasa debe estar entre 0% y 40%.',
    })
  })

  it('accepts a valid financing scenario', () => {
    expect(validateFinanceInput({ price: 30000, downPayment: 6000, months: 48, annualRate: 8.5 })).toEqual({})
  })
})
