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

export function basePathFromEnv(env: NodeJS.ProcessEnv = process.env): string {
  // The reusable Pages workflow (kuboon/workflows) passes a full `BASE_URL`
  // (e.g. https://user.github.io/repo or .../repo/<pr-fragment>); derive the base
  // path from its pathname. Fall back to the plain `PUBLIC_BASE_PATH` for local
  // builds and other CI.
  let baseUrl = env.BASE_URL
  if (baseUrl) {
    let pathname = baseUrl
    try {
      pathname = new URL(baseUrl).pathname
    } catch {
      // Not an absolute URL — treat the value itself as the base path.
    }
    return normalizeBasePath(pathname)
  }

  return normalizeBasePath(env.PUBLIC_BASE_PATH)
}

export const publicBasePath = basePathFromEnv()
export const homePath = createHomePath(publicBasePath)

export function withPublicBasePath(pathname: string): string {
  return withBasePath(publicBasePath, pathname)
}
