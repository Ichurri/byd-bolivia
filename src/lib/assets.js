export function assetUrl(path, base = import.meta.env.BASE_URL) {
  const normalizedBase = base.replace(/\/?$/, '/')
  const normalizedPath = path.replace(/^\/+/, '')

  return `${normalizedBase}${normalizedPath}`
}
