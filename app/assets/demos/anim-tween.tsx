import { clientEntry, css, on, ref, type Handle } from 'remix/ui'
import { Button } from 'remix/ui/button'
import { Glyph } from 'remix/ui/glyph'
import { easings, tween } from 'remix/ui/animation'
import { theme } from 'remix/ui/theme'

import { DemoCard, Field, Readout, Segmented, Slider } from '../lib/controls.tsx'

const curveOptions = [
  { value: 'linear', label: 'linear' },
  { value: 'ease', label: 'ease' },
  { value: 'easeIn', label: 'easeIn' },
  { value: 'easeOut', label: 'easeOut' },
  { value: 'easeInOut', label: 'easeInOut' },
]

export const TweenDemo = clientEntry(
  import.meta.url,
  function TweenDemo(handle: Handle) {
    let curve = 'easeOut'
    let duration = 700
    let barEl: HTMLElement | null = null
    let labelEl: HTMLElement | null = null
    let running = false

    function run() {
      if (running || !barEl) return
      running = true
      let animation = tween({ from: 0, to: 100, duration, curve: easings[curve as keyof typeof easings] })
      animation.next()
      function tick(timestamp: number) {
        if (handle.signal.aborted) return
        let { value, done } = animation.next(timestamp)
        if (barEl) barEl.style.width = `${value}%`
        if (labelEl) labelEl.textContent = `${Math.round(value)}%`
        if (!done) {
          requestAnimationFrame(tick)
        } else {
          running = false
        }
      }
      requestAnimationFrame(tick)
    }

    return () => (
      <DemoCard
        id="animation-tween"
        title="Tween"
        badge="animation · tween"
        tagline="A generator that interpolates a value over time with a cubic-bezier curve."
        stage={
          <div mix={css({ width: 'min(360px, 100%)', display: 'grid', gap: '16px' })}>
            <div
              mix={css({
                position: 'relative',
                height: '20px',
                borderRadius: theme.radius.full,
                background: theme.surface.lvl3,
                overflow: 'hidden',
                border: `1px solid ${theme.colors.border.subtle}`,
              })}
            >
              <div
                mix={[
                  ref((node) => {
                    barEl = node as HTMLElement
                  }),
                  css({ height: '100%', width: '0%', background: theme.colors.action.primary.background }),
                ]}
              />
            </div>
            <div mix={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
              <span
                mix={[
                  ref((node) => {
                    labelEl = node as HTMLElement
                  }),
                  css({ fontFamily: 'monospace', fontSize: theme.fontSize.sm, color: theme.colors.text.secondary }),
                ]}
              >
                0%
              </span>
              <Button tone="primary" startIcon={<Glyph name="open" />} mix={on('click', () => run())}>
                Run tween
              </Button>
            </div>
          </div>
        }
        controls={
          <>
            <Field label="curve">
              <Segmented
                options={curveOptions}
                value={curve}
                onChange={(value) => {
                  curve = value
                  void handle.update()
                }}
              />
            </Field>
            <Field label="duration" hint={`${duration}ms`}>
              <Slider
                min={200}
                max={2000}
                step={100}
                value={duration}
                onChange={(value) => {
                  duration = value
                  void handle.update()
                }}
              />
            </Field>
            <Readout>{`tween({ from: 0, to: 100, duration: ${duration}, curve: easings.${curve} })`}</Readout>
          </>
        }
      />
    )
  },
)
