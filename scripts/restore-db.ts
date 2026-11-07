import fs from 'node:fs';
import path from 'node:path';
import { resolveDatabasePath } from '../lib/server/db-core';

const backupPath = process.argv[2];
const confirmed = process.argv.includes('--yes');

if (!backupPath || !confirmed) {
  console.error(
    'Usage: node --env-file=.env.local scripts/restore-db.ts <backup.db> --yes',
  );
  process.exit(1);
}

if (!fs.existsSync(backupPath)) {
  console.error(`Backup file not found: ${backupPath}`);
  process.exit(1);
}

const databasePath = resolveDatabasePath();
fs.mkdirSync(path.dirname(databasePath), { recursive: true });
fs.copyFileSync(backupPath, databasePath);

for (const suffix of ['-wal', '-shm']) {
  fs.rmSync(`${databasePath}${suffix}`, { force: true });
}

console.log(`Restored ${databasePath} from ${backupPath}`);
