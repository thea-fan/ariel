
CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
 	email TEXT,
	first_name TEXT,
	last_name TEXT,
	password TEXT,
	company TEXT,
	department TEXT,
	user_type TEXT
);

CREATE TABLE IF NOT EXISTS questions (
	qn_id SERIAL PRIMARY KEY,
	question_title TEXT,
	equipment TEXT,
	question_text TEXT,
	question_photo  TEXT,
	user_id INT,
	vessel TEXT,
	question_status TEXT,
	answer_id INT DEFAULT null,
	created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS replies (
	reply_id SERIAL PRIMARY KEY,
	replied_user_id INT,
	question_id INT,
	reply_text TEXT,
	reply_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS uploads (
    id SERIAL PRIMARY KEY,
    url TEXT,
    reply_id INT REFERENCES replies(reply_id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER set_timestamp
BEFORE UPDATE ON questions
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON replies
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();