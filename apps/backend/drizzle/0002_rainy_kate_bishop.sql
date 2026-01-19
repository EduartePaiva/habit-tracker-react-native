ALTER TABLE "habits" ALTER COLUMN "last_completed" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "habits" ALTER COLUMN "last_completed" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "habits" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "habits" ALTER COLUMN "created_at" SET DEFAULT now();