import fs from 'node:fs';
import path from 'node:path';
import type Database from 'better-sqlite3';

interface MigrationFile {
  version: string;
  sql: string;
}

const MIGRATIONS_DIR = path.join(process.cwd(), 'db', 'migrations');

export function ensureMigrationsTable(database: Database.Database): void {
  database.exec(
    `CREATE TABLE IF NOT EXISTS schema_migrations (
       version TEXT PRIMARY KEY,
       applied_at INTEGER NOT NULL
     )`,
  );
}

function getMigrationFiles(migrationsDir: string): MigrationFile[] {
  if (!fs.existsSync(migrationsDir)) {
    return [];
  }

  return fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql'))
    .sort()
    .map((file) => ({
      version: file.slice(0, -'.sql'.length),
      sql: fs.readFileSync(path.join(migrationsDir, file), 'utf8'),
    }));
}

function getAppliedVersions(database: Database.Database): Set<string> {
  ensureMigrationsTable(database);
  const rows = database
    .prepare<[], { version: string }>('SELECT version FROM schema_migrations')
    .all();
  return new Set(rows.map((row) => row.version));
}

export function getPendingMigrations(
  database: Database.Database,
  migrationsDir = MIGRATIONS_DIR,
): MigrationFile[] {
  const applied = getAppliedVersions(database);
  return getMigrationFiles(migrationsDir).filter(
    (migration) => !applied.has(migration.version),
  );
}

export function runMigrations(
  database: Database.Database,
  migrationsDir = MIGRATIONS_DIR,
): string[] {
  const applied = getAppliedVersions(database);
  const insertVersion = database.prepare<[string, number]>(
    'INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?)',
  );
  const appliedNow: string[] = [];

  for (const migration of getMigrationFiles(migrationsDir)) {
    if (applied.has(migration.version)) {
      continue;
    }

    const apply = database.transaction(() => {
      database.exec(migration.sql);
      insertVersion.run(migration.version, Date.now());
    });
    apply();

    applied.add(migration.version);
    appliedNow.push(migration.version);
  }

  return appliedNow;
}
