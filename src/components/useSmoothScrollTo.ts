'use client';

import { useLenis } from 'lenis/react';
import { useCallback } from 'react';

/**
 * useSmoothScrollTo — returns a function that scrolls to a selector
 * through Lenis (rather than native scrollIntoView), so the smooth
 * scroll's internal position stays in sync. Falls back to native
 * scrollIntoView if Lenis isn't ready yet.
 */
export function useSmoothScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (selector: string) => {
      const el = document.querySelector(selector);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [lenis]
  );
}
