CREATE TABLE "habitCompletion" (
	"habit_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"completed_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "habitCompletion_user_id_habit_id_pk" PRIMARY KEY("user_id","habit_id")
);
--> statement-breakpoint
ALTER TABLE "habitCompletion" ADD CONSTRAINT "habitCompletion_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE cascade ON UPDATE no action;