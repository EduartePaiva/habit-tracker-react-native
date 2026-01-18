import { date, integer, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const frequencyEnum = pgEnum("frequency", ["daily", "weekly", "monthly"]);

export const habitsTable = pgTable("habits", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: text().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	streakCount: integer().default(0),
	frequency: frequencyEnum().default("daily"),
	lastCompleted: date().defaultNow(),
	createdAt: date().defaultNow(),
});
