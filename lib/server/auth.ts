import 'server-only';

import { createHash, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { authorizeAdminToken, SESSION_COOKIE } from './session';

export async function requireAdmin() {
  const store = await cookies();
  return authorizeAdminToken(store.get(SESSION_COOKIE)?.value);
}

export function isAdminPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD?.trim());
}

export function verifyAdminPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected) {
    return false;
  }

  // 两侧先各自哈希到定长再比较：既消除长度差异分支（长度先比会泄漏口令长度），
  // 又保证 timingSafeEqual 的等长前提。
  const providedDigest = createHash('sha256').update(input, 'utf8').digest();
  const expectedDigest = createHash('sha256').update(expected, 'utf8').digest();
  return timingSafeEqual(providedDigest, expectedDigest);
}
