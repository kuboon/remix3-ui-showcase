import { clientEntry, css, on, type Handle } from 'remix/ui'
import { Button } from 'remix/ui/button'
import { Glyph } from 'remix/ui/glyph'
import { lockScroll } from 'remix/ui/scroll-lock'
import { theme } from 'remix/ui/theme'

import { DemoCard, Readout } from '../lib/controls.tsx'

export const ScrollLockDemo = clientEntry(
  import.meta.url,
  function ScrollLockDemo(handle: Handle) {
    let locked = false
    let release: (() => void) | null = null

    function setLocked(next: boolean) {
      if (next && !release) {
        release = lockScroll(document)
      } else if (!next && release) {
        release()
        release = null
      }
      locked = next
      void handle.update()
    }

    // Always release the lock if this demo is removed from the tree.
    handle.signal.addEventListener('abort', () => release?.())

    return () => (
      <DemoCard
        id="scroll-lock"
        title="Scroll lock"
        badge="remix/ui/scroll-lock"
        tagline="Freeze page scrolling while an overlay is open, then restore it on release."
        stage={
          <div mix={css({ display: 'grid', gap: '14px', placeItems: 'center' })}>
            <span
              aria-live="polite"
              mix={css({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: theme.radius.full,
                fontSize: theme.fontSize.sm,
                fontWeight: theme.fontWeight.semibold,
                color: locked ? theme.colors.action.danger.background : theme.colors.text.muted,
                background: locked
                  ? 'color-mix(in srgb, var(--rmx-color-action-danger-background) 12%, transparent)'
                  : theme.surface.lvl2,
              })}
            >
              <Glyph name={locked ? 'alert' : 'check'} mix={css({ width: '16px', height: '16px' })} />
              {locked ? 'Page scroll is locked' : 'Page scroll is free'}
            </span>
            <Button
              tone={locked ? 'danger' : 'primary'}
              mix={on('click', () => setLocked(!locked))}
            >
              {locked ? 'Unlock page scroll' : 'Lock page scroll'}
            </Button>
          </div>
        }
        controls={<Readout>{`const release = lockScroll(document)\n// release() to restore scrolling\nlocked = ${locked}`}</Readout>}
        note="While locked, try scrolling the page — it stays put until you unlock."
      />
    )
  },
)
