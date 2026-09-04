'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Zap, Moon } from 'lucide-react';

/**
 * ThemeToggle — switches between "pulse" (electric comic colour)
 * and "noir" (ink black & white) visual themes.
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration guard: theme is only knowable client-side, so we render a
  // neutral placeholder on the server/first paint, then reveal the real
  // toggle post-mount. This is next-themes' documented pattern — it can't
  // be replaced with lazy state init since it depends on the render pass
  // (server vs. client), not a computable initial value.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div style={{ width: 84, height: 36 }} aria-hidden="true" />;
  }

  const isNoir = theme === 'noir';

  return (
    <button
      onClick={() => setTheme(isNoir ? 'pulse' : 'noir')}
      aria-label={isNoir ? 'Switch to Pulse theme' : 'Switch to Noir theme'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '7px 12px',
        background: isNoir ? 'var(--ink)' : 'var(--accent-1)',
        color: 'var(--paper)',
        border: '2px solid var(--ink)',
        borderRadius: 'var(--radius-full)',
        fontWeight: 700,
        fontSize: '0.72rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        cursor: 'pointer',
        boxShadow: '3px 3px 0px var(--ink)',
        transition: 'transform 0.12s ease, box-shadow 0.12s ease',
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translate(2px, 2px)';
        e.currentTarget.style.boxShadow = '1px 1px 0px var(--ink)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = '3px 3px 0px var(--ink)';
      }}
    >
      {isNoir ? <Moon size={13} /> : <Zap size={13} />}
      {isNoir ? 'Noir' : 'Pulse'}
    </button>
  );
}
