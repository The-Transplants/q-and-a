DROP TABLE IF EXISTS Questions cascade;
DROP TABLE IF EXISTS Answers cascade;
DROP TABLE IF EXISTS Photos cascade;

CREATE TABLE Questions(
  question_id INT PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  question_body VARCHAR(500),
  question_date NUMERIC(20,0),
  asker_name VARCHAR(30),
  asker_email VARCHAR(50),
  reported BOOLEAN,
  question_helpfulness INT
);

CREATE TABLE Answers(
  answers_id INT PRIMARY KEY NOT NULL,
  question_id INT references Questions(question_id),
  body VARCHAR(500),
  answer_date NUMERIC(20,0),
  answerer_name VARCHAR(30),
  answerer_email VARCHAR(50),
  reported BOOLEAN,
  helpfulness INT
);

CREATE TABLE Photos(
  id INT PRIMARY KEY NOT NULL,
  answers_id INT references Answers(answers_id),
  photos_url VARCHAR(500)
);

\COPY Questions FROM '/Users/lunghaolee/Downloads/SDC Application Data - Atelier Project (_Clean_ Data Set) 2/questions.csv' DELIMITER ',' CSV HEADER;
\COPY Answers FROM '/Users/lunghaolee/Downloads/SDC Application Data - Atelier Project (_Clean_ Data Set)/answers.csv' DELIMITER ',' CSV HEADER;
\COPY Photos FROM '/Users/lunghaolee/Downloads/SDC Application Data - Atelier Project (_Clean_ Data Set) 2/answers_photos.csv' DELIMITER ',' CSV HEADER;

 SELECT jsonb_build_object(
 'question_id', question_id,
 'question_body', question_body,
 'question_date', question_date,
 'asker_name', asker_name,
 'helpfulness', question_helpfulness,
 'reported', reported

  )  FROM questions WHERE product_id = 44388;







   'answers', (SELECT jsonb_build_object(
   answer_id, (SELECT jsonb_build_object(
      'id', id,
      'body', photo_url,
      'date',
      'answer_name',
      'helpfulness',
      'photo', )
     FROM answers WHERE question_id = question_id)))