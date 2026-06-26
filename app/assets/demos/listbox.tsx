import { clientEntry, css, type Handle } from 'remix/ui'
import { Glyph } from 'remix/ui/glyph'
import * as listbox from 'remix/ui/listbox'
import type { ListboxValue } from 'remix/ui/listbox'
import { theme } from 'remix/ui/theme'

import { DemoCard, Readout } from '../lib/controls.tsx'

const options = [
  { value: 'remix', label: 'Remix' },
  { value: 'react-router', label: 'React Router', disabled: true },
  { value: 'react', label: 'React' },
  { value: 'preact', label: 'Preact' },
  { value: 'solid', label: 'Solid' },
]

export const ListboxDemo = clientEntry(
  import.meta.url,
  function ListboxDemo(handle: Handle) {
    let value: ListboxValue = 'remix'
    let activeValue: ListboxValue = 'remix'

    return () => (
      <DemoCard
        id="listbox"
        title="Listbox"
        badge="remix/ui/listbox"
        tagline="The headless option-list primitive with controlled selection and highlighting."
        stage={
          <listbox.Context
            value={value}
            activeValue={activeValue}
            onSelect={(next) => {
              value = next
              void handle.update()
            }}
            onHighlight={(next) => {
              activeValue = next
              void handle.update()
            }}
          >
            <div
              aria-label="Frameworks"
              tabIndex={0}
              mix={[
                listbox.listStyle,
                listbox.list(),
                css({
                  width: 'min(320px, 100%)',
                  background: theme.surface.lvl0,
                  border: `1px solid ${theme.colors.border.subtle}`,
                  borderRadius: theme.radius.md,
                  padding: '6px',
                }),
              ]}
            >
              {options.map((option) => (
                <div key={option.value} mix={[listbox.optionStyle, listbox.option(option)]}>
                  <Glyph mix={listbox.glyphStyle} name="check" />
                  <span mix={listbox.labelStyle}>{option.label}</span>
                </div>
              ))}
            </div>
          </listbox.Context>
        }
        controls={<Readout>{`value      = "${value ?? 'null'}"\nhighlighted = "${activeValue ?? 'null'}"`}</Readout>}
        note="Selection and highlighting are fully controlled — arrow keys, typeahead, and click all route through onSelect / onHighlight."
      />
    )
  },
)
