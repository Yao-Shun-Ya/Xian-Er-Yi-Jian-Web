import fs from 'node:fs';
import path from 'node:path';
import type Database from 'better-sqlite3';

export function resolveBackupDir(): string {
  return process.env.DB_BACKUP_DIR?.trim() || path.join(process.cwd(), 'db', 'backups');
}

export async function backupDatabase(
  database: Database.Database,
  databasePath: string,
  backupDir = resolveBackupDir(),
): Promise<string> {
  fs.mkdirSync(backupDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const baseName = path.basename(databasePath, path.extname(databasePath));
  const destination = path.join(backupDir, `${baseName}-${timestamp}.db`);

  await database.backup(destination);
  return destination;
}
