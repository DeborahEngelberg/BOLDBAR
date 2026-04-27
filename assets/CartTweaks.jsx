// Cart drawer + Tweaks panel
const { useState: useStateCart } = React;

function CartDrawer({open, items, setItems, onClose}) {
  // prices are cents (Shopify convention); fall back to $4 for legacy entries.
  const totalCents = items.reduce((s, i) => s + i.qty * (i.price || 400), 0);
  const fmt = (window.formatMoney || ((c) => '$' + (c/100).toFixed(2)));
  const checkout = () => {
    if (window.Shopify && window.Shopify.shop) {
      window.location.href = '/checkout';
    } else {
      console.log('preview: would redirect to /checkout with', items);
    }
  };
  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity .4s', zIndex: 90,
      }}/>
      <aside style={{
        position: 'fixed', top: 0, right: 0, height: '100vh', width: '420px',
        background: 'var(--paper)', color: 'var(--ink-text)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .5s cubic-bezier(.2,.7,.2,1)',
        zIndex: 91, display: 'flex', flexDirection: 'column',
        boxShadow: '-30px 0 60px rgba(0,0,0,0.2)',
      }}>
        <div style={{padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid var(--ink-text)'}}>
          <div className="display" style={{fontSize: '32px', letterSpacing: '-0.03em'}}>Your Bag</div>
          <button onClick={onClose} className="mono-label">CLOSE ✕</button>
        </div>
        <div style={{flex: 1, overflowY: 'auto', padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {items.length === 0 && (
            <div style={{textAlign: 'center', padding: '60px 0', opacity: 0.6, fontFamily: 'var(--font-ui)'}}>
              Your bag's empty.<br/>Go grab a bar.
            </div>
          )}
          {items.map((i) => (
            <div key={i.id} style={{display: 'flex', gap: '12px', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid color-mix(in srgb, var(--ink-text) 15%, transparent)'}}>
              <div style={{width: '70px', height: '90px', background: i.wrapper, borderRadius: '8px', display: 'grid', placeItems: 'center', overflow: 'hidden'}}>
                <img src={i.img} alt="" style={{height: '100%', objectFit: 'contain'}}/>
              </div>
              <div style={{flex: 1}}>
                <div className="display" style={{fontSize: '20px', letterSpacing: '-0.02em'}}>{i.name}</div>
                <div className="mono-label" style={{opacity: 0.6, marginTop: '2px'}}>{fmt(i.price || 400)} / bar</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px'}}>
                  <button onClick={() => setItems(items.map(x => x.id === i.id ? {...x, qty: Math.max(0, x.qty - 1)} : x).filter(x => x.qty > 0))} style={{border: '1px solid currentColor', width: '24px', height: '24px', borderRadius: '50%', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, fontSize: '14px'}}>−</button>
                  <span className="display" style={{fontSize: '18px'}}>{i.qty}</span>
                  <button onClick={() => setItems(items.map(x => x.id === i.id ? {...x, qty: x.qty + 1} : x))} style={{border: '1px solid currentColor', width: '24px', height: '24px', borderRadius: '50%', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, fontSize: '14px'}}>+</button>
                </div>
              </div>
              <div className="display" style={{fontSize: '22px'}}>{fmt(i.qty * (i.price || 400))}</div>
            </div>
          ))}
        </div>
        <div style={{padding: '24px 28px', borderTop: '1.5px solid var(--ink-text)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
            <div className="mono-label">SUBTOTAL</div>
            <div className="display" style={{fontSize: '28px'}}>{fmt(totalCents)}</div>
          </div>
          <div className="mono-label" style={{opacity: 0.55, fontSize: '10px', marginBottom: '16px'}}>
            Shipping + taxes calculated at checkout
          </div>
          <button
            onClick={checkout}
            disabled={items.length === 0}
            style={{
              width: '100%', padding: '18px', borderRadius: '999px',
              background: items.length ? 'var(--accent)' : 'color-mix(in srgb, var(--ink-text) 12%, transparent)',
              color: items.length ? '#1a1a1c' : 'color-mix(in srgb, var(--ink-text) 50%, transparent)',
              fontFamily: 'var(--font-ui)', fontSize: '13px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700,
              cursor: items.length ? 'pointer' : 'not-allowed',
              boxShadow: items.length ? '0 12px 30px color-mix(in srgb, var(--accent) 40%, transparent)' : 'none',
              border: 0,
            }}>Checkout →</button>
        </div>
      </aside>
    </>
  );
}

function Tweaks({on, config, setConfig}) {
  if (!on) return null;
  const set = (k, v) => {
    const next = {...config, [k]: v};
    setConfig(next);
    window.parent.postMessage({type: '__edit_mode_set_keys', edits: {[k]: v}}, '*');
  };
  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 200,
      background: 'var(--ink-text)', color: 'var(--paper)',
      padding: '20px', borderRadius: '16px', width: '280px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      fontFamily: 'var(--font-ui)', fontSize: '13px',
    }}>
      <div className="display" style={{fontSize: '22px', marginBottom: '14px', letterSpacing: '-0.02em'}}>Tweaks</div>

      <Row label="Hero Layout">
        {['mega', 'centered', 'split'].map(v => (
          <Chip key={v} active={config.heroVariant === v} onClick={() => set('heroVariant', v)}>{v}</Chip>
        ))}
      </Row>
      <Row label="Accent Color">
        {[
          {v: '#c99a46', label: 'Gold'},
          {v: '#e04e23', label: 'Flame'},
          {v: '#7ac943', label: 'Matcha'},
          {v: '#f3ecdb', label: 'Cream'},
        ].map(c => (
          <button key={c.v} onClick={() => set('accentOverride', c.v)} style={{
            width: '30px', height: '30px', borderRadius: '50%', background: c.v,
            border: config.accentOverride === c.v ? '2px solid #fff' : '2px solid transparent',
          }} title={c.label}/>
        ))}
        <button onClick={() => set('accentOverride', null)} className="mono-label" style={{fontSize: '10px', opacity: 0.7}}>reset</button>
      </Row>
      <Row label="Type Scale">
        <input type="range" min="80" max="130" step="5" value={config.typeScale}
          onChange={(e) => set('typeScale', +e.target.value)}
          style={{width: '100%'}}/>
        <span className="mono-label" style={{opacity: 0.7}}>{config.typeScale}%</span>
      </Row>
      <Row label="Mode">
        <Chip active={!config.dark} onClick={() => set('dark', false)}>Light</Chip>
        <Chip active={config.dark} onClick={() => set('dark', true)}>Dark</Chip>
      </Row>
    </div>
  );
}

function Row({label, children}) {
  return (
    <div style={{marginBottom: '14px'}}>
      <div className="mono-label" style={{opacity: 0.6, marginBottom: '8px', fontSize: '10px'}}>{label}</div>
      <div style={{display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap'}}>{children}</div>
    </div>
  );
}
function Chip({children, active, onClick}) {
  return (
    <button onClick={onClick} style={{
      padding: '6px 12px', borderRadius: '999px',
      border: '1px solid ' + (active ? 'var(--paper)' : 'color-mix(in srgb, var(--paper) 30%, transparent)'),
      background: active ? 'var(--paper)' : 'transparent',
      color: active ? 'var(--ink-text)' : 'var(--paper)',
      fontFamily: 'var(--font-ui)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em',
    }}>{children}</button>
  );
}

Object.assign(window, { CartDrawer, Tweaks });
