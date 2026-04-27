// Fast-buy strip directly under the Hero. Three best-selling bars with
// prominent price, rating, stock state, and an Add-to-Cart form — the goal
// is a click within seconds. Forms submit through AddToCartForm which
// auto-detects a live Shopify store and falls back to the local cart here.
function BestSellers({ flavors, onAdd }) {
  return (
    <section id="bestsellers" style={{
      padding: '64px 28px 72px', position: 'relative',
      background: 'transparent', color: 'var(--ink-text)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '14px', marginBottom: '28px',
      }}>
        <div style={{display: 'flex', alignItems: 'baseline', gap: '18px', flexWrap: 'wrap'}}>
          <h2 className="display" style={{
            fontSize: 'clamp(36px, 4.6vw, 68px)', letterSpacing: '-0.035em', lineHeight: 0.95,
          }}>
            Shop Bestsellers<span style={{color: 'var(--accent)'}}>.</span>
          </h2>
          <div className="mono-label" style={{opacity: 0.6, letterSpacing: '0.2em'}}>
            — Ships in 48h · Free over $40
          </div>
        </div>
        <a href="#flavors" className="mono-label" style={{
          opacity: 0.85, letterSpacing: '0.2em', textDecoration: 'underline', textUnderlineOffset: '5px',
        }}>
          See all flavors →
        </a>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '14px',
      }}>
        {flavors.map((f, i) => (
          <article
            key={f.id}
            data-product-id={f.handle}
            data-variant-id={f.variantId}
            style={{
              position: 'relative',
              background: 'color-mix(in srgb, #ffffff 72%, transparent)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid color-mix(in srgb, var(--ink-text) 12%, transparent)',
              borderRadius: '22px',
              padding: '18px 18px 16px',
              display: 'flex', alignItems: 'center', gap: '14px',
              transition: 'transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s',
            }}
          >
            {i === 0 && (
              <div style={{
                position: 'absolute', top: '-10px', left: '18px',
                background: 'var(--accent)', color: '#1a1a1c',
                padding: '4px 10px', borderRadius: '999px',
                fontFamily: 'var(--font-ui)', fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.16em', textTransform: 'uppercase',
              }}>★ Bestseller</div>
            )}

            <div style={{
              width: '88px', height: '108px', flexShrink: 0,
              borderRadius: '14px', overflow: 'hidden',
              display: 'grid', placeItems: 'center',
              background: 'color-mix(in srgb, var(--ink-text) 4%, transparent)',
            }}>
              <img src={f.img} alt={f.name} style={{
                height: '100%', width: '100%', objectFit: 'contain',
              }}/>
            </div>

            <div style={{flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px'}}>
              <div className="display" style={{
                fontSize: '22px', letterSpacing: '-0.02em', lineHeight: 1,
              }}>{f.name}</div>
              <Rating value={f.rating} count={f.reviewCount} size={12}/>
              <div className="mono-label" style={{opacity: 0.6, marginTop: '2px', fontSize: '10px'}}>
                {f.macros.protein}G · {f.macros.caffeine}MG CAFFEINE · {f.sku}
              </div>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px',
                fontFamily: "'Ciron', 'Arial Black', sans-serif", fontWeight: 900,
              }}>
                <span style={{fontSize: '24px', letterSpacing: '-0.02em'}}>{formatMoney(f.price)}</span>
                <span className="mono-label" style={{opacity: 0.55, fontWeight: 700}}>/ bar</span>
              </div>
            </div>

            <AddToCartForm product={f} onAdd={onAdd} buttonLabel="+ Add" buttonStyle={{padding: '12px 18px', fontSize: '12px'}}/>
          </article>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { BestSellers });
