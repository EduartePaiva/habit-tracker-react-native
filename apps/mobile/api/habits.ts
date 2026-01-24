import {
	CreateHabitInput,
	HabitDeleteResponse,
	HabitPostResponse,
	PaginatedHabitsGetResponse,
} from "@/types/habit";
import { api, authWithBearer } from "./client";

const addHabit = async (token: string, habit: CreateHabitInput) => {
	const res = await api.post<HabitPostResponse>("/habit", habit, authWithBearer(token));

	return res.data;
};
const deleteHabit = async (token: string, habitId: number) => {
	const res = await api.delete<HabitDeleteResponse>(`/habit/${habitId}`, authWithBearer(token));

	return res.data;
};

const getHabits = async (token: string) => {
	const res = await api.get<PaginatedHabitsGetResponse>("/habit", authWithBearer(token));

	return res.data;
};

export default { addHabit, getHabits, deleteHabit };
