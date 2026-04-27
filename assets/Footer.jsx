// Bundle & Save CTA + footer. Each bundle posts to Shopify's /cart/add with
// a variant ID; swap REPLACE_WITH_SHOPIFY_VARIANT_* at integration time.
function Subscribe() {
  const bundles = [
    { id: 'starter', label: 'Starter 4-pack', sub: '4 bars · 1 flavor', price: 16, compare: null, badge: null, cta: 'Add to Cart' },
    { id: 'variety', label: 'Variety 12-pack', sub: '12 bars · all 3 flavors', price: 42, compare: 48, badge: 'Most Popular', cta: 'Add to Cart', featured: true },
    { id: 'sub',     label: 'Monthly Subscription', sub: '12 bars · ships every 4 wks', price: 34, compare: 48, badge: 'Save 28%', cta: 'Subscribe & Save' },
  ];
  return (
    <section id="bundles" style={{
      padding: '120px 28px',
      background: 'var(--accent)', color: 'var(--ink-text)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr', gap: '48px'}}>
        <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px'}}>
          <div>
            <div className="mono-label" style={{opacity: 0.65, marginBottom: '14px', letterSpacing: '0.22em'}}>— Bundle & Save</div>
            <h2 className="display" style={{fontSize: 'clamp(56px, 8vw, 128px)', letterSpacing: '-0.04em', lineHeight: 0.88}}>
              Stock up.<br/>Save up to <span style={{opacity: 0.5}}>28%.</span>
            </h2>
          </div>
          <p style={{fontFamily: 'var(--font-ui)', fontSize: '16px', maxWidth: '380px', lineHeight: 1.55, opacity: 0.85}}>
            Pre-built boxes for the 2pm wall. Pause, swap, or cancel anytime — no spreadsheets, no commitment.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
        }}>
          {bundles.map((b) => (
            <form
              key={b.id}
              method="post"
              action="/cart/add"
              data-product-id={`bold-bundle-${b.id}`}
              data-variant-id={`REPLACE_WITH_SHOPIFY_VARIANT_BUNDLE_${b.id.toUpperCase()}`}
              onSubmit={(e) => { e.preventDefault(); /* cart integration */ }}
              style={{
                position: 'relative',
                background: b.featured ? 'var(--ink-text)' : 'transparent',
                color: b.featured ? 'var(--paper)' : 'var(--ink-text)',
                border: `1.5px solid ${b.featured ? 'var(--ink-text)' : 'color-mix(in srgb, var(--ink-text) 85%, transparent)'}`,
                borderRadius: '22px', padding: '24px 24px 20px',
                display: 'flex', flexDirection: 'column', gap: '18px',
                transition: 'transform .25s cubic-bezier(.16,1,.3,1)',
              }}
            >
              <input type="hidden" name="id" value={`REPLACE_WITH_SHOPIFY_VARIANT_BUNDLE_${b.id.toUpperCase()}`} />
              <input type="hidden" name="quantity" value="1" />
              {b.id === 'sub' && <input type="hidden" name="selling_plan" value="REPLACE_WITH_SHOPIFY_SELLING_PLAN_ID" />}

              {b.badge && (
                <div style={{
                  position: 'absolute', top: '-11px', left: '22px',
                  background: b.featured ? 'var(--accent)' : 'var(--ink-text)',
                  color: b.featured ? 'var(--ink-text)' : 'var(--accent)',
                  padding: '4px 12px', borderRadius: '999px',
                  fontFamily: 'var(--font-ui)', fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                }}>{b.badge}</div>
              )}

              <div>
                <div className="display" style={{fontSize: '26px', letterSpacing: '-0.02em', lineHeight: 1}}>{b.label}</div>
                <div className="mono-label" style={{opacity: 0.65, marginTop: '6px', fontSize: '11px'}}>{b.sub}</div>
              </div>

              <div style={{display: 'flex', alignItems: 'baseline', gap: '10px'}}>
                <div className="display" style={{fontSize: '44px', letterSpacing: '-0.03em'}}>${b.price}</div>
                {b.compare && (
                  <div style={{
                    fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 700,
                    textDecoration: 'line-through', opacity: 0.5,
                  }}>${b.compare}</div>
                )}
              </div>

              <button type="submit" style={{
                marginTop: 'auto',
                background: b.featured ? 'var(--accent)' : 'var(--ink-text)',
                color: b.featured ? 'var(--ink-text)' : 'var(--paper)',
                padding: '16px 20px', borderRadius: '999px',
                fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                border: 0, cursor: 'pointer',
                boxShadow: b.featured ? '0 14px 30px color-mix(in srgb, var(--accent) 45%, transparent)' : 'none',
              }}>{b.cta} →</button>
            </form>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: 'var(--ink-text)', color: 'var(--paper)',
      padding: '80px 28px 32px',
    }}>
      <div className="display" style={{
        fontSize: 'clamp(120px, 22vw, 360px)', letterSpacing: '-0.06em', lineHeight: 0.8,
        color: 'var(--paper)',
      }}>BOLD<span style={{color: 'var(--accent)'}}>.</span></div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px',
        marginTop: '60px', paddingTop: '40px',
        borderTop: '1px solid color-mix(in srgb, var(--paper) 20%, transparent)',
      }}>
        {[
          { h: 'Shop', items: ['Mocha Crisp', 'Peanut Butter', 'Cookie Dough', 'Variety Box', 'Subscribe'] },
          { h: 'Company', items: ['Our Story', 'Ingredients', 'Sustainability', 'Careers'] },
          { h: 'Support', items: ['Shipping', 'Returns', 'Contact', 'FAQ'] },
          { h: 'Follow', items: ['Instagram', 'TikTok', 'YouTube', 'Newsletter'] },
        ].map((col) => (
          <div key={col.h}>
            <div className="mono-label" style={{opacity: 0.6, marginBottom: '16px'}}>— {col.h.toUpperCase()}</div>
            <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {col.items.map((i) => (
                <li key={i} style={{fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em'}}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: '60px', paddingTop: '24px',
        borderTop: '1px solid color-mix(in srgb, var(--paper) 20%, transparent)',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-ui)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7,
      }}>
        <div>© 2026 BOLD NUTRITION CO.</div>
        <div>FOR THE GRIND — BROOKLYN NY</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Subscribe, Footer });
