-- Your database initialization SQL script goes here
CREATE TABLE IF NOT EXISTS test (
  id serial PRIMARY KEY,
  name VARCHAR (100) NOT NULL
);

INSERT INTO test (name) VALUES ('Example Data');