import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

export function resolveDatabasePath(): string {
  const configured = process.env.DATABASE_PATH?.trim() || 'xianeryijian.db';
  return path.isAbsolute(configured)
    ? configured
    : path.resolve(/* turbopackIgnore: true */ process.cwd(), configured);
}

export function createDatabase(databasePath = resolveDatabasePath()): Database.Database {
  fs.mkdirSync(path.dirname(/* turbopackIgnore: true */ databasePath), { recursive: true });

  const database = new Database(databasePath);
  database.pragma('journal_mode = WAL');
  database.pragma('synchronous = NORMAL');
  database.pragma('busy_timeout = 5000');
  database.pragma('foreign_keys = ON');
  return database;
}
