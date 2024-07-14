-- --CREATE users table--

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_type') THEN
    CREATE TYPE user_type AS ENUM ('STUDENT', 'TUTOR', 'ADMIN', 'STAFF', 'NA');
  END IF;
END $$;

DROP TABLE IF EXISTS "staff";
DROP TABLE IF EXISTS "tutor";
DROP TABLE IF EXISTS "student";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "grade";
DROP TABLE IF EXISTS "subject";
DROP TABLE IF EXISTS "classroom";


--USET TABLE DETAILS--
CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL ,
  user_type user_type NOT NULL DEFAULT 'NA',
  created_at timestamptz  DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz  DEFAULT CURRENT_TIMESTAMP 
);

TRUNCATE "user";
CREATE EXTENSION IF NOT EXISTS pgcrypto;
INSERT INTO "user" (username, email, password, user_type) VALUES
('admin', 'admin@gmail.com', crypt('123', gen_salt('bf', 10)), 'ADMIN'), 
('student', 'student@gmail.com', crypt('123', gen_salt('bf', 10)), 'STUDENT'), 
('tutor', 'tutor@gmail.com', crypt('123', gen_salt('bf', 10)), 'TUTOR'),
('staff', 'staff@gmail.com', crypt('123', gen_salt('bf', 10)), 'STAFF'),
('test', 'test@gmail.com', crypt('123', gen_salt('bf', 10)), 'NA') ;



CREATE TABLE IF NOT EXISTS "student" (
  id SERIAL PRIMARY KEY,
  userid INT REFERENCES "user"(id),
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  contact VARCHAR(255) NOT NULL ,
  grade VARCHAR(255) NOT NULL ,
  created_at timestamptz  DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz  DEFAULT CURRENT_TIMESTAMP 
);

TRUNCATE "student";
-- INSERT INTO "student" (username, email, password, user_type) VALUES
-- ('test_1', '123@gmail.com', crypt('123', gen_salt('bf', 10)), 'ADMIN'), 
-- ('test_2', 'test_2@gmail.com', crypt('test_2', gen_salt('bf', 10)), 'TUTOR'),
-- ('test_3', 'test_3@gmail.com', crypt('test_3', gen_salt('bf', 10)), 'STAFF'),
-- ('test_4', 'test_4@gmail.com', crypt('test_4', gen_salt('bf', 10)), 'NA') ;



CREATE TABLE IF NOT EXISTS "tutor" (
  id SERIAL PRIMARY KEY,
  userid INT REFERENCES "user"(id),
  title VARCHAR(255) NOT NULL ,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  contact VARCHAR(255) NOT NULL ,
  created_at timestamptz  DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz  DEFAULT CURRENT_TIMESTAMP 
);
TRUNCATE "tutor";
--insert into


CREATE TABLE IF NOT EXISTS "staff" (
  id SERIAL PRIMARY KEY,
  userid INT REFERENCES "user"(id),
  title VARCHAR(255) NOT NULL ,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  contact VARCHAR(255) NOT NULL ,
  created_at timestamptz  DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz  DEFAULT CURRENT_TIMESTAMP 
);
TRUNCATE "staff";
--insert into



CREATE TABLE  IF NOT EXISTS "subject" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE CHECK (name = UPPER(name))
);

CREATE TABLE  IF NOT EXISTS "grade" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE  IF NOT EXISTS "classroom" (
    id SERIAL PRIMARY KEY,
    capacity INT NOT NULL DEFAULT 10,
    name VARCHAR(255) NOT NULL UNIQUE
);