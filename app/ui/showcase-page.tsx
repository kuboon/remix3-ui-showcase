import { css, type RemixNode } from 'remix/ui'
import { theme } from 'remix/ui/theme'

import { AccordionDemo } from '../assets/demos/accordion.tsx'
import { EntranceExitDemo } from '../assets/demos/anim-entrance.tsx'
import { LayoutDemo } from '../assets/demos/anim-layout.tsx'
import { SpringDemo } from '../assets/demos/anim-spring.tsx'
import { TweenDemo } from '../assets/demos/anim-tween.tsx'
import { AnchorDemo } from '../assets/demos/anchor.tsx'
import { BreadcrumbsDemo } from '../assets/demos/breadcrumbs.tsx'
import { ButtonsDemo } from '../assets/demos/buttons.tsx'
import { ComboboxDemo } from '../assets/demos/combobox.tsx'
import { GlyphDemo } from '../assets/demos/glyph.tsx'
import { ListboxDemo } from '../assets/demos/listbox.tsx'
import { MenuDemo } from '../assets/demos/menu.tsx'
import { PopoverDemo } from '../assets/demos/popover.tsx'
import { ScrollLockDemo } from '../assets/demos/scroll-lock.tsx'
import { SelectDemo } from '../assets/demos/select.tsx'
import { SeparatorDemo } from '../assets/demos/separator.tsx'
import { Document } from './document.tsx'

const componentLinks = [
  { id: 'button', label: 'Button' },
  { id: 'glyph', label: 'Glyph' },
  { id: 'separator', label: 'Separator' },
  { id: 'breadcrumbs', label: 'Breadcrumbs' },
  { id: 'accordion', label: 'Accordion' },
  { id: 'menu', label: 'Menu' },
  { id: 'select', label: 'Select' },
  { id: 'combobox', label: 'Combobox' },
  { id: 'listbox', label: 'Listbox' },
  { id: 'popover', label: 'Popover' },
  { id: 'anchor', label: 'Anchor' },
  { id: 'scroll-lock', label: 'Scroll lock' },
]

const animationLinks = [
  { id: 'animation-spring', label: 'Spring' },
  { id: 'animation-tween', label: 'Tween' },
  { id: 'animation-entrance', label: 'Entrance & exit' },
  { id: 'animation-layout', label: 'Layout' },
]

export function ShowcasePage() {
  return () => (
    <Document head={ShowcaseHead()} title="Remix 3 UI Showcase">
      <main mix={pageStyle}>
        <div mix={containerStyle}>
          {Hero()}

          {Section({
            id: 'components',
            eyebrow: 'Components',
            title: 'Every first-party component in remix/ui',
            description:
              'Each card renders a real component from remix/ui. Use the controls below each preview to change its parameters live — the previews are hydrated Remix UI islands.',
            children: (
              <div mix={gridStyle}>
                <ButtonsDemo />
                <GlyphDemo />
                <SeparatorDemo />
                <BreadcrumbsDemo />
                <AccordionDemo />
                <MenuDemo />
                <SelectDemo />
                <ComboboxDemo />
                <ListboxDemo />
                <PopoverDemo />
                <AnchorDemo />
                <ScrollLockDemo />
              </div>
            ),
          })}

          {Section({
            id: 'animation',
            eyebrow: 'Animation',
            title: 'The animation primitives, parameterised',
            description:
              'Spring, tween, entrance/exit, and layout helpers from remix/ui/animation. Tune the presets and curves and replay the motion in place.',
            children: (
              <div mix={gridStyle}>
                <SpringDemo />
                <TweenDemo />
                <EntranceExitDemo />
                <LayoutDemo />
              </div>
            ),
          })}

          {Footer()}
        </div>
      </main>
    </Document>
  )
}

function ShowcaseHead() {
  return (
    <>
      <meta
        name="description"
        content="An interactive showcase of every remix/ui component and the animation primitives, with live, adjustable parameters."
      />
      <meta name="theme-color" content="#ffffff" />
    </>
  )
}

function Hero() {
  return (
    <header mix={heroStyle}>
      <div mix={css({ display: 'grid', gap: '18px' })}>
        <span mix={eyebrowChipStyle}>Remix 3 · remix/ui</span>
        <h1 mix={heroTitleStyle}>Interactive UI &amp; animation showcase</h1>
        <p mix={heroLeadStyle}>
          A living catalogue of every component in{' '}
          <code mix={codeStyle}>remix/ui</code> plus the{' '}
          <code mix={codeStyle}>remix/ui/animation</code> primitives. Every preview is a server-rendered,
          client-hydrated Remix island whose parameters you can change on the fly.
        </p>
        <nav aria-label="Jump to a demo" mix={css({ display: 'grid', gap: '12px' })}>
          {LinkRow('Components', componentLinks)}
          {LinkRow('Animation', animationLinks)}
        </nav>
      </div>
    </header>
  )
}

function LinkRow(label: string, links: ReadonlyArray<{ id: string; label: string }>) {
  return (
    <div mix={css({ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' })}>
      <span
        mix={css({
          fontSize: theme.fontSize.xxs,
          fontWeight: theme.fontWeight.bold,
          textTransform: 'uppercase',
          letterSpacing: theme.letterSpacing.wide,
          color: theme.colors.text.muted,
          minWidth: '92px',
        })}
      >
        {label}
      </span>
      {links.map((link) => (
        <a key={link.id} href={`#${link.id}`} mix={chipLinkStyle}>
          {link.label}
        </a>
      ))}
    </div>
  )
}

function Section(props: {
  id: string
  eyebrow: string
  title: string
  description: string
  children: RemixNode
}) {
  return (
    <section id={props.id} mix={css({ display: 'grid', gap: '22px' })}>
      <header mix={css({ display: 'grid', gap: '8px' })}>
        <span
          mix={css({
            color: theme.colors.action.primary.background,
            fontSize: theme.fontSize.xs,
            fontWeight: theme.fontWeight.bold,
            textTransform: 'uppercase',
            letterSpacing: theme.letterSpacing.wide,
          })}
        >
          {props.eyebrow}
        </span>
        <h2 mix={sectionTitleStyle}>{props.title}</h2>
        <p mix={css({ margin: 0, maxWidth: '72ch', color: theme.colors.text.secondary })}>{props.description}</p>
      </header>
      {props.children}
    </section>
  )
}

function Footer() {
  return (
    <footer mix={footerStyle}>
      <p mix={css({ margin: 0 })}>
        Built with the Remix 3 template shape — server-rendered, client-hydrated, and deployable to GitHub Pages.
      </p>
      <a href="https://github.com/remix-run/remix/tree/main/packages/ui" mix={footerLinkStyle}>
        remix/ui source ↗
      </a>
    </footer>
  )
}

// --- styles -----------------------------------------------------------------

const pageStyle = css({
  '& *, & *::before, & *::after': { boxSizing: 'border-box' },
  minHeight: '100vh',
  margin: 0,
  padding: '40px 18px 90px',
  fontFamily: 'var(--rmx-font-family-sans)',
  color: theme.colors.text.primary,
  background:
    'radial-gradient(1200px 600px at 50% -10%, color-mix(in srgb, var(--rmx-color-action-primary-background) 10%, transparent), transparent), var(--rmx-surface-lvl2)',
  lineHeight: theme.lineHeight.normal,
  '@media (min-width: 768px)': { padding: '64px 32px 110px' },
})

const containerStyle = css({
  width: 'min(1120px, 100%)',
  margin: '0 auto',
  display: 'grid',
  gap: '48px',
})

const heroStyle = css({
  display: 'grid',
  gap: '24px',
  padding: '32px',
  borderRadius: theme.radius.xl,
  background: theme.surface.lvl0,
  border: `1px solid ${theme.colors.border.subtle}`,
  boxShadow: theme.shadow.lg,
  '@media (min-width: 768px)': { padding: '44px' },
})

const eyebrowChipStyle = css({
  justifySelf: 'start',
  padding: '6px 12px',
  borderRadius: theme.radius.full,
  background: 'color-mix(in srgb, var(--rmx-color-action-primary-background) 12%, transparent)',
  color: theme.colors.action.primary.background,
  fontSize: theme.fontSize.xs,
  fontWeight: theme.fontWeight.bold,
  letterSpacing: theme.letterSpacing.wide,
  textTransform: 'uppercase',
})

const heroTitleStyle = css({
  margin: 0,
  fontSize: 'clamp(2.1rem, 4.6vw, 3.6rem)',
  lineHeight: 1.05,
  letterSpacing: theme.letterSpacing.tight,
  fontWeight: theme.fontWeight.bold,
})

const heroLeadStyle = css({
  margin: 0,
  maxWidth: '70ch',
  color: theme.colors.text.secondary,
  fontSize: theme.fontSize.lg,
})

const codeStyle = css({
  fontFamily: 'var(--rmx-font-family-mono)',
  fontSize: '0.9em',
  padding: '1px 6px',
  borderRadius: theme.radius.sm,
  background: theme.surface.lvl2,
  color: theme.colors.text.primary,
})

const chipLinkStyle = css({
  padding: '5px 11px',
  borderRadius: theme.radius.full,
  background: theme.surface.lvl1,
  border: `1px solid ${theme.colors.border.subtle}`,
  color: theme.colors.text.secondary,
  fontSize: theme.fontSize.xs,
  fontWeight: theme.fontWeight.semibold,
  textDecoration: 'none',
  '&:hover': {
    background: theme.colors.action.primary.background,
    color: theme.colors.action.primary.foreground,
    borderColor: theme.colors.action.primary.background,
  },
})

const sectionTitleStyle = css({
  margin: 0,
  fontSize: 'clamp(1.6rem, 3vw, 2.3rem)',
  lineHeight: 1.1,
  letterSpacing: theme.letterSpacing.tight,
  fontWeight: theme.fontWeight.bold,
})

const gridStyle = css({
  display: 'grid',
  gap: '22px',
  gridTemplateColumns: '1fr',
  '@media (min-width: 900px)': { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
})

const footerStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px 18px',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: '16px',
  borderTop: `1px solid ${theme.colors.border.subtle}`,
  color: theme.colors.text.muted,
  fontSize: theme.fontSize.sm,
})

const footerLinkStyle = css({
  color: theme.colors.text.link,
  fontWeight: theme.fontWeight.semibold,
  textDecoration: 'none',
})
