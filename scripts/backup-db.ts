import { backupDatabase } from '../lib/server/backup-core';
import { createDatabase, resolveDatabasePath } from '../lib/server/db-core';

async function main(): Promise<void> {
  const databasePath = resolveDatabasePath();
  const database = createDatabase(databasePath);

  try {
    const backupPath = await backupDatabase(database, databasePath);
    console.log(`Backup created: ${backupPath}`);
  } finally {
    database.close();
  }
}

main().catch((error: unknown) => {
  console.error('Backup failed:', error instanceof Error ? error.message : error);
  process.exit(1);
});
