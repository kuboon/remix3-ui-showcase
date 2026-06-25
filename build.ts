import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import { homePath, publicBasePath, stripBasePath } from './app/config.ts'
import { router } from './app/router.ts'

const rootDir = process.cwd()
const buildDir = path.join(rootDir, 'build')
const publicDir = path.join(rootDir, 'public')
const origin = 'https://example.test'

async function main() {
  await fs.rm(buildDir, { recursive: true, force: true })
  await fs.mkdir(buildDir, { recursive: true })

  await copyDirectory(publicDir, buildDir)

  let html = await renderPage(homePath)
  await fs.writeFile(path.join(buildDir, 'index.html'), html)
  await fs.writeFile(path.join(buildDir, '404.html'), html)

  for (let assetPath of extractAssetPaths(html)) {
    await writeAssetFile(assetPath)
  }
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

function extractAssetPaths(html: string) {
  let assetPrefix = publicBasePath ? `${publicBasePath}/assets/` : '/assets/'
  let matches = new Set<string>()

  for (let match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    let href = match[1]
    if (href?.startsWith(assetPrefix)) {
      matches.add(href)
    }
  }

  return [...matches]
}

async function writeAssetFile(assetPath: string) {
  let response = await router.fetch(new Request(new URL(assetPath, origin)))
  if (!response.ok) {
    throw new Error(`Failed to build asset ${assetPath}: ${response.status} ${response.statusText}`)
  }

  let targetPath = toBuildPath(assetPath)
  await fs.mkdir(path.dirname(targetPath), { recursive: true })
  await fs.writeFile(targetPath, Buffer.from(await response.arrayBuffer()))
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
