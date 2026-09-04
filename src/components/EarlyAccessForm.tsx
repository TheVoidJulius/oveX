'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { creatorTypes, videoVolumes } from '@/config/content';
import { brand } from '@/config/brand';
import { submitEarlyAccess } from '@/lib/api';
import { trackEvent, EVENTS } from '@/lib/analytics';
import type { EarlyAccessFormData } from '@/types';
import { Send, Calendar, Loader2, CheckCircle2, AlertCircle, Shield } from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function EarlyAccessForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const hasStartedTracked = useRef(false);
  const [formData, setFormData] = useState<EarlyAccessFormData>({
    name: '',
    email: '',
    whatsapp: '',
    creatorType: '',
    monthlyVideos: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EarlyAccessFormData, string>>>({});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleChange = useCallback((field: keyof EarlyAccessFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));

    if (!hasStartedTracked.current) {
      trackEvent(EVENTS.EARLY_ACCESS_FORM_STARTED);
      hasStartedTracked.current = true;
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EarlyAccessFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email.';
    }
    if (!formData.creatorType) newErrors.creatorType = 'Select your creator type.';
    if (!formData.monthlyVideos) newErrors.monthlyVideos = 'Select your monthly volume.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === 'loading' || formState === 'success') return;
    if (!validate()) return;

    setFormState('loading');
    setErrorMessage('');

    const result = await submitEarlyAccess(formData);

    if (result.success) {
      setFormState('success');
      trackEvent(EVENTS.EARLY_ACCESS_SUBMITTED, {
        creatorType: formData.creatorType,
        monthlyVideos: formData.monthlyVideos,
      });
    } else {
      setFormState('error');
      setErrorMessage(result.error || 'Something went wrong.');
    }
  };

  const handleFeedbackClick = () => {
    trackEvent(EVENTS.FEEDBACK_CALL_CLICKED);
  };

  if (formState === 'success') {
    return (
      <section
        id="early-access"
        className="section-padding"
        style={{ position: 'relative' }}
      >
        <div className="section-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div className="glass" style={{ padding: '48px 32px', borderRadius: 'var(--radius-xl)' }}>
            <CheckCircle2 size={48} style={{ color: 'var(--color-green)', marginBottom: '20px' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>
              You&apos;re on the list!
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
              We&apos;ll reach out when your early-access slot is ready. Thanks for being one of the first.
            </p>
            <a
              href={brand.feedbackCallUrl}
              onClick={handleFeedbackClick}
              className="btn-secondary"
              style={{ display: 'inline-flex' }}
            >
              <Calendar size={16} />
              Book a 10-minute feedback chat
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="early-access"
      ref={ref}
      className="section-padding"
      style={{ position: 'relative' }}
    >
      {/* Background */}
      <div
        className="glow-orb"
        style={{
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)',
          top: '10%', left: '50%', transform: 'translateX(-50%)',
        }}
        aria-hidden="true"
      />

      <div className="section-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        {/* Eyebrow */}
        <div
          className="section-eyebrow"
          style={{
            marginBottom: '20px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-green)', display: 'inline-block' }} />
          Limited spots
        </div>

        <h2
          className="section-title"
          style={{
            marginBottom: '12px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          }}
        >
          Get <span className="text-gradient-primary">early access</span>
        </h2>

        <p
          className="section-subtitle"
          style={{
            margin: '0 auto 40px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
          }}
        >
          {brand.earlyAccessNote}
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="glass"
          style={{
            padding: '36px 28px',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            textAlign: 'left',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
          }}
          noValidate
        >
          {/* Name */}
          <div>
            <label htmlFor="form-name" className="form-label">Name *</label>
            <input
              id="form-name"
              type="text"
              className="form-input"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              autoComplete="name"
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="form-email" className="form-label">Email *</label>
            <input
              id="form-email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              autoComplete="email"
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          {/* WhatsApp (optional) */}
          <div>
            <label htmlFor="form-whatsapp" className="form-label">WhatsApp (optional)</label>
            <input
              id="form-whatsapp"
              type="tel"
              className="form-input"
              placeholder="+91 98765 43210"
              value={formData.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              autoComplete="tel"
            />
          </div>

          {/* Creator Type */}
          <div>
            <label htmlFor="form-creator-type" className="form-label">What type of creator are you? *</label>
            <select
              id="form-creator-type"
              className="form-select"
              value={formData.creatorType}
              onChange={(e) => handleChange('creatorType', e.target.value)}
            >
              <option value="">Select…</option>
              {creatorTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.creatorType && <div className="form-error">{errors.creatorType}</div>}
          </div>

          {/* Monthly Videos */}
          <div>
            <label htmlFor="form-monthly-videos" className="form-label">How many videos per month? *</label>
            <select
              id="form-monthly-videos"
              className="form-select"
              value={formData.monthlyVideos}
              onChange={(e) => handleChange('monthlyVideos', e.target.value)}
            >
              <option value="">Select…</option>
              {videoVolumes.map((vol) => (
                <option key={vol} value={vol}>{vol} videos</option>
              ))}
            </select>
            {errors.monthlyVideos && <div className="form-error">{errors.monthlyVideos}</div>}
          </div>

          {/* Error message */}
          {formState === 'error' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              background: 'rgba(90,90,90,0.08)',
              border: '1px solid rgba(90,90,90,0.2)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              color: '#5A5A5A',
            }}>
              <AlertCircle size={16} />
              {errorMessage}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary"
            disabled={formState === 'loading'}
            style={{
              width: '100%',
              opacity: formState === 'loading' ? 0.7 : 1,
              cursor: formState === 'loading' ? 'not-allowed' : 'pointer',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {formState === 'loading' ? (
                <>
                  <Loader2 size={18} className="animate-spin-slow" style={{ animationDuration: '1s' }} />
                  Submitting…
                </>
              ) : (
                <>
                  <Send size={16} />
                  Join Early Access
                </>
              )}
            </span>
          </button>

          {/* Privacy */}
          <p style={{
            fontSize: '0.72rem',
            color: 'var(--text-dim)',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}>
            <Shield size={12} />
            We won&apos;t share your info. Unsubscribe anytime.
          </p>
        </form>

        {/* Feedback Call Link */}
        <div style={{ marginTop: '24px' }}>
          <a
            href={brand.feedbackCallUrl}
            onClick={handleFeedbackClick}
            className="btn-secondary"
            style={{ display: 'inline-flex' }}
          >
            <Calendar size={16} />
            Book a 10-minute feedback chat
          </a>
          {/* TODO: CONNECT — Replace with your Calendly/Cal.com URL */}
        </div>
      </div>
    </section>
  );
}
