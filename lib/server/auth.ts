import 'server-only';

import { timingSafeEqual } from 'node:crypto';
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

  const providedBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);
  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
}
