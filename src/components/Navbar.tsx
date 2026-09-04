'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { brand, navLinks } from '@/config/brand';
import { trackEvent, EVENTS } from '@/lib/analytics';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useSmoothScrollTo } from './useSmoothScrollTo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // ---- Scroll Detection ----
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ---- Body Scroll Lock ----
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  // ---- Escape to close ----
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // ---- Focus trap ----
  useEffect(() => {
    if (menuOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [menuOpen]);

  const scrollTo = useSmoothScrollTo();

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    scrollTo(href);
  }, [scrollTo]);

  const handleCtaClick = () => {
    trackEvent(EVENTS.HERO_CTA_CLICKED, { location: 'navbar' });
    scrollTo('#early-access');
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background var(--duration-normal), border-color var(--duration-normal)',
        background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
      }}
    >
      <nav
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 24px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        aria-label="Main navigation"
      >
        {/* ---- Logo ---- */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          aria-label={`${brand.name} — go to top`}
        >
          {/* Animated gradient mark */}
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--gradient-creator)',
              opacity: 0,
              transition: 'opacity 0.6s',
            }} className="logo-glow" />
          </div>
          <span style={{
            fontWeight: 700,
            fontSize: '1.2rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}>
            {brand.name}
          </span>
        </a>

        {/* ---- Desktop Links ---- */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color var(--duration-normal)',
                padding: '8px 0',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.label}
            </button>
          ))}
          <ThemeToggle />
          <button
            onClick={handleCtaClick}
            className="btn-primary"
            style={{ padding: '10px 22px', fontSize: '0.85rem' }}
          >
            <span>{brand.ctaPrimary}</span>
          </button>
        </div>

        {/* ---- Mobile Menu Button ---- */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '8px',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ---- Mobile Drawer ---- */}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Mobile navigation"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '320px',
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-color)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform var(--duration-normal) ease',
          zIndex: 1001,
          padding: '80px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
        className="mobile-drawer"
      >
        <button
          ref={firstFocusableRef}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          <X size={24} />
        </button>

        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '1.1rem',
              fontWeight: 500,
              cursor: 'pointer',
              padding: '14px 0',
              textAlign: 'left',
              borderBottom: '1px solid var(--border-color)',
              transition: 'color var(--duration-normal)',
            }}
          >
            {link.label}
          </button>
        ))}

        <div style={{ marginTop: '20px' }}>
          <ThemeToggle />
        </div>

        <button
          onClick={() => { setMenuOpen(false); handleCtaClick(); }}
          className="btn-primary"
          style={{ marginTop: '16px', width: '100%' }}
        >
          <span>{brand.ctaPrimary}</span>
        </button>
      </div>

      {/* ---- Backdrop ---- */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
          }}
          aria-hidden="true"
        />
      )}

      {/* ---- Responsive Styles ---- */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
