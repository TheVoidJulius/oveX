'use client';

import { useEffect, useRef, useState } from 'react';
import { useCases } from '@/config/content';
import { Monitor, Mic, GraduationCap, Users } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Monitor,
  Mic,
  GraduationCap,
  Users,
};

export default function UseCases() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <section
      id="use-cases"
      ref={ref}
      className="section-padding"
      style={{ position: 'relative' }}
    >
      <div
        className="glow-orb"
        style={{
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(210,210,210,0.05), transparent 70%)',
          bottom: '10%', right: '-10%',
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
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-green)', display: 'inline-block' }} />
          Use cases
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
          Built for <span className="text-gradient-primary">how you create</span>
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
          Whether you are solo or running an agency, Octova fits your workflow.
        </p>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          maxWidth: '1020px',
          margin: '0 auto 24px',
        }}>
          {useCases.map((uc, i) => {
            const IconComponent = iconMap[uc.icon];
            const isActive = i === activeIndex;
            return (
              <button
                key={uc.title}
                onClick={() => setActiveIndex(i)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '28px 24px',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(210,210,210,0.04))'
                    : 'var(--glass-bg)',
                  backdropFilter: 'blur(var(--glass-blur))',
                  WebkitBackdropFilter: 'blur(var(--glass-blur))',
                  border: isActive
                    ? '1px solid rgba(255,255,255,0.3)'
                    : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--duration-normal)',
                  transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: isActive ? '0 0 30px rgba(255,255,255,0.15)' : 'none',
                  opacity: visible ? 1 : 0,
                  transitionDelay: visible ? `${0.3 + i * 0.1}s` : '0s',
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--gradient-primary)' : 'rgba(255,255,255,0.1)',
                  border: isActive ? 'none' : '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all var(--duration-normal)',
                }}>
                  {IconComponent && <IconComponent size={20} />}
                </div>

                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  transition: 'color var(--duration-normal)',
                }}>
                  {uc.title}
                </h3>

                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}>
                  {uc.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p style={{
          fontSize: '0.78rem',
          color: 'var(--text-dim)',
          fontStyle: 'italic',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.7s',
        }}>
          Some workflows are planned for later releases.
        </p>
      </div>
    </section>
  );
}
