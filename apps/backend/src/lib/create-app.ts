import { Hono } from "hono";
import { logger } from "hono/logger";
import { clerkMiddleware } from "./clerk/authMiddleware";
import type { AppBindings } from "./types";

export function CreateRouter() {
	return new Hono<AppBindings>();
}

export const customLogger = (message: string, ...rest: string[]) => {
	console.log(message, ...rest);
};

export default function createApp() {
	const app = CreateRouter();

	return app.basePath("/api").use(logger(customLogger)).use(clerkMiddleware);
}
