import type { RemixNode } from 'remix/ui'
import { css } from 'remix/ui'

import { Document } from './document.tsx'

const panelBaseStyle = {
  padding: '24px',
  borderRadius: '28px',
  background: 'var(--surface)',
  border: '1px solid var(--surface-border)',
  boxShadow: '0 20px 60px rgba(2, 6, 23, 0.28)',
}

const fieldLabelStyle = css({
  display: 'grid',
  gap: '8px',
  color: 'var(--text-muted)',
  fontSize: '0.92rem',
})

const fieldStyle = css({
  width: '100%',
  padding: '12px 14px',
  borderRadius: '16px',
  border: '1px solid var(--surface-border)',
  background: 'rgba(2, 6, 23, 0.45)',
  color: 'var(--text-primary)',
})

const themePalettes = [
  {
    name: 'Sky',
    description: 'Primary brand colors for CTA, links, and focus states.',
    values: ['#0f172a', '#0369a1', '#0ea5e9', '#e0f2fe'],
  },
  {
    name: 'Violet',
    description: 'Accent palette for featured cards and highlights.',
    values: ['#2e1065', '#7c3aed', '#a78bfa', '#f5f3ff'],
  },
  {
    name: 'Mint',
    description: 'Support palette for success and positive feedback.',
    values: ['#052e2b', '#0f766e', '#2dd4bf', '#ccfbf1'],
  },
] as const

const tokenGroups = [
  {
    title: 'Color tokens',
    items: [
      { name: 'surface.base', value: '#08111f', note: 'Page background' },
      { name: 'surface.elevated', value: '#11213a', note: 'Cards and panels' },
      { name: 'text.primary', value: '#f8fafc', note: 'Main copy' },
      { name: 'text.muted', value: '#94a3b8', note: 'Secondary copy' },
    ],
  },
  {
    title: 'Spacing scale',
    items: [
      { name: 'space.2', value: '8px', note: 'Tight gaps' },
      { name: 'space.4', value: '16px', note: 'Default gaps' },
      { name: 'space.6', value: '24px', note: 'Section padding' },
      { name: 'space.10', value: '40px', note: 'Hero spacing' },
    ],
  },
  {
    title: 'Radius & shadow',
    items: [
      { name: 'radius.md', value: '16px', note: 'Inputs and cards' },
      { name: 'radius.lg', value: '24px', note: 'Hero panels' },
      {
        name: 'shadow.lg',
        value: '0 24px 80px rgba(8, 17, 31, 0.30)',
        note: 'Floating panels',
      },
    ],
  },
] as const

export function ShowcasePage() {
  return () => (
    <Document head={ShowcaseHead()} title="Remix 3 UI Showcase">
      <main
        mix={css({
          '--page-background': '#020817',
          '--surface': 'rgba(15, 23, 42, 0.88)',
          '--surface-border': 'rgba(148, 163, 184, 0.18)',
          '--text-primary': '#f8fafc',
          '--text-muted': '#94a3b8',
          '--brand': '#38bdf8',
          '& *, & *::before, & *::after': { boxSizing: 'border-box' },
          minHeight: '100vh',
          margin: 0,
          padding: '32px 20px 80px',
          background:
            'radial-gradient(circle at top, rgba(56, 189, 248, 0.14), transparent 32%), var(--page-background)',
          color: 'var(--text-primary)',
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          lineHeight: 1.5,
          '@media (min-width: 768px)': {
            padding: '56px 32px 96px',
          },
        })}
      >
        <div
          mix={css({
            width: 'min(1120px, 100%)',
            margin: '0 auto',
            display: 'grid',
            gap: '32px',
          })}
        >
          {Hero()}
          <section aria-labelledby="theme-showcase" mix={css({ display: 'grid', gap: '20px' })}>
            {SectionHeading({
              eyebrow: 'Theme',
              title: 'Theme tokens that scale from landing page to product UI',
              description:
                'A compact palette, spacing scale, and elevation system keep the showcase visually consistent.',
              id: 'theme-showcase',
            })}
            <div
              mix={css({
                display: 'grid',
                gap: '20px',
                '@media (min-width: 960px)': {
                  gridTemplateColumns: '1.1fr 0.9fr',
                },
              })}
            >
              {PalettePanel()}
              {TokenPanel()}
            </div>
          </section>

          <section
            aria-labelledby="component-showcase"
            mix={css({
              display: 'grid',
              gap: '20px',
            })}
          >
            {SectionHeading({
              eyebrow: 'Components',
              title: 'Reusable UI components styled by the same theme',
              description:
                'Each example is intentionally small so the showcase works well as a starter reference.',
              id: 'component-showcase',
            })}
            {ComponentGrid()}
          </section>
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
        content="A Remix 3 UI showcase featuring theme tokens and reusable interface components."
      />
      <meta name="theme-color" content="#020817" />
    </>
  )
}

function Hero() {
  return (
    <section
      mix={css({
        display: 'grid',
        gap: '24px',
        padding: '28px',
        borderRadius: '28px',
        background:
          'linear-gradient(135deg, rgba(8, 47, 73, 0.88), rgba(15, 23, 42, 0.96) 55%, rgba(76, 29, 149, 0.92))',
        border: '1px solid rgba(125, 211, 252, 0.18)',
        boxShadow: '0 24px 80px rgba(2, 6, 23, 0.45)',
        '@media (min-width: 900px)': {
          gridTemplateColumns: '1.25fr 0.75fr',
          alignItems: 'end',
          padding: '40px',
        },
      })}
    >
      <div mix={css({ display: 'grid', gap: '16px' })}>
        <span
          mix={css({
            display: 'inline-flex',
            width: 'fit-content',
            padding: '6px 12px',
            borderRadius: '999px',
            background: 'rgba(56, 189, 248, 0.14)',
            color: '#bae6fd',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          })}
        >
          Remix template showcase
        </span>
        <div mix={css({ display: 'grid', gap: '12px' })}>
          <h1
            mix={css({
              margin: 0,
              fontSize: 'clamp(2.4rem, 5vw, 4.8rem)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            })}
          >
            Theme and UI components in one focused starter.
          </h1>
          <p
            mix={css({
              margin: 0,
              maxWidth: '62ch',
              color: 'var(--text-muted)',
              fontSize: '1.05rem',
            })}
          >
            This showcase demonstrates a cohesive visual language built with the Remix 3 template
            shape, ready to publish from CI to GitHub Pages.
          </p>
        </div>
      </div>

      <div
        mix={css({
          display: 'grid',
          gap: '14px',
          padding: '20px',
          borderRadius: '24px',
          background: 'rgba(2, 6, 23, 0.4)',
          border: '1px solid rgba(148, 163, 184, 0.16)',
        })}
      >
        {PreviewBadge({ tone: 'brand', label: 'Buttons', value: '3 variants' })}
        {PreviewBadge({ tone: 'accent', label: 'Tokens', value: '10+ examples' })}
        {PreviewBadge({ tone: 'success', label: 'Deployment', value: 'GitHub Pages ready' })}
      </div>
    </section>
  )
}

function SectionHeading(props: {
  eyebrow: string
  title: string
  description: string
  id: string
}) {
  return (
    <header mix={css({ display: 'grid', gap: '8px' })}>
      <span
        mix={css({
          color: 'var(--brand)',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        })}
      >
        {props.eyebrow}
      </span>
      <h2
        id={props.id}
        mix={css({
          margin: 0,
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
        })}
      >
        {props.title}
      </h2>
      <p mix={css({ margin: 0, maxWidth: '72ch', color: 'var(--text-muted)' })}>
        {props.description}
      </p>
    </header>
  )
}

function PalettePanel() {
  return (
    <div mix={css({ ...panelBaseStyle, display: 'grid', gap: '18px' })}>
      {themePalettes.map((palette) => (
        <article key={palette.name} mix={css({ display: 'grid', gap: '10px' })}>
          <div mix={css({ display: 'grid', gap: '4px' })}>
            <h3 mix={css({ margin: 0, fontSize: '1.05rem' })}>{palette.name}</h3>
            <p mix={css({ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' })}>
              {palette.description}
            </p>
          </div>
          <div
            mix={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: '10px',
            })}
          >
            {palette.values.map((value) => (
              <div key={`${palette.name}-${value}`} mix={css({ display: 'grid', gap: '8px' })}>
                <span
                  aria-hidden="true"
                  mix={css({
                    height: '72px',
                    borderRadius: '18px',
                    background: value,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  })}
                />
                <code mix={css({ fontSize: '12px', color: 'var(--text-muted)' })}>{value}</code>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

function TokenPanel() {
  return (
    <div mix={css({ ...panelBaseStyle, display: 'grid', gap: '18px' })}>
      {tokenGroups.map((group) => (
        <section key={group.title} mix={css({ display: 'grid', gap: '12px' })}>
          <h3 mix={css({ margin: 0, fontSize: '1.05rem' })}>{group.title}</h3>
          <div mix={css({ display: 'grid', gap: '10px' })}>
            {group.items.map((item) => (
              <div
                key={item.name}
                mix={css({
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) auto',
                  gap: '8px 16px',
                  alignItems: 'center',
                  padding: '14px 16px',
                  borderRadius: '18px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--surface-border)',
                })}
              >
                <div mix={css({ display: 'grid', gap: '4px' })}>
                  <strong>{item.name}</strong>
                  <span mix={css({ color: 'var(--text-muted)', fontSize: '0.92rem' })}>
                    {item.note}
                  </span>
                </div>
                <code
                  mix={css({
                    padding: '6px 10px',
                    borderRadius: '999px',
                    background: 'rgba(2, 6, 23, 0.7)',
                    color: '#cbd5e1',
                    fontSize: '12px',
                  })}
                >
                  {item.value}
                </code>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function ComponentGrid() {
  return (
    <div
      mix={css({
        display: 'grid',
        gap: '20px',
        '@media (min-width: 900px)': {
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        },
      })}
    >
      {ComponentCard({
        title: 'Buttons',
        description: 'Primary, secondary, and ghost buttons.',
        children: (
          <div mix={css({ display: 'flex', gap: '12px', flexWrap: 'wrap' })}>
            <button type="button" mix={buttonStyle('primary')}>
              Get started
            </button>
            <button type="button" mix={buttonStyle('secondary')}>
              Preview theme
            </button>
            <button type="button" mix={buttonStyle('ghost')}>
              View source
            </button>
          </div>
        ),
      })}

      {ComponentCard({
        title: 'Badges & alerts',
        description: 'Status messaging with small token variations.',
        children: (
          <div mix={css({ display: 'grid', gap: '14px' })}>
            <div mix={css({ display: 'flex', gap: '10px', flexWrap: 'wrap' })}>
              {StatusPill({ tone: 'brand', label: 'Preview' })}
              {StatusPill({ tone: 'success', label: 'Stable' })}
              {StatusPill({ tone: 'warning', label: 'Draft' })}
            </div>
            <div
              mix={css({
                padding: '14px 16px',
                borderRadius: '18px',
                background: 'rgba(45, 212, 191, 0.12)',
                border: '1px solid rgba(45, 212, 191, 0.22)',
                color: '#ccfbf1',
              })}
            >
              Tokens map cleanly into status feedback surfaces.
            </div>
          </div>
        ),
      })}

      {ComponentCard({
        title: 'Card',
        description: 'A compact highlight card for dashboard or marketing layouts.',
        children: (
          <article
            mix={css({
              display: 'grid',
              gap: '12px',
              padding: '18px',
              borderRadius: '22px',
              background:
                'linear-gradient(180deg, rgba(56, 189, 248, 0.12), rgba(15, 23, 42, 0.72) 55%)',
              border: '1px solid rgba(56, 189, 248, 0.18)',
            })}
          >
            <div mix={css({ display: 'flex', justifyContent: 'space-between', gap: '16px' })}>
              <strong>Design system preview</strong>
              {StatusPill({ tone: 'accent', label: 'Featured' })}
            </div>
            <p mix={css({ margin: 0, color: 'var(--text-muted)' })}>
              Reuse the same spacing, typography, and elevation tokens across marketing and app
              surfaces.
            </p>
          </article>
        ),
      })}

      {ComponentCard({
        title: 'Form controls',
        description: 'Inputs and selects using the same panel tokens.',
        children: (
          <div mix={css({ display: 'grid', gap: '12px' })}>
            <label mix={fieldLabelStyle}>
              Project name
              <input type="text" defaultValue="Remix 3 UI Showcase" mix={fieldStyle} />
            </label>
            <label mix={fieldLabelStyle}>
              Theme mode
              <select defaultValue="dark" mix={fieldStyle}>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </label>
          </div>
        ),
      })}

      {ComponentCard({
        title: 'Stats row',
        description: 'Simple numeric summaries for hero or dashboard use.',
        children: (
          <div
            mix={css({
              display: 'grid',
              gap: '12px',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            })}
          >
            {[
              ['12', 'tokens'],
              ['6', 'components'],
              ['1', 'workflow'],
            ].map(([value, label]) => (
              <div
                key={label}
                mix={css({
                  padding: '16px',
                  borderRadius: '18px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--surface-border)',
                  textAlign: 'center',
                })}
              >
                <div mix={css({ fontSize: '1.6rem', fontWeight: 700 })}>{value}</div>
                <div mix={css({ color: 'var(--text-muted)', fontSize: '0.92rem' })}>{label}</div>
              </div>
            ))}
          </div>
        ),
      })}

      {ComponentCard({
        title: 'Table',
        description: 'Compact data tables stay aligned with the theme.',
        children: (
          <div mix={css({ overflowX: 'auto' })}>
            <table
              mix={css({
                width: '100%',
                borderCollapse: 'collapse',
                color: 'inherit',
              })}
            >
              <thead>
                <tr>
                  {['Component', 'Purpose', 'Token'].map((label) => (
                    <th
                      key={label}
                      mix={css({
                        padding: '0 0 10px',
                        borderBottom: '1px solid var(--surface-border)',
                        textAlign: 'left',
                        fontSize: '0.82rem',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      })}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Button', 'Primary action', 'brand'],
                  ['Input', 'Form entry', 'surface.elevated'],
                  ['Badge', 'Status metadata', 'accent'],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((value) => (
                      <td
                        key={value}
                        mix={css({
                          padding: '12px 0',
                          borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                        })}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      })}
    </div>
  )
}

function ComponentCard(props: { title: string; description: string; children: RemixNode }) {
  return (
    <section mix={css({ ...panelBaseStyle, display: 'grid', gap: '18px' })}>
      <header mix={css({ display: 'grid', gap: '6px' })}>
        <h3 mix={css({ margin: 0, fontSize: '1.1rem' })}>{props.title}</h3>
        <p mix={css({ margin: 0, color: 'var(--text-muted)' })}>{props.description}</p>
      </header>
      {props.children}
    </section>
  )
}

function PreviewBadge(props: { tone: Tone; label: string; value: string }) {
  return (
    <div
      mix={css({
        display: 'grid',
        gap: '2px',
        padding: '14px 16px',
        borderRadius: '18px',
        background: toneBackground(props.tone),
        border: `1px solid ${toneBorder(props.tone)}`,
      })}
    >
      <span mix={css({ color: 'var(--text-muted)', fontSize: '0.82rem' })}>{props.label}</span>
      <strong>{props.value}</strong>
    </div>
  )
}

type Tone = 'brand' | 'accent' | 'success' | 'warning'

function StatusPill(props: { tone: Tone; label: string }) {
  return (
    <span
      mix={css({
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 12px',
        borderRadius: '999px',
        background: toneBackground(props.tone),
        border: `1px solid ${toneBorder(props.tone)}`,
        color: toneText(props.tone),
        fontSize: '0.82rem',
        fontWeight: 700,
      })}
    >
      {props.label}
    </span>
  )
}

function buttonStyle(variant: 'primary' | 'secondary' | 'ghost') {
  return css({
    appearance: 'none',
    border: variant === 'ghost' ? '1px solid rgba(148, 163, 184, 0.18)' : '1px solid transparent',
    borderRadius: '999px',
    padding: '12px 18px',
    background:
      variant === 'primary'
        ? 'linear-gradient(180deg, #38bdf8, #0284c7)'
        : variant === 'secondary'
          ? 'rgba(15, 23, 42, 0.84)'
          : 'transparent',
    color: variant === 'primary' ? '#082f49' : '#e2e8f0',
    boxShadow: variant === 'primary' ? '0 10px 32px rgba(14, 165, 233, 0.22)' : 'none',
    fontWeight: 700,
    cursor: 'pointer',
  })
}

function toneBackground(tone: Tone) {
  switch (tone) {
    case 'brand':
      return 'rgba(56, 189, 248, 0.14)'
    case 'accent':
      return 'rgba(167, 139, 250, 0.14)'
    case 'success':
      return 'rgba(45, 212, 191, 0.14)'
    case 'warning':
      return 'rgba(245, 158, 11, 0.14)'
  }
}

function toneBorder(tone: Tone) {
  switch (tone) {
    case 'brand':
      return 'rgba(56, 189, 248, 0.24)'
    case 'accent':
      return 'rgba(167, 139, 250, 0.24)'
    case 'success':
      return 'rgba(45, 212, 191, 0.24)'
    case 'warning':
      return 'rgba(245, 158, 11, 0.24)'
  }
}

function toneText(tone: Tone) {
  switch (tone) {
    case 'brand':
      return '#bae6fd'
    case 'accent':
      return '#ddd6fe'
    case 'success':
      return '#ccfbf1'
    case 'warning':
      return '#fde68a'
  }
}
