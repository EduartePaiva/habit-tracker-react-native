type Frequency = "weekly" | "daily" | "monthly";

export interface Habit {
	frequency: Frequency;
}

export interface CreateHabitInput {}
export interface UpdateHabitInput {}
export interface HabitPostResponse {}
export interface PaginatedHabitsGetResponse {
	data: Habit[];
	page: number;
}
