// ============================================================
// Octova — Analytics Event Adapter
// ============================================================
// Placeholder analytics system. Replace the trackEvent
// implementation with your real analytics provider
// (e.g., Mixpanel, PostHog, Google Analytics, Amplitude).
// ============================================================

// TODO: CONNECT — Replace with your analytics provider SDK
// import posthog from 'posthog-js';

/**
 * Track a named analytics event with optional data payload.
 * Currently logs to console — swap in your real provider below.
 */
export function trackEvent(name: string, data?: Record<string, unknown>): void {
  // TODO: CONNECT — Replace with real analytics call
  // posthog.capture(name, data);

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${name}`, data ?? '');
  }
}

// ---- Pre-defined Event Names ----
export const EVENTS = {
  PAGE_VIEW: 'page_view',
  HERO_CTA_CLICKED: 'hero_cta_clicked',
  DEMO_WATCHED: 'demo_watched',
  DEMO_SLIDER_USED: 'demo_slider_used',
  EARLY_ACCESS_FORM_STARTED: 'early_access_form_started',
  EARLY_ACCESS_SUBMITTED: 'early_access_submitted',
  FEEDBACK_CALL_CLICKED: 'feedback_call_clicked',
  PRICING_SECTION_VIEWED: 'pricing_section_viewed',
  FAQ_OPENED: 'faq_opened',
} as const;
