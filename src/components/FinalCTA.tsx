'use client';

import { useEffect, useRef, useState } from 'react';
import { brand } from '@/config/brand';
import { trackEvent, EVENTS } from '@/lib/analytics';
import { ArrowRight } from 'lucide-react';
import Magnetic from './Magnetic';
import { useSmoothScrollTo } from './useSmoothScrollTo';

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const scrollTo = useSmoothScrollTo();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleCta = () => {
    trackEvent(EVENTS.HERO_CTA_CLICKED, { location: 'final_cta' });
    scrollTo('#early-access');
  };

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        padding: '120px 24px',
        textAlign: 'center',
        overflow: 'hidden',
        borderTop: '1px solid var(--border-color)',
      }}
    >
      <div className="grid-bg" style={{ opacity: 0.5 }} aria-hidden="true" />
      
      <div
        className="glow-orb animate-glow-pulse"
        style={{
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '24px',
            letterSpacing: '-0.03em',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          Your next Short starts with <span className="text-gradient-primary">one clip</span>.
        </h2>
        
        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            marginBottom: '48px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          Join the early access program today and shape the future of Hinglish content creation.
        </p>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
          }}
        >
          <Magnetic>
            <button
              onClick={handleCta}
              className="btn-primary"
              style={{ padding: '16px 36px', fontSize: '1.05rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {brand.ctaPrimary}
                <ArrowRight size={18} />
              </span>
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
