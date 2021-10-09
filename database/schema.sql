DROP DATABASE IF EXISTS qa;
DROP TABLE IF EXISTS Questions cascade;
DROP TABLE IF EXISTS Answers cascade;
DROP TABLE IF EXISTS Photos cascade;
DROP INDEX IF EXISTS questions_id_index;
DROP INDEX IF EXISTS answers_id_index;
DROP INDEX IF EXISTS photos_id_index;

SET max_parallel_workers = 8;
SET max_parallel_workers_per_gather = 8;
SET parallel_leader_participation = off;
SET parallel_tuple_cost = 0;
SET parallel_setup_cost = 0;
SET min_parallel_table_scan_size = 0;

CREATE DATABASE qa;

\c qa;

CREATE TABLE Questions(
  question_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  question_body VARCHAR(500),
  question_date NUMERIC(20,0),
  asker_name VARCHAR(30),
  asker_email VARCHAR(50),
  reported BOOLEAN,
  question_helpfulness INT
);

CREATE INDEX questions_id_index ON Questions(product_id );


CREATE TABLE Answers(
  answer_id SERIAL PRIMARY KEY,
  question_id INT references Questions(question_id),
  body VARCHAR(500),
  date NUMERIC(20,0),
  answerer_name VARCHAR(30),
  answerer_email VARCHAR(50),
  reported BOOLEAN,
  helpfulness INT
);

CREATE INDEX answers_id_index ON answers(question_id);


CREATE TABLE Photos(
  id SERIAL PRIMARY KEY,
  answer_id INT references Answers(answer_id),
  photos_url VARCHAR(500)
);

CREATE INDEX photos_id_index ON photos(answer_id);


COPY Questions FROM '/seed/questions.csv' DELIMITER ',' CSV HEADER;
COPY Answers FROM '/seed/answers.csv' DELIMITER ',' CSV HEADER;
COPY Photos FROM '/seed/answers_photos.csv' DELIMITER ',' CSV HEADER;





