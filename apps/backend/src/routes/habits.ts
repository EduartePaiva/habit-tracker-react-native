import { zValidator } from "@hono/zod-validator";
import { CreateRouter } from "@/lib/create-app";
import db from "@/lib/db";
import { habitsInsertSchema, habitsTable } from "@/lib/db/schema";

const habitRouter = CreateRouter()
	.basePath("/habit")
	.post(zValidator("json", habitsInsertSchema), async (c) => {
		const { userId } = c.get("clerkAuth");
		const { title, description, frequency, lastCompleted, streakCount } = c.req.valid("json");

		const res = await db
			.insert(habitsTable)
			.values({
				title,
				description,
				userId,
				frequency,
				lastCompleted,
				streakCount,
			})
			.returning();

		return c.json(res[0]);
	});

export default habitRouter;
