export function normalizeBasePath(value: string | undefined): string {
  if (value == null) {
    return ''
  }

  let trimmed = value.trim()
  if (!trimmed || trimmed === '/') {
    return ''
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`
}

export function createHomePath(basePath: string): string {
  return basePath ? `${basePath}/` : '/'
}

export function withBasePath(basePath: string, pathname: string): string {
  let normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  return basePath ? `${basePath}${normalizedPathname}` : normalizedPathname
}

export function stripBasePath(basePath: string, pathname: string): string {
  if (!basePath || !pathname.startsWith(basePath)) {
    return pathname
  }

  let stripped = pathname.slice(basePath.length)
  return stripped || '/'
}

export const publicBasePath = normalizeBasePath(process.env.PUBLIC_BASE_PATH)
export const homePath = createHomePath(publicBasePath)

export function withPublicBasePath(pathname: string): string {
  return withBasePath(publicBasePath, pathname)
}
