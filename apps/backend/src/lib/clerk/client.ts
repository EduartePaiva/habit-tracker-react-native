import { createClerkClient } from "@clerk/backend";
import env from "@/lib/env";

const API_VERSION = env.CLERK_API_VERSION || "v1";
const API_URL = env.CLERK_API_URL || "";
const SECRET_KEY = env.CLERK_SECRET_KEY;
const PUBLISHABLE_KEY = env.CLERK_PUBLISHABLE_KEY;
const JWT_KEY = env.CLERK_JWT_KEY;

export const clerkClient = createClerkClient({
	secretKey: SECRET_KEY,
	apiUrl: API_URL,
	apiVersion: API_VERSION,
	jwtKey: JWT_KEY,
	publishableKey: PUBLISHABLE_KEY,
});
