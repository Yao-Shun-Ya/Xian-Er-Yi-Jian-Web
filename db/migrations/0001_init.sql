DROP TABLE IF EXISTS feedbacks;

CREATE TABLE feedbacks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL CHECK(length(name) BETWEEN 1 AND 100),
  contact TEXT NOT NULL CHECK(length(contact) BETWEEN 1 AND 200),
  message TEXT NOT NULL CHECK(length(message) BETWEEN 1 AND 2000),
  created_at INTEGER NOT NULL,
  is_read INTEGER NOT NULL DEFAULT 0 CHECK(is_read IN (0, 1))
);

CREATE INDEX idx_feedbacks_read_created
  ON feedbacks(is_read, created_at DESC);
