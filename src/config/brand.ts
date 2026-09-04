// ============================================================
// Octova — Brand Configuration (Single Source of Truth)
// ============================================================
// Change the brand name, taglines, URLs, and colors here.
// Every component pulls from this file.
// ============================================================

import type { BrandConfig, NavLink } from '@/types';

export const brand: BrandConfig = {
  name: 'Octova',
  tagline: 'Hinglish-first short-form creation.',
  headline: 'Create polished Hinglish Shorts in minutes—not hours.',
  subheadline:
    'Turn your ideas and videos into captioned, creator-ready Shorts with Hinglish-aware styling, vertical templates, and a workflow designed for fast content production.',
  trustLine: 'Built for creators who think in Hindi, Hinglish, and English.',
  ctaPrimary: 'Join Early Access',
  ctaSecondary: 'Watch Demo',
  earlyAccessNote: 'Free early access for the first 20 creators.',

  // TODO: CONNECT — Replace with your real endpoints
  formEndpoint: '/api/early-access',
  demoVideoUrl: '#demo',
  feedbackCallUrl: '#feedback-call', // Replace with Calendly/Cal.com URL
  appUrl: '#app',
  canonicalUrl: 'https://octova.ai',
  contactEmail: 'hello@octova.ai',
};

export const navLinks: NavLink[] = [
  { label: 'Product', href: '#product-preview' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Early Access', href: '#early-access' },
];

// ============================================================
// SEO Metadata
// ============================================================
export const seo = {
  title: `${brand.name} — Hinglish-first AI video creation`,
  description:
    'Create polished Hinglish Shorts with AI-assisted captions, vertical templates, and a workflow built for Indian creators.',
  ogImage: '/og-image.png', // TODO: CONNECT — Replace with real OG image
  twitterHandle: '@octova_ai', // TODO: CONNECT — Replace with real handle
};
