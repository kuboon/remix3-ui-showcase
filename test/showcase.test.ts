import assert from 'node:assert/strict'
import test from 'node:test'

import {
  createHomePath,
  homePath,
  normalizeBasePath,
  stripBasePath,
  withBasePath,
} from '../app/config.ts'
import { router } from '../app/router.ts'

test('renders the showcase home page', async () => {
  let response = await router.fetch(
    new Request(new URL(homePath, 'https://example.test'), {
      headers: { Accept: 'text/html' },
    }),
  )

  assert.equal(response.status, 200)

  let html = await response.text()
  assert.match(html, /Remix 3 UI Showcase/)
  assert.match(html, /Interactive UI &amp; animation showcase/)
  assert.match(html, /Every first-party component in remix\/ui/)
})

test('shows the installed package versions', async () => {
  let response = await router.fetch(
    new Request(new URL(homePath, 'https://example.test'), {
      headers: { Accept: 'text/html' },
    }),
  )

  let html = await response.text()
  assert.match(html, /Package versions/)
  // Read from package.json / node_modules at render time, so the real installed
  // versions appear (Remix 3 beta and the remix/ui line).
  assert.match(html, /3\.0\.0-beta\.\d+/)
  assert.match(html, /remix\/ui/)
})

test('server-renders the component demos as hydration islands', async () => {
  let response = await router.fetch(
    new Request(new URL(homePath, 'https://example.test'), {
      headers: { Accept: 'text/html' },
    }),
  )

  let html = await response.text()
  // Hydration metadata names each client entry that boots in the browser.
  assert.match(html, /"exportName":"ButtonsDemo"/)
  assert.match(html, /"exportName":"TabsDemo"/)
  assert.match(html, /"exportName":"SpringDemo"/)
  // SSR output for a few representative demos.
  assert.match(html, /Create project/)
  assert.match(html, /Search airports or codes/)
})

test('normalizes GitHub Pages base paths', () => {
  assert.equal(normalizeBasePath(undefined), '')
  assert.equal(normalizeBasePath('/'), '')
  assert.equal(normalizeBasePath('remix3-ui-showcase/'), '/remix3-ui-showcase')
  assert.equal(createHomePath('/remix3-ui-showcase'), '/remix3-ui-showcase/')
  assert.equal(
    withBasePath('/remix3-ui-showcase', '/assets/entry.js'),
    '/remix3-ui-showcase/assets/entry.js',
  )
  assert.equal(
    stripBasePath('/remix3-ui-showcase', '/remix3-ui-showcase/assets/entry.js'),
    '/assets/entry.js',
  )
})
