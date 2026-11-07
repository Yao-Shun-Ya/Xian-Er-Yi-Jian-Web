export const SESSION_COOKIE = 'xeyj_session';
export const SESSION_MAX_AGE = 60 * 60 * 8;

export interface SessionPayload {
  sub: 'admin';
  iat: number;
  exp: number;
}

export type AdminAuthResult =
  | { ok: true; session: SessionPayload }
  | { ok: false; status: 401 | 403; error: string };

function getSessionSecret(): string | null {
  const secret = process.env.SESSION_SECRET?.trim();
  return secret && secret.length >= 32 ? secret : null;
}

export function isSessionConfigured(): boolean {
  return getSessionSecret() !== null;
}

function toBase64Url(value: string): string {
  return btoa(value)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64Url(value: string): string {
  const padding = value.length % 4 === 0 ? '' : '='.repeat(4 - (value.length % 4));
  return atob(value.replace(/-/g, '+').replace(/_/g, '/') + padding);
}

function bytesToBase64Url(bytes: ArrayBuffer): string {
  let binary = '';
  const view = new Uint8Array(bytes);
  for (const byte of view) {
    binary += String.fromCharCode(byte);
  }
  return toBase64Url(binary);
}

function base64UrlToBytes(value: string): Uint8Array<ArrayBuffer> {
  const binary = fromBase64Url(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function getSigningKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

export async function createSessionToken(now = Date.now()): Promise<string> {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error('SESSION_SECRET is not configured');
  }

  const payload: SessionPayload = {
    sub: 'admin',
    iat: now,
    exp: now + SESSION_MAX_AGE * 1000,
  };
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = await crypto.subtle.sign(
    'HMAC',
    await getSigningKey(secret),
    new TextEncoder().encode(encodedPayload),
  );

  return `${encodedPayload}.${bytesToBase64Url(signature)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) {
    return null;
  }

  const [encodedPayload, encodedSignature] = token.split('.');
  if (!encodedPayload || !encodedSignature) {
    return null;
  }

  const secret = getSessionSecret();
  if (!secret) {
    return null;
  }

  try {
    const valid = await crypto.subtle.verify(
      'HMAC',
      await getSigningKey(secret),
      base64UrlToBytes(encodedSignature),
      new TextEncoder().encode(encodedPayload),
    );
    if (!valid) {
      return null;
    }

    const payload = JSON.parse(fromBase64Url(encodedPayload)) as Partial<SessionPayload>;
    if (
      payload.sub !== 'admin' ||
      typeof payload.iat !== 'number' ||
      typeof payload.exp !== 'number' ||
      payload.exp <= Date.now()
    ) {
      return null;
    }

    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function authorizeAdminToken(
  token: string | undefined,
): Promise<AdminAuthResult> {
  const session = await verifySessionToken(token);
  if (!session) {
    return { ok: false, status: 401, error: 'Unauthorized' };
  }
  if (session.sub !== 'admin') {
    return { ok: false, status: 403, error: 'Forbidden' };
  }
  return { ok: true, session };
}
