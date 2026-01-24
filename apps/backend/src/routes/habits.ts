import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
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
	})
	.get(async (c) => {
		const { userId } = c.get("clerkAuth");

		const res = await db.select().from(habitsTable).where(eq(habitsTable.userId, userId));

		return c.json({ data: res });
	})
	.delete("/:habitId", async (c) => {
		const habitId = Number(c.req.param("habitId"));
		const { userId } = c.get("clerkAuth");

		await db
			.delete(habitsTable)
			.where(and(eq(habitsTable.id, habitId), eq(habitsTable.userId, userId)));

		return c.body(null, 204);
	});

export default habitRouter;
