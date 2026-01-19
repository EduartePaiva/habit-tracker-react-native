import { integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const frequencyEnum = pgEnum("frequency", ["daily", "weekly", "monthly"]);

export const habitsTable = pgTable("habits", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: text().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	streakCount: integer().default(0),
	frequency: frequencyEnum().default("daily"),
	lastCompleted: timestamp().defaultNow(),
	createdAt: timestamp().defaultNow(),
});

export const habitsInsertSchema = createInsertSchema(habitsTable).omit({
	userId: true,
	createdAt: true,
});
