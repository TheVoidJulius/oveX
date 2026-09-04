import { brand, navLinks } from '@/config/brand';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      background: 'var(--bg-surface-secondary)',
      padding: '64px 24px 32px',
    }}>
      <div className="section-container" style={{ maxWidth: '1080px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '48px',
          marginBottom: '64px',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '8px',
                background: 'var(--gradient-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                {brand.name}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '280px' }}>
              {brand.tagline} {brand.trustLine}
            </p>
            <div style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Built independently for creators.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Product
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Connect
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>
                  <a href={`mailto:${brand.contactEmail}`} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                    Email Us
                  </a>
                </li>
                <li>
                  <a href={brand.feedbackCallUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                    Book a Call
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: 0 }}>
            &copy; {currentYear} {brand.name}. All rights reserved. MVP Release.
          </p>
        </div>
      </div>
    </footer>
  );
}
