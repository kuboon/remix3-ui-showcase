import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import { homePath, publicBasePath, stripBasePath } from './app/config.ts'
import { router } from './app/router.ts'

const rootDir = process.cwd()
const buildDir = path.join(rootDir, 'build')
const publicDir = path.join(rootDir, 'public')
const origin = 'https://example.test'
const assetPrefix = publicBasePath ? `${publicBasePath}/assets/` : '/assets/'

// Static hosts (GitHub Pages) serve files by extension, and `.ts`/`.tsx` map to
// non-JavaScript MIME types that browsers refuse to execute as ES modules. The
// build rewrites every emitted module — and every reference to one — to `.js`.
const tsRefPattern = new RegExp(`(${escapeRegExp(assetPrefix)}[^"']+?)\\.tsx?(["'])`, 'g')

function rewriteModuleExtensions(source: string) {
  return source.replace(tsRefPattern, '$1.js$2')
}

function toJsExtension(assetPath: string) {
  return assetPath.replace(/\.tsx?$/, '.js')
}

async function main() {
  await fs.rm(buildDir, { recursive: true, force: true })
  await fs.mkdir(buildDir, { recursive: true })

  await copyDirectory(publicDir, buildDir)

  let html = await renderPage(homePath)
  let rewrittenHtml = rewriteModuleExtensions(html)
  await fs.writeFile(path.join(buildDir, 'index.html'), rewrittenHtml)
  await fs.writeFile(path.join(buildDir, '404.html'), rewrittenHtml)

  // The page hydrates many `clientEntry` islands, each dynamically imported in
  // the browser. Seed the crawl from every asset URL referenced by the HTML
  // (script tags + the `rmx-data` hydration module URLs) and then walk the
  // import graph of each emitted module so every transitive dependency is
  // written out for the static GitHub Pages deploy.
  let queue = extractAssetPaths(html)
  let written = new Set<string>()

  while (queue.length > 0) {
    let assetPath = queue.shift()!
    if (written.has(assetPath)) continue
    written.add(assetPath)

    let body = await writeAssetFile(assetPath)
    if (body != null) {
      for (let next of extractAssetPaths(body)) {
        if (!written.has(next)) queue.push(next)
      }
    }
  }

  console.log(`Wrote ${written.size} asset files to ${path.relative(rootDir, buildDir)}/`)
}

async function renderPage(pathname: string) {
  let response = await router.fetch(
    new Request(new URL(pathname, origin), {
      headers: { Accept: 'text/html' },
    }),
  )

  if (!response.ok) {
    throw new Error(`Failed to render ${pathname}: ${response.status} ${response.statusText}`)
  }

  return await response.text()
}

function extractAssetPaths(source: string) {
  let matches = new Set<string>()

  // Any quoted asset-prefixed string: covers HTML `src`/`href`, the JSON
  // `moduleUrl` hydration entries, and `import`/`import(...)` specifiers in the
  // compiled module output.
  let pattern = new RegExp(`["'](${escapeRegExp(assetPrefix)}[^"']+)["']`, 'g')
  for (let match of source.matchAll(pattern)) {
    let href = match[1]
    if (href) {
      matches.add(href)
    }
  }

  return [...matches]
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const textAssetTypes = ['javascript', 'json', 'css']

async function writeAssetFile(assetPath: string): Promise<string | null> {
  let response = await router.fetch(new Request(new URL(assetPath, origin)))
  if (!response.ok) {
    throw new Error(`Failed to build asset ${assetPath}: ${response.status} ${response.statusText}`)
  }

  let buffer = Buffer.from(await response.arrayBuffer())

  // Crawl using the original (`.ts`/`.tsx`) URLs the dev router understands, but
  // write modules to `.js` paths with their references rewritten to match.
  let contentType = response.headers.get('Content-Type') ?? ''
  let isText = textAssetTypes.some((type) => contentType.includes(type))
  let originalText = isText ? buffer.toString('utf8') : null

  let targetPath = toBuildPath(toJsExtension(assetPath))
  await fs.mkdir(path.dirname(targetPath), { recursive: true })
  await fs.writeFile(targetPath, originalText != null ? rewriteModuleExtensions(originalText) : buffer)

  return originalText
}

function toBuildPath(assetPath: string) {
  let pathname = new URL(assetPath, origin).pathname
  let normalizedPath = stripBasePath(publicBasePath, pathname).replace(/^\/+/, '')
  return path.join(buildDir, normalizedPath)
}

async function copyDirectory(sourceDir: string, targetDir: string) {
  try {
    let entries = await fs.readdir(sourceDir, { withFileTypes: true })
    for (let entry of entries) {
      let sourcePath = path.join(sourceDir, entry.name)
      let targetPath = path.join(targetDir, entry.name)

      if (entry.isDirectory()) {
        await fs.mkdir(targetPath, { recursive: true })
        await copyDirectory(sourcePath, targetPath)
      } else if (entry.isFile()) {
        await fs.copyFile(sourcePath, targetPath)
      }
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error
    }
  }
}

await main()
