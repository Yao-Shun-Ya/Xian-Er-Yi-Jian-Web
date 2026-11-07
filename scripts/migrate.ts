import { backupDatabase } from '../lib/server/backup-core';
import { createDatabase, resolveDatabasePath } from '../lib/server/db-core';
import { getPendingMigrations, runMigrations } from '../lib/server/migrations';

async function main(): Promise<void> {
  const databasePath = resolveDatabasePath();
  const database = createDatabase(databasePath);

  try {
    const pending = getPendingMigrations(database);
    if (pending.length === 0) {
      console.log('No pending migrations.');
      return;
    }

    const backupPath = await backupDatabase(database, databasePath);
    console.log(`Backup created: ${backupPath}`);

    const applied = runMigrations(database);
    console.log(`Applied migrations: ${applied.join(', ')}`);
  } finally {
    database.close();
  }
}

main().catch((error: unknown) => {
  console.error('Migration failed:', error instanceof Error ? error.message : error);
  process.exit(1);
});
