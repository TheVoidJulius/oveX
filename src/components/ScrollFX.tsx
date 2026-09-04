'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

/**
 * ScrollFX — global smooth-scroll (Lenis) + live scroll velocity.
 * Velocity is exposed via context so any component (marquee, cursor,
 * tilt cards) can react to how fast the user is scrolling right now.
 */
const VelocityContext = createContext(0);

export function useScrollVelocity() {
  return useContext(VelocityContext);
}

export default function ScrollFX({ children }: { children: React.ReactNode }) {
  const [velocity, setVelocity] = useState(0);
  const rafRef = useRef<number | null>(null);
  const targetVelocity = useRef(0);

  useEffect(() => {
    // Smooth the raw velocity value on our own rAF loop so consumers
    // get a gently-decaying number rather than a jumpy raw signal.
    const tick = () => {
      setVelocity((v) => v + (targetVelocity.current - v) * 0.12);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        touchMultiplier: 1.1,
      }}
    >
      <VelocityTracker onVelocity={(v) => { targetVelocity.current = v; }} />
      <VelocityContext.Provider value={velocity}>
        {children}
      </VelocityContext.Provider>
    </ReactLenis>
  );
}

function VelocityTracker({ onVelocity }: { onVelocity: (v: number) => void }) {
  useLenis((lenis) => {
    onVelocity(lenis.velocity);
  });
  return null;
}
