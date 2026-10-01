const KEYS = {
  quote: 'byd-demo:quotes:v1',
  testDrive: 'byd-demo:test-drives:v1',
}

export function saveLead(type, lead, storage = window.localStorage, factories = {}) {
  const key = KEYS[type]
  if (!key) throw new Error('Tipo de solicitud desconocido.')

  const id = factories.id ?? (() => crypto.randomUUID())
  const now = factories.now ?? (() => new Date().toISOString())
  const current = JSON.parse(storage.getItem(key) || '[]')
  const record = { ...lead, id: id(), createdAt: now() }

  storage.setItem(key, JSON.stringify([...current, record]))
  return record
}

export function clearDemoData(storage = window.localStorage) {
  Object.values(KEYS).forEach((key) => storage.removeItem(key))
}
