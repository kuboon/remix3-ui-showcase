import { run } from 'remix/ui'

// Boots the client-side Remix UI runtime. Every `clientEntry(...)` rendered on
// the server is hydrated here by importing its browser module and reading the
// matching export, so the showcase demos become interactive in the browser.
run({
  async loadModule(moduleUrl, exportName) {
    let mod = await import(moduleUrl)
    return mod[exportName]
  },
  resolveFrame(src, options) {
    let method = options?.method ?? 'GET'
    return fetch(src, {
      method,
      headers: { Accept: 'text/html' },
      body: method === 'GET' ? undefined : options?.formData,
    })
  },
})
