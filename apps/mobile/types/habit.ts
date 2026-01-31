type Frequency = "weekly" | "daily" | "monthly";

export interface Habit {
	id: number;
	userId: string;
	title: string;
	description: string;
	frequency: Frequency;
	streakCount: number;
	lastCompleted: string;
	createdAt: string;
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

export interface HabitDeleteResponse {}
export interface PaginatedHabitsGetResponse {
	data: Habit[];
}

export interface CompleteHabitInput {
	habitId: number;
}
