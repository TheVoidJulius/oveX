// ============================================================
// Octova — TypeScript Types
// ============================================================

export interface BrandConfig {
  name: string;
  tagline: string;
  headline: string;
  subheadline: string;
  trustLine: string;
  ctaPrimary: string;
  ctaSecondary: string;
  earlyAccessNote: string;
  /** URL for the waitlist form submission */
  formEndpoint: string;
  /** URL for the demo video */
  demoVideoUrl: string;
  /** URL for scheduling a feedback call */
  feedbackCallUrl: string;
  /** URL for the real application */
  appUrl: string;
  /** Canonical URL for SEO */
  canonicalUrl: string;
  /** Contact email */
  contactEmail: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  available: boolean;
}

export interface PricingTier {
  name: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export interface UseCase {
  title: string;
  description: string;
  icon: string;
}

export interface ProblemCard {
  title: string;
  description: string;
  icon: string;
}

export interface LanguageCard {
  language: string;
  sample: string;
  script: 'latin' | 'devanagari';
}

export interface HowItWorksStep {
  title: string;
  description: string;
  icon: string;
  miniPanel: string;
}

export type CreatorType = 'Creator' | 'Podcaster' | 'Coach' | 'Educator' | 'Agency' | 'Other';
export type VideoVolume = '1–5' | '6–20' | '21–50' | '50+';

export interface EarlyAccessFormData {
  name: string;
  email: string;
  whatsapp?: string;
  creatorType: CreatorType | '';
  monthlyVideos: VideoVolume | '';
}

export interface FormSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export interface AnalyticsEvent {
  name: string;
  data?: Record<string, unknown>;
  timestamp?: number;
}
