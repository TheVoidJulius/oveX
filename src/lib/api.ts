// ============================================================
// Octova — API Client
// ============================================================
// Waitlist form submission and backend integration.
// The backend is not connected yet, so submissions fail closed.
// ============================================================

import type { EarlyAccessFormData, FormSubmissionResult } from '@/types';

/**
 * Do not claim a signup succeeded until a real submission endpoint is connected.
 */
export async function submitEarlyAccess(
  _data: EarlyAccessFormData
): Promise<FormSubmissionResult> {
  return {
    success: false,
    error: 'Early access signup is not connected yet. Your information was not sent.',
  };
}
