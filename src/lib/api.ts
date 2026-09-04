// ============================================================
// Octova — API Client
// ============================================================
// Waitlist form submission and backend integration.
// Currently uses a dev-mode fallback that logs to console.
// ============================================================

import type { EarlyAccessFormData, FormSubmissionResult } from '@/types';
import { brand } from '@/config/brand';

/**
 * Submit early-access form data to the backend.
 *
 * TODO: CONNECT — Supabase Integration
 * Replace the fallback below with a real Supabase insert:
 *
 * ```ts
 * import { createClient } from '@supabase/supabase-js';
 * const supabase = createClient(
 *   process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
 * );
 *
 * const { error } = await supabase
 *   .from('early_access')
 *   .insert([data]);
 * ```
 */
export async function submitEarlyAccess(
  data: EarlyAccessFormData
): Promise<FormSubmissionResult> {
  const endpoint = brand.formEndpoint;

  try {
    // TODO: CONNECT — Uncomment when backend is ready
    // const response = await fetch(endpoint, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // if (!response.ok) throw new Error('Server error');
    // return await response.json();

    // ---- DEV FALLBACK ----
    console.warn(
      `[DEV] Form submitted but no backend connected.\n` +
        `Endpoint: ${endpoint}\n` +
        `Data:`,
      data
    );

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      success: true,
      message: "You're on the list. We'll reach out when your early-access slot is ready.",
    };
  } catch (error) {
    console.error('[API] Early access submission failed:', error);
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    };
  }
}
