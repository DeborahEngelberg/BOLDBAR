// Big horizontal marquee between hero and flavors.
function Marquee() {
  const words = ['FUEL.', 'FOCUS.', 'GO.', 'NO CRASH.', 'FOR THE GRIND.', 'STAY BOLD.'];
  const doubled = [...words, ...words, ...words];
  return (
    <section style={{
      background: 'transparent', color: 'var(--ink-text)',
      overflow: 'hidden', padding: '56px 0',
      borderTop: '1px solid color-mix(in srgb, var(--ink-text) 22%, transparent)',
      borderBottom: '1px solid color-mix(in srgb, var(--ink-text) 22%, transparent)',
    }}>
      <div style={{
        display: 'flex', gap: '48px', alignItems: 'center',
        animation: 'marq 26s linear infinite', whiteSpace: 'nowrap',
      }}>
        {doubled.map((w, i) => (
          <span key={i} style={{display: 'inline-flex', alignItems: 'center', gap: '48px'}}>
            <span className="display" style={{
              fontSize: 'clamp(80px, 12vw, 180px)', letterSpacing: '-0.03em',
            }}>{w}</span>
            <Star/>
          </span>
        ))}
      </div>
      <style>{`@keyframes marq { from { transform: translateX(0);} to { transform: translateX(-33.33%);} }`}</style>
    </section>
  );
}

function Star() {
  return (
    <>
      <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" style={{color: 'var(--accent)', flexShrink: 0, animation: 'spinStar 12s linear infinite'}}>
        <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/>
      </svg>
    </>
  );
}

Object.assign(window, { Marquee });
