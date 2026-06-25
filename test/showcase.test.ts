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
  assert.match(html, /Theme and UI components in one focused starter\./)
  assert.match(html, /Reusable UI components styled by the same theme/)
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
