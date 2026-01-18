import { Hono } from "hono";
import { clerkMiddleware } from "./clerk/authMiddleware";
import type { AppBindings } from "./types";

export function CreateRouter() {
	return new Hono<AppBindings>();
}

export default function createApp() {
	const app = CreateRouter();

	return app.basePath("/api").use(clerkMiddleware);
}
