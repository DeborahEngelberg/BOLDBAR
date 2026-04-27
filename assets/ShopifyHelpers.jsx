// Shopify integration helpers. Works in two modes:
//   1) Live Shopify store — POSTs to /cart/add.js and redirects to /checkout
//   2) Local preview (no Shopify) — falls back to the in-memory cart passed
//      via onAdd(), so the whole UX is verifiable without a real store.
const { useState: useStateSh } = React;

// Fire an AJAX add-to-cart against Shopify's /cart/add.js. Returns the line
// item on success, throws on Shopify errors. Safe to call from any component.
async function shopifyAddToCart({ variantId, quantity = 1, sellingPlan, properties }) {
  const body = new FormData();
  body.append('id', variantId);
  body.append('quantity', String(quantity));
  if (sellingPlan) body.append('selling_plan', sellingPlan);
  if (properties) {
    Object.entries(properties).forEach(([k, v]) => body.append(`properties[${k}]`, String(v)));
  }
  const res = await fetch('/cart/add.js', { method: 'POST', body, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error('cart/add failed: ' + res.status);
  return res.json();
}

// Visible only in live-store mode via feature detection on window.Shopify.
function isLiveShopify() {
  return !!(window.Shopify && window.Shopify.shop);
}

// Star rating row — filled to `value` out of 5, optionally with review count.
function Rating({ value, count, size = 14, accent = 'var(--accent)' }) {
  const full = Math.floor(value);
  const half = value - full >= 0.25 && value - full < 0.75;
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return 'full';
    if (i === full && half) return 'half';
    return 'empty';
  });
  return (
    <div style={{display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-ui)'}}>
      <div style={{display: 'inline-flex', gap: '2px'}}>
        {stars.map((s, i) => (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
            <defs>
              <linearGradient id={`sg-${i}-${s}`}>
                <stop offset={s === 'half' ? '50%' : s === 'full' ? '100%' : '0%'} stopColor={accent}/>
                <stop offset={s === 'half' ? '50%' : s === 'full' ? '100%' : '0%'} stopColor="transparent"/>
              </linearGradient>
            </defs>
            <path
              d="M12 2 L15 9 L22 9 L16.5 13.5 L18.5 21 L12 16.5 L5.5 21 L7.5 13.5 L2 9 L9 9 Z"
              fill={`url(#sg-${i}-${s})`}
              stroke={accent}
              strokeWidth="1.5"
            />
          </svg>
        ))}
      </div>
      <span style={{fontSize: '13px', fontWeight: 700}}>{value.toFixed(1)}</span>
      {count != null && (
        <span style={{fontSize: '12px', opacity: 0.65}}>· {count.toLocaleString()} reviews</span>
      )}
    </div>
  );
}

// Stock indicator — green pill "In Stock", amber "Only N left", red "Sold Out".
function StockTag({ inventory }) {
  if (inventory <= 0)   return <span style={stockStyle('#d94236')}>Sold out</span>;
  if (inventory < 100)  return <span style={stockStyle('#c47a12')}>Only {inventory} left</span>;
  return <span style={stockStyle('#2e8450')}>In stock</span>;
}
function stockStyle(color) {
  return {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '4px 10px', borderRadius: '999px',
    background: `color-mix(in srgb, ${color} 15%, transparent)`,
    color,
    fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 700,
    letterSpacing: '0.14em', textTransform: 'uppercase',
  };
}

// Quantity stepper — used in Hero + PDP-style cards.
function QtyStepper({ value, setValue, min = 1, max = 24 }) {
  const dec = () => setValue(Math.max(min, value - 1));
  const inc = () => setValue(Math.min(max, value + 1));
  const btn = {
    width: '36px', height: '36px', borderRadius: '50%',
    border: '1px solid color-mix(in srgb, var(--ink-text) 25%, transparent)',
    background: 'transparent', color: 'var(--ink-text)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '16px', cursor: 'pointer',
  };
  return (
    <div style={{display: 'inline-flex', alignItems: 'center', gap: '10px'}}>
      <button type="button" onClick={dec} style={btn} aria-label="Decrease">−</button>
      <input
        type="number"
        name="quantity"
        value={value}
        min={min}
        max={max}
        onChange={(e) => setValue(Math.max(min, Math.min(max, +e.target.value || min)))}
        style={{
          width: '48px', textAlign: 'center',
          fontFamily: "'Ciron', sans-serif", fontWeight: 900, fontSize: '22px',
          background: 'transparent', border: 0,
          color: 'var(--ink-text)',
        }}
      />
      <button type="button" onClick={inc} style={btn} aria-label="Increase">+</button>
    </div>
  );
}

// <form>-based Shopify add-to-cart button that *also* works in local preview.
// Renders its own qty stepper if `includeQty` is true.
function AddToCartForm({ product, onAdd, includeQty = false, buttonLabel = 'Add to Cart', buttonStyle = {}, className = '' }) {
  const [qty, setQty] = useStateSh(1);
  const [busy, setBusy] = useStateSh(false);
  return (
    <form
      method="post"
      action="/cart/add"
      data-product-id={product.handle}
      data-variant-id={product.variantId}
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setBusy(true);
        try {
          if (isLiveShopify()) {
            await shopifyAddToCart({ variantId: product.variantId, quantity: qty });
            // trigger cart drawer or redirect — pick one convention
            window.dispatchEvent(new CustomEvent('cart:add', { detail: product }));
          }
        } catch (err) {
          console.error(err);
        } finally {
          setBusy(false);
          if (onAdd) onAdd(product, qty);
        }
      }}
      className={className}
      style={{display: 'inline-flex', alignItems: 'center', gap: '14px'}}
    >
      <input type="hidden" name="id" value={product.variantId}/>
      {!includeQty && <input type="hidden" name="quantity" value="1"/>}
      {includeQty && <QtyStepper value={qty} setValue={setQty}/>}
      <button
        type="submit"
        disabled={busy || product.inventory <= 0}
        style={{
          background: 'var(--accent)', color: '#1a1a1c',
          border: 0, borderRadius: '999px',
          padding: '16px 28px',
          fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          cursor: product.inventory <= 0 ? 'not-allowed' : 'pointer',
          opacity: product.inventory <= 0 ? 0.45 : 1,
          boxShadow: '0 16px 36px color-mix(in srgb, var(--accent) 40%, transparent)',
          transition: 'transform .2s',
          whiteSpace: 'nowrap',
          ...buttonStyle,
        }}
      >
        {product.inventory <= 0 ? 'Sold Out' : (busy ? 'Adding…' : buttonLabel)}
      </button>
    </form>
  );
}

// Inject JSON-LD Product schema for each flavor — helps SEO + rich results.
function ProductSchema({ flavors }) {
  const data = flavors.map(f => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `BOLD ${f.name} Bar`,
    sku: f.sku,
    description: f.desc,
    image: location.origin + '/' + f.img,
    brand: { '@type': 'Brand', name: 'BOLD' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: f.rating,
      reviewCount: f.reviewCount,
    },
    offers: {
      '@type': 'Offer',
      url: location.origin + '/products/' + f.handle,
      priceCurrency: 'USD',
      price: (f.price / 100).toFixed(2),
      availability: f.inventory > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  }));
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}/>;
}

Object.assign(window, { shopifyAddToCart, isLiveShopify, Rating, StockTag, QtyStepper, AddToCartForm, ProductSchema });
