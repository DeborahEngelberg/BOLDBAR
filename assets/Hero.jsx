// Hero: massive BOLD wordmark with draggable/throwable product bar + stat bubbles.
const { useEffect: useEffectHero, useState: useStateHero, useRef: useRefHero } = React;

// Draggable, throwable element with momentum + simple bounce-back to origin.
function Throwable({children, initial, style, zIndex = 2, dragScale = 1.04}) {
  const ref = useRefHero(null);
  const stateRef = useRefHero({
    x: 0, y: 0, vx: 0, vy: 0, rot: initial.rot || 0, vrot: 0,
    dragging: false, lastX: 0, lastY: 0, lastT: 0,
    raf: null,
  });
  const [, setTick] = useStateHero(0);

  useEffectHero(() => {
    const s = stateRef.current;
    const applyTransform = () => {
      if (!ref.current) return;
      ref.current.style.transform =
        `translate(calc(-50% + ${s.x}px), calc(-50% + ${s.y}px)) rotate(${(initial.rot || 0) + s.rot}deg)`;
    };
    const loop = () => {
      if (!s.dragging) {
        // Friction coast — no spring-back. They stay where you put them.
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.vrot *= 0.94;
        s.x += s.vx; s.y += s.vy; s.rot += s.vrot;
        if (Math.abs(s.vx) < 0.02) s.vx = 0;
        if (Math.abs(s.vy) < 0.02) s.vy = 0;
        if (Math.abs(s.vrot) < 0.02) s.vrot = 0;
        if (ref.current && (s.vx || s.vy || s.vrot)) {
          applyTransform();
          // Bounce off viewport edges with energy loss so the bar never flies off-screen.
          const rect = ref.current.getBoundingClientRect();
          const damp = 0.55, pad = 4;
          let bumped = false;
          if (rect.left < pad)                        { s.x += (pad - rect.left);                      if (s.vx < 0) s.vx = -s.vx * damp; s.vrot = -s.vrot * damp; bumped = true; }
          if (rect.right > window.innerWidth - pad)   { s.x -= (rect.right - (window.innerWidth - pad));  if (s.vx > 0) s.vx = -s.vx * damp; s.vrot = -s.vrot * damp; bumped = true; }
          if (rect.top < pad)                         { s.y += (pad - rect.top);                       if (s.vy < 0) s.vy = -s.vy * damp; bumped = true; }
          if (rect.bottom > window.innerHeight - pad) { s.y -= (rect.bottom - (window.innerHeight - pad)); if (s.vy > 0) s.vy = -s.vy * damp; bumped = true; }
          if (bumped) applyTransform();
        }
      }
      s.raf = requestAnimationFrame(loop);
    };
    s.raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(s.raf);
  }, []);

  const onPointerDown = (e) => {
    e.preventDefault();
    const s = stateRef.current;
    s.dragging = true;
    s.lastX = e.clientX; s.lastY = e.clientY; s.lastT = performance.now();
    s.vx = s.vy = s.vrot = 0;
    ref.current.setPointerCapture?.(e.pointerId);
    ref.current.style.cursor = 'grabbing';
    ref.current.style.transition = 'none';
    // Block any in-progress text selection on surrounding page content.
    if (window.getSelection) window.getSelection()?.removeAllRanges?.();
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
  };
  const onPointerMove = (e) => {
    const s = stateRef.current;
    if (!s.dragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - s.lastT);
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.x += dx; s.y += dy;
    // spin proportional to horizontal velocity
    s.rot += dx * 0.15;
    s.vx = dx / dt * 16;
    s.vy = dy / dt * 16;
    s.vrot = dx * 0.4 / dt * 16;
    s.lastX = e.clientX; s.lastY = e.clientY; s.lastT = now;
    if (ref.current) {
      ref.current.style.transform =
        `translate(calc(-50% + ${s.x}px), calc(-50% + ${s.y}px)) rotate(${(initial.rot || 0) + s.rot}deg) scale(${dragScale})`;
    }
  };
  const onPointerUp = (e) => {
    const s = stateRef.current;
    s.dragging = false;
    ref.current.releasePointerCapture?.(e.pointerId);
    ref.current.style.cursor = 'grab';
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDragStart={(e) => e.preventDefault()}
      style={{
        position: 'absolute',
        top: initial.top, left: initial.left, right: initial.right, bottom: initial.bottom,
        transform: `translate(-50%, -50%) rotate(${initial.rot || 0}deg)`,
        zIndex,
        cursor: 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitUserDrag: 'none',
        WebkitTouchCallout: 'none',
        touchAction: 'none',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Hero({flavor, onAdd}) {
  return (
    <section style={{
      position: 'relative', minHeight: '100vh', overflow: 'hidden',
      padding: '28px 28px 40px', display: 'flex', flexDirection: 'column',
      background: 'transparent', color: 'var(--ink-text)',
    }}>
      {/* Top strip — single confident line of editorial metadata */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.22em',
        position: 'relative', zIndex: 4,
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <span style={{width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 0 4px color-mix(in srgb, var(--accent) 25%, transparent)'}}/>
          <span>In stock · Ships in 48h</span>
        </div>
        <div style={{opacity: 0.7}}>Issue No. 03 / {flavor.name}</div>
      </div>

      {/* Editorial mega headline — the statement that anchors the page */}
      <div style={{
        flex: 1, position: 'relative',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        marginTop: '24px',
      }}>
        <h1 style={{
          fontFamily: "'Ciron', 'Arial Black', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(56px, 12.5vw, 220px)',
          letterSpacing: '-0.055em',
          lineHeight: 0.85,
          textTransform: 'uppercase',
          color: 'var(--ink-text)',
          margin: 0,
          position: 'relative',
          zIndex: 1,
          userSelect: 'none',
        }}>
          Fuel<br/>
          Without<br/>
          <span style={{color: 'var(--accent)'}}>Compromise.</span>
        </h1>

        {/* Draggable product bar — offset right so it sits on top of "Without/Compromise" */}
        <Throwable
          initial={{ top: '52%', right: '12%', left: 'auto', rot: -14 }}
          zIndex={3}
          dragScale={1.06}
        >
          <img
            src={flavor.img}
            alt={flavor.name}
            draggable="false"
            style={{
              height: 'min(64vh, 560px)', width: 'auto',
              filter: 'drop-shadow(0 22px 28px rgba(0,0,0,0.18)) drop-shadow(0 6px 10px rgba(0,0,0,0.10))',
              pointerEvents: 'none',
              display: 'block',
            }}
          />
        </Throwable>

        {/* Three throwable stat bubbles, clustered around the bar on the right */}
        <Throwable initial={{ top: '22%', right: '8%', left: 'auto', rot: -4 }} zIndex={4}>
          <StatBubble value="20G" label="PROTEIN" />
        </Throwable>
        <Throwable initial={{ top: '58%', right: '36%', left: 'auto', rot: 6 }} zIndex={4}>
          <StatBubble value="100MG" label="CAFFEINE" />
        </Throwable>
        <Throwable initial={{ bottom: '14%', right: '20%', left: 'auto', rot: -5 }} zIndex={4}>
          <StatBubble value="HONEY" label="SWEETENED" small/>
        </Throwable>
      </div>

      {/* Product-focused bottom lockup — rating, price, Add to Cart with qty */}
      <div style={{position: 'relative', zIndex: 4, marginTop: '24px'}}>
        <div style={{height: '1px', background: 'color-mix(in srgb, var(--ink-text) 18%, transparent)', marginBottom: '22px'}}/>

        {/* Product detail row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
          gap: '24px', alignItems: 'end',
        }}>
          <div>
            <div className="mono-label" style={{opacity: 0.55, marginBottom: '8px', letterSpacing: '0.22em', fontSize: '11px'}}>
              The Bar — {flavor.name} · {flavor.sku}
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap', marginBottom: '12px'}}>
              <Rating value={flavor.rating} count={flavor.reviewCount}/>
              <StockTag inventory={flavor.inventory}/>
            </div>
            <div style={{
              fontFamily: "'Ciron', 'Arial Black', sans-serif", fontWeight: 900,
              fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 1.1,
              letterSpacing: '-0.02em', textTransform: 'uppercase',
              opacity: 0.85,
            }}>
              100mg caffeine<span style={{color: 'var(--accent)'}}>·</span> 20g protein<span style={{color: 'var(--accent)'}}>·</span> raw honey<span style={{color: 'var(--accent)'}}>·</span> no crash.
            </div>
          </div>

          {/* Price + Add to Cart */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px'}}>
            <div style={{display: 'flex', alignItems: 'baseline', gap: '10px'}}>
              <div style={{fontFamily: "'Ciron', sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 4vw, 54px)', letterSpacing: '-0.03em'}}>
                {formatMoney(flavor.price)}
              </div>
              <div className="mono-label" style={{opacity: 0.55, fontSize: '11px'}}>/ BAR · FROM $16 / 4-PACK</div>
            </div>
            <AddToCartForm product={flavor} onAdd={(p, q) => onAdd && onAdd(p, q)} includeQty buttonLabel="Add to Cart →"/>
            <div className="mono-label" style={{opacity: 0.5, fontSize: '10px'}}>
              Free shipping over $40 · 30-day money back
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBubble({value, label, small}) {
  return (
    <div style={{
      background: 'rgba(25,14,13,0.88)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      color: '#f3ecdb',
      border: '1px solid rgba(173,133,68,0.3)',
      borderRadius: '999px',
      padding: small ? '10px 20px' : '16px 26px',
      fontFamily: 'var(--font-ui)',
      boxShadow: '0 16px 36px rgba(0,0,0,0.45)',
      textAlign: 'center',
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
    }}>
      <div style={{
        fontSize: small ? '22px' : '30px', lineHeight: 1,
        letterSpacing: '-0.02em', color: 'var(--accent)', fontWeight: 900,
      }}>{value}</div>
      <div style={{
        fontSize: '9px', opacity: 0.6, marginTop: '4px',
        letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700,
      }}>{label}</div>
    </div>
  );
}

Object.assign(window, { Hero });
