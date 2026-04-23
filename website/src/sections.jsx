// Sections of the Foreman landing page.

// ─────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────
const Nav = () => (
  <div style={{
    position: 'sticky', top: 0, zIndex: 50,
    borderBottom: '1px solid var(--ink)',
    background: 'var(--paper)',
    backdropFilter: 'saturate(120%)',
  }}>
    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 48px' }}>
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'var(--ink)' }}>
        <Logo />
        <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 18, letterSpacing: '0.06em' }}>FOREMAN</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          v0.9 · cambridge, ma
        </span>
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <NavLink href="#how">How it works</NavLink>
        <NavLink href="#dial">Three modes</NavLink>
        <NavLink href="#data">Your data</NavLink>
        <NavLink href="#questions">Questions</NavLink>
        <Btn href="mailto:omar.dominguez7@gmail.com?subject=Foreman%20demo" variant="primary" style={{ padding: '12px 18px' }}>
          Book a 20-min demo
        </Btn>
      </div>
    </Container>
  </div>
);

const NavLink = ({ href, children }) => (
  <a href={href} style={{
    fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'var(--ink-2)', textDecoration: 'none',
    fontWeight: 500,
  }}
     onMouseEnter={(e)=>{ e.currentTarget.style.color = 'var(--accent)'; }}
     onMouseLeave={(e)=>{ e.currentTarget.style.color = 'var(--ink-2)'; }}
  >{children}</a>
);

// Small square mark: an F built from a milled slot
const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
    <rect x="0.5" y="0.5" width="27" height="27" fill="var(--ink)" />
    <path d="M7 6 H22 V10 H11 V13 H19 V17 H11 V22 H7 Z" fill="var(--paper)" />
    <rect x="0.5" y="0.5" width="27" height="27" fill="none" stroke="var(--ink)" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
const Hero = () => (
  <section id="top" style={{ padding: '80px 0 40px', position: 'relative' }}>
    <Container>
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <SectionTag number="00">Quoting hand for machine shops</SectionTag>
          <Display size={104}>MEET<br />FOREMAN.</Display>
          <div style={{ marginTop: 34, maxWidth: 560 }}>
            <Lede>
              Your new quoting hand. Foreman reads the drawing,
              checks your material and schedule, and has a quote
              ready before you finish your coffee.
            </Lede>
          </div>
          <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 20, fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <span>Lives on a computer in your shop.</span>
            <span style={{width: 6, height: 6, background: 'var(--ink-3)', borderRadius: '50%'}} />
            <span>Your drawings never leave the building.</span>
          </div>

          <div style={{ marginTop: 40, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Btn href="mailto:omar.dominguez7@gmail.com?subject=Foreman%20demo%20request" variant="primary">
              Book a 20-min demo  →
            </Btn>
            <Btn href="#how" variant="secondary">See how it works</Btn>
          </div>

          <div style={{ marginTop: 60 }}>
            <Rule />
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginTop: 10,
              fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              <span>MIT AI Studio · MAS.664</span>
              <span>Open source · MIT license</span>
              <span>Built in Cambridge, MA</span>
            </div>
          </div>
        </div>

        {/* Right: drawing-to-quote illustration */}
        <HeroDrawing />
      </div>
    </Container>
  </section>
);

const HeroDrawing = () => (
  <div style={{ position: 'relative' }}>
    {/* Drawing panel */}
    <Paper style={{ padding: 0 }}>
      <div style={{
        padding: '12px 16px', borderBottom: '1px solid var(--ink)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--paper-2)',
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--ink-3)',
      }}>
        <span>DWG-47113_REV_C.PDF</span>
        <span style={{color: 'var(--accent)'}}>● READING</span>
      </div>
      <div style={{ padding: 28, position: 'relative', aspectRatio: '1 / 1', background:
        'repeating-linear-gradient(to right, rgba(20,17,13,0.06) 0 1px, transparent 1px 32px), repeating-linear-gradient(to bottom, rgba(20,17,13,0.06) 0 1px, transparent 1px 32px), var(--paper)'
      }}>
        {/* simplified bracket silhouette as geometric shapes (allowed: rects + circles) */}
        <svg viewBox="0 0 320 320" width="100%" height="100%" style={{ display: 'block' }}>
          {/* outline */}
          <rect x="60" y="80" width="200" height="140" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          <rect x="60" y="80" width="200" height="30" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="1.5" />
          <circle cx="90" cy="95" r="6" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
          <circle cx="230" cy="95" r="6" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
          <circle cx="160" cy="150" r="26" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          <circle cx="160" cy="150" r="10" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
          {/* dimension lines */}
          <line x1="60" y1="245" x2="260" y2="245" stroke="var(--accent)" strokeWidth="1" />
          <line x1="60" y1="240" x2="60" y2="250" stroke="var(--accent)" strokeWidth="1" />
          <line x1="260" y1="240" x2="260" y2="250" stroke="var(--accent)" strokeWidth="1" />
          <line x1="290" y1="80" x2="290" y2="220" stroke="var(--accent)" strokeWidth="1" />
          <line x1="285" y1="80" x2="295" y2="80" stroke="var(--accent)" strokeWidth="1" />
          <line x1="285" y1="220" x2="295" y2="220" stroke="var(--accent)" strokeWidth="1" />
          {/* callouts */}
          <text x="160" y="260" textAnchor="middle" fontFamily="var(--mono)" fontSize="11" fill="var(--accent)">4.500 ± .005</text>
          <text x="305" y="155" fontFamily="var(--mono)" fontSize="11" fill="var(--accent)">3.150</text>
          <text x="160" y="195" textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill="var(--ink-3)">Ø 0.500  ±.0005</text>
          <text x="70" y="75" fontFamily="var(--mono)" fontSize="10" fill="var(--ink-3)">TITLE: MOUNT BRACKET · 6061-T6</text>
        </svg>
      </div>
    </Paper>

    {/* Arrow */}
    <div style={{
      margin: '14px 0 14px',
      display: 'flex', alignItems: 'center', gap: 12,
      fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)',
    }}>
      <span style={{ flex: 1, height: 1, background: 'var(--ink)' }} />
      <span>↓  FOREMAN READS, CHECKS, WRITES</span>
      <span style={{ flex: 1, height: 1, background: 'var(--ink)' }} />
    </div>

    {/* Quote card */}
    <Paper style={{ padding: 0 }}>
      <div style={{
        padding: '12px 16px', borderBottom: '1px solid var(--ink)',
        background: 'var(--ink)', color: 'var(--paper)',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
      }}>
        <span>DRAFT QUOTE · READY IN 2 MIN 48 SEC</span>
        <span>NORMAL</span>
      </div>
      <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
            BOEING · LOT OF 25 · DUE 05/08
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 42, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            $760.32
          </div>
        </div>
        <div style={{ textAlign: 'right', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)' }}>
          <div>$30.41 / part</div>
          <div>32% margin</div>
        </div>
      </div>
      <div style={{ padding: '14px 24px 18px', borderTop: '1px solid var(--rule)', fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--ink-2)' }}>
        <span style={{ color: 'var(--accent)' }}>✓</span>&nbsp; Matched 3 Boeing jobs Aug–Nov.
        Boeing slow-pay rule applied (+8%, your note).
      </div>
    </Paper>
  </div>
);

// ─────────────────────────────────────────────────────────────
// WHAT IT DOES
// ─────────────────────────────────────────────────────────────
const WhatItDoes = () => (
  <section style={{ padding: '100px 0', borderTop: '1px solid var(--ink)' }}>
    <Container>
      <SectionTag number="01">What it does</SectionTag>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        <Headline style={{ fontSize: 54 }}>
          Every RFQ eats 30 to 90 minutes of your morning.
        </Headline>
        <div>
          <Body size={22} style={{ marginBottom: 20 }}>
            You open the PDF. You look up the material. You check
            the schedule. You pull what you charged this customer
            last time. You write the quote in a spreadsheet or an
            email. You have been doing this for forty years and it
            still takes forever.
          </Body>
          <Body size={22}>
            Foreman does that same work in under three minutes.
            You drop the drawing in. You tell it the customer and
            the quantity. It gives you back a draft quote with the
            math shown. You review it, change what needs changing,
            send it. <strong style={{ color: 'var(--ink)' }}>Foreman never pretends to be you.
            It just has the quote ready by the time you sit down.</strong>
          </Body>
        </div>
      </div>

      {/* Compare strip */}
      <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid var(--ink)' }}>
        <CompareCell
          tag="TODAY"
          time="30–90 MIN"
          rows={[
            'Open the PDF',
            'Look up the material',
            'Check the schedule',
            'Pull last price for this customer',
            'Write it in a spreadsheet',
            'Send',
          ]}
          tone="muted"
        />
        <CompareCell
          tag="WITH FOREMAN"
          time="≤ 3 MIN"
          rows={[
            'Drop the drawing in',
            'Type the customer and quantity',
            'Foreman drafts the quote',
            'You read the math it showed',
            'Fix what needs fixing',
            'Send',
          ]}
          tone="accent"
        />
      </div>
    </Container>
  </section>
);

const CompareCell = ({ tag, time, rows, tone }) => (
  <div style={{
    padding: '28px 32px',
    borderRight: tone === 'muted' ? '1px solid var(--ink)' : 'none',
    background: tone === 'accent' ? 'var(--paper-2)' : 'transparent',
  }}>
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      marginBottom: 20,
    }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{tag}</div>
      <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 28, color: tone === 'accent' ? 'var(--accent)' : 'var(--ink)' }}>{time}</div>
    </div>
    <ol style={{ listStyle: 'none', padding: 0, margin: 0, counterReset: 'step' }}>
      {rows.map((r, i) => (
        <li key={i} style={{
          display: 'flex', gap: 14, alignItems: 'center',
          padding: '10px 0', borderTop: i === 0 ? '1px dashed var(--rule)' : '1px dashed var(--rule)',
          fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--ink)',
        }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)', width: 22 }}>{String(i+1).padStart(2,'0')}</span>
          <span>{r}</span>
        </li>
      ))}
    </ol>
  </div>
);

// ─────────────────────────────────────────────────────────────
// HOW FOREMAN WORKS — four steps
// ─────────────────────────────────────────────────────────────
const HowItWorks = () => {
  const steps = [
    {
      n: '1',
      title: 'Drop the drawing in.',
      body: 'Foreman reads the PDF. Even Spanish or old scanned drawings. It pulls out the material, the tolerances, the features.',
      tag: 'READS',
      detail: (
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 12,
          display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--ink-2)',
        }}>
          <DetailRow label="MATL" value="6061-T6 ALUMINUM" />
          <DetailRow label="TOL" value="±.005 TYP · ±.0005 BORE" />
          <DetailRow label="FIN" value="BLACK OXIDE (OUTSRC)" />
          <DetailRow label="QTY" value="25 EA · DUE 05/08" />
        </div>
      ),
    },
    {
      n: '2',
      title: 'Checks your shop.',
      body: 'Do you have 6061 in stock? Is the mill open next week? What did you charge Boeing last August for a bracket like this?',
      tag: 'CHECKS',
      detail: (
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <DetailRow label="STOCK" value="6061 BAR · 42 FT ON HAND" ok />
          <DetailRow label="MILL" value="HAAS VF-2 · 3 DAYS FREE" ok />
          <DetailRow label="HIST" value="3 SIMILAR · AUG–NOV 2025" />
          <DetailRow label="LAST" value="$738 · BOEING · 08/14" />
        </div>
      ),
    },
    {
      n: '3',
      title: 'Writes the quote.',
      body: 'The price comes from your own job history, not a calculator on the internet. The reasoning is shown next to the number. You can argue with it if you want.',
      tag: 'WRITES',
      detail: (
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>$760.32</div>
          <div style={{ color: 'var(--ink-3)' }}>$576.40 cost &nbsp;+&nbsp; 32% margin</div>
          <div style={{ marginTop: 8, color: 'var(--ink-2)' }}>Reason shown. Math shown. Your call.</div>
        </div>
      ),
    },
    {
      n: '4',
      title: 'Remembers what you say.',
      body: 'Tell Foreman "Boeing pays slow, add 8 percent." Next week, when another Boeing job comes in, the 8 percent is already there. Nothing to update, no spreadsheet to find.',
      tag: 'REMEMBERS',
      detail: (
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-2)' }}>
            <div style={{
              border: '1px dashed var(--ink-3)', padding: '10px 12px', background: 'var(--paper)',
              fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--ink)', lineHeight: 1.4,
            }}>
              "Boeing pays slow, add 8 percent."
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', marginTop: 6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                YOU · OCT 14, 9:42 AM
              </div>
            </div>
            <div style={{ marginTop: 10, color: 'var(--accent)' }}>✓ Saved to Boeing account.</div>
        </div>
      ),
    },
  ];

  return (
    <section id="how" style={{ padding: '100px 0', borderTop: '1px solid var(--ink)', background: 'var(--paper-2)' }}>
      <Container>
        <SectionTag number="02">How Foreman works</SectionTag>
        <Headline style={{ fontSize: 54, maxWidth: 900, marginBottom: 50 }}>
          Four steps. Same order, every time.
        </Headline>

        <div style={{ display: 'grid', gap: 0, border: '1px solid var(--ink)', background: 'var(--paper)' }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '120px 1.1fr 1fr',
              borderTop: i === 0 ? 'none' : '1px solid var(--ink)',
            }}>
              <div style={{
                borderRight: '1px solid var(--ink)',
                padding: '28px 20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'flex-start', gap: 10,
                background: 'var(--paper-2)',
              }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)' }}>STEP</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 64, fontWeight: 700, lineHeight: 1, color: 'var(--accent)' }}>{s.n}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.14em', color: 'var(--ink-3)' }}>{s.tag}</div>
              </div>
              <div style={{ padding: '28px 32px', borderRight: '1px solid var(--rule)' }}>
                <Headline style={{ fontSize: 26, marginBottom: 10 }}>{s.title}</Headline>
                <Body size={19} style={{ maxWidth: 520 }}>{s.body}</Body>
              </div>
              <div style={{ padding: '28px 32px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 14 }}>
                  EXAMPLE · RFQ-2026-0417
                </div>
                {s.detail}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 40,
          padding: '24px 28px',
          border: '1px solid var(--ink)',
          background: 'var(--ink)', color: 'var(--paper)',
          display: 'grid', gridTemplateColumns: '36px 1fr', gap: 20, alignItems: 'start',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 26, fontWeight: 700, color: 'var(--accent)' }}>4</div>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.14em', color: 'var(--rule)', marginBottom: 6 }}>
              STEP 4 IS THE ONE THAT MATTERS
            </div>
            <Body size={20} style={{ color: 'var(--paper)' }}>
              Every other quoting tool asks you to configure a policy once and then ignores you.
              Foreman learns the way a new foreman would: <strong style={{ color: 'var(--paper)' }}>by listening to you every day.</strong>
            </Body>
          </div>
        </div>
      </Container>
    </section>
  );
};

const DetailRow = ({ label, value, ok }) => (
  <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
    <span style={{ width: 52, color: 'var(--ink-3)', letterSpacing: '0.1em' }}>{label}</span>
    <span style={{ flex: 1, color: 'var(--ink)' }}>{value}</span>
    {ok && <span style={{ color: 'var(--ok)' }}>✓</span>}
  </div>
);

// ─────────────────────────────────────────────────────────────
// THE DIAL
// ─────────────────────────────────────────────────────────────
const DialSection = () => (
  <section id="dial" style={{ padding: '100px 0', borderTop: '1px solid var(--ink)' }}>
    <Container>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: 120 }}>
          <SectionTag number="03">Three modes</SectionTag>
          <Headline style={{ fontSize: 54, marginBottom: 24 }}>
            Think of Foreman as a dial.
          </Headline>
          <Body size={20} style={{ marginBottom: 22 }}>
            Same drawing. Three different quotes depending on how
            you feel about the job that day.
          </Body>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              {name: 'CAREFUL', desc: 'Adds a margin cushion. Flags tight tolerances. Asks a question before it commits.', color: 'var(--accent)'},
              {name: 'NORMAL', desc: 'Standard pricing off your history. Use this most days.', color: 'var(--ink)'},
              {name: 'AGGRESSIVE', desc: 'Cuts the margin to win volume. Points at the job you lost last quarter.', color: 'var(--accent-2)'},
            ].map((m, i) => (
              <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
                <span style={{
                  width: 10, height: 10, background: m.color, borderRadius: '50%',
                  flex: '0 0 auto', transform: 'translateY(2px)',
                }} />
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 14, letterSpacing: '0.08em' }}>{m.name}</div>
                  <Body size={17} style={{ marginTop: 4 }}>{m.desc}</Body>
                </div>
              </li>
            ))}
          </ul>
          <div style={{
            marginTop: 28,
            fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.12em', color: 'var(--ink-3)', textTransform: 'uppercase',
          }}>
            Flip the dial →<br />The next quote changes.
          </div>
        </div>

        <QuoteDial />
      </div>
    </Container>
  </section>
);

// ─────────────────────────────────────────────────────────────
// YOUR SHOP, YOUR DATA
// ─────────────────────────────────────────────────────────────
const DataSection = () => (
  <section id="data" style={{ padding: '100px 0', borderTop: '1px solid var(--ink)', background: 'var(--ink)', color: 'var(--paper)' }}>
    <Container>
      <SectionTag number="04"><span style={{color: 'var(--rule-2)'}}>Your shop, your data</span></SectionTag>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'start' }}>
        <Headline style={{ fontSize: 64, color: 'var(--paper)' }}>
          Your pricing is your moat.
        </Headline>
        <div>
          <Lede style={{ color: 'var(--paper)', fontSize: 24 }}>
            Your drawings, your customers, your prices: they stay
            on a computer in your shop. They do not go to a cloud.
            They are not used to train someone else's product.
          </Lede>
          <Body size={20} style={{ color: 'var(--rule-2)', marginTop: 22 }}>
            What Foreman learns about your shop is yours. If you
            sell the shop one day, the knowledge goes with it. If
            you turn Foreman off, nobody sees what was inside.
          </Body>
          <Body size={20} style={{ color: 'var(--rule-2)', marginTop: 16 }}>
            No hosted quoting service can promise this. We can.
          </Body>
        </div>
      </div>

      {/* Three promise blocks */}
      <div style={{ marginTop: 72, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--rule-2)' }}>
        {[
          { label: 'ON-PREM', title: 'Runs on a small computer in your shop.', body: 'Plug it in, once. No cloud account, no monthly fee, no internet required.' },
          { label: 'OPEN SOURCE', title: 'Every line of code, visible.', body: 'Inspect, audit, or walk away. MIT license. The code lives on GitHub.' },
          { label: 'DATA STAYS', title: 'Drawings never leave the building.', body: 'Not used for training. Not shared. Not backed up to anyone else\'s server.' },
        ].map((p, i) => (
          <div key={i} style={{
            padding: '28px 24px',
            borderRight: i < 2 ? '1px solid var(--rule-2)' : 'none',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--rule-2)' }}>{p.label}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 20, lineHeight: 1.25, textTransform: 'uppercase', fontWeight: 700, color: 'var(--paper)' }}>{p.title}</div>
            <Body size={17} style={{ color: 'var(--rule-2)' }}>{p.body}</Body>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// ─────────────────────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────────────────────
const Pricing = () => (
  <section style={{ padding: '100px 0', borderTop: '1px solid var(--ink)' }}>
    <Container>
      <SectionTag number="05">What it costs</SectionTag>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'start' }}>
        <div>
          <Headline style={{ fontSize: 56, marginBottom: 30 }}>
            One install.<br/>One support plan.<br/><span style={{color: 'var(--accent)'}}>You own it.</span>
          </Headline>
          <Body size={20} style={{ marginBottom: 18 }}>
            Foreman runs on a small computer we install in your
            shop. No monthly cloud fee. No per-quote fee.
          </Body>
          <Body size={20}>
            Tell us about your shop (how many quotes a week, what
            software you use, how many estimators), and we will
            price it the way you would price a job: honestly, and
            based on what it actually takes.
          </Body>
          <div style={{
            marginTop: 28, padding: '18px 22px',
            border: '1px dashed var(--ink)',
            fontFamily: 'var(--serif)', fontSize: 19, lineHeight: 1.45, maxWidth: 560,
          }}>
            <strong>The money is the easy part.</strong> The hard part is
            getting Foreman quoting as well as you do, and we are
            more interested in that.
          </div>
          <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Btn href="mailto:omar.dominguez7@gmail.com?subject=Foreman%20pricing" variant="primary">
              Get a quote →
            </Btn>
            <Btn href="mailto:omar.dominguez7@gmail.com?subject=Foreman%20demo" variant="secondary">
              Or book a demo first
            </Btn>
          </div>
        </div>

        <Paper label="SAMPLE COST NOTE" style={{ padding: '28px 28px' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            WHAT'S INCLUDED
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'On-site install. Wired to your shop network.',
              'Tuned on your last 12 months of quotes.',
              'First 30 days: we sit with you and fix what it gets wrong.',
              'Support plan: we answer the phone. An actual person.',
              'No per-quote fee. Quote 5 or 500 a week. Same price.',
            ].map((r, i) => (
              <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--ink)' }}>
                <Tick size={20} /> <span>{r}</span>
              </li>
            ))}
          </ul>
          <div style={{
            marginTop: 20, paddingTop: 16, borderTop: '1px dashed var(--rule)',
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-3)', textTransform: 'uppercase',
          }}>
            SIGNED ____________________  DATE __/__/____
          </div>
        </Paper>
      </div>
    </Container>
  </section>
);

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────
const Faq = () => {
  const [open, setOpen] = React.useState(0);
  const items = [
    {
      q: 'Is this just ChatGPT in a box?',
      a: 'No. ChatGPT does not know your inventory, your schedule, or what you charged Boeing last August. Foreman does, because it reads your shop\'s own records.',
    },
    {
      q: 'Will Foreman replace my estimator?',
      a: 'No. Foreman drafts; your estimator reviews and sends. Same person, more quotes out the door.',
    },
    {
      q: 'What if the drawing is in Spanish or German?',
      a: 'Foreman handles mixed-language drawings. Tested on real ones from real customers.',
    },
    {
      q: 'What if the internet goes down?',
      a: 'Foreman keeps working. The brain runs on the computer in your shop.',
    },
    {
      q: "What if I don't like a quote Foreman wrote?",
      a: 'Say so in plain English. Foreman remembers your correction and applies it next time.',
    },
    {
      q: 'What if the job is unusual and there is no history for it?',
      a: 'Foreman tells you that. It falls back to shop-average pricing and flags what it is unsure about. It will not make numbers up.',
    },
    {
      q: 'Is Foreman something I have to learn?',
      a: "No. You type to it the way you would text a person. No menus, no dashboards, no new software to learn. If you can text, you can run Foreman.",
    },
  ];
  return (
    <section id="questions" style={{ padding: '100px 0', borderTop: '1px solid var(--ink)', background: 'var(--paper-2)' }}>
      <Container>
        <SectionTag number="06">Common questions</SectionTag>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
          <div>
            <Headline style={{ fontSize: 54 }}>
              The ones we get every time.
            </Headline>
            <Body size={19} style={{ marginTop: 22 }}>
              If yours isn't here, write to Omar. He reads every email.
            </Body>
          </div>
          <div style={{ border: '1px solid var(--ink)', background: 'var(--paper)' }}>
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={i} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--rule)' }}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      width: '100%', textAlign: 'left', background: 'transparent', border: 'none',
                      padding: '22px 24px', cursor: 'pointer',
                      display: 'grid', gridTemplateColumns: '40px 1fr 24px', gap: 16, alignItems: 'center',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.1em' }}>
                      Q·{String(i+1).padStart(2,'0')}
                    </span>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: 21, color: 'var(--ink)', fontWeight: 500 }}>{it.q}</span>
                    <span style={{
                      fontFamily: 'var(--mono)', fontSize: 18, color: 'var(--ink)',
                      width: 24, height: 24, display: 'inline-flex',
                      alignItems: 'center', justifyContent: 'center',
                      border: '1px solid var(--ink)',
                      transition: 'transform 0.2s ease',
                    }}>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: '0 24px 24px 80px',
                      fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--ink-2)', lineHeight: 1.55,
                      textWrap: 'pretty', maxWidth: 680,
                    }}>{it.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// ABOUT + FINAL CTA
// ─────────────────────────────────────────────────────────────
const About = () => (
  <section id="about" style={{ padding: '100px 0', borderTop: '1px solid var(--ink)' }}>
    <Container>
      <SectionTag number="07">About</SectionTag>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start' }}>
        <PhotoPlaceholder label="OMAR AT A MACHINE SHOP" caption="Dominguez · Cambridge, MA" ratio="4/5" />
        <div>
          <Headline style={{ fontSize: 52, marginBottom: 22 }}>
            Built by one person.<br/>
            Based on real conversations.
          </Headline>
          <Body size={21} style={{ marginBottom: 18 }}>
            Foreman is being built by Omar Dominguez as part of
            <strong> MIT AI Studio (MAS.664)</strong>. It was shaped by
            conversations with machine shop owners across the US:
            how they quote today, what slows them down, and what
            they would never trust a computer to do.
          </Body>
          <Body size={21} style={{ marginBottom: 18 }}>
            Open source: every line of code that runs on your
            shop floor is on GitHub. Your data stays on your
            machine and does not train anyone else's product.
          </Body>
          <Body size={21} style={{ marginBottom: 28 }}>
            Under the hood, Foreman uses modern AI (open-source
            large language models running on a GPU in your shop).
            It just does not brag about it.
          </Body>

          <div style={{
            padding: '26px 28px', border: '1px solid var(--ink)', background: 'var(--paper-2)',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.14em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 10 }}>
              INVITATION
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.45, color: 'var(--ink)', marginBottom: 18, textWrap: 'pretty' }}>
              If you run a shop and want to see Foreman quote one of
              your own drawings live, write to Omar. A 20-minute
              call. No slides. Just your drawing and a quote.
            </div>
            <Btn href="mailto:omar.dominguez7@gmail.com?subject=Foreman%20demo%20request" variant="accent">
              omar.dominguez7@gmail.com →
            </Btn>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

// ─────────────────────────────────────────────────────────────
// FINAL BAND
// ─────────────────────────────────────────────────────────────
const FinalCTA = () => (
  <section style={{ padding: '80px 0', borderTop: '1px solid var(--ink)', background: 'var(--ink)', color: 'var(--paper)' }}>
    <Container>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 60, alignItems: 'center' }}>
        <Display size={96} style={{ color: 'var(--paper)' }}>
          Bring Foreman<br/>to your shop.
        </Display>
        <div>
          <Body size={20} style={{ color: 'var(--rule-2)', marginBottom: 22 }}>
            A 20-minute demo. We quote one of your drawings live.
            You decide if it's useful.
          </Body>
          <Btn href="mailto:omar.dominguez7@gmail.com?subject=Foreman%20demo%20request" variant="accent">
            Email Omar →
          </Btn>
        </div>
      </div>
    </Container>
  </section>
);

const Footer = () => (
  <footer style={{ padding: '40px 0', background: 'var(--ink)', color: 'var(--rule-2)', borderTop: '1px solid var(--ink-2)' }}>
    <Container style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
    }}>
      <div>© 2026 Foreman · Built in Cambridge, MA</div>
      <div style={{ display: 'flex', gap: 26 }}>
        <a href="https://github.com/odominguez7/wedge-agentic-edge" target="_blank" rel="noopener" style={{ color: 'var(--rule-2)' }}>GitHub</a>
        <a href="#how" style={{ color: 'var(--rule-2)' }}>Docs</a>
        <a href="mailto:omar.dominguez7@gmail.com" style={{ color: 'var(--rule-2)' }}>Contact</a>
        <span>MIT License</span>
      </div>
    </Container>
  </footer>
);

Object.assign(window, {
  Nav, Hero, WhatItDoes, HowItWorks, DialSection, DataSection,
  Pricing, Faq, About, FinalCTA, Footer,
});
