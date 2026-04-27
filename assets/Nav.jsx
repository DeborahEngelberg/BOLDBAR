// Top nav + promo ticker
const { useState, useEffect, useRef } = React;

function Ticker() {
  const items = ['FREE SHIP OVER $40', '100MG CAFFEINE', '20G PROTEIN', 'HONEY SWEETENED', 'NO CRASH', 'FOR THE GRIND', 'STAY BOLD'];
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="ticker" style={{
      background: 'var(--ink-text)', color: 'var(--paper)',
      overflow: 'hidden', borderBottom: '1px solid color-mix(in srgb, var(--paper) 18%, transparent)',
      position: 'relative', zIndex: 50,
    }}>
      <div className="ticker__track" style={{
        display: 'flex', gap: '28px', padding: '8px 0',
        whiteSpace: 'nowrap', animation: 'tickerScroll 48s linear infinite',
        fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em',
      }}>
        {repeated.map((t, i) => (
          <span key={i} style={{display: 'inline-flex', alignItems: 'center', gap: '28px'}}>
            {t}
            <span style={{opacity: 0.4}}>✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function Nav({onOpenCart, cartCount}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: scrolled ? 'color-mix(in srgb, var(--paper) 88%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px) saturate(1.2)' : 'none',
      borderBottom: scrolled ? '1px solid color-mix(in srgb, var(--ink-text) 10%, transparent)' : '1px solid transparent',
      transition: 'all .35s ease',
      padding: '14px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <a href="#" style={{
        fontFamily: "'Jaune', 'Arial Black', sans-serif",
        fontWeight: 900,
        fontSize: '36px',
        letterSpacing: '-0.08em',
        lineHeight: 0.82,
        textTransform: 'uppercase',
        color: 'var(--ink-text)',
        WebkitTextStroke: '2.5px var(--ink-text)',
        paintOrder: 'stroke fill',
        display: 'inline-flex', alignItems: 'baseline',
        transform: 'scaleX(1.08)', transformOrigin: 'left center',
      }}>
        BOLD<span style={{color: 'var(--accent)', WebkitTextStroke: '2.5px var(--accent)'}}>.</span>
      </a>
      <div style={{display: 'flex', gap: '28px', fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase'}}>
        <a href="#flavors">Flavors</a>
        <a href="#why">Why Bold</a>
        <a href="#inside">What's Inside</a>
        <a href="#reviews">Reviews</a>
      </div>
      <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
        <button className="ui" style={{
          padding: '10px 16px', borderRadius: '999px', fontSize: '12px', letterSpacing: '0.1em',
          border: '1.5px solid currentColor', textTransform: 'uppercase',
        }}>Subscribe</button>
        <button onClick={onOpenCart} className="ui" style={{
          padding: '10px 18px', borderRadius: '999px', background: 'var(--ink-text)', color: 'var(--paper)',
          fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          Bag <span style={{
            background: 'var(--accent)', color: 'var(--ink-text)', borderRadius: '999px',
            width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px',
          }}>{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}

Object.assign(window, { Ticker, Nav });
