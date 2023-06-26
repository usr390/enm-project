BEGIN;
CREATE TABLE enmevents (
	id SERIAL PRIMARY KEY,
	name TEXT,
    address TEXT,
	priceOfEntry INTEGER,
    city TEXT,
    state TEXT,
    country TEXT,
    time TIMESTAMP WITH TIME ZONE,
    startTime INTEGER,
    endTime INTEGER,
    day INTEGER,
    month INTEGER,
    year INTEGER
);
UPDATE enmevents SET time = current_timestamp AT TIME ZONE 'UTC';
COMMIT;