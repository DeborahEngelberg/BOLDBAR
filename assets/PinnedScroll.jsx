// Horizontal pinned scroll section — page scrolls vertically, content pans horizontally.
// 5 "principles" slides with big type and the bar drifting across.
const { useEffect: useEffectPinned, useState: useStatePinned, useRef: useRefPinned } = React;

function PinnedScroll({ flavor }) {
  const wrapRef = useRefPinned(null);
  const [progress, setProgress] = useStatePinned(0);
  const [pinState, setPinState] = useStatePinned('before'); // 'before' | 'pinned' | 'after'

  useEffectPinned(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      if (r.top >= 0) {
        setPinState('before');
        setProgress(0);
      } else if (r.top <= -total) {
        setPinState('after');
        setProgress(1);
      } else {
        setPinState('pinned');
        setProgress(Math.max(0, Math.min(1, -r.top / total)));
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const principles = [
    { n: '01', t: 'No Crash.',     body: 'Caffeine + protein + fat = a flat-line release curve. Energy without the cliff.' },
    { n: '02', t: 'Real Food.',    body: 'Raw honey. Milk protein isolate. Cold-brew coffee. If grandma wouldn\'t recognize it, it\'s not in the bar.' },
    { n: '03', t: 'Clean Stims.',  body: '100mg caffeine from coffee extract — same as an espresso shot. No L-theanine stacks, no "proprietary blends."' },
    { n: '04', t: 'Built to Bite.',body: 'Chewy, crispy, actually structural. You want something you can sink into, not chalk dust.' },
    { n: '05', t: 'Stay Bold.',    body: 'For the 2pm wall, the pre-workout, the red-eye, the marathon meeting. Show up anyway.' },
  ];

  const slideCount = principles.length;
  const translateVW = -progress * (slideCount - 1) * 100;

  return (
    <section
      ref={wrapRef}
      style={{
        position: 'relative',
        height: `${slideCount * 100}vh`,
        background: 'var(--ink-text)',
        color: 'var(--paper)',
      }}
    >
      <div style={{
        position: pinState === 'pinned' ? 'fixed' : 'absolute',
        top: pinState === 'after' ? 'auto' : 0,
        bottom: pinState === 'after' ? 0 : 'auto',
        left: 0, right: 0,
        height: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>
        {/* progress header */}
        <div style={{
          position: 'absolute', top: 32, left: 28, right: 28, zIndex: 10,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}>
          <div style={{opacity: 0.6}}>— THE PRINCIPLES / 02</div>
          <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
            <span style={{opacity: 0.6}}>0{Math.min(slideCount, Math.floor(progress * slideCount) + 1)}</span>
            <div style={{width: '120px', height: '2px', background: 'color-mix(in srgb, var(--paper) 20%, transparent)', position: 'relative'}}>
              <div style={{
                position: 'absolute', inset: 0, width: `${progress * 100}%`,
                background: 'var(--accent)', transition: 'width 0.1s',
              }}/>
            </div>
            <span style={{opacity: 0.6}}>0{slideCount}</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: 32, left: 28, zIndex: 10,
          fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.2em',
          textTransform: 'uppercase', opacity: 0.5,
        }}>
          ↓ Keep scrolling
        </div>

        {/* Horizontal track — each slide is 100vw wide */}
        <div style={{
          display: 'flex', height: '100%',
          transform: `translateX(${translateVW}vw)`,
          transition: 'transform 0.05s linear',
          willChange: 'transform',
        }}>
          {principles.map((p, i) => (
            <div key={i} style={{
              width: '100vw', height: '100%',
              flexShrink: 0, position: 'relative',
              padding: '120px 10vw',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              {/* Watermark number */}
              <div className="display" style={{
                position: 'absolute', top: '10%', right: '4vw',
                fontSize: 'clamp(240px, 38vw, 640px)',
                lineHeight: 0.8, letterSpacing: '-0.08em',
                color: 'color-mix(in srgb, var(--paper) 5%, transparent)',
                pointerEvents: 'none',
              }}>{p.n}</div>

              <div className="mono-label" style={{opacity: 0.6, marginBottom: '24px'}}>— № {p.n}</div>
              <h3 style={{
                fontFamily: "'Jaune', 'Arial Black', sans-serif",
                fontSize: 'clamp(100px, 14vw, 260px)',
                lineHeight: 0.85, letterSpacing: '-0.08em',
                textTransform: 'uppercase',
                WebkitTextStroke: '3px var(--paper)',
                paintOrder: 'stroke fill',
                maxWidth: '1200px',
              }}>
                {p.t.includes('.') ? (
                  <>
                    {p.t.replace('.', '')}
                    <span style={{color: 'var(--accent)', WebkitTextStroke: '3px var(--accent)'}}>.</span>
                  </>
                ) : p.t}
              </h3>
              <p style={{
                fontFamily: 'var(--font-ui)', fontSize: '20px', lineHeight: 1.5,
                marginTop: '32px', maxWidth: '640px', opacity: 0.85,
              }}>{p.body}</p>
            </div>
          ))}
        </div>

        {/* Bar drifts across the entire track, countering the pan, so it feels anchored to viewport but spins */}
        <img
          src={flavor.img}
          alt=""
          style={{
            position: 'absolute',
            right: '8vw', bottom: '14vh',
            height: 'min(36vh, 280px)', width: 'auto',
            transform: `rotate(${-20 + progress * 360}deg)`,
            filter: 'drop-shadow(0 40px 50px rgba(0,0,0,0.6))',
            pointerEvents: 'none',
            transition: 'transform 0.08s linear',
            zIndex: 5,
          }}
        />
      </div>
    </section>
  );
}

// Big horizontal scrolling "field" strip: swappable bars racing
function ScrollStrip({ flavor }) {
  const stripRef = useRefPinned(null);
  const [offset, setOffset] = useStatePinned(0);
  useEffectPinned(() => {
    const onScroll = () => {
      const el = stripRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // When center of el is at center of viewport, offset = 0
      const center = r.top + r.height / 2 - vh / 2;
      setOffset(-center * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const labels = ['FUEL', 'FOCUS', 'GO', 'NO CRASH', 'BOLD', 'PROTEIN', 'CAFFEINE', 'HONEY'];

  return (
    <section ref={stripRef} style={{
      background: 'transparent', color: 'var(--ink-text)',
      padding: '80px 0', overflow: 'hidden',
      borderTop: '1.5px solid color-mix(in srgb, var(--ink-text) 22%, transparent)',
      borderBottom: '1.5px solid color-mix(in srgb, var(--ink-text) 22%, transparent)',
    }}>
      {/* Row 1 moves with offset */}
      <div style={{
        display: 'flex', gap: '32px', whiteSpace: 'nowrap',
        transform: `translateX(${offset}px)`,
        alignItems: 'center',
      }}>
        {[...labels, ...labels, ...labels].map((l, i) => (
          <span key={i} style={{display: 'inline-flex', alignItems: 'center', gap: '32px'}}>
            <span style={{
              fontFamily: "'Jaune', 'Arial Black', sans-serif",
              fontSize: 'clamp(80px, 12vw, 180px)',
              letterSpacing: '-0.06em',
              textTransform: 'uppercase',
              color: i % 3 === 1 ? 'var(--accent)' : 'var(--ink-text)',
              WebkitTextStroke: i % 3 === 2 ? '2px var(--ink-text)' : '0',
              WebkitTextFillColor: i % 3 === 2 ? 'transparent' : 'currentColor',
            }}>{l}</span>
            <span style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'var(--accent)', flexShrink: 0,
            }}/>
          </span>
        ))}
      </div>
      {/* Row 2 moves opposite */}
      <div style={{
        display: 'flex', gap: '32px', whiteSpace: 'nowrap',
        transform: `translateX(${-offset - 400}px)`,
        alignItems: 'center', marginTop: '24px',
      }}>
        {[...labels, ...labels, ...labels].reverse().map((l, i) => (
          <span key={i} style={{display: 'inline-flex', alignItems: 'center', gap: '32px'}}>
            <span style={{
              fontFamily: "'Jaune', 'Arial Black', sans-serif",
              fontSize: 'clamp(80px, 12vw, 180px)',
              letterSpacing: '-0.06em',
              textTransform: 'uppercase',
              color: i % 4 === 0 ? 'var(--accent)' : 'var(--ink-text)',
              WebkitTextStroke: i % 4 === 2 ? '2px var(--ink-text)' : '0',
              WebkitTextFillColor: i % 4 === 2 ? 'transparent' : 'currentColor',
              opacity: i % 4 === 2 ? 0.9 : 1,
            }}>{l}</span>
            <img src={flavor.img} alt="" style={{
              height: '80px', width: 'auto', flexShrink: 0,
              transform: `rotate(${i * 17}deg)`,
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))',
            }}/>
          </span>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { PinnedScroll, ScrollStrip });
