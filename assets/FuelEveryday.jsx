// Vertical pinned scroll: stacked "FUEL / YOUR / EVERY / DAY" words fade in staggered,
// then a tall bar-trio rises from below the viewport and covers the words.
// Ported from the standalone site — this is the one section the user wanted to keep.
const { useEffect: useEffectFuel, useState: useStateFuel, useRef: useRefFuel } = React;

function FuelEveryday() {
  const sectionRef = useRefFuel(null);
  const [progress, setProgress] = useStateFuel(0);

  useEffectFuel(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, -rect.top / total)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const words = ['FUEL', 'YOUR', 'EVERY', 'DAY'];

  // Bars hold, then rise from below (translateY 100vh → 0) between 40%–100% of scroll.
  const barProgress = Math.max(0, (progress - 0.4) / 0.6);
  const barTy = 100 - barProgress * 100;

  return (
    <section
      ref={sectionRef}
      style={{ height: '300vh', position: 'relative', background: '#0d0d0f' }}
    >
      <div
        style={{
          position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
          background: '#0d0d0f',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {/* Stacked words */}
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none', zIndex: 1,
          }}
        >
          {words.map((w, i) => {
            const wordStart = i * 0.15;
            const wp = Math.max(0, Math.min(1, (progress - wordStart) / 0.3));
            return (
              <span
                key={w}
                style={{
                  fontFamily: "'Jaune', 'Arial Black', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(44px, 11vw, 160px)',
                  lineHeight: 0.95,
                  color: '#f3ecdb',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  opacity: 0.08 + wp * 0.92,
                  transform: `translateY(${20 - wp * 20}px)`,
                  textShadow: `0 0 ${wp * 40}px rgba(255,255,255,${wp * 0.3}), 0 0 ${wp * 80}px color-mix(in srgb, var(--accent) ${wp * 15}%, transparent)`,
                  textAlign: 'center',
                  display: 'block',
                }}
              >
                {w}
              </span>
            );
          })}
        </div>

        {/* Bars rise from below the viewport and cover the words */}
        <div
          style={{
            position: 'absolute', left: '50%', bottom: 0,
            width: 'clamp(340px, 55vw, 680px)',
            transform: `translateX(-50%) translateY(${barTy}vh)`,
            willChange: 'transform',
            zIndex: 10,
          }}
        >
          <img
            src="assets/img/bar-trio-vertical.png"
            alt=""
            style={{
              width: '100%', height: 'auto', display: 'block',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        {/* Label fades in near the end */}
        <p
          style={{
            position: 'absolute', bottom: 40, left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Jaune', 'Helvetica Neue', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(12px, 1.4vw, 16px)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            opacity: progress > 0.85 ? 1 : 0,
            transition: 'opacity 0.6s ease',
            whiteSpace: 'nowrap',
            zIndex: 12,
            padding: '0 24px',
            margin: 0,
          }}
        >
          Three Flavors. One Standard.
        </p>
      </div>
    </section>
  );
}

Object.assign(window, { FuelEveryday });
