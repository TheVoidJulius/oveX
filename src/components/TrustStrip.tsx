'use client';

import { useEffect, useRef, useState } from 'react';
import { brand } from '@/config/brand';
import { trustCategories } from '@/config/content';
import { Sparkles } from 'lucide-react';

export default function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="trust-strip"
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        background: 'linear-gradient(180deg, rgba(10,10,10,0.5) 0%, var(--bg-primary) 100%)',
      }}
    >
      <div
        className="section-container"
        style={{
          padding: '56px 24px',
          textAlign: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Trust Headline */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '24px',
            letterSpacing: '-0.01em',
          }}
        >
          {brand.trustLine}
        </p>

        {/* Category Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          {trustCategories.map((category, i) => (
            <div
              key={category}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                fontSize: '0.82rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                background: 'var(--glass-bg-light)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.6s ease ${0.2 + i * 0.1}s, transform 0.6s ease ${0.2 + i * 0.1}s`,
              }}
            >
              <Sparkles size={13} style={{ color: 'var(--color-purple)', opacity: 0.7 }} />
              {category}
            </div>
          ))}
        </div>

        {/* Sub-note */}
        <p
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-dim)',
            fontStyle: 'italic',
          }}
        >
          Early-access users will shape the first version.
        </p>
      </div>
    </section>
  );
}
