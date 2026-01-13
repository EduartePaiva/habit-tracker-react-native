import type { ClerkClient } from "@clerk/backend";
import type { SignedInAuthObject } from "@clerk/backend/internal";
import { createMiddleware } from "hono/factory";
import { clerkClient } from "./client";

export const clerkMiddleware = createMiddleware<{
	Variables: {
		clerkAuth: SignedInAuthObject;
		clerk: ClerkClient;
	};
}>(async (c, next) => {
	const requestState = await clerkClient.authenticateRequest(c.req.raw);

	const auth = requestState.toAuth();

	if (!auth?.isAuthenticated) {
		return new Response("Unauthorized", { status: 401 });
	}
	c.set("clerkAuth", auth);
	c.set("clerk", clerkClient);

	await next();
});
