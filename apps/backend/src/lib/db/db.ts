import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const test = process.env.DATABASE_URL ?? "";

const db = drizzle(test);

export default db;
