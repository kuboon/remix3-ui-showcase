import { run } from 'remix/ui'

// Boots the client-side Remix UI runtime. Every `clientEntry(...)` rendered on
// the server is hydrated here by importing its browser module and reading the
// matching export, so the showcase demos become interactive in the browser.
run({
  async loadModule(moduleUrl, exportName) {
    let mod = await import(moduleUrl)
    return mod[exportName]
  },
  async resolveFrame(src, signal) {
    let response = await fetch(src, { headers: { Accept: 'text/html' }, signal })
    if (!response.ok) {
      return `<pre>Frame error: ${response.status} ${response.statusText}</pre>`
    }

    if (response.body) return response.body
    return await response.text()
  },
})
