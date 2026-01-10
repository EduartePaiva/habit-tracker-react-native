import z from "zod";

if (process.env.NODE_ENV === "development") {
  await import("dotenv/config");
}

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().default(9999),
  DATABASE_URL: z.url(),
});
// eslint-disable-next-line node/no-process-env
const parsedData = EnvSchema.safeParse(process.env);
if (!parsedData.success) {
  console.error("❌ Invalid env:");
  console.error(parsedData.error.flatten().fieldErrors);
  process.exit(1);
}
const env = parsedData.data;
export default env;
