import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import env from "@/lib/env";

const db = drizzle(env.DATABASE_URL, { casing: "snake_case" });

export default db;
