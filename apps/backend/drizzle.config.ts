import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/lib/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: <drizzle>
		// biome-ignore lint/style/noProcessEnv: <drizzle>
		url: process.env.DATABASE_URL!,
	},
	casing: "snake_case",
});
