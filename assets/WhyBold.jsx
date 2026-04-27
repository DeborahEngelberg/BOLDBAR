// Nutrition callouts ("Why Bold"): big animated stats
function WhyBold({ flavor }) {
  const stats = [
    { big: '20G', small: 'Protein', sub: 'Real milk protein isolate.\nMuscle in every bite.' },
    { big: '100MG', small: 'Caffeine', sub: 'A single shot of espresso.\nClean. Steady. No jitters.' },
    { big: '6G', small: 'Sugar', sub: 'Only from raw honey.\nNever artificial.' },
    { big: '0', small: 'Crash', sub: 'Protein + caffeine + fat\n= a flat-line release curve.' },
  ];
  return (
    <section id="why" style={{
      padding: '140px 28px 120px',
      background: 'transparent',
      color: 'var(--ink-text)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* subtle floating label */}
      <div className="mono-label" style={{
        position: 'absolute', top: '32px', left: '28px', opacity: 0.5,
      }}>— WHY BOLD / 01</div>
      <div className="mono-label" style={{
        position: 'absolute', top: '32px', right: '28px', opacity: 0.5,
      }}>{flavor.name.toUpperCase()} — BATCH №{flavor.hex}</div>

      <h2 className="display" style={{
        fontSize: 'clamp(60px, 10vw, 160px)', letterSpacing: '-0.04em',
        marginTop: '40px', maxWidth: '1200px',
      }}>
        The math<br/>
        is <span style={{color: 'var(--accent)'}}>simple.</span>
      </h2>
      <div style={{
        fontFamily: 'var(--font-ui)', fontSize: '18px', maxWidth: '560px',
        marginTop: '24px', opacity: 0.8, lineHeight: 1.5,
      }}>
        Most "energy" bars are either a candy bar with a logo slapped on, or chalky protein. BOLD stacks both — without the cliff. No sugar alcohols. No synthetic stims. Just food.
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0',
        marginTop: '100px',
        borderTop: '1px solid color-mix(in srgb, var(--ink-text) 22%, transparent)',
      }}>
        {stats.map((s, i) => (
          <div key={i} className="reveal" style={{
            padding: '40px 24px',
            borderRight: i < stats.length - 1 ? '1px solid color-mix(in srgb, var(--ink-text) 22%, transparent)' : 'none',
            display: 'flex', flexDirection: 'column', gap: '20px',
            transitionDelay: `${i * 0.08}s`,
          }}>
            <div className="mono-label" style={{opacity: 0.6}}>— 0{i + 1}</div>
            <div className="display" style={{
              fontSize: 'clamp(72px, 10vw, 148px)', lineHeight: 0.85, letterSpacing: '-0.04em',
              color: i === 0 ? 'var(--accent)' : 'var(--ink-text)',
            }}>{s.big}</div>
            <div className="display" style={{
              fontSize: '28px', letterSpacing: '-0.02em', lineHeight: 1,
            }}>{s.small}</div>
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: '13px', opacity: 0.7,
              whiteSpace: 'pre-line', lineHeight: 1.5, marginTop: '6px',
            }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { WhyBold });
