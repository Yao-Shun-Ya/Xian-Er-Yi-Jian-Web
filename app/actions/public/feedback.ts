'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { checkRateLimit } from '@/lib/server/rate-limit';
import { feedbackRepository } from '@/lib/server/repositories/feedback';
import { getClientIp } from '@/lib/server/request';
import { validateFeedbackInput } from '@/lib/server/validation/feedback';

const FEEDBACK_LIMIT = 5;
const FEEDBACK_WINDOW_MS = 10 * 60 * 1000;

export type SubmitFeedbackResult = { success: true } | { success: false; error: string };

export async function submitFeedback(input: unknown): Promise<SubmitFeedbackResult> {
  const requestHeaders = await headers();
  const clientIp = getClientIp(requestHeaders);
  const rateLimit = checkRateLimit(
    `feedback:${clientIp}`,
    FEEDBACK_LIMIT,
    FEEDBACK_WINDOW_MS,
  );

  // 用返回值而不是 throw：生产环境 Next 会把未捕获异常掩码成 digest，
  // 用户永远看不到「提交过于频繁」这类可操作的提示
  if (!rateLimit.allowed) {
    return { success: false, error: '提交过于频繁，请稍后再试' };
  }

  const validation = validateFeedbackInput(input);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }

  feedbackRepository.create(validation.data);
  revalidatePath('/admin');
  return { success: true };
}
