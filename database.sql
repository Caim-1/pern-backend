CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(50) NOT NULL,
  UNIQUE (email)
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(320) NOT NULL UNIQUE,
  password VARCHAR(32) NOT NULL,
  created_at DATE NOT NULL,
  description VARCHAR(100),
  gender VARCHAR(32),
  avatar TEXT,
  banner TEXT
);

CREATE TABLE forums(
  id SERIAL PRIMARY KEY,
  name VARCHAR(25) NOT NULL UNIQUE,
  description VARCHAR(500) NOT NULL,
  created_at DATE NOT NULL,
  icon TEXT,
  banner TEXT
);

CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  body VARCHAR(1000),
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL,
  likes INT NOT NULL
);

ALTER TABLE posts ADD dislikes INT NOT NULL;

ALTER TABLE posts ADD CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
ADD CONSTRAINT fk_forum FOREIGN KEY(forum_name) REFERENCES forums(name)

CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
  body VARCHAR(1000),
  created_at TIMESTAMPTZ NOT NULL,
  likes INT NOT NULL,
  dislikes INT NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT fk_post FOREIGN KEY(post_id) REFERENCES posts(id)
);

CREATE TABLE user_liked_posts (
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  CONSTRAINT user_liked_post_pk PRIMARY KEY (user_id, post_id)
);

CREATE TABLE user_disliked_posts (
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  CONSTRAINT user_disliked_post_pk PRIMARY KEY (user_id, post_id)
);

CREATE TABLE forum_user (
  forum_id INT REFERENCES forums(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT forum_user_pk PRIMARY KEY (user_id, forum_id)
);

-- Date or Timestamp:
-- Date - date (no time of day)
-- Timestamp - (timestamptz) both date and time, with time zone