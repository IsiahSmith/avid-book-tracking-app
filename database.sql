
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
	"title" VARCHAR(255),
	"author" VARCHAR(255),
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
