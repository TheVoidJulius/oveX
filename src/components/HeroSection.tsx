'use client';

import { brand } from '@/config/brand';
import { trackEvent, EVENTS } from '@/lib/analytics';
import FlowCore3D from './FlowCore3D';
import FloatingProductPreview from './FloatingProductPreview';
import Magnetic from './Magnetic';
import { useSmoothScrollTo } from './useSmoothScrollTo';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const scrollTo = useSmoothScrollTo();

  const handlePrimaryCta = () => {
    trackEvent(EVENTS.HERO_CTA_CLICKED, { location: 'hero', type: 'primary' });
    scrollTo('#early-access');
  };

  const handleSecondaryCta = () => {
    trackEvent(EVENTS.HERO_CTA_CLICKED, { location: 'hero', type: 'secondary' });
    // TODO: CONNECT — Open demo video modal or scroll to demo section
    scrollTo('#before-after');
  };

  const handleScrollExplore = () => {
    scrollTo('#trust-strip');
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '72px',
      }}
    >
      {/* Background Grid */}
      <div className="grid-bg" aria-hidden="true" />

      {/* Background Glow Orbs */}
      <div
        className="glow-orb animate-glow-pulse"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)',
          top: '10%',
          left: '-10%',
        }}
        aria-hidden="true"
      />
      <div
        className="glow-orb animate-glow-pulse"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(210,210,210,0.05), transparent 70%)',
          bottom: '5%',
          right: '-5%',
          animationDelay: '1.5s',
        }}
        aria-hidden="true"
      />

      {/* FlowCore 3D Background */}
      <FlowCore3D />

      {/* Content */}
      <div
        className="section-container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
          padding: '48px 24px',
          width: '100%',
        }}
      >
        {/* Left — Text Content */}
        <div style={{ maxWidth: '580px' }}>
          {/* Eyebrow */}
          <div className="section-eyebrow" style={{ marginBottom: '24px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-cyan)', display: 'inline-block' }} />
            Hinglish-first AI video creation
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '24px',
            letterSpacing: '-0.03em',
          }}>
            {brand.headline.split('—')[0]}
            <span className="text-gradient-primary">—{brand.headline.split('—')[1]}</span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '36px',
            maxWidth: '500px',
          }}>
            {brand.subheadline}
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '20px',
          }}>
            <Magnetic>
              <button
                onClick={handlePrimaryCta}
                className="btn-primary"
                id="hero-cta-primary"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {brand.ctaPrimary}
                  <ArrowRight size={18} />
                </span>
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={handleSecondaryCta}
                className="btn-secondary"
                id="hero-cta-secondary"
              >
                <Play size={16} />
                {brand.ctaSecondary}
              </button>
            </Magnetic>
          </div>

          {/* Trust Note */}
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
          }}>
            {brand.earlyAccessNote}
          </p>
        </div>

        {/* Right — Product Preview */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <FloatingProductPreview />
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleScrollExplore}
        className="hidden md:flex"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: 'var(--text-dim)',
          cursor: 'pointer',
          zIndex: 2,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          padding: '8px',
        }}
        aria-label="Scroll to explore the workflow"
      >
        Explore the workflow
        <ChevronDown size={16} className="animate-float" style={{ animationDuration: '2s' }} />
      </button>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 968px) {
          #hero > div:nth-child(5) {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 48px !important;
          }
          #hero > div:nth-child(5) > div:first-child {
            max-width: 100% !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          #hero > div:nth-child(5) > div:last-child {
            max-width: 300px;
            margin: 0 auto;
          }
        }
        @media (max-width: 480px) {
          #hero > div:nth-child(5) > div:last-child {
            max-width: 260px;
          }
        }
      `}</style>
    </section>
  );
}
