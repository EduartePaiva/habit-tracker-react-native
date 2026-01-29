import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { CreateRouter } from "@/lib/create-app";
import db from "@/lib/db";
import { completeHabitSchema, habitCompletionTable, habitsTable } from "@/lib/db/schema";
import { getStartOfFrequency } from "@/utils/start-date";

const HOURS_MILLISECOND_12 = 1000 * 60 * 60 * 12;

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

		const { frequency, lastCompleted, streakCount } = habit[0];

		// check if habit is already completed this "period", for example, this day, this week and this month
		const currentDate = getStartOfFrequency(new Date(), frequency);
		const lastCompletedByFrequency = getStartOfFrequency(lastCompleted, frequency);

		if (currentDate === lastCompletedByFrequency) {
			return c.json({ error: "Habit already completed for this period" }, 409);
		}

		// see if we increase streak cnt or we restart it.
		// if curData minus 1 period is equal to lcf then we can increase it.

		const lastValidDate = getStartOfFrequency(
			new Date(currentDate.getTime() - HOURS_MILLISECOND_12),
			frequency,
		);
		let newStreakCnt: number;
		if (lastValidDate === lastCompletedByFrequency) {
			// we can increase streak
			newStreakCnt = streakCount + 1;
		} else {
			// we restart streak
			newStreakCnt = 1;
		}

		await db.transaction(async (t) => {
			await t.insert(habitCompletionTable).values({ habitId, userId, completedAt: currentDate });
			await t
				.update(habitsTable)
				.set({ lastCompleted: currentDate, streakCount: newStreakCnt })
				.where(and(eq(habitsTable.userId, userId), eq(habitsTable.id, habitId)));
		});
	});

export default completeHabitRouter;
