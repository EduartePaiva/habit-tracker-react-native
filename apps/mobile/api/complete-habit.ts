import { CompleteHabitInput } from "@/types/habit";
import { api, authWithBearer } from "./client";

const completeHabit = async (token: string, habit: CompleteHabitInput) => {
	const res = await api.post("/complete-habit", habit, authWithBearer(token));

	return res.data;
};

export default { completeHabit };
