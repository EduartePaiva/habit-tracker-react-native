import createApp from "@/lib/create-app";
import completeHabitRouter from "@/routes/complete-habit";
import habitRouter from "@/routes/habits";

const app = createApp();

const routes = [habitRouter, completeHabitRouter] as const;

routes.forEach((route) => {
	app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
