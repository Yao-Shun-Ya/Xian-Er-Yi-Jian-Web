import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/lib/server/session';

// Next 16 已将 middleware 文件约定重命名为 proxy（官方 codemod 仅改文件名与函数名，行为等价）。
// 这里只做 /admin 的第一道拦截：检查会话 Cookie 是否存在。
// 注意不要在 proxy 里做签名校验——proxy 运行于 edge runtime，Next 会在构建期把
// process.env.SESSION_SECRET 内联进 bundle；一旦构建机与运行机的环境变量不一致，
// 已登录用户会被永久弹回 /login（可用性 bug）。真正的签名校验由管理类 Server Action
// 内部的 requireAdmin()（Node runtime，运行期读取 env）承担。
export async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
