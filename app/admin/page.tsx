'use client';

import React, { useEffect, useState } from 'react';
import { getFeedbacks, markAsRead, deleteFeedback } from '@/app/actions/feedback';

interface Feedback {
  id: string;
  name: string;
  contact: string;
  message: string;
  date: string;
  isRead: number;
}

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getFeedbacks();
      setFeedbacks(data as Feedback[]);
    } catch (error) {
      console.error("加载数据库失败:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      await loadData();
    } catch (error) {
      alert("更新状态失败");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("确定要永久删除这条反馈记录吗？")) {
      try {
        await deleteFeedback(id);
        await loadData();
      } catch (error) {
        alert("删除失败");
      }
    }
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
              <h1 className="text-3xl font-bold text-white tracking-tight">管理控制台</h1>
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20 rounded uppercase">
                Secure Terminal
              </span>
            </div>
            <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
              XianErYiJian / MGD Feedback Intelligence Center
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-[#0A101F] border border-white/5 rounded-2xl flex flex-col items-center">
              <span className="text-xs text-slate-500 uppercase font-bold">总计反馈</span>
              <span className="text-2xl font-black text-white">{feedbacks.length}</span>
            </div>
            <div className="px-6 py-3 bg-[#0A101F] border border-white/5 rounded-2xl flex flex-col items-center">
              <span className="text-xs text-slate-500 uppercase font-bold">待处理</span>
              <span className="text-2xl font-black text-blue-500">
                {feedbacks.filter(f => f.isRead === 0).length}
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
                        No feedback records found in database.
                      </td>
                    </tr>
                  ) : (
                    feedbacks.map((fb) => (
                      <tr 
                        key={fb.id} 
                        className={`group transition-all duration-300 ${fb.isRead === 1 ? 'opacity-40 grayscale-[0.5]' : 'bg-blue-500/[0.02]'}`}
                      >
                        <td className="p-6 text-xs">
                          {fb.isRead === 1 ? (
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
                            {fb.isRead === 0 && (
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

      {/* ==========================================
          3. 底部版权与状态 (同步主页风格)
          ========================================== */}
      <footer className="relative py-12 bg-[#0A101F] border-t border-white/5 overflow-hidden mt-auto">
        {/* 页脚内的自适应巨型水印 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none px-4">
          <h2 className="text-[8vw] md:text-[5.5vw] font-black tracking-[0.05em] whitespace-nowrap text-white leading-none">
            XIANERYIJIAN PROJECT
          </h2>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} Imaging Class One · Terminal v1.0.4
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.2em]">
                Database: SQLite (better-sqlite3) · Local Persistence
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}