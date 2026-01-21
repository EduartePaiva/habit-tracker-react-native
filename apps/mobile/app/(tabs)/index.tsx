import { useAuth } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { useHabit } from "@/hooks/use-habits";

export default function Index() {
	const { signOut } = useAuth();
	const { habits } = useHabit();

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text variant="headlineSmall" style={styles.title}>
					Today's Habits
				</Text>
				<Button icon={"logout"} onPress={() => signOut()}>
					Sign Out
				</Button>
			</View>

			{habits ? (
				habits.map((habit) => (
					<Surface key={habit.id} style={styles.card} elevation={0}>
						<View style={styles.cardContent}>
							<Text style={styles.cardTitle}>{habit.title}</Text>
							<Text style={styles.cardDescription}>{habit.description}</Text>
							<View style={styles.cardFooter}>
								<View style={styles.streakBadge}>
									<MaterialCommunityIcons name="fire" size={18} color="#ff9800" />
									<Text style={styles.streakText}>{habit.streakCount} day streak</Text>
								</View>
								<View style={styles.frequencyBadge}>
									<Text style={styles.frequencyText}>{habit.frequency}</Text>
								</View>
							</View>
						</View>
					</Surface>
				))
			) : (
				<View style={styles.emptyState}>
					<Text style={styles.emptyStateText}>No Habits yet. Add your first Habit!</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#f5f5f5",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 24,
	},
	title: { fontWeight: "bold" },
	card: {
		marginBottom: 18,
		borderRadius: 18,
		backgroundColor: "f7f2fa",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 8,
		elevation: 4,
	},
	frequencyText: { textTransform: "capitalize" },
});
