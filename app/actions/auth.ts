'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { LoginState } from '@/lib/shared/types';
import { isAdminPasswordConfigured, verifyAdminPassword } from '@/lib/server/auth';
import { checkRateLimit } from '@/lib/server/rate-limit';
import { getClientIp } from '@/lib/server/request';
import {
  createSessionToken,
  isSessionConfigured,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from '@/lib/server/session';

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function login(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const requestHeaders = await headers();
  const clientIp = getClientIp(requestHeaders);
  const rateLimit = checkRateLimit(`login:${clientIp}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);

  if (!rateLimit.allowed) {
    return {
      error: `尝试次数过多，请 ${rateLimit.retryAfterSeconds} 秒后再试`,
    };
  }

  if (!isAdminPasswordConfigured()) {
    return { error: '服务端未配置管理员口令，请联系部署管理员' };
  }

  if (!isSessionConfigured()) {
    return { error: '服务端未配置会话密钥，请联系部署管理员' };
  }

  const password = formData.get('password');
  if (typeof password !== 'string' || !verifyAdminPassword(password)) {
    return { error: '授权代码错误，请核实身份' };
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });

  redirect('/admin');
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect('/login');
}
