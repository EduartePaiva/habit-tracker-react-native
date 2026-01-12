CREATE TABLE "habits" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "habits_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" uuid,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"streak_count" integer DEFAULT 0,
	"frequency" text,
	"last_completed" date,
	"created_at" date DEFAULT now()
);
