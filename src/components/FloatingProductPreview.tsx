'use client';

import { useEffect, useState } from 'react';
import { floatingPills, miniCards } from '@/config/content';

/**
 * FloatingProductPreview — Hero right-side composition
 * 9:16 video card with animated captions, waveform, floating
 * pills, progress indicator, and mini glass cards.
 */
export default function FloatingProductPreview() {
  const [activeWord, setActiveWord] = useState(0);
  const [waveforms] = useState<{duration: number, height: number}[]>(() =>
    Array.from({ length: 20 }, () => ({
      duration: 0.8 + Math.random() * 0.5,
      height: 30 + Math.random() * 70
    }))
  );
  const captionWords = ['Bhai,', 'ye', '3', 'mistakes', 'mat', 'karna.'];

  // Animate caption word highlight
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % captionWords.length);
    }, 800);

    return () => clearInterval(interval);
  }, [captionWords.length]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '420px',
      aspectRatio: '9/14',
      margin: '0 auto',
    }}>
      {/* Main Video Card */}
      <div
        className="glass animate-float-slow"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(180deg, rgba(15,15,15,0.8) 0%, rgba(5,5,5,0.95) 100%)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.1)',
        }}
      >
        {/* Video Poster Gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(5,5,5,0.3) 50%, rgba(5,5,5,0.8) 100%)',
        }} />

        {/* Fake Video Content Area */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: 'var(--text-dim)',
          fontSize: '0.75rem',
        }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 8px',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <span style={{ opacity: 0.5 }}>Preview</span>
        </div>

        {/* Waveform */}
        <div style={{
          position: 'absolute',
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '3px',
          alignItems: 'center',
          height: '24px',
        }}>
          {waveforms.length === 0
            ? Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="animate-float"
                  style={{
                    width: '3px',
                    borderRadius: '2px',
                    background: 'var(--gradient-primary)',
                    opacity: 0.4,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1s',
                    height: '50%',
                    animationName: 'waveform',
                  }}
                />
              ))
            : waveforms.map((wave, i) => (
                <div
                  key={i}
                  className="animate-float"
                  style={{
                    width: '3px',
                    borderRadius: '2px',
                    background: 'var(--gradient-primary)',
                    opacity: 0.4,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${wave.duration}s`,
                    height: `${wave.height}%`,
                    animationName: 'waveform',
                  }}
                />
              ))}
        </div>

        {/* Caption Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '16px',
          right: '16px',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '4px',
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: 1.5,
          }}>
            {captionWords.map((word, i) => (
              <span
                key={i}
                style={{
                  padding: '2px 6px',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                  background: i === activeWord ? 'var(--color-purple)' : 'transparent',
                  color: i === activeWord ? 'white' : 'var(--text-primary)',
                  transform: i === activeWord ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Top Bar */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            fontSize: '0.65rem',
            color: 'var(--text-dim)',
            padding: '4px 10px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)',
          }}>
            9:16
          </div>
          <div style={{
            fontSize: '0.65rem',
            color: 'var(--color-green)',
            padding: '4px 10px',
            background: 'rgba(200,200,200,0.1)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(200,200,200,0.2)',
          }}>
            ● Live Preview
          </div>
        </div>
      </div>

      {/* Floating Pills */}
      {floatingPills.map((pill, i) => {
        const positions = [
          { top: '8%', right: '-60px' },
          { top: '30%', left: '-70px' },
          { bottom: '35%', right: '-55px' },
          { bottom: '12%', left: '-60px' },
        ];
        const pos = positions[i] || positions[0];
        return (
          <div
            key={pill}
            className={`glass-light animate-float float-delay-${i + 1} hidden md:block`}
            style={{
              position: 'absolute',
              ...pos,
              padding: '6px 14px',
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              zIndex: 2,
            }}
          >
            {pill}
          </div>
        );
      })}

      {/* Progress Indicator */}
      <div
        className="glass-light animate-float float-delay-2 hidden md:block"
        style={{
          position: 'absolute',
          top: '50%',
          right: '-80px',
          padding: '8px 14px',
          fontSize: '0.7rem',
          zIndex: 2,
          minWidth: '140px',
        }}
      >
        <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Captioning clip…</div>
        <div style={{
          width: '100%',
          height: '3px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '92%',
            height: '100%',
            background: 'var(--gradient-primary)',
            borderRadius: '2px',
            animation: 'progress-fill 3s ease-out forwards',
          }} />
        </div>
        <div style={{ color: 'var(--color-cyan)', marginTop: '4px', fontWeight: 600 }}>92%</div>
      </div>

      {/* Mini Glass Cards */}
      <div style={{
        position: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 2,
      }}>
        {miniCards.map((card, i) => (
          <div
            key={card}
            className={`glass-light animate-float float-delay-${(i % 4) + 1}`}
            style={{
              padding: '6px 12px',
              fontSize: '0.65rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
            }}
          >
            {card}
          </div>
        ))}
      </div>
    </div>
  );
}
