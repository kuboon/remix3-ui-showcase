# Remix 3 UI Showcase

An interactive showcase of **every first-party component in `remix/ui`** plus the
**`remix/ui/animation`** primitives, built on the
[Remix 3 template](https://github.com/remix-run/remix/tree/main/template) shape.

Every preview is a server-rendered, client-hydrated Remix island whose parameters
you can change live in the browser.

## What's inside

**Components** (`remix/ui/*`):

- `button` — tone + size style mixin
- `input` — text field mixin, standalone or framed with inline icons
- `checkbox` — native checkbox mixin with mixed (indeterminate) state
- `radio` — native radio group mixin
- `toggle` — native checkbox rendered as a switch
- `breadcrumbs` — semantic breadcrumb navigation
- `tabs` — tab control with matching panels
- `accordion` — single / multiple disclosure sets
- `menu` — checkbox, radio, and submenu items
- `select` — button-triggered value picker
- `combobox` — input-first filtered picker
- `listbox` — the headless option-list primitive
- `popover` — anchored, dismissible surfaces
- `anchor` — the floating-element positioning engine

**Animation** (`remix/ui/animation`): `spring`, `tween`, `animateEntrance` /
`animateExit`, and `animateLayout`, each with adjustable presets, curves, and
parameters.

## How it works

- `app/assets/entry.ts` boots the client runtime with `run(...)`.
- Each demo under `app/assets/demos/*` is a `clientEntry(...)` island. The server
  streams its HTML and the client hydrates it, loading the module by URL.
- remix/ui 0.5.0 components are self-styled; the page chrome uses local design
  tokens (`app/assets/lib/tokens.ts`) and a small inline-SVG icon set
  (`app/assets/lib/icons.tsx`).
- The asset server (`app/assets.ts`) compiles and serves the demo modules and their
  `remix/ui` dependencies as browser ES modules.
- `build.ts` walks the hydration module graph for the static GitHub Pages build,
  emitting every transitive module, rewriting `.ts`/`.tsx` URLs to `.js` (so they
  load with a JavaScript MIME type), and decoding percent-escaped paths.

## Commands

```sh
npm install
npm run dev
npm run typecheck
npm test
npm run build
```

## GitHub Pages

The base path is controlled by `PUBLIC_BASE_PATH`.

- local: unset (`/`)
- GitHub Actions: `/${repository-name}`
