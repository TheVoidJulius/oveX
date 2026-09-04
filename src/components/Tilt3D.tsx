'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
  glare?: boolean;
}

/**
 * Tilt3D — wraps any card in a mouse-reactive 3D tilt with a subtle
 * spring return. Pairs well with the ink-panel look: the offset
 * drop-shadow reads as physical depth as the card tilts toward you.
 */
export default function Tilt3D({ children, className, style, maxTilt = 10, glare = true }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springConfig = { damping: 18, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), springConfig);
  const glareX = useSpring(useTransform(px, [0, 1], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(py, [0, 1], [0, 100]), springConfig);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]: number[]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.16), transparent 55%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      data-cursor-hover
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 900,
        position: 'relative',
      }}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            background: glareBackground,
          }}
        />
      )}
    </motion.div>
  );
}
