// 文件路径：lib/db.ts
import Database from 'better-sqlite3';
import path from 'path';

// 数据库文件会保存在项目根目录下
const dbPath = path.join(process.cwd(), 'xianeryijian.db');
const db = new Database(dbPath);

// 初始化建表逻辑：如果表不存在则自动创建
db.exec(`
  CREATE TABLE IF NOT EXISTS feedbacks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    contact TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT NOT NULL,
    isRead INTEGER DEFAULT 0
  )
`);

export default db;