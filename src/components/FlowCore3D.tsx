'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * FlowCore3D — CSS-based decorative 3D orb
 * Translucent rounded cube with play icon, speech bubble,
 * rotating ring, and glyph particles. Purely decorative.
 */
export default function FlowCore3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Main Orb */}
      <div className="perspective-container" style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div
          className="preserve-3d"
          style={{
            width: '220px',
            height: '220px',
            borderRadius: '40px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(210,210,210,0.08))',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
            transition: 'transform 0.3s ease-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 0 80px rgba(255,255,255,0.15), 0 0 160px rgba(210,210,210,0.05)',
          }}
        >
          {/* Play Icon */}
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}>
            <polygon points="5 3 19 12 5 21 5 3" fill="url(#playGrad)" />
            <defs>
              <linearGradient id="playGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#D2D2D2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Speech bubble accent */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '30px',
            height: '30px',
            borderRadius: '50% 50% 50% 0',
            background: 'rgba(210,210,210,0.15)',
            border: '1px solid rgba(210,210,210,0.2)',
          }} />

          {/* Inner glow */}
          <div style={{
            position: 'absolute',
            inset: '-1px',
            borderRadius: '40px',
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 70%)',
          }} />
        </div>

        {/* Rotating Ring */}
        <div
          className="animate-spin-slow"
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.08)',
            borderTopColor: 'rgba(210,210,210,0.25)',
          }}
        />

        {/* Second Ring */}
        <div
          className="animate-spin-slow"
          style={{
            position: 'absolute',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.05)',
            borderBottomColor: 'rgba(255,255,255,0.15)',
            animationDirection: 'reverse',
            animationDuration: '35s',
          }}
        />

        {/* Glyph particles */}
        {['अ', 'ब', 'स', 'ह'].map((glyph, i) => (
          <div
            key={i}
            className="animate-float hindi-text"
            style={{
              position: 'absolute',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.2)',
              fontWeight: 600,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${5 + i}s`,
              top: `${15 + i * 20}%`,
              left: i % 2 === 0 ? '10%' : '80%',
            }}
          >
            {glyph}
          </div>
        ))}

        {/* Outer Glow */}
        <div
          className="animate-glow-pulse"
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)',
          }}
        />
      </div>
    </div>
  );
}
