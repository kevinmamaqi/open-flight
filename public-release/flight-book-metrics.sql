CREATE TABLE IF NOT EXISTS flight_book_daily (
  day TEXT NOT NULL,
  event TEXT NOT NULL CHECK (event IN ('home', 'book', 'download', 'paid')),
  count INTEGER NOT NULL CHECK (count > 0),
  PRIMARY KEY (day, event)
);

CREATE TABLE IF NOT EXISTS flight_book_paid_receipts (
  hash TEXT PRIMARY KEY NOT NULL CHECK (length(hash) = 64),
  day TEXT NOT NULL
);

CREATE TRIGGER IF NOT EXISTS flight_book_paid_counter
AFTER INSERT ON flight_book_paid_receipts
BEGIN
  INSERT INTO flight_book_daily (day, event, count) VALUES (NEW.day, 'paid', 1)
  ON CONFLICT(day, event) DO UPDATE SET count = count + 1;
END;
