'use client';

import { useEffect, useRef, useState } from 'react';
import { languageCards } from '@/config/content';
import { Languages } from 'lucide-react';
import Tilt3D from './Tilt3D';

export default function LanguageSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  const cardColors = [
    { bg: 'var(--bg-surface)', accent: 'var(--accent-pop)' },
    { bg: 'var(--bg-surface)', accent: 'var(--accent-1)' },
    { bg: 'var(--bg-surface)', accent: 'var(--accent-2)' },
  ];

  return (
    <section
      id="languages"
      ref={ref}
      className="section-padding"
      style={{
        position: 'relative',
        background: 'var(--bg-primary)',
        overflow: 'hidden',
      }}
    >
      <div className="halftone-bg" aria-hidden="true" />

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
          <Languages size={14} />
          Language-focused MVP
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
          Captions that <span className="text-gradient-creator">understand your language</span>
        </h2>

        <p
          className="section-subtitle"
          style={{
            margin: '0 auto 56px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
          }}
        >
          Hindi, Hinglish, and English — starting with the languages Indian creators actually use.
        </p>

        {/* Language Cards */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          maxWidth: '840px',
          margin: '0 auto',
        }}>
          {languageCards.map((card, i) => {
            const colors = cardColors[i];
            return (
              <Tilt3D
                key={card.language}
                maxTilt={8}
                style={{
                  flex: '1 1 240px',
                  maxWidth: '260px',
                  padding: '32px 24px',
                  borderRadius: 'var(--radius-md)',
                  background: colors.bg,
                  border: '3px solid var(--ink)',
                  boxShadow: `5px 5px 0px ${colors.accent}`,
                  textAlign: 'center',
                  animationDelay: `${i * 1.2}s`,
                  animationDuration: `${6 + i}s`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease ${0.3 + i * 0.15}s, transform 0.6s ease ${0.3 + i * 0.15}s`,
                }}
              >
                {/* Language Label */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(0,0,0,0.2)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: colors.accent,
                  marginBottom: '20px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: colors.accent,
                  }} />
                  {card.language}
                </div>

                {/* Sample Text */}
                <p
                  className={card.script === 'devanagari' ? 'hindi-text' : ''}
                  style={{
                    fontSize: card.script === 'devanagari' ? '1.15rem' : '1.05rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.5,
                    minHeight: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  &ldquo;{card.sample}&rdquo;
                </p>

                {/* Script indicator */}
                <div style={{
                  marginTop: '16px',
                  fontSize: '0.7rem',
                  color: 'var(--text-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  {card.script === 'devanagari' ? 'देवनागरी' : 'Latin script'}
                </div>
              </Tilt3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}
