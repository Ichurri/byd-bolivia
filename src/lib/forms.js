export function normalizePhone(phone) {
  return String(phone ?? '').replace(/\D/g, '')
}

function validateBase(values) {
  const errors = {}

  if (String(values.name ?? '').trim().length < 2) {
    errors.name = 'Ingresa al menos 2 caracteres.'
  }

  if (!/^\d{7,8}$/.test(normalizePhone(values.phone))) {
    errors.phone = 'Ingresa un teléfono de 7 u 8 dígitos.'
  }

  if (!values.city) errors.city = 'Selecciona una ciudad.'
  if (!values.modelId) errors.modelId = 'Selecciona un modelo.'
  if (!values.consent) errors.consent = 'Debes autorizar el guardado local de los datos.'

  return errors
}

export function validateQuote(values) {
  return validateBase(values)
}

export function validateTestDrive(values, today = new Date().toISOString().slice(0, 10)) {
  const errors = validateBase(values)

  if (!values.date || values.date <= today) {
    errors.date = 'Selecciona una fecha futura.'
  }

  return errors
}
