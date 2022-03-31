
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


CREATE TABLE "book" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"title" VARCHAR(255) NOT NULL,
	"author" VARCHAR(255) NOT NULL,
	"page_count" INT NOT NULL,
	"rating" INT
);


CREATE TABLE "reading_session" (
	"id" SERIAL PRIMARY KEY,
	"book_id" INT REFERENCES "book",
	"date" DATE,
	"duration" INT,
	"page" INT
);


CREATE TABLE "goal" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"current" INT NOT NULL,
	"total" INT NOT NULL
);
