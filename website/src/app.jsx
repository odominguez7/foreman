// App root + Tweaks

const TONE_PRESETS = {
  cream:  { paper: '#f4efe4', paper2: '#ece6d7', rule: '#cabfa6', rule2: '#ded4bb', edge: '#e6dfcb' },
  paper:  { paper: '#f8f5ee', paper2: '#efeadc', rule: '#d5ccb4', rule2: '#e3dcc6', edge: '#ebe4d0' },
  linen:  { paper: '#efeadd', paper2: '#e4ddcc', rule: '#c2b89c', rule2: '#d4c9ab', edge: '#ddd3b9' },
  bone:   { paper: '#f1eee6', paper2: '#e8e3d4', rule: '#cec4ac', rule2: '#ded5bd', edge: '#e6dfcb' },
};

const ACCENT_PRESETS = {
  blueprint: { accent: '#0a5a8a' },
  ink:       { accent: '#14110d' },
  rust:      { accent: '#a24a18' },
  forest:    { accent: '#2f5a34' },
};

function applyTweaks(t) {
  const tone = TONE_PRESETS[t.paperTone] || TONE_PRESETS.cream;
  const acc = ACCENT_PRESETS[t.accent] || ACCENT_PRESETS.blueprint;
  const r = document.documentElement;
  r.style.setProperty('--paper', tone.paper);
  r.style.setProperty('--paper-2', tone.paper2);
  r.style.setProperty('--rule', tone.rule);
  r.style.setProperty('--rule-2', tone.rule2);
  r.style.setProperty('--paper-edge', tone.edge);
  r.style.setProperty('--accent', acc.accent);
  r.style.setProperty('--body-size', t.density === 'compact' ? '18px' : t.density === 'roomy' ? '22px' : '20px');
  // grid
  document.body.style.backgroundImage = t.showGrid
    ? 'linear-gradient(to right, rgba(20,17,13,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,17,13,0.035) 1px, transparent 1px)'
    : 'none';
}

const TweaksPanel = ({ tweaks, setTweaks }) => {
  const set = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    applyTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };
  return (
    <div style={{
      position: 'fixed', right: 20, bottom: 20, zIndex: 100,
      width: 300,
      background: 'var(--paper)',
      border: '1px solid var(--ink)',
      boxShadow: '0 12px 40px rgba(20,17,13,0.22)',
      fontFamily: 'var(--mono)',
    }}>
      <div style={{
        padding: '10px 14px', borderBottom: '1px solid var(--ink)',
        background: 'var(--ink)', color: 'var(--paper)',
        fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span>Tweaks</span>
        <span>v0.9</span>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Row2 label="Paper tone">
          <Segmented value={tweaks.paperTone} onChange={(v)=>set('paperTone', v)}
            opts={[['cream','Cream'],['paper','Paper'],['linen','Linen'],['bone','Bone']]} />
        </Row2>
        <Row2 label="Accent">
          <Segmented value={tweaks.accent} onChange={(v)=>set('accent', v)}
            opts={[['blueprint','Blueprint'],['ink','Ink'],['rust','Rust'],['forest','Forest']]} />
        </Row2>
        <Row2 label="Density">
          <Segmented value={tweaks.density} onChange={(v)=>set('density', v)}
            opts={[['compact','Compact'],['comfortable','Regular'],['roomy','Roomy']]} />
        </Row2>
        <Row2 label="Grid paper">
          <Segmented value={tweaks.showGrid ? 'on' : 'off'} onChange={(v)=>set('showGrid', v==='on')}
            opts={[['on','On'],['off','Off']]} />
        </Row2>
      </div>
    </div>
  );
};

const Row2 = ({ label, children }) => (
  <div>
    <div style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-3)', marginBottom: 6, textTransform: 'uppercase' }}>{label}</div>
    {children}
  </div>
);

const Segmented = ({ value, onChange, opts }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${opts.length}, 1fr)`, border: '1px solid var(--ink)' }}>
    {opts.map(([v, lbl], i) => (
      <button key={v} onClick={() => onChange(v)}
        style={{
          appearance: 'none', border: 'none',
          borderLeft: i === 0 ? 'none' : '1px solid var(--ink)',
          background: value === v ? 'var(--ink)' : 'transparent',
          color: value === v ? 'var(--paper)' : 'var(--ink)',
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
          padding: '8px 6px', cursor: 'pointer', textTransform: 'uppercase',
        }}>{lbl}</button>
    ))}
  </div>
);

const App = () => {
  const [tweaks, setTweaks] = React.useState(window.__TWEAKS);
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    applyTweaks(tweaks);
  }, []);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setEditMode(true);
      if (e.data.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <WhatItDoes />
      <HowItWorks />
      <DialSection />
      <DataSection />
      <Pricing />
      <Faq />
      <About />
      <FinalCTA />
      <Footer />
      {editMode && <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} />}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
