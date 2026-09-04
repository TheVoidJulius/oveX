'use client';

import { useEffect, useRef, useState } from 'react';
import { pricingTiers } from '@/config/content';
import { trackEvent, EVENTS } from '@/lib/analytics';
import { Check, Star, Zap } from 'lucide-react';
import Tilt3D from './Tilt3D';

export default function PricingPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const hasTracked = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!hasTracked.current) {
            trackEvent(EVENTS.PRICING_SECTION_VIEWED);
            hasTracked.current = true;
          }
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const tierIcons = [null, Star, Zap];

  return (
    <section
      id="pricing"
      ref={ref}
      className="section-padding"
      style={{
        position: 'relative',
        background: 'var(--bg-surface)',
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
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-purple)', display: 'inline-block' }} />
          Planned early-access tiers
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
          Simple, <span className="text-gradient-primary">creator-friendly</span> pricing
        </h2>

        <p
          className="section-subtitle"
          style={{
            margin: '0 auto 16px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
          }}
        >
          Pricing will be finalized with early users. No surprises.
        </p>

        {/* Experimental badge */}
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
          marginBottom: '48px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.3s',
        }}>
          All tiers are experimental — no final prices yet
        </div>

        {/* Pricing Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {pricingTiers.map((tier, i) => {
            const TierIcon = tierIcons[i];
            return (
              <Tilt3D
                key={tier.name}
                maxTilt={7}
                style={{
                  padding: '36px 28px',
                  borderRadius: 'var(--radius-md)',
                  background: tier.highlighted ? 'var(--highlight-bg)' : 'var(--bg-surface)',
                  border: '3px solid var(--ink)',
                  textAlign: 'left',
                  transform: tier.highlighted ? 'scale(1.03)' : 'scale(1)',
                  boxShadow: tier.highlighted
                    ? '7px 7px 0px var(--accent-1)'
                    : '5px 5px 0px var(--accent-2)',
                  transition: 'box-shadow var(--duration-normal)',
                  opacity: visible ? 1 : 0,
                  transitionDelay: visible ? `${0.3 + i * 0.12}s` : '0s',
                }}
              >
                {/* Badge */}
                {tier.badge && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 12px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: tier.highlighted ? 'var(--highlight-bg)' : 'var(--paper)',
                    background: tier.highlighted ? 'var(--accent-pop)' : 'var(--ink)',
                    borderRadius: 'var(--radius-full)',
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}>
                    {TierIcon && <TierIcon size={10} />}
                    {tier.badge}
                  </div>
                )}

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: tier.highlighted ? 'var(--highlight-text)' : 'var(--text-primary)',
                  marginBottom: '8px',
                }}>
                  {tier.name}
                </h3>

                <p style={{
                  fontSize: '0.85rem',
                  color: tier.highlighted ? 'var(--highlight-text-muted)' : 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '24px',
                }}>
                  {tier.description}
                </p>

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.85rem',
                        color: tier.highlighted ? 'var(--highlight-text)' : 'var(--text-primary)',
                        fontWeight: 500,
                      }}
                    >
                      <Check
                        size={14}
                        style={{
                          color: tier.highlighted ? 'var(--accent-pop)' : 'var(--accent-1)',
                          flexShrink: 0,
                        }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </Tilt3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}
