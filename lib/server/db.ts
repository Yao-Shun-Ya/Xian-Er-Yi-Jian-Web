import 'server-only';

import type Database from 'better-sqlite3';
import { createDatabase } from './db-core';

const globalForDb = globalThis as unknown as {
  __xeyjDb?: Database.Database;
  __xeyjCloseRegistered?: boolean;
};

export const db = globalForDb.__xeyjDb ?? createDatabase();

if (!globalForDb.__xeyjDb) {
  globalForDb.__xeyjDb = db;
}

export function closeDb(): void {
  const current = globalForDb.__xeyjDb;
  if (!current) {
    return;
  }

  try {
    current.close();
  } finally {
    delete globalForDb.__xeyjDb;
  }
}

if (!globalForDb.__xeyjCloseRegistered) {
  globalForDb.__xeyjCloseRegistered = true;
  // 注册信号监听后 Node 不会自动退出，因此关闭连接后需要显式 exit。
  const shutdown = () => {
    closeDb();
    process.exit(0);
  };
  process.once('SIGTERM', shutdown);
  process.once('SIGINT', shutdown);
}
