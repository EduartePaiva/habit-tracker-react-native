import { createMiddleware } from "hono/factory";
import type { AppBindings } from "../types";
import { clerkClient } from "./client";

export const clerkMiddleware = createMiddleware<AppBindings>(async (c, next) => {
	const requestState = await clerkClient.authenticateRequest(c.req.raw);

	const auth = requestState.toAuth();

	if (!auth?.isAuthenticated) {
		return new Response("Unauthorized", { status: 401 });
	}
	c.set("clerkAuth", auth);
	c.set("clerk", clerkClient);

	await next();
});
