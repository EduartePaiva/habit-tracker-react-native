type Frequency = "weekly" | "daily" | "monthly";

export interface Habit {
	frequency: Frequency;
}

export interface CreateHabitInput {
	title: string;
	description: string;
	frequency: Frequency;
	streakCount?: number;
	lastCompleted?: Date;
}
export interface UpdateHabitInput {}
export interface HabitPostResponse {}
export interface PaginatedHabitsGetResponse {
	data: Habit[];
	page: number;
}
