// Flavor switcher: 3-up grid, click repaints whole page theme.
function FlavorGrid({ activeId, setActive, onAdd }) {
  return (
    <section id="flavors" style={{
      padding: '140px 28px 120px', position: 'relative',
      background: 'transparent', color: 'var(--ink-text)',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginBottom: '60px', flexWrap: 'wrap', gap: '20px',
      }}>
        <div>
          <div className="mono-label" style={{opacity: 0.6, marginBottom: '12px'}}>— THE LINEUP</div>
          <h2 className="display" style={{
            fontSize: 'clamp(80px, 12vw, 200px)',
            letterSpacing: '-0.04em',
          }}>
            Pick<br/>
            Your<br/>
            <span style={{color: 'var(--accent)'}}>Poison.</span>
          </h2>
        </div>
        <div style={{maxWidth: '380px', fontFamily: 'var(--font-ui)', fontSize: '16px', lineHeight: 1.5}}>
          Three flavors. One mission. Same clean caffeine, same 20 grams of protein. Tap a bar to repaint the page in its wrapper.
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px',
      }}>
        {window.FLAVORS.map((f) => (
          <FlavorCard key={f.id} flavor={f} active={f.id === activeId}
            onClick={() => setActive(f.id)}
            onAdd={onAdd}/>
        ))}
      </div>
    </section>
  );
}

function FlavorCard({flavor, active, onClick, onAdd}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: flavor.wrapper,
        color: '#fff',
        borderRadius: '32px',
        padding: '32px 28px 28px',
        minHeight: '560px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform .5s cubic-bezier(.2,.7,.2,1), box-shadow .5s',
        transform: active ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: active ? '0 30px 60px rgba(0,0,0,0.25)' : '0 10px 30px rgba(0,0,0,0.1)',
        border: active ? `3px solid ${flavor.accent}` : '3px solid transparent',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* SKU + name */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <div>
          <div className="mono-label" style={{fontSize: '10px', opacity: 0.7}}>№ {flavor.hex}</div>
          <div className="display" style={{fontSize: '36px', marginTop: '8px', letterSpacing: '-0.03em', maxWidth: '220px'}}>
            {flavor.name}
          </div>
        </div>
        {active && (
          <div style={{
            width: '14px', height: '14px', borderRadius: '50%',
            background: flavor.accent, boxShadow: `0 0 0 4px color-mix(in srgb, ${flavor.accent} 30%, transparent)`,
          }}/>
        )}
      </div>

      {/* bar image */}
      <div style={{flex: 1, position: 'relative', margin: '12px -20px 0'}}>
        <img src={flavor.img} alt={flavor.name} style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'contain',
          transform: hover ? 'translateY(-12px) rotate(-4deg) scale(1.04)' : 'rotate(-2deg)',
          transition: 'transform .5s cubic-bezier(.2,.7,.2,1)',
          filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.4))',
        }}/>
      </div>

      {/* rating + stock row */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', gap: '10px'}}>
        <Rating value={flavor.rating} count={flavor.reviewCount} size={13} accent="#fff"/>
        <StockTag inventory={flavor.inventory}/>
      </div>

      {/* footer — price + Shopify-ready add-to-cart form */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', gap: '12px'}}>
        <div>
          <div style={{fontFamily: "'Ciron', 'Arial Black', sans-serif", fontWeight: 900, fontSize: '24px', letterSpacing: '-0.02em', color: '#fff'}}>
            {formatMoney(flavor.price)} <span className="mono-label" style={{opacity: 0.6, fontSize: '10px', fontWeight: 700}}>/ BAR</span>
          </div>
          <div className="mono-label" style={{fontSize: '10px', opacity: 0.6, marginTop: '2px'}}>
            {flavor.macros.protein}G · {flavor.macros.caffeine}MG CAF · {flavor.sku}
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <AddToCartForm product={flavor} onAdd={onAdd} buttonLabel="Add to Cart" buttonStyle={{padding: '12px 20px', fontSize: '12px'}}/>
        </div>
      </div>

      {/* corner tag */}
      <div style={{
        position: 'absolute', top: '24px', right: '-40px',
        transform: 'rotate(45deg)',
        background: flavor.accent, color: flavor.wrapper2,
        padding: '4px 48px',
        fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.14em',
        fontWeight: 700,
        display: active ? 'none' : 'block',
      }}>
        TAP TO VIEW
      </div>
    </div>
  );
}

Object.assign(window, { FlavorGrid });
