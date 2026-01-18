CREATE TYPE "public"."frequency" AS ENUM('daily', 'weekly', 'monthly');--> statement-breakpoint
ALTER TABLE "habits" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "habits" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "habits" ALTER COLUMN "frequency" SET DEFAULT 'daily'::"public"."frequency";--> statement-breakpoint
ALTER TABLE "habits" ALTER COLUMN "frequency" SET DATA TYPE "public"."frequency" USING "frequency"::"public"."frequency";