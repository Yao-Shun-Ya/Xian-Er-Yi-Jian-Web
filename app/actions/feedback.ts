'use server';

import { submitFeedback as submitFeedbackAction } from './public/feedback';

/**
 * 兼容旧调用路径：components/sections/home/feedback-section.tsx 仍从这里导入。
 * 真正的实现与校验位于 app/actions/public/feedback.ts。
 */
export async function submitFeedback(input: unknown) {
  return submitFeedbackAction(input);
}
