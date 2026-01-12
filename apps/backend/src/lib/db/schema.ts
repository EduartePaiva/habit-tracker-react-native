import { date, integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const habitsTable = pgTable("habits", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: uuid(),
	title: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	streakCount: integer().default(0),
	frequency: text(),
	lastCompleted: date(),
	createdAt: date().defaultNow(),
});
