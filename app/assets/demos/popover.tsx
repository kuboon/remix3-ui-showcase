import { clientEntry, css, on, type Handle } from 'remix/ui'
import { Button } from 'remix/ui/button'
import { Glyph } from 'remix/ui/glyph'
import * as popover from 'remix/ui/popover'
import { theme } from 'remix/ui/theme'

import { DemoCard, Field, Readout, Segmented, Slider } from '../lib/controls.tsx'

const placements = [
  { value: 'bottom-start', label: 'bottom-start' },
  { value: 'bottom-end', label: 'bottom-end' },
  { value: 'top-start', label: 'top-start' },
  { value: 'top-end', label: 'top-end' },
  { value: 'left', label: 'left' },
  { value: 'right', label: 'right' },
]

type Placement =
  | 'bottom-start'
  | 'bottom-end'
  | 'top-start'
  | 'top-end'
  | 'left'
  | 'right'

export const PopoverDemo = clientEntry(
  import.meta.url,
  function PopoverDemo(handle: Handle) {
    let open = false
    let placement = 'bottom-start'
    let offset = 8

    return () => (
      <DemoCard
        id="popover"
        title="Popover"
        badge="remix/ui/popover"
        tagline="The low-level anchored, dismissible floating surface primitive."
        stage={
          <popover.Context>
            <Button
              endIcon={<Glyph name="chevronDown" />}
              tone="secondary"
              mix={[
                popover.anchor({ placement: placement as Placement, offset }),
                popover.focusOnHide(),
                on('click', () => {
                  open = true
                  void handle.update()
                }),
              ]}
            >
              View options
            </Button>

            <div
              mix={[
                popover.surfaceStyle,
                popover.surface({
                  open,
                  onHide() {
                    open = false
                    void handle.update()
                  },
                }),
              ]}
            >
              <div mix={[popover.contentStyle, css({ display: 'grid', gap: '8px', padding: '12px', minWidth: '200px' })]}>
                <strong mix={css({ fontSize: theme.fontSize.sm })}>Display options</strong>
                <label mix={rowStyle}>
                  <input type="checkbox" defaultChecked /> Show grid lines
                </label>
                <label mix={rowStyle}>
                  <input type="checkbox" /> Compact rows
                </label>
                <Button
                  tone="ghost"
                  mix={[
                    popover.focusOnShow(),
                    on('click', () => {
                      open = false
                      void handle.update()
                    }),
                  ]}
                >
                  Close
                </Button>
              </div>
            </div>
          </popover.Context>
        }
        controls={
          <>
            <Field label="placement">
              <Segmented
                options={placements}
                value={placement}
                onChange={(value) => {
                  placement = value
                  void handle.update()
                }}
              />
            </Field>
            <Field label="offset" hint={`${offset}px`}>
              <Slider
                min={0}
                max={24}
                value={offset}
                onChange={(value) => {
                  offset = value
                  void handle.update()
                }}
              />
            </Field>
            <Readout>{`popover.anchor({ placement: "${placement}", offset: ${offset} })`}</Readout>
          </>
        }
        note="Opening locks page scroll; Escape or an outside click dismisses and restores focus."
      />
    )
  },
)

const rowStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: theme.fontSize.sm,
  color: theme.colors.text.secondary,
})
