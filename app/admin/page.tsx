'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { deleteFeedback, getFeedbacks, markAsRead } from '@/app/actions/admin/feedback';
import { logout } from '@/app/actions/auth';
import type { FeedbackDTO } from '@/lib/shared/types';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { LanguageToggle } from '@/components/i18n/LanguageToggle';
import { useI18n } from '@/lib/i18n/provider';

export default function AdminDashboard() {
  const { t } = useI18n();
  const [feedbacks, setFeedbacks] = useState<FeedbackDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getFeedbacks();
      if (!result.ok) {
        setLoadError(result.error);
        setFeedbacks([]);
        return;
      }

      setLoadError('');
      setFeedbacks(result.data);
    } catch {
      setLoadError('加载数据库失败');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleMarkAsRead = async (id: number) => {
    const result = await markAsRead(id);
    if (!result.ok) {
      alert('更新状态失败：' + result.error);
      return;
    }
    await loadData();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('确定要永久删除这条反馈记录吗？')) {
      return;
    }

    const result = await deleteFeedback(id);
    if (!result.ok) {
      alert('删除失败：' + result.error);
      return;
    }
    await loadData();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30 flex flex-col">
      
      {/* 主体内容容器 */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-12 relative z-10 flex flex-col">
        
        {/* ==========================================
            1. 后台头部 (Header)
            ========================================== */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">{t("admin.title")}</h1>
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20 rounded uppercase">
                Secure Terminal
              </span>
            </div>
            <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
              XianErYiJian / MGD Feedback Intelligence Center
            </p>
          </div>
          
          <div className="flex gap-4 items-start">
            <LanguageToggle />
            <ThemeToggle />
            <form action={logout}>
              <button
                type="submit"
                className="px-5 py-3 bg-[#0A101F] border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:border-white/20 transition-colors"
              >
                {t("admin.logout")}
              </button>
            </form>
            <div className="px-6 py-3 bg-[#0A101F] border border-white/5 rounded-2xl flex flex-col items-center">
              <span className="text-xs text-slate-500 uppercase font-bold">{t("admin.total")}</span>
              <span className="text-2xl font-black text-white">{feedbacks.length}</span>
            </div>
            <div className="px-6 py-3 bg-[#0A101F] border border-white/5 rounded-2xl flex flex-col items-center">
              <span className="text-xs text-slate-500 uppercase font-bold">{t("admin.unread")}</span>
              <span className="text-2xl font-black text-blue-500">
                {feedbacks.filter(f => !f.isRead).length}
              </span>
            </div>
          </div>
        </header>

        {/* ==========================================
            2. 数据表格区 (Data Grid)
            ========================================== */}
        <div className="relative group mb-20">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-[2rem] blur-xl opacity-50"></div>
          
          <div className="relative bg-[#0A101F]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    <th className="p-6">Status</th>
                    <th className="p-6">Timestamp</th>
                    <th className="p-6">Origin</th>
                    <th className="p-6">Contact Info</th>
                    <th className="p-6 w-1/3">Clinical Message</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="p-20 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                        <p className="mt-4 text-slate-500 font-mono text-xs italic">Synchronizing with SQLite...</p>
                      </td>
                    </tr>
                  ) : feedbacks.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-20 text-center text-slate-500 font-mono italic">
                        {loadError ? `加载失败：${loadError}` : 'No feedback records found in database.'}
                      </td>
                    </tr>
                  ) : (
                    feedbacks.map((fb) => (
                      <tr 
                        key={fb.id} 
                        className={`group transition-all duration-300 ${fb.isRead ? 'opacity-40 grayscale-[0.5]' : 'bg-blue-500/[0.02]'}`}
                      >
                        <td className="p-6 text-xs">
                          {fb.isRead ? (
                            <span className="px-2 py-1 bg-slate-800 text-slate-500 rounded font-bold uppercase">Archive</span>
                          ) : (
                            <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded font-bold uppercase animate-pulse">New</span>
                          )}
                        </td>
                        <td className="p-6 text-xs font-mono text-slate-500">{fb.date}</td>
                        <td className="p-6">
                          <p className="text-white font-bold text-sm">{fb.name}</p>
                        </td>
                        <td className="p-6 text-xs font-mono text-cyan-400">{fb.contact}</td>
                        <td className="p-6">
                          <p className="text-slate-300 text-sm leading-relaxed max-w-md">{fb.message}</p>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!fb.isRead && (
                              <button 
                                onClick={() => handleMarkAsRead(fb.id)}
                                className="text-blue-400 hover:text-white text-[10px] font-black uppercase tracking-widest"
                              >
                                Mark Read
                              </button>
                            )}
                            <button 
                              onClick={() => handleDelete(fb.id)}
                              className="text-red-900 hover:text-red-500 text-[10px] font-black uppercase tracking-widest"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}