import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { CreateRouter } from "@/lib/create-app";
import db from "@/lib/db";
import { completeHabitSchema, habitsTable } from "@/lib/db/schema";
import { getStartOfFrequency } from "@/utils/start-date";

const completeHabitRouter = CreateRouter()
	.basePath("/complete-habit")
	.post(zValidator("json", completeHabitSchema), async (c) => {
		const { userId } = c.get("clerkAuth");
		const { habitId } = c.req.valid("json");

		const habit = await db
			.select()
			.from(habitsTable)
			.where(and(eq(habitsTable.id, habitId), eq(habitsTable.userId, userId)));
		if (habit.length !== 1) {
			return c.json({ error: "Invalid habitId" }, 422);
		}

		const { frequency, lastCompleted } = habit[0];

		// check if habit is already completed this "period", for example, this day, this week and this month
		const currentDate = getStartOfFrequency(new Date(), frequency);
		const lastCompletedByFrequency = getStartOfFrequency(lastCompleted, frequency);

		if (currentDate === lastCompletedByFrequency) {
			return c.json({ error: "Habit already completed for this period" }, 409);
		}

		// see if we increase streak cnt or we restart it.
		// if curData minus 1 period is equal to lcf then we can increase it.

		const lastPeriodDate = new Date(lastCompletedByFrequency.getTime());
		// lastPeriodDate.setMonth(lastPeriodDate.getMonth() + 1);
	});

export default completeHabitRouter;
