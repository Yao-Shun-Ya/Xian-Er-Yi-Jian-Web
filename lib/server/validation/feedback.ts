import { z } from 'zod';
import type { FeedbackCreateInput } from '../../shared/types';

export const feedbackSchema = z.strictObject({
  name: z.string().trim().min(1, '请填写姓名').max(100, '姓名不能超过 100 个字符'),
  contact: z
    .string()
    .trim()
    .min(1, '请填写联系方式')
    .max(200, '联系方式不能超过 200 个字符'),
  message: z
    .string()
    .trim()
    .min(1, '请填写反馈内容')
    .max(2000, '反馈内容不能超过 2000 个字符'),
});

export type FeedbackValidationResult =
  | { success: true; data: FeedbackCreateInput }
  | { success: false; error: string };

export function validateFeedbackInput(input: unknown): FeedbackValidationResult {
  const result = feedbackSchema.safeParse(input);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message ?? '输入内容不合法',
    };
  }

  return { success: true, data: result.data };
}
