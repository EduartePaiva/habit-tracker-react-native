import { serve } from "@hono/node-server";
import env from "@/lib/env";
import createApp from "./lib/create-app";

const app = createApp();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

serve(
	{
		fetch: app.fetch,
		port: env.PORT,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
