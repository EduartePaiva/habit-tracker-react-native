import { CreateRouter } from "@/lib/create-app";
import db from "@/lib/db";
import { habitsTable } from "@/lib/db/schema";

const habitRouter = CreateRouter();

habitRouter.post(async (c) => {
	const { userId } = c.get("clerkAuth");

	// TODO: parse the data from user
	const res = await db
		.insert(habitsTable)
		.values({
			title: "",
			description: "",
			userId,
			frequency: "daily",
		})
		.returning();

	return c.json(res[0]);
});

export default habitRouter;
