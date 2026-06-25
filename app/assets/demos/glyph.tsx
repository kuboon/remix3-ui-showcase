import { clientEntry, css, on, type Handle } from 'remix/ui'
import { Glyph, type GlyphName } from 'remix/ui/glyph'
import { theme } from 'remix/ui/theme'

import { DemoCard, Field, Readout, Segmented, Slider } from '../lib/controls.tsx'

const glyphNames: GlyphName[] = [
  'add',
  'alert',
  'check',
  'chevronDown',
  'chevronUp',
  'chevronRight',
  'chevronVertical',
  'close',
  'copy',
  'edit',
  'expand',
  'info',
  'menu',
  'open',
  'search',
  'spinner',
  'trash',
]

const colors = [
  { value: 'primary', label: 'Primary', token: theme.colors.action.primary.background },
  { value: 'text', label: 'Text', token: theme.colors.text.primary },
  { value: 'muted', label: 'Muted', token: theme.colors.text.muted },
  { value: 'danger', label: 'Danger', token: theme.colors.action.danger.background },
] as const

export const GlyphDemo = clientEntry(
  import.meta.url,
  function GlyphDemo(handle: Handle) {
    let name: GlyphName = 'search'
    let size = 48
    let color = 'primary'

    return () => {
      let token = colors.find((c) => c.value === color)?.token ?? theme.colors.text.primary
      return (
        <DemoCard
          id="glyph"
          title="Glyph"
          badge="remix/ui/glyph"
          tagline="References into a shared SVG sprite sheet rendered once per document."
          stage={
            <div mix={css({ display: 'grid', gap: '20px', placeItems: 'center', width: '100%' })}>
              <Glyph
                name={name}
                aria-label={name}
                mix={css({ width: `${size}px`, height: `${size}px`, color: token })}
              />
              <div
                mix={css({
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(46px, 1fr))',
                  gap: '8px',
                  width: '100%',
                })}
              >
                {glyphNames.map((glyph) => (
                  <button
                    key={glyph}
                    type="button"
                    title={glyph}
                    aria-label={glyph}
                    mix={[
                      css({
                        display: 'grid',
                        placeItems: 'center',
                        padding: '10px',
                        borderRadius: theme.radius.md,
                        cursor: 'pointer',
                        color: glyph === name ? theme.colors.action.primary.foreground : theme.colors.text.secondary,
                        background: glyph === name ? theme.colors.action.primary.background : theme.surface.lvl0,
                        border: `1px solid ${theme.colors.border.subtle}`,
                      }),
                      on('click', () => {
                        name = glyph
                        void handle.update()
                      }),
                    ]}
                  >
                    <Glyph name={glyph} mix={css({ width: '20px', height: '20px' })} />
                  </button>
                ))}
              </div>
            </div>
          }
          controls={
            <>
              <Field label="color">
                <Segmented
                  options={colors.map((c) => ({ value: c.value, label: c.label }))}
                  value={color}
                  onChange={(value) => {
                    color = value
                    void handle.update()
                  }}
                />
              </Field>
              <Field label="size" hint={`${size}px`}>
                <Slider
                  min={16}
                  max={96}
                  step={4}
                  value={size}
                  onChange={(value) => {
                    size = value
                    void handle.update()
                  }}
                />
              </Field>
              <Readout>{`<Glyph name="${name}" />`}</Readout>
            </>
          }
        />
      )
    }
  },
)
