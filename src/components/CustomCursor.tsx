'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * CustomCursor — dot + lagging ring cursor. Ring uses spring physics
 * so it trails with weight. Expands and inverts on interactive
 * elements (links, buttons, cards with [data-cursor-hover]).
 * Desktop-only: bails out entirely on coarse/touch pointers.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { damping: 28, stiffness: 300, mass: 0.4 });
  const ringY = useSpring(dotY, { damping: 28, stiffness: 300, mass: 0.4 });

  useEffect(() => {
    // Feature-detect fine pointer client-side only (unknowable at SSR).
    // Standard hydration-guard exception — see ThemeToggle.tsx for the
    // same documented pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(window.matchMedia('(pointer: fine)').matches);
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    const overHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      setHovering(Boolean(interactive));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', overHandler);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', overHandler);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Center dot */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--accent-1)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />

      {/* Trailing ring */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9998,
          borderRadius: '50%',
          border: '2px solid #FFFFFF',
          mixBlendMode: 'difference' as const,
        }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          scale: pressed ? 0.8 : 1,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}
