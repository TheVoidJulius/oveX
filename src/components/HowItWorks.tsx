'use client';

import { useEffect, useRef, useState } from 'react';
import { howItWorksSteps } from '@/config/content';
import { Upload, Type, Download } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Upload,
  Type,
  Download,
};

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

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

  // Auto-cycle active step
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % howItWorksSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="section-padding"
      style={{ position: 'relative' }}
    >
      {/* Background glow */}
      <div
        className="glow-orb"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)',
          top: '10%',
          left: '-15%',
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
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-indigo)', display: 'inline-block' }} />
          How it works
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
          Three steps to your next <span className="text-gradient-primary">Short</span>
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
          From clip to captioned Short in minutes.
        </p>

        {/* Steps — Timeline */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          maxWidth: '960px',
          margin: '0 auto',
          position: 'relative',
        }}>
          {/* Connecting line (desktop) */}
          <div
            className="how-it-works-line"
            style={{
              position: 'absolute',
              top: '48px',
              left: '16.66%',
              right: '16.66%',
              height: '2px',
              background: 'var(--border-color)',
              zIndex: 0,
            }}
            aria-hidden="true"
          >
            <div style={{
              width: `${((activeStep + 1) / howItWorksSteps.length) * 100}%`,
              height: '100%',
              background: 'var(--gradient-primary)',
              transition: 'width 0.6s ease',
              borderRadius: '2px',
            }} />
          </div>

          {howItWorksSteps.map((step, i) => {
            const IconComponent = iconMap[step.icon];
            const isActive = i <= activeStep;
            return (
              <div
                key={step.title}
                onClick={() => setActiveStep(i)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 1,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease ${0.3 + i * 0.15}s, transform 0.6s ease ${0.3 + i * 0.15}s`,
                }}
              >
                {/* Step circle */}
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: isActive
                    ? 'var(--gradient-primary)'
                    : 'var(--glass-bg)',
                  border: isActive
                    ? 'none'
                    : '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.4s ease',
                  boxShadow: isActive ? '0 0 30px rgba(255,255,255,0.3)' : 'none',
                }}>
                  {IconComponent && (
                    <IconComponent size={24} />
                  )}
                </div>

                {/* Step number */}
                <div style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: isActive ? 'var(--color-cyan)' : 'var(--text-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  transition: 'color 0.4s ease',
                }}>
                  Step {i + 1}
                </div>

                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  transition: 'color 0.4s ease',
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  maxWidth: '260px',
                }}>
                  {step.description}
                </p>

                {/* Mini panel */}
                <div
                  className="glass-light"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--color-cyan)' : 'var(--text-dim)',
                    opacity: isActive ? 1 : 0.5,
                    transition: 'all 0.4s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {step.miniPanel}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsive: vertical layout on mobile */}
      <style jsx>{`
        @media (max-width: 768px) {
          #how-it-works .section-container > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .how-it-works-line {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
