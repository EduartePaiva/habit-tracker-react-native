import type { ClerkClient } from "@clerk/backend";
import type { SignedInAuthObject } from "@clerk/backend/internal";
import type { Env } from "hono";

export type AppBindings = Env & {
	Variables: {
		clerkAuth: SignedInAuthObject;
		clerk: ClerkClient;
	};
};
