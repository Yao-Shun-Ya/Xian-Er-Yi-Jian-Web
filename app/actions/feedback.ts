'use server'; // 确保这行在文件最顶部！

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function submitFeedback(data: { name: string; contact: string; message: string }) {
  // 加上这一行：打印前端传来的数据
  console.log("🚀 [后端已触发] 收到前端传来的表单数据：", data); 
  
  try {
    const stmt = db.prepare('INSERT INTO feedbacks (id, name, contact, message, date, isRead) VALUES (?, ?, ?, ?, ?, ?)');
    stmt.run(Date.now().toString(), data.name, data.contact, data.message, new Date().toLocaleString(), 0);
    
    revalidatePath('/admin'); 
    return { success: true };
  } catch (error) {
    // 加上这一行：如果存入数据库失败，打印错误原因
    console.error("❌ [数据库报错] 插入数据失败：", error);
    throw error;
  }
}

// 2. 获取所有反馈 (供后台控制台调用)
export async function getFeedbacks() {
  const stmt = db.prepare('SELECT * FROM feedbacks ORDER BY date DESC');
  // better-sqlite3 返回的数据直接就是对象数组
  return stmt.all() as any[]; 
}

// 3. 标记为已读
export async function markAsRead(id: string) {
  db.prepare('UPDATE feedbacks SET isRead = 1 WHERE id = ?').run(id);
  revalidatePath('/admin');
}

// 4. 删除反馈
export async function deleteFeedback(id: string) {
  db.prepare('DELETE FROM feedbacks WHERE id = ?').run(id);
  revalidatePath('/admin');
}