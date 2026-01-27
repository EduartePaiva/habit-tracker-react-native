import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { CreateRouter } from "@/lib/create-app";
import db from "@/lib/db";
import { completeHabitSchema, habitsInsertSchema, habitsTable } from "@/lib/db/schema";

const completeHabitRouter = CreateRouter()
	.basePath("/complete-habit")
	.post(zValidator("json", completeHabitSchema), async (c) => {
		const { userId } = c.get("clerkAuth");
		const { habitId } = c.req.valid("json");

		// check if habit is already completed this "period", for example, this day, this week and this month

		const habit = await db
			.select()
			.from(habitsTable)
			.where(and(eq(habitsTable.id, habitId), eq(habitsTable.userId, userId)));
		if (habit.length !== 1) {
			return c.json({ error: "Invalid habitId" }, 422);
		}

		const { frequency } = habit[0];
	});

export default completeHabitRouter;
