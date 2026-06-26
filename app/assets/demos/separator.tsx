import { clientEntry, css, type Handle } from 'remix/ui'
import { separatorStyle } from 'remix/ui/separator'
import { theme } from 'remix/ui/theme'

import { DemoCard, Field, Readout, Segmented } from '../lib/controls.tsx'

const orientations = [
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'vertical', label: 'Vertical' },
]

const labelStyle = css({ fontSize: theme.fontSize.sm, color: theme.colors.text.secondary })

export const SeparatorDemo = clientEntry(
  import.meta.url,
  function SeparatorDemo(handle: Handle) {
    let orientation = 'horizontal'

    return () => {
      let vertical = orientation === 'vertical'
      return (
        <DemoCard
          id="separator"
          title="Separator"
          badge="remix/ui/separator"
          tagline="The shared `separatorStyle` mixin for dividing content groups."
          stage={
            vertical ? (
              <div
                mix={css({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  height: '60px',
                })}
              >
                <span mix={labelStyle}>Overview</span>
                <hr
                  aria-orientation="vertical"
                  mix={[separatorStyle, css({ width: '1px', height: '100%', margin: 0 })]}
                />
                <span mix={labelStyle}>Activity</span>
                <hr
                  aria-orientation="vertical"
                  mix={[separatorStyle, css({ width: '1px', height: '100%', margin: 0 })]}
                />
                <span mix={labelStyle}>Settings</span>
              </div>
            ) : (
              <div mix={css({ display: 'grid', gap: '14px', width: 'min(360px, 100%)' })}>
                <span mix={labelStyle}>Profile details</span>
                <hr mix={separatorStyle} />
                <span mix={labelStyle}>Notification preferences</span>
                <hr mix={separatorStyle} />
                <span mix={labelStyle}>Danger zone</span>
              </div>
            )
          }
          controls={
            <>
              <Field label="orientation">
                <Segmented
                  options={orientations}
                  value={orientation}
                  onChange={(value) => {
                    orientation = value
                    void handle.update()
                  }}
                />
              </Field>
              <Readout>{`<hr mix={separatorStyle} />`}</Readout>
            </>
          }
        />
      )
    }
  },
)
