import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createDatabase } from '../lib/server/db-core';
import { runMigrations } from '../lib/server/migrations';
import { createFeedbackRepository } from '../lib/server/repositories/feedback-core';

test('repository 支持创建、读取、标记已读与删除', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'xeyj-repo-'));
  const database = createDatabase(path.join(tempDir, 'test.db'));

  try {
    runMigrations(database, path.join(process.cwd(), 'db', 'migrations'));
    const repository = createFeedbackRepository(database);

    const created = repository.create({
      name: '张三',
      contact: '13800000000',
      message: '希望增加导出功能。',
    });
    assert.equal(created.id, 1);
    assert.equal(created.isRead, false);
    assert.equal(created.name, '张三');

    const list = repository.list();
    assert.equal(list.length, 1);
    assert.equal(list[0]?.id, created.id);

    assert.equal(repository.markAsRead(created.id), true);
    assert.equal(repository.list()[0]?.isRead, true);

    assert.equal(repository.delete(created.id), true);
    assert.equal(repository.list().length, 0);
  } finally {
    database.close();
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
