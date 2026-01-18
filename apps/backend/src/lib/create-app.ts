import { Hono } from "hono";
import { clerkMiddleware } from "./clerk/authMiddleware";
import type { AppBindings } from "./types";

export default function createApp() {
	const app = new Hono<AppBindings>().basePath("/api").use(clerkMiddleware);

	return app;
}
