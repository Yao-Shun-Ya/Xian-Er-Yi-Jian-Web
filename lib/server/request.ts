export interface HeaderReader {
  get(name: string): string | null;
}

export function getClientIp(headers: HeaderReader): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const firstAddress = forwarded.split(',')[0]?.trim();
    if (firstAddress) {
      return firstAddress;
    }
  }

  return headers.get('x-real-ip')?.trim() || 'unknown';
}
