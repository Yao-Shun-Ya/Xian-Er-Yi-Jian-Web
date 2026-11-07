'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { checkRateLimit } from '@/lib/server/rate-limit';
import { feedbackRepository } from '@/lib/server/repositories/feedback';
import { getClientIp } from '@/lib/server/request';
import { validateFeedbackInput } from '@/lib/server/validation/feedback';

const FEEDBACK_LIMIT = 5;
const FEEDBACK_WINDOW_MS = 10 * 60 * 1000;

export async function submitFeedback(input: unknown): Promise<{ success: true }> {
  const requestHeaders = await headers();
  const clientIp = getClientIp(requestHeaders);
  const rateLimit = checkRateLimit(
    `feedback:${clientIp}`,
    FEEDBACK_LIMIT,
    FEEDBACK_WINDOW_MS,
  );

  if (!rateLimit.allowed) {
    throw new Error('提交过于频繁，请稍后再试');
  }

  const validation = validateFeedbackInput(input);
  if (!validation.success) {
    throw new Error(validation.error);
  }

  feedbackRepository.create(validation.data);
  revalidatePath('/admin');
  return { success: true };
}
