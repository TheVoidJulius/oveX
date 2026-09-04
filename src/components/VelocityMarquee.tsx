'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import { useScrollVelocity } from './ScrollFX';

interface VelocityMarqueeProps {
  text: string;
  baseSpeed?: number; // px per second at rest
  className?: string;
}

/**
 * VelocityMarquee — infinite scrolling text band that speeds up and
 * skews based on live scroll velocity. Fast scroll = fast, slanted
 * text. Idle = a calm, steady drift. Classic Awwwards-style device.
 */
export default function VelocityMarquee({ text, baseSpeed = 40, className }: VelocityMarqueeProps) {
  const x = useMotionValue(0);
  const skew = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const velocity = useScrollVelocity();

  useAnimationFrame((_, delta) => {
    const dt = delta / 1000;
    const speed = baseSpeed + velocity * 30;
    let next = x.get() - speed * dt;

    const trackWidth = trackRef.current?.scrollWidth ?? 0;
    if (trackWidth > 0) {
      if (next <= -trackWidth / 2) next += trackWidth / 2;
      if (next > 0) next -= trackWidth / 2;
    }
    x.set(next);

    const targetSkew = Math.max(-20, Math.min(20, velocity * 1.4));
    skew.set(skew.get() + (targetSkew - skew.get()) * 0.15);
  });

  const items = new Array(6).fill(text);

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--ink)',
        padding: '18px 0',
        whiteSpace: 'nowrap',
      }}
      aria-hidden="true"
    >
      <motion.div
        ref={trackRef}
        style={{
          display: 'inline-flex',
          x,
          skewX: skew,
          willChange: 'transform',
        }}
      >
        {items.map((t, i) => (
          <span
            key={i}
            className="font-display"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '20px',
              fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
              color: 'var(--paper)',
              padding: '0 28px',
              flexShrink: 0,
            }}
          >
            {t}
            <span style={{ color: 'var(--accent-1)', fontSize: '1.4rem' }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
