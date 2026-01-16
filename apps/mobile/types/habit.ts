type Frequency = "weekly" | "daily" | "monthly";

export interface Habit {
	frequency: Frequency;
}

export interface CreateHabitInput {}
export interface UpdateHabitInput {}
export interface HabitResponse {}
