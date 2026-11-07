import type Database from 'better-sqlite3';
import type { FeedbackCreateInput, FeedbackDTO } from '../../shared/types';

interface FeedbackRow {
  id: number;
  name: string;
  contact: string;
  message: string;
  createdAt: number;
  isRead: number;
}

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

function toDto(row: FeedbackRow): FeedbackDTO {
  return {
    id: row.id,
    name: row.name,
    contact: row.contact,
    message: row.message,
    createdAt: row.createdAt,
    date: dateFormatter.format(new Date(row.createdAt)),
    isRead: row.isRead === 1,
  };
}

export interface FeedbackRepository {
  create(input: FeedbackCreateInput): FeedbackDTO;
  list(): FeedbackDTO[];
  markAsRead(id: number): boolean;
  delete(id: number): boolean;
}

export function createFeedbackRepository(database: Database.Database): FeedbackRepository {
  const insert = database.prepare<[string, string, string, number]>(
    'INSERT INTO feedbacks (name, contact, message, created_at, is_read) VALUES (?, ?, ?, ?, 0)',
  );
  const selectAll = database.prepare<[], FeedbackRow>(
    `SELECT id, name, contact, message, created_at AS createdAt, is_read AS isRead
     FROM feedbacks
     ORDER BY created_at DESC`,
  );
  const selectOne = database.prepare<[number], FeedbackRow>(
    `SELECT id, name, contact, message, created_at AS createdAt, is_read AS isRead
     FROM feedbacks
     WHERE id = ?`,
  );
  const markRead = database.prepare<[number]>(
    'UPDATE feedbacks SET is_read = 1 WHERE id = ?',
  );
  const remove = database.prepare<[number]>('DELETE FROM feedbacks WHERE id = ?');

  return {
    create(input) {
      const result = insert.run(input.name, input.contact, input.message, Date.now());
      const created = selectOne.get(Number(result.lastInsertRowid));
      if (!created) {
        throw new Error('Failed to load created feedback');
      }
      return toDto(created);
    },
    list() {
      return selectAll.all().map(toDto);
    },
    markAsRead(id) {
      return markRead.run(id).changes > 0;
    },
    delete(id) {
      return remove.run(id).changes > 0;
    },
  };
}
