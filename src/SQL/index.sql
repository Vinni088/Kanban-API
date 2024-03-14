CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "sessions" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  FOREIGN KEY ("user_id") REFERENCES users(id)
);