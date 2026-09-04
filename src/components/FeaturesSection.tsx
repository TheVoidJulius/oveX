'use client';

import { useEffect, useRef, useState } from 'react';
import { availableFeatures, roadmapFeatures } from '@/config/content';
import {
  Captions, Smartphone, Palette, Download, LayoutTemplate,
  Scissors, Sparkles, Brush, Copy, AudioLines, FileText,
  Check, Clock,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Captions,
  Smartphone,
  Palette,
  Download,
  LayoutTemplate,
  Scissors,
  Sparkles,
  Brush,
  Copy,
  AudioLines,
  FileText,
};

function FeatureCard({
  feature,
  index,
  visible,
  isRoadmap,
}: {
  feature: { title: string; description: string; icon: string; available: boolean };
  index: number;
  visible: boolean;
  isRoadmap: boolean;
}) {
  const IconComponent = iconMap[feature.icon];

  return (
    <div
      className="glass-card"
      style={{
        padding: '24px 20px',
        textAlign: 'left',
        position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${0.1 + index * 0.08}s, transform 0.5s ease ${0.1 + index * 0.08}s, border-color var(--duration-normal), box-shadow var(--duration-normal)`,
      }}
    >
      {/* Badge */}
      {isRoadmap && (
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '2px 10px',
          fontSize: '0.6rem',
          fontWeight: 700,
          color: 'var(--paper)',
          background: 'var(--accent-3)',
          border: '2px solid var(--ink)',
          borderRadius: 'var(--radius-full)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          <Clock size={10} />
          Planned
        </div>
      )}

      {/* Icon */}
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 'var(--radius-md)',
        background: isRoadmap ? 'var(--bg-surface-secondary)' : 'var(--accent-1)',
        border: '2px solid var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '14px',
        color: isRoadmap ? 'var(--text-muted)' : 'var(--paper)',
      }}>
        {IconComponent && <IconComponent size={18} />}
      </div>

      <h3 style={{
        fontSize: '0.95rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        {!isRoadmap && <Check size={14} style={{ color: 'var(--color-green)' }} />}
        {feature.title}
      </h3>

      <p style={{
        fontSize: '0.82rem',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
      }}>
        {feature.description}
      </p>
    </div>
  );
}

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={ref}
      className="section-padding"
      style={{ position: 'relative' }}
    >
      <div className="section-container">
        {/* Section A: Available */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            className="section-eyebrow"
            style={{
              marginBottom: '20px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <Check size={14} style={{ color: 'var(--color-green)' }} />
            Available in the first release
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
            What you get <span className="text-gradient-primary">on day one</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          maxWidth: '960px',
          margin: '0 auto 80px',
        }}>
          {availableFeatures.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} visible={visible} isRoadmap={false} />
          ))}
        </div>

        {/* Section B: Roadmap */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            className="section-eyebrow"
            style={{
              marginBottom: '20px',
              background: 'var(--accent-3)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
            }}
          >
            <Clock size={14} />
            On the roadmap
          </div>

          <h2
            className="section-title"
            style={{
              marginBottom: '12px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
            }}
          >
            What&apos;s <span className="text-gradient-creator">coming next</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          maxWidth: '960px',
          margin: '0 auto',
        }}>
          {roadmapFeatures.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i + 5} visible={visible} isRoadmap={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
