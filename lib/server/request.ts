export interface HeaderReader {
  get(name: string): string | null;
}

/**
 * 取限流用的客户端标识。
 *
 * 安全口径：取 x-forwarded-for 的**最后一个**条目（最右侧 = 最近的可信代理写入的
 * 直连地址）。取第一段会被请求方伪造（XFF 可注入），登录/反馈限流可被完全绕过，
 * 甚至可以定向灌满他人的限流桶。直连（无代理）时 XFF 本身不可信，此时回落到
 * x-real-ip / 'unknown'——与取第一段的脆弱性相同，但不会再被"每个请求换一个
 * 伪造 IP"放大。
 */
export function getClientIp(headers: HeaderReader): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const entries = forwarded
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);
    const lastEntry = entries[entries.length - 1];
    if (lastEntry) {
      return lastEntry;
    }
  }

  return headers.get('x-real-ip')?.trim() || 'unknown';
}
