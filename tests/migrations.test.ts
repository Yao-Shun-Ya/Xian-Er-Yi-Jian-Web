import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createDatabase } from '../lib/server/db-core';
import { getPendingMigrations, runMigrations } from '../lib/server/migrations';

const migrationsDir = path.join(process.cwd(), 'db', 'migrations');

test('迁移可以重复执行且具备幂等性', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'xeyj-migrations-'));
  const database = createDatabase(path.join(tempDir, 'test.db'));

  try {
    assert.deepEqual(
      getPendingMigrations(database, migrationsDir).map((migration) => migration.version),
      ['0001_init'],
    );

    assert.deepEqual(runMigrations(database, migrationsDir), ['0001_init']);
    assert.deepEqual(runMigrations(database, migrationsDir), []);

    const row = database
      .prepare<[], { count: number }>('SELECT COUNT(*) AS count FROM schema_migrations')
      .get();
    assert.equal(row?.count, 1);

    const columns = database
      .prepare<[], { name: string; type: string }>('PRAGMA table_info(feedbacks)')
      .all();
    assert.ok(columns.some((column) => column.name === 'created_at' && column.type === 'INTEGER'));
    assert.ok(columns.some((column) => column.name === 'id' && column.type === 'INTEGER'));
  } finally {
    database.close();
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
