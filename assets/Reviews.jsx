// Reviews: masonry-ish scrolling cards, oversized pull-quote.
function Reviews() {
  const reviews = [
    { name: 'Maya R.', role: 'Engineer, NYC', stars: 5, text: 'Replaced my afternoon coffee + protein shake with one bar. No 3pm crash for the first time in years.' },
    { name: 'Derek L.', role: 'Trail runner', stars: 5, text: 'The PB is criminal. I\'ve done 20-mile runs on these. No GI drama.' },
    { name: 'Sam K.', role: 'Nurse, night shift', stars: 5, text: 'Keeps me sharp without the shakes. And honestly? Actually tastes like dessert.' },
    { name: 'Priya V.', role: 'Founder', stars: 5, text: 'Every meeting, one bar. 20g protein is the hack. Mocha is chef\'s kiss.' },
    { name: 'Jonah W.', role: 'Powerlifter', stars: 5, text: 'Crushes Quest and RX. Real ingredients you can pronounce.' },
    { name: 'Tasha B.', role: 'Med student', stars: 5, text: 'Study fuel, certified. Caffeine hits clean, no jitters during lecture.' },
  ];
  return (
    <section id="reviews" style={{ padding: '140px 28px', position: 'relative', background: 'transparent', color: 'var(--ink-text)' }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px'}}>
        <div>
          <div className="mono-label" style={{opacity: 0.6, marginBottom: '12px'}}>— REVIEWS / 03</div>
          <h2 className="display" style={{fontSize: 'clamp(60px, 9vw, 160px)', letterSpacing: '-0.04em', lineHeight: 0.88}}>
            Proof<br/>in the<br/><span style={{color: 'var(--accent)'}}>bite.</span>
          </h2>
        </div>
        <div style={{textAlign: 'right'}}>
          <div className="display" style={{fontSize: '72px', letterSpacing: '-0.02em', color: 'var(--accent)'}}>4.9★</div>
          <div className="mono-label" style={{opacity: 0.7}}>2,847 verified buyers</div>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px',
        marginTop: '80px',
      }}>
        {reviews.map((r, i) => (
          <div key={i} className="reveal" style={{
            background: i % 4 === 0 ? 'var(--ink-text)' : 'transparent',
            color: i % 4 === 0 ? 'var(--paper)' : 'var(--ink-text)',
            border: i % 4 === 0 ? 'none' : '1.5px solid var(--ink-text)',
            borderRadius: '24px', padding: '32px',
            display: 'flex', flexDirection: 'column', gap: '20px',
            minHeight: '280px',
            transitionDelay: `${(i % 3) * 0.08}s`,
          }}>
            <div style={{display: 'flex', gap: '2px', color: 'var(--accent)', fontSize: '18px'}}>
              {'★'.repeat(r.stars)}
            </div>
            <p style={{fontFamily: 'var(--font-ui)', fontSize: '17px', lineHeight: 1.45, flex: 1}}>
              "{r.text}"
            </p>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
              <div>
                <div className="display" style={{fontSize: '20px', letterSpacing: '-0.02em'}}>{r.name}</div>
                <div className="mono-label" style={{opacity: 0.6, marginTop: '4px'}}>{r.role}</div>
              </div>
              <div className="mono-label" style={{opacity: 0.6}}>— VERIFIED</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Reviews });
