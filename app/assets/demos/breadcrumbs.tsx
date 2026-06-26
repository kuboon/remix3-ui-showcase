import { clientEntry, type Handle } from 'remix/ui'
import { Breadcrumbs } from 'remix/ui/breadcrumbs'

import { DemoCard, Field, Readout, Segmented, Slider } from '../lib/controls.tsx'

const fullPath = [
  { href: '/', label: 'Home' },
  { href: '/components', label: 'Components' },
  { href: '/components/navigation', label: 'Navigation' },
  { href: '/components/navigation/breadcrumbs', label: 'Breadcrumbs' },
  { label: 'Overview' },
]

const separators = [
  { value: 'chevron', label: 'Chevron' },
  { value: 'slash', label: '/' },
  { value: 'arrow', label: '›' },
  { value: 'dot', label: '•' },
]

export const BreadcrumbsDemo = clientEntry(
  import.meta.url,
  function BreadcrumbsDemo(handle: Handle) {
    let depth = 4
    let separator = 'chevron'

    return () => {
      let items = fullPath.slice(0, depth)
      // The last visible crumb is treated as current automatically.
      let separatorNode =
        separator === 'slash' ? '/' : separator === 'arrow' ? '›' : separator === 'dot' ? '•' : undefined

      return (
        <DemoCard
          id="breadcrumbs"
          title="Breadcrumbs"
          badge="remix/ui/breadcrumbs"
          tagline="Semantic breadcrumb navigation built from a list of items."
          stage={<Breadcrumbs items={items} separator={separatorNode} />}
          controls={
            <>
              <Field label="depth" hint={`${depth} items`}>
                <Slider
                  min={2}
                  max={fullPath.length}
                  value={depth}
                  onChange={(value) => {
                    depth = value
                    void handle.update()
                  }}
                />
              </Field>
              <Field label="separator">
                <Segmented
                  options={separators}
                  value={separator}
                  onChange={(value) => {
                    separator = value
                    void handle.update()
                  }}
                />
              </Field>
              <Readout>
                {separatorNode
                  ? `<Breadcrumbs items={items} separator="${separatorNode}" />`
                  : `<Breadcrumbs items={items} />`}
              </Readout>
            </>
          }
        />
      )
    }
  },
)
