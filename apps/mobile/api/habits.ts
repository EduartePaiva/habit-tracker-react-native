import { CreateHabitInput, HabitPostResponse, PaginatedHabitsGetResponse } from "@/types/habit";
import { api } from "./client";

function authWithBearer(token: string) {
	return { headers: { Authorization: `Bearer ${token}` } };
}

const addHabit = async (token: string, habit: CreateHabitInput) => {
	const res = await api.post<HabitPostResponse>("/habit", habit, authWithBearer(token));

	return res.data;
};

const getHabits = async (token: string) => {
	const res = await api.get<PaginatedHabitsGetResponse>("/habit", authWithBearer(token));

	return res.data;
};

export default { addHabit, getHabits };
