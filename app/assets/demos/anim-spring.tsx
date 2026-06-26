import { clientEntry, css, on, type Handle } from 'remix/ui'
import { Button } from 'remix/ui/button'
import { Glyph } from 'remix/ui/glyph'
import { spring, type SpringPreset } from 'remix/ui/animation'
import { theme } from 'remix/ui/theme'

import { springPresets } from '../lib/anim.ts'
import { ControlGrid, DemoCard, Field, Readout, Segmented, Slider } from '../lib/controls.tsx'

export const SpringDemo = clientEntry(
  import.meta.url,
  function SpringDemo(handle: Handle) {
    let mode = 'bouncy'
    let duration = 400
    let bounce = 0.3
    let moved = false

    return () => {
      let custom = mode === 'custom'
      let transition = custom
        ? spring.transition('transform', { duration, bounce })
        : spring.transition('transform', mode as SpringPreset)
      let easing = custom ? spring({ duration, bounce }).easing : spring(mode as SpringPreset).easing

      return (
        <DemoCard
          id="animation-spring"
          title="Spring"
          badge="animation · spring"
          tagline="SwiftUI-style spring physics, stringified into a CSS linear() transition."
          stage={
            <div mix={css({ width: '100%', display: 'grid', gap: '20px', placeItems: 'center' })}>
              <div mix={css({ position: 'relative', width: 'min(320px, 100%)', height: '56px' })}>
                <div
                  style={{ transform: moved ? 'translateX(calc(100% - 56px))' : 'translateX(0)', transition }}
                  mix={css({
                    position: 'absolute',
                    width: '56px',
                    height: '56px',
                    borderRadius: theme.radius.lg,
                    background: theme.colors.action.primary.background,
                    boxShadow: theme.shadow.lg,
                  })}
                />
              </div>
              <Button
                tone="secondary"
                startIcon={<Glyph name="open" />}
                mix={on('click', () => {
                  moved = !moved
                  void handle.update()
                })}
              >
                {moved ? 'Send back' : 'Animate'}
              </Button>
            </div>
          }
          controls={
            <>
              <Field label="preset">
                <Segmented
                  options={[...springPresets, { value: 'custom', label: 'custom' }]}
                  value={mode}
                  onChange={(value) => {
                    mode = value
                    void handle.update()
                  }}
                />
              </Field>
              {custom ? (
                <ControlGrid columns={2}>
                  <Field label="duration" hint={`${duration}ms`}>
                    <Slider
                      min={150}
                      max={1200}
                      step={50}
                      value={duration}
                      onChange={(value) => {
                        duration = value
                        void handle.update()
                      }}
                    />
                  </Field>
                  <Field label="bounce" hint={bounce.toFixed(2)}>
                    <Slider
                      min={-0.5}
                      max={0.7}
                      step={0.05}
                      value={bounce}
                      onChange={(value) => {
                        bounce = value
                        void handle.update()
                      }}
                    />
                  </Field>
                </ControlGrid>
              ) : null}
              <Readout>{`transition: transform ${easing}`}</Readout>
            </>
          }
        />
      )
    }
  },
)
