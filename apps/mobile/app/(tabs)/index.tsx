import { useAuth } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useHabit } from "@/hooks/use-habits";

export default function Index() {
	const { signOut } = useAuth();
	const { habits } = useHabit();

	return (
		<View style={styles.view}>
			<View>
				<Text variant="headlineSmall">Today's Habits</Text>
				<Button icon={"logout"} onPress={() => signOut()}>
					Sign Out
				</Button>
			</View>

			{habits ? (
				habits.map((habit) => (
					<View key={habit.id}>
						<Text>{habit.title}</Text>
						<Text>{habit.description}</Text>
						<View>
							<View>
								<MaterialCommunityIcons name="fire" size={18} color="#ff9800" />
								<Text>{habit.streakCount} day streak</Text>
							</View>
							<View>
								<Text style={{ textTransform: "capitalize" }}>{habit.frequency}</Text>
							</View>
						</View>
					</View>
				))
			) : (
				<View>
					<Text>No Habits yet. Add your first Habit!</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
