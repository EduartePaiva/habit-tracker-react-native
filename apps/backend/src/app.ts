import createApp from "./lib/create-app";
import habitRouter from "./routes/habits";

const app = createApp();

const routes = [habitRouter] as const;

routes.forEach((route) => {
	app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
