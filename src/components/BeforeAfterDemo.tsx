'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { trackEvent, EVENTS } from '@/lib/analytics';

export default function BeforeAfterDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const hasTracked = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const updateSlider = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPos((x / rect.width) * 100);
      if (!hasTracked.current) {
        trackEvent(EVENTS.DEMO_SLIDER_USED);
        hasTracked.current = true;
      }
    },
    []
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      setDragging(true);
      updateSlider(e.clientX);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [updateSlider]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      updateSlider(e.clientX);
    },
    [dragging, updateSlider]
  );

  const onPointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <section
      id="before-after"
      ref={sectionRef}
      className="section-padding"
      style={{ position: 'relative' }}
    >
      <div className="section-container" style={{ textAlign: 'center' }}>
        {/* Eyebrow */}
        <div
          className="section-eyebrow"
          style={{
            marginBottom: '20px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-cyan)', display: 'inline-block' }} />
          Before vs After
        </div>

        <h2
          className="section-title"
          style={{
            marginBottom: '12px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          }}
        >
          See the <span className="text-gradient-primary">difference</span>
        </h2>

        <p
          className="section-subtitle"
          style={{
            margin: '0 auto 48px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
          }}
        >
          Drag the slider to compare raw footage with Octova-styled output.
        </p>

        {/* Slider Container */}
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{
            position: 'relative',
            maxWidth: '720px',
            aspectRatio: '16/9',
            margin: '0 auto',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            cursor: dragging ? 'grabbing' : 'grab',
            border: '1px solid var(--border-color)',
            touchAction: 'none',
            userSelect: 'none',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
          }}
        >
          {/* BEFORE side (full width background) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #050505 0%, #0A0A0A 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            {/* Raw video mockup */}
            <div style={{
              width: '60%',
              maxWidth: '220px',
              aspectRatio: '9/16',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '12px',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.3 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              {/* Basic caption */}
              <div style={{
                background: 'rgba(0,0,0,0.7)',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.6rem',
                color: '#ccc',
                fontFamily: 'monospace',
              }}>
                bhai ye 3 mistakes mat karna
              </div>
            </div>

            <div style={{
              marginTop: '12px',
              fontSize: '0.7rem',
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}>
              Before
            </div>
          </div>

          {/* AFTER side (clipped) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #050505 0%, #0A0A0A 100%)',
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            {/* Styled video mockup */}
            <div style={{
              width: '60%',
              maxWidth: '220px',
              aspectRatio: '9/16',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(5,5,5,0.9))',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255,255,255,0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '12px',
              position: 'relative',
              boxShadow: '0 0 40px rgba(255,255,255,0.15)',
            }}>
              {/* Play icon */}
              <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'var(--gradient-primary)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>

              {/* Aspect badge */}
              <div style={{
                position: 'absolute', top: 8, right: 8,
                fontSize: '0.55rem', padding: '2px 6px',
                background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-full)',
                color: 'var(--color-cyan)', border: '1px solid rgba(210,210,210,0.2)',
              }}>
                9:16
              </div>

              {/* Styled caption */}
              <div style={{
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)',
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.65rem',
                fontWeight: 700,
                color: 'white',
                display: 'flex',
                gap: '3px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                {['Bhai,', 'ye', '3', 'mistakes', 'mat', 'karna.'].map((word, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '1px 4px',
                      borderRadius: '3px',
                      background: idx === 3 ? 'var(--color-purple)' : 'transparent',
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>

              {/* Export badge */}
              <div style={{
                position: 'absolute', bottom: -10, left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.55rem', padding: '3px 10px',
                background: 'rgba(200,200,200,0.15)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--color-green)',
                border: '1px solid rgba(200,200,200,0.25)',
                whiteSpace: 'nowrap',
                fontWeight: 600,
              }}>
                ✓ Export ready
              </div>
            </div>

            <div style={{
              marginTop: '20px',
              fontSize: '0.7rem',
              color: 'var(--color-cyan)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}>
              After — with Octova
            </div>
          </div>

          {/* Slider Handle */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPos}%`,
              transform: 'translateX(-50%)',
              width: '3px',
              background: 'white',
              zIndex: 10,
              boxShadow: '0 0 12px rgba(255,255,255,0.3)',
            }}
          >
            {/* Knob */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--bg-surface)',
                border: '2px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                cursor: dragging ? 'grabbing' : 'grab',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M8 4l-6 8 6 8" />
                <path d="M16 4l6 8-6 8" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
