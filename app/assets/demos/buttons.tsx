import { clientEntry, type Handle } from 'remix/ui'
import { Button, type ButtonTone } from 'remix/ui/button'
import { Glyph } from 'remix/ui/glyph'

import { ControlGrid, DemoCard, Field, Readout, Segmented, Toggle } from '../lib/controls.tsx'

const tones: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'danger', label: 'Danger' },
]

export const ButtonsDemo = clientEntry(
  import.meta.url,
  function ButtonsDemo(handle: Handle) {
    let tone = 'primary'
    let startIcon = true
    let endIcon = false
    let disabled = false

    return () => {
      let attrs = [
        `tone="${tone}"`,
        startIcon ? 'startIcon={<Glyph name="add" />}' : null,
        endIcon ? 'endIcon={<Glyph name="chevronRight" />}' : null,
        disabled ? 'disabled' : null,
      ]
        .filter(Boolean)
        .join(' ')

      return (
        <DemoCard
          id="button"
          title="Button"
          badge="remix/ui/button"
          tagline="The shared action button with tone treatments and optional icon slots."
          stage={
            <Button
              tone={tone as ButtonTone}
              disabled={disabled}
              startIcon={startIcon ? <Glyph name="add" /> : undefined}
              endIcon={endIcon ? <Glyph name="chevronRight" /> : undefined}
            >
              Create project
            </Button>
          }
          controls={
            <>
              <Field label="tone">
                <Segmented
                  options={tones}
                  value={tone}
                  onChange={(value) => {
                    tone = value
                    void handle.update()
                  }}
                />
              </Field>
              <ControlGrid columns={3}>
                <Toggle
                  label="startIcon"
                  checked={startIcon}
                  onChange={(value) => {
                    startIcon = value
                    void handle.update()
                  }}
                />
                <Toggle
                  label="endIcon"
                  checked={endIcon}
                  onChange={(value) => {
                    endIcon = value
                    void handle.update()
                  }}
                />
                <Toggle
                  label="disabled"
                  checked={disabled}
                  onChange={(value) => {
                    disabled = value
                    void handle.update()
                  }}
                />
              </ControlGrid>
              <Readout>{`<Button ${attrs}>Create project</Button>`}</Readout>
            </>
          }
        />
      )
    }
  },
)
