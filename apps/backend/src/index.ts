import { serve } from "@hono/node-server";
import { Hono } from "hono";
import env from "@/lib/env";
import { clerkMiddleware } from "./lib/clerk/authMiddleware";

const app = new Hono().use(clerkMiddleware);

app.get("/", clerkMiddleware, (c) => {
	const user = c.get("clerkAuth");

	console.log(user.userId);
	return c.text("Hello Hono!");
});

serve(
	{
		fetch: app.fetch,
		port: env.PORT,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
