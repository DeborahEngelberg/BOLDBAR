// What's Inside: bar being "unwrapped" visually, ingredients listed big.
function Inside({ flavor }) {
  const sneakersWeLove = flavor.ingredients;
  return (
    <section id="inside" style={{
      padding: '140px 28px', background: 'transparent', color: 'var(--ink-text)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center'}}>
        {/* Left: big exploded view */}
        <div style={{
          position: 'relative', minHeight: '680px',
          display: 'grid', placeItems: 'center',
        }}>
          {/* halo text */}
          <div className="display" style={{
            position: 'absolute', inset: 0,
            fontSize: 'clamp(200px, 32vw, 440px)', letterSpacing: '-0.06em',
            color: 'color-mix(in srgb, var(--ink-text) 7%, transparent)',
            display: 'grid', placeItems: 'center', pointerEvents: 'none',
            lineHeight: 0.85, textAlign: 'center',
          }}>
            {flavor.id.toUpperCase()}
          </div>
          {/* bar */}
          <img src={flavor.img} alt="" style={{
            height: '600px', width: 'auto', zIndex: 2,
            filter: 'drop-shadow(0 40px 50px rgba(0,0,0,0.25))',
            animation: 'barBob 8s ease-in-out infinite',
            transform: 'rotate(-6deg)',
          }}/>

          {/* callout lines */}
          <IngredientCallout
            label="COLD BREW" value="real espresso"
            style={{top: '18%', left: '4%'}} lineDir="right"
          />
          <IngredientCallout
            label="HONEY" value="raw, unfiltered"
            style={{top: '10%', right: '2%'}} lineDir="left"
          />
          <IngredientCallout
            label="MILK PROTEIN" value="20g isolate"
            style={{bottom: '18%', left: '2%'}} lineDir="right"
          />
          <IngredientCallout
            label="SEA SALT" value="flaky, finishing"
            style={{bottom: '14%', right: '4%'}} lineDir="left"
          />

          <style>{`@keyframes barBob { 0%,100% { transform: rotate(-6deg) translateY(0); } 50% { transform: rotate(-4deg) translateY(-10px);}}`}</style>
        </div>

        {/* Right: copy + ingredients list */}
        <div>
          <div className="mono-label" style={{opacity: 0.6, marginBottom: '16px'}}>— WHAT'S INSIDE / 02</div>
          <h2 className="display" style={{
            fontSize: 'clamp(60px, 8vw, 140px)', letterSpacing: '-0.04em', lineHeight: 0.88,
          }}>
            Food<br/>
            first<span style={{color: 'var(--accent)'}}>.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: '17px', lineHeight: 1.55,
            marginTop: '24px', maxWidth: '440px', opacity: 0.8,
          }}>
            You can read every ingredient. Your grandma would recognize most of them. No sugar alcohols, no synthetic stims, no gums pretending to be fiber.
          </p>

          <ul style={{
            listStyle: 'none', padding: 0, margin: '48px 0 0',
            borderTop: '1.5px solid var(--ink-text)',
          }}>
            {sneakersWeLove.map((ing, i) => (
              <li key={ing} className="reveal" style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                padding: '16px 0',
                borderBottom: '1.5px solid var(--ink-text)',
                fontFamily: 'var(--font-display)',
                transitionDelay: `${i * 0.05}s`,
              }}>
                <span style={{fontSize: '28px', letterSpacing: '-0.02em'}}>
                  <span style={{opacity: 0.4, marginRight: '16px'}}>0{i + 1}</span>
                  {ing}
                </span>
                <span className="mono-label" style={{opacity: 0.6}}>— ✓ CLEAN</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function IngredientCallout({ label, value, style, lineDir }) {
  return (
    <div style={{
      position: 'absolute', zIndex: 3,
      fontFamily: 'var(--font-ui)',
      display: 'flex', alignItems: 'center', gap: '10px',
      flexDirection: lineDir === 'right' ? 'row' : 'row-reverse',
      ...style,
    }}>
      <div style={{textAlign: lineDir === 'right' ? 'left' : 'right'}}>
        <div style={{fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6}}>{value}</div>
        <div className="display" style={{fontSize: '22px', letterSpacing: '-0.02em', marginTop: '2px'}}>{label}</div>
      </div>
      <div style={{
        width: '80px', height: '1.5px', background: 'var(--ink-text)', opacity: 0.6,
      }}/>
      <div style={{
        width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)',
        boxShadow: '0 0 0 3px color-mix(in srgb, var(--accent) 30%, transparent)',
      }}/>
    </div>
  );
}

Object.assign(window, { Inside });
