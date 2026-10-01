export function calculateMonthlyPayment({ price, downPayment, months, annualRate }) {
  const capital = price - downPayment
  const monthlyRate = annualRate / 100 / 12

  if (monthlyRate === 0) return capital / months

  const factor = (1 + monthlyRate) ** months
  return capital * monthlyRate * factor / (factor - 1)
}

export function validateFinanceInput({ price, downPayment, months, annualRate }) {
  const errors = {}

  if (!Number.isFinite(downPayment) || downPayment < 0) {
    errors.downPayment = 'La inicial no puede ser negativa.'
  } else if (downPayment >= price) {
    errors.downPayment = 'La inicial debe ser menor al precio.'
  }

  if (!Number.isFinite(months) || months < 12 || months > 84) {
    errors.months = 'El plazo debe estar entre 12 y 84 meses.'
  }

  if (!Number.isFinite(annualRate) || annualRate < 0 || annualRate > 40) {
    errors.annualRate = 'La tasa debe estar entre 0% y 40%.'
  }

  return errors
}
