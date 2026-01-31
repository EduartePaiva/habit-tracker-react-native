import { useAuth } from "@clerk/clerk-expo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import habitApi from "@/api/habits";
import { CreateHabitInput } from "@/types/habit";

export function useHabit() {
	const { getToken, isLoaded, isSignedIn } = useAuth();
	const queryClient = useQueryClient();

	const habitsQuery = useQuery({
		queryKey: ["habits"],
		enabled: isLoaded && isSignedIn,
		queryFn: async () => {
			const token = await getToken();
			if (!token) throw new Error("No auth token");
			return (await habitApi.getHabits(token)).data;
		},
	});

	const addHabit = useMutation({
		mutationFn: async (habit: CreateHabitInput) => {
			const token = await getToken();
			if (!token) throw new Error("No auth token");
			return habitApi.addHabit(token, habit);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["habits"] });
		},
	});

	const deleteHabit = useMutation({
		mutationFn: async (habitId: number) => {
			const token = await getToken();
			if (!token) throw new Error("No auth token");
			return habitApi.deleteHabit(token, habitId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["habits"] });
		},
	});

	const completeHabit = useMutation({
		mutationFn: async (habitId: number) => {},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["habits"] });
		},
	});

	return {
		habits: habitsQuery.data,
		isLoading: habitsQuery.isLoading,
		addHabit,
		deleteHabit,
		completeHabit,
	};
}
