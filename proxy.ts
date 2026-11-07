import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/server/session';

// Next 16 已将 middleware 文件约定重命名为 proxy（官方 codemod 仅改文件名与函数名，行为等价）。
// 这里只做 /admin 的第一道拦截；管理类 Server Action 内部仍必须 requireAdmin()。
export async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  if (!session || session.sub !== 'admin') {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
