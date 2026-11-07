'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 只记录错误标识，不输出用户输入或数据库内容。
    console.error('Unhandled application error', error.digest ?? error.name);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] p-6 font-sans text-slate-400">
      <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-slate-900 p-10 text-center shadow-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
          XianErYiJian / System Error
        </p>
        <h1 className="mb-4 text-2xl font-bold text-white">页面暂时无法加载</h1>
        <p className="mb-8 text-sm leading-relaxed text-slate-400">
          系统遇到了未预期的错误。请稍后重试；如果问题持续存在，请联系管理员。
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
        >
          重新加载
        </button>
      </div>
    </div>
  );
}
