'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/server/auth';
import { feedbackRepository } from '@/lib/server/repositories/feedback';
import type { AdminResult, FeedbackDTO } from '@/lib/shared/types';

function parseFeedbackId(value: unknown): number | null {
  return typeof value === 'number' && Number.isInteger(value) && value > 0
    ? value
    : null;
}

export async function getFeedbacks(): Promise<AdminResult<FeedbackDTO[]>> {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return { ok: false, status: auth.status, error: auth.error };
  }

  return { ok: true, data: feedbackRepository.list() };
}

export async function markAsRead(id: number): Promise<AdminResult<null>> {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return { ok: false, status: auth.status, error: auth.error };
  }

  const feedbackId = parseFeedbackId(id);
  if (!feedbackId) {
    return { ok: false, status: 400, error: 'Invalid feedback id' };
  }

  feedbackRepository.markAsRead(feedbackId);
  revalidatePath('/admin');
  return { ok: true, data: null };
}

export async function deleteFeedback(id: number): Promise<AdminResult<null>> {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return { ok: false, status: auth.status, error: auth.error };
  }

  const feedbackId = parseFeedbackId(id);
  if (!feedbackId) {
    return { ok: false, status: 400, error: 'Invalid feedback id' };
  }

  feedbackRepository.delete(feedbackId);
  revalidatePath('/admin');
  return { ok: true, data: null };
}
