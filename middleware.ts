import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 只保护以 /admin 开头的路径
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token');

    // 如果没有对应的 Cookie，重定向到登录页
    if (!token || token.value !== 'valid') {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// 配置中间件匹配的路径
export const config = {
  matcher: ['/admin/:path*'],
};