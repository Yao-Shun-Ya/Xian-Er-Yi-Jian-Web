'use client';

import { useActionState } from 'react';
import { login } from '@/app/actions/auth';
import type { LoginState } from '@/lib/shared/types';

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {
    error: '',
  });

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* 背景氛围光 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-md w-full bg-[#0A101F] border border-white/10 p-10 rounded-[2rem] shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">系统授权访问</h1>
          <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">XianErYiJian Terminal Access</p>
        </div>

        <form action={formAction} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">管理员授权码</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="h-12 rounded-xl border border-white/5 bg-black/40 px-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-center tracking-[0.5em]"
            />
          </div>

          {state.error && (
            <p className="text-red-500 text-xs text-center font-medium animate-shake">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="group relative w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] overflow-hidden disabled:cursor-wait disabled:opacity-70"
          >
            {pending ? '正在验证…' : '验证并进入系统'}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-slate-700 font-mono tracking-widest uppercase">
            Restricted Area · Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}
