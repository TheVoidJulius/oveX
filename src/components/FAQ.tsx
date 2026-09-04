'use client';

import { useState, useRef, useEffect } from 'react';
import { faqItems } from '@/config/content';
import { trackEvent, EVENTS } from '@/lib/analytics';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  const handleToggle = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);
    
    if (isOpening) {
      trackEvent(EVENTS.FAQ_OPENED, { question: faqItems[index].question });
    }
  };

  return (
    <section
      id="faq"
      ref={ref}
      className="section-padding"
      style={{ position: 'relative' }}
    >
      <div className="section-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            className="section-eyebrow"
            style={{
              marginBottom: '20px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <MessageCircleQuestion size={14} />
            Questions & Answers
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
            Frequently <span className="text-gradient-primary">asked</span>
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  transition: 'background var(--duration-normal), border-color var(--duration-normal), box-shadow var(--duration-normal)',
                  background: 'var(--bg-surface)',
                  border: '3px solid var(--ink)',
                  boxShadow: isOpen ? '5px 5px 0px var(--accent-2)' : 'none',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: visible ? `${0.2 + i * 0.08}s` : '0s',
                }}
              >
                <button
                  onClick={() => handleToggle(i)}
                  style={{
                    width: '100%',
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'var(--text-primary)',
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    style={{
                      color: isOpen ? 'var(--color-cyan)' : 'var(--text-muted)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--duration-normal), color var(--duration-normal)',
                      flexShrink: 0,
                    }}
                  />
                </button>
                
                <div
                  style={{
                    maxHeight: isOpen ? '500px' : '0',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease',
                    padding: isOpen ? '0 24px 24px 24px' : '0 24px',
                  }}
                >
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
