'use client';

import { useEffect, useRef, useState } from 'react';

export default function ProductPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const callouts = ['Edit less', 'Post more', 'Keep your style'];

  return (
    <section
      id="product-preview"
      ref={ref}
      className="section-padding"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background */}
      <div
        className="glow-orb"
        style={{
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)',
          top: '20%', left: '50%', transform: 'translateX(-50%)',
        }}
        aria-hidden="true"
      />

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
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-purple)', display: 'inline-block' }} />
          Product Preview
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
          A workspace <span className="text-gradient-primary">designed for speed</span>
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
          Everything you need to go from clip to captioned Short, in one place.
        </p>

        {/* MVP Label */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 14px',
          fontSize: '0.7rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          background: 'var(--bg-surface-secondary)',
          border: '2px solid var(--ink)',
          borderRadius: 'var(--radius-full)',
          marginBottom: '24px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.3s',
        }}>
          MVP preview — layout may evolve
        </div>

        {/* Dashboard Mockup */}
        <div
          className="glass"
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            position: 'relative',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
          }}
        >
          {/* Top Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            borderBottom: '1px solid var(--border-color)',
            background: 'rgba(0,0,0,0.2)',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#5A5A5A' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#8C8C8C' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#E1E1E1' }} />
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>octova.ai/editor</span>
          </div>

          {/* Dashboard Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr 220px',
            minHeight: '380px',
          }}>
            {/* Sidebar */}
            <div style={{
              borderRight: '1px solid var(--border-color)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              {['Projects', 'Templates', 'Captions', 'Brand Kit', 'Export'].map((item, i) => (
                <div
                  key={item}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: i === 2 ? 'var(--text-primary)' : 'var(--text-dim)',
                    background: i === 2 ? 'rgba(255,255,255,0.1)' : 'transparent',
                    borderLeft: i === 2 ? '2px solid var(--color-purple)' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'background var(--duration-fast)',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Canvas Area */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              position: 'relative',
            }}>
              {/* Video Frame */}
              <div style={{
                width: '140px',
                aspectRatio: '9/16',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(5,5,5,0.6))',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '8px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 6, right: 6,
                  fontSize: '0.5rem',
                  padding: '2px 5px',
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--text-dim)',
                }}>
                  9:16
                </div>

                {/* Caption preview */}
                <div style={{
                  textAlign: 'center',
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  color: 'white',
                  padding: '3px 6px',
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: '3px',
                }}>
                  <span style={{ background: 'var(--color-purple)', padding: '0 3px', borderRadius: '2px' }}>Bhai</span>
                  {' ye caption'}
                </div>
              </div>

              {/* Timeline bar */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                height: '32px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
                gap: '4px',
              }}>
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} style={{
                    flex: 1,
                    height: '4px',
                    borderRadius: '2px',
                    background: i < 8
                      ? 'var(--gradient-primary)'
                      : 'rgba(255,255,255,0.06)',
                  }} />
                ))}
              </div>
            </div>

            {/* Right Panel — Caption Editor */}
            <div style={{
              borderLeft: '1px solid var(--border-color)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Caption Style
              </div>

              {/* Style swatches */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {['#FFFFFF', '#D2D2D2', '#AAAAAA', '#C8C8C8'].map((color, i) => (
                  <div key={i} style={{
                    width: 28, height: 28,
                    borderRadius: 'var(--radius-sm)',
                    background: color,
                    opacity: i === 0 ? 1 : 0.4,
                    border: i === 0 ? '2px solid white' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                  }} />
                ))}
              </div>

              {/* Font selector mock */}
              <div style={{
                padding: '8px 10px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-color)',
              }}>
                Font: Inter Bold
              </div>

              {/* Position selector */}
              <div style={{
                padding: '8px 10px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-color)',
              }}>
                Position: Bottom Center
              </div>

              {/* Animation selector */}
              <div style={{
                padding: '8px 10px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-color)',
              }}>
                Animation: Word Highlight
              </div>

              <div style={{ flex: 1 }} />

              {/* Export button mock */}
              <div style={{
                padding: '10px',
                background: 'var(--gradient-primary)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
              }}>
                Export Short
              </div>
            </div>
          </div>
        </div>

        {/* Floating Callouts */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginTop: '32px',
          flexWrap: 'wrap',
        }}>
          {callouts.map((text, i) => (
            <div
              key={text}
              className="glass-light"
              style={{
                padding: '8px 20px',
                fontSize: '0.82rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.6s ease ${0.6 + i * 0.1}s, transform 0.6s ease ${0.6 + i * 0.1}s`,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          #product-preview .glass > div:last-child {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          #product-preview .glass > div:last-child > div:first-child {
            display: none !important;
          }
          #product-preview .glass > div:last-child > div:last-child {
            border-left: none !important;
            border-top: 1px solid var(--border-color);
          }
        }
      `}</style>
    </section>
  );
}
