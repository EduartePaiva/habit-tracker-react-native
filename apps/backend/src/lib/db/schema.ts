import { relations } from "drizzle-orm";
import {
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const frequencyEnum = pgEnum("frequency", ["daily", "weekly", "monthly"]);

export const habitsTable = pgTable("habits", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: text().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	streakCount: integer().notNull().default(0),
	frequency: frequencyEnum().notNull().default("daily"),
	lastCompleted: timestamp().notNull().defaultNow(),
	createdAt: timestamp().notNull().defaultNow(),
});

export const habitsInsertSchema = createInsertSchema(habitsTable).omit({
	userId: true,
	createdAt: true,
});

export const habitCompletionTable = pgTable(
	"habitCompletion",
	{
		habitId: integer()
			.notNull()
			.references(() => habitsTable.id, { onDelete: "cascade" }),
		userId: text().notNull(),
		completedAt: timestamp().notNull().defaultNow(),
	},
	(t) => [primaryKey({ columns: [t.userId, t.habitId] })],
);

export const habitCompletionRelations = relations(habitCompletionTable, ({ one }) => ({
	habit: one(habitsTable, { fields: [habitCompletionTable.habitId], references: [habitsTable.id] }),
}));
