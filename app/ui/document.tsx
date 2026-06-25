import type { Handle, RemixNode } from 'remix/ui'
import { css } from 'remix/ui'
import { RMX_01, RMX_01_GLYPHS } from 'remix/ui/theme'

import { withPublicBasePath } from '../config.ts'
import { routes } from '../routes.ts'

export interface DocumentProps {
  children?: RemixNode
  head?: RemixNode
  title?: string
}

const DEFAULT_TITLE = 'Remix 3 UI Showcase'

export function Document(handle: Handle<DocumentProps>) {
  return () => {
    let { children, head, title = DEFAULT_TITLE } = handle.props

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/svg+xml" href={withPublicBasePath('/favicon.svg')} />
          <title>{title}</title>
          {/* Install the built-in Remix UI design tokens as CSS custom properties. */}
          <RMX_01 />
          {head}
        </head>
        <body mix={css({ margin: 0 })}>
          {/* The shared SVG sprite sheet that every <Glyph /> references. */}
          <RMX_01_GLYPHS />
          {children}
          <script type="module" src={routes.assets.href({ path: 'app/assets/entry.ts' })}></script>
        </body>
      </html>
    )
  }
}
