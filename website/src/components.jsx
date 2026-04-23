// Shared primitives for the Foreman site.

const Container = ({ children, style, ...rest }) => (
  <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', ...style }} {...rest}>
    {children}
  </div>
);

// Monospace tag: "§ 02  HOW FOREMAN WORKS"
const SectionTag = ({ number, children }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 12,
    fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.14em',
    color: 'var(--ink-3)', textTransform: 'uppercase', fontWeight: 500,
    marginBottom: 18,
  }}>
    <span style={{ color: 'var(--accent)' }}>§ {number}</span>
    <span style={{ flex: '0 0 28px', height: 1, background: 'var(--rule)' }} />
    <span>{children}</span>
  </div>
);

// Big display headline, mono, uppercase
const Display = ({ children, size = 84, style }) => (
  <h1 style={{
    fontFamily: 'var(--mono)',
    fontWeight: 700,
    fontSize: size,
    lineHeight: 0.95,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
    color: 'var(--ink)',
    margin: 0,
    ...style,
  }}>{children}</h1>
);

const Headline = ({ children, style }) => (
  <h2 style={{
    fontFamily: 'var(--mono)',
    fontWeight: 700,
    fontSize: 44,
    lineHeight: 1.05,
    letterSpacing: '-0.01em',
    textTransform: 'uppercase',
    color: 'var(--ink)',
    margin: 0,
    ...style,
  }}>{children}</h2>
);

const Lede = ({ children, style }) => (
  <p style={{
    fontFamily: 'var(--serif)',
    fontSize: 26,
    lineHeight: 1.45,
    color: 'var(--ink)',
    margin: 0,
    maxWidth: 760,
    textWrap: 'pretty',
    ...style,
  }}>{children}</p>
);

const Body = ({ children, style, size = 20 }) => (
  <p style={{
    fontFamily: 'var(--serif)',
    fontSize: size,
    lineHeight: 1.55,
    color: 'var(--ink-2)',
    margin: 0,
    textWrap: 'pretty',
    ...style,
  }}>{children}</p>
);

// Rule line with optional tick marks, like a ruler
const Rule = ({ticks = true, color, style}) => (
  <div style={{ position: 'relative', height: 12, ...style }}>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, background: color || 'var(--rule)' }} />
    {ticks && (
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'space-between' }}>
        {Array.from({length: 21}).map((_, i) => (
          <span key={i} style={{
            width: 1,
            height: i % 5 === 0 ? 10 : 5,
            background: color || 'var(--rule)',
          }} />
        ))}
      </div>
    )}
  </div>
);

// Primary button: dark slab with mono label
const Btn = ({ children, href, onClick, variant = 'primary', style, ...rest }) => {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 600,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    padding: '16px 22px',
    border: '1px solid var(--ink)',
    cursor: 'pointer', textDecoration: 'none',
    transition: 'transform 0.05s ease, background 0.12s ease, color 0.12s ease',
    userSelect: 'none',
  };
  const variants = {
    primary: { background: 'var(--ink)', color: 'var(--paper)' },
    secondary: { background: 'transparent', color: 'var(--ink)' },
    accent: { background: 'var(--accent)', color: 'var(--paper)', borderColor: 'var(--accent)' },
  };
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href} onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseDown={(e)=>{ e.currentTarget.style.transform = 'translateY(1px)'; }}
      onMouseUp={(e)=>{ e.currentTarget.style.transform = 'translateY(0)'; }}
      onMouseLeave={(e)=>{ e.currentTarget.style.transform = 'translateY(0)'; }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Labeled SVG photo placeholder — subtly striped cream, mono caption.
const PhotoPlaceholder = ({ label, caption, ratio = '4 / 3', style }) => (
  <figure style={{ margin: 0, ...style }}>
    <div style={{
      aspectRatio: ratio,
      border: '1px solid var(--ink)',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--paper-2)',
      backgroundImage: 'repeating-linear-gradient(135deg, rgba(20,17,13,0.045) 0 1px, transparent 1px 12px)',
    }}>
      {/* corner ticks */}
      {['tl','tr','bl','br'].map((c) => {
        const pos = {
          tl: {top: 8, left: 8}, tr: {top: 8, right: 8},
          bl: {bottom: 8, left: 8}, br: {bottom: 8, right: 8},
        }[c];
        return (
          <div key={c} style={{
            position: 'absolute', ...pos,
            width: 14, height: 14,
            borderTop: c.startsWith('t') ? '1px solid var(--ink)' : 'none',
            borderBottom: c.startsWith('b') ? '1px solid var(--ink)' : 'none',
            borderLeft: c.endsWith('l') ? '1px solid var(--ink)' : 'none',
            borderRight: c.endsWith('r') ? '1px solid var(--ink)' : 'none',
          }} />
        );
      })}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        textAlign: 'center', padding: 24, gap: 6,
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--ink-3)',
        }}>PHOTO &nbsp;•&nbsp; DROP IN LATER</div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 15, color: 'var(--ink)',
          fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em',
        }}>{label}</div>
      </div>
    </div>
    {caption && (
      <figcaption style={{
        fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)',
        letterSpacing: '0.08em', textTransform: 'uppercase',
        marginTop: 10, display: 'flex', justifyContent: 'space-between',
      }}>
        <span>{caption}</span>
        <span>REF · PHOTO</span>
      </figcaption>
    )}
  </figure>
);

// Checklist tick, blueprint style
const Tick = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" style={{flexShrink: 0}}>
    <rect x="0.5" y="0.5" width="21" height="21" fill="none" stroke="var(--ink)" strokeWidth="1" />
    <path d="M5 11.5 L9.5 16 L17 7" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

// Dimension-line bracket, for callouts on images or numbers
const Dim = ({ width = 120, label, style }) => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', ...style }}>
    <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', marginBottom: 2 }}>{label}</div>
    <svg width={width} height="10" viewBox={`0 0 ${width} 10`}>
      <line x1="1" y1="5" x2={width-1} y2="5" stroke="var(--ink-3)" strokeWidth="1" />
      <line x1="1" y1="1" x2="1" y2="9" stroke="var(--ink-3)" strokeWidth="1" />
      <line x1={width-1} y1="1" x2={width-1} y2="9" stroke="var(--ink-3)" strokeWidth="1" />
    </svg>
  </div>
);

// A boxed card that looks like shop paperwork
const Paper = ({ children, style, label }) => (
  <div style={{
    background: 'var(--paper)',
    border: '1px solid var(--ink)',
    position: 'relative',
    ...style,
  }}>
    {label && (
      <div style={{
        position: 'absolute', top: -10, left: 16,
        background: 'var(--paper)', padding: '0 8px',
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'var(--ink-3)',
      }}>{label}</div>
    )}
    {children}
  </div>
);

Object.assign(window, {
  Container, SectionTag, Display, Headline, Lede, Body,
  Rule, Btn, PhotoPlaceholder, Tick, Dim, Paper,
});
