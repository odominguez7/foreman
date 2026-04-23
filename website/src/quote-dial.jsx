// Working "Three modes" dial. Same drawing, three quote outputs.
// Real numbers the user can reason about.

const MODES = [
  {
    key: 'careful',
    name: 'CAREFUL',
    subtitle: 'Margin cushion. Asks before it commits.',
    note: 'Use on jobs you really want to get right.',
    margin: 0.42,
    flags: [
      '+8% margin cushion (material lead time unclear)',
      'TOL ±0.0005 on bore: held by grinding, added 1 op',
      'First-article inspection added',
    ],
    question: 'Q: Is the 6061 in stock, or should I assume 2-week lead on the bar?',
    color: 'var(--accent)',
  },
  {
    key: 'normal',
    name: 'NORMAL',
    subtitle: 'Standard pricing off your history.',
    note: 'Use this most days.',
    margin: 0.32,
    flags: [
      'Matched to 3 Boeing brackets quoted Aug–Nov 2025',
      'Boeing slow-pay rule applied: +8% (from your note, Oct 14)',
      'Setup time: 45 min (shop avg for this part family)',
    ],
    question: null,
    color: 'var(--ink)',
  },
  {
    key: 'aggressive',
    name: 'AGGRESSIVE',
    subtitle: 'Cuts margin to win volume.',
    note: 'Use when the shop is slow.',
    margin: 0.22,
    flags: [
      'Cushion removed. This is the number that wins the job.',
      'Compare: you lost PO-44821 at $1,180 in Feb. Market paid that.',
      'Mill calendar shows 3 open days next week: burn the capacity.',
    ],
    question: null,
    color: 'var(--accent-2)',
  },
];

// Base cost model (same for every mode):
const BASE = {
  material: 118.40,   // 6061 bar stock
  setup: 78.00,       // 45 min @ $104/hr
  run: 312.00,        // 3.0 hr @ $104/hr
  finish: 42.00,      // deburr + black oxide outsource
  inspect: 26.00,
};
const BASE_COST = BASE.material + BASE.setup + BASE.run + BASE.finish + BASE.inspect;

function computeQuote(mode) {
  const margin = mode.margin;
  const price = BASE_COST * (1 + margin);
  return {
    cost: BASE_COST,
    margin,
    price,
  };
}

function fmt(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const QuoteDial = () => {
  const [modeIdx, setModeIdx] = React.useState(1);
  const mode = MODES[modeIdx];
  const q = computeQuote(mode);

  return (
    <div>
      {/* The dial */}
      <div style={{
        border: '1px solid var(--ink)',
        background: 'var(--paper)',
        position: 'relative',
      }}>
        {/* Header strip */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid var(--ink)',
          padding: '14px 20px',
          background: 'var(--paper-2)',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
            RFQ-2026-0417 · Bracket, 6061-T6 · Qty 25
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
            Boeing · Acct. B-118
          </div>
        </div>

        {/* Dial buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {MODES.map((m, i) => {
            const active = i === modeIdx;
            return (
              <button
                key={m.key}
                onClick={() => setModeIdx(i)}
                style={{
                  appearance: 'none',
                  border: 'none',
                  borderRight: i < 2 ? '1px solid var(--ink)' : 'none',
                  borderBottom: '1px solid var(--ink)',
                  background: active ? 'var(--ink)' : 'transparent',
                  color: active ? 'var(--paper)' : 'var(--ink)',
                  padding: '22px 18px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.12s ease, color 0.12s ease',
                  fontFamily: 'var(--mono)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{
                    display: 'inline-block', width: 10, height: 10,
                    background: active ? m.color : 'transparent',
                    border: `1px solid ${active ? m.color : 'var(--ink)'}`,
                    borderRadius: '50%',
                  }} />
                  <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '0.08em' }}>{m.name}</span>
                </div>
                <div style={{
                  fontFamily: 'var(--serif)', fontSize: 14,
                  color: active ? 'var(--paper)' : 'var(--ink-2)',
                  lineHeight: 1.4,
                  textTransform: 'none',
                  letterSpacing: 0,
                }}>
                  {m.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Quote body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr' }}>
          {/* Left: price + math */}
          <div style={{
            padding: '28px 28px 32px',
            borderRight: '1px solid var(--ink)',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 10 }}>
              QUOTE TO CUSTOMER
            </div>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 14,
              marginBottom: 6,
            }}>
              <div style={{
                fontFamily: 'var(--mono)', fontWeight: 700,
                fontSize: 68, lineHeight: 1, letterSpacing: '-0.02em',
                color: mode.color,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {fmt(q.price)}
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                / lot of 25
              </div>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-3)', marginBottom: 26 }}>
              {fmt(q.price / 25)} per part &nbsp;·&nbsp; margin {(q.margin*100).toFixed(0)}%
            </div>

            {/* Cost breakdown */}
            <div style={{ fontFamily: 'var(--mono)', fontSize: 14 }}>
              <Row label="Material · 6061-T6 bar" value={fmt(BASE.material)} />
              <Row label="Setup · 45 min @ $104/hr" value={fmt(BASE.setup)} />
              <Row label="Run · 3.0 hr @ $104/hr" value={fmt(BASE.run)} />
              <Row label="Finish · deburr + oxide" value={fmt(BASE.finish)} />
              <Row label="First-article inspection" value={fmt(BASE.inspect)} />
              <div style={{ height: 1, background: 'var(--rule)', margin: '10px 0' }} />
              <Row label="Shop cost" value={fmt(q.cost)} bold />
              <Row
                label={`Margin @ ${(q.margin*100).toFixed(0)}%`}
                value={'+ ' + fmt(q.price - q.cost)}
                color={mode.color}
              />
              <div style={{ height: 1, background: 'var(--ink)', margin: '10px 0' }} />
              <Row label="Price to customer" value={fmt(q.price)} bold big />
            </div>
          </div>

          {/* Right: reasoning */}
          <div style={{ padding: '28px 28px 32px', background: 'var(--paper-2)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 14 }}>
              WHY THIS NUMBER
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {mode.flags.map((f, i) => (
                <li key={i} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  fontFamily: 'var(--serif)', fontSize: 16, lineHeight: 1.45,
                  color: 'var(--ink)',
                }}>
                  <span style={{
                    flex: '0 0 auto', marginTop: 6,
                    width: 8, height: 8, background: mode.color,
                  }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {mode.question && (
              <div style={{
                marginTop: 20,
                padding: '14px 16px',
                border: `1px dashed ${mode.color}`,
                background: 'var(--paper)',
                fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--ink)',
              }}>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
                  color: mode.color, textTransform: 'uppercase', marginBottom: 4,
                }}>FOREMAN ASKS</div>
                {mode.question}
              </div>
            )}

            <div style={{
              marginTop: 22,
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em',
              color: 'var(--ink-3)', textTransform: 'uppercase',
            }}>
              {mode.note}
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: '1px solid var(--ink)',
          padding: '12px 20px',
          background: 'var(--paper-2)',
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--ink-3)',
        }}>
          <span>Draft · not sent</span>
          <span>Review &nbsp;→&nbsp; Edit &nbsp;→&nbsp; Send</span>
        </div>
      </div>

      {/* Helper caption under the dial */}
      <div style={{
        marginTop: 16, display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)',
        letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        <span>↑ flip the dial. the quote changes. the math stays shown.</span>
        <span>LIVE DEMO</span>
      </div>
    </div>
  );
};

const Row = ({ label, value, bold, big, color }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    columnGap: 16,
    alignItems: 'baseline',
    padding: '3px 0',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: bold ? 700 : 400,
    fontSize: big ? 18 : 13,
    color: color || (bold ? 'var(--ink)' : 'var(--ink-2)'),
  }}>
    <span style={{ fontFamily: 'var(--mono)', minWidth: 0, lineHeight: 1.35 }}>{label}</span>
    <span style={{ fontFamily: 'var(--mono)', whiteSpace: 'nowrap' }}>{value}</span>
  </div>
);

Object.assign(window, { QuoteDial });
