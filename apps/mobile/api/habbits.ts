import { CreateHabitInput, HabitResponse } from "@/types/habit";
import { api } from "./client";

export const addHabit = async (token: string, habit: CreateHabitInput) => {
	const res = await api.post<HabitResponse>("/habit", habit, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
};
