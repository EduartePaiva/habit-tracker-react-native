import { useAuth } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Swipeable, { SwipeDirection } from "react-native-gesture-handler/ReanimatedSwipeable";
import { Button, Surface, Text } from "react-native-paper";
import { useHabit } from "@/hooks/use-habits";

export default function Index() {
	const { signOut } = useAuth();
	const { habits, deleteHabit } = useHabit();

	const handleCompleteHabit = (habitId: number) => {
		deleteHabit.mutate(habitId);
	};

	const renderRightAction = () => (
		<View style={styles.swipeActionRight}>
			<MaterialCommunityIcons name="check-circle-outline" size={32} color="#fff" />
		</View>
	);
	const renderLeftAction = () => (
		<View style={styles.swipeActionLeft}>
			<MaterialCommunityIcons name="trash-can-outline" size={32} color="#fff" />
		</View>
	);

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

			<ScrollView showsVerticalScrollIndicator={false}>
				{habits ? (
					habits.map((habit) => (
						<Swipeable
							key={habit.id}
							overshootLeft={false}
							overshootRight={false}
							renderLeftActions={renderLeftAction}
							renderRightActions={renderRightAction}
							onSwipeableOpen={(dir) => {
								if (dir === "right") {
									deleteHabit.mutate(habit.id);
								}
							}}
						>
							<Surface style={styles.card} elevation={2}>
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
						</Swipeable>
					))
				) : (
					<View style={styles.emptyState}>
						<Text style={styles.emptyStateText}>No Habits yet. Add your first Habit!</Text>
					</View>
				)}
			</ScrollView>
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
		marginRight: 10,
		marginLeft: 10,
		borderRadius: 18,
		backgroundColor: "#f7f2fa",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 8,
	},
	cardContent: { padding: 20 },
	cardTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 4, color: "#22223b" },
	cardDescription: { fontSize: 15, marginBottom: 16, color: "#6c6c80" },
	cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	streakBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff3e0",
		borderRadius: 12,
		paddingHorizontal: 10,
		paddingVertical: 4,
	},
	streakText: { marginLeft: 6, color: "#ff9800", fontWeight: "bold", fontSize: 14 },
	frequencyBadge: {
		backgroundColor: "#ede7f6",
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 4,
	},
	frequencyText: {
		color: "#7c4dff",
		fontWeight: "bold",
		fontSize: 14,
		textTransform: "capitalize",
	},
	emptyState: { flex: 1, justifyContent: "center", alignItems: "center" },
	emptyStateText: { color: "#666666" },
	swipeActionLeft: {
		justifyContent: "center",
		alignItems: "flex-start",
		flex: 1,
		backgroundColor: "#e53935",
		borderRadius: 18,
		marginBottom: 18,
		marginTop: 2,
		paddingLeft: 16,
	},
	swipeActionRight: {
		backgroundColor: "#4caf50",
		justifyContent: "center",
		alignItems: "flex-end",
		flex: 1,
		borderRadius: 18,
		marginBottom: 18,
		marginTop: 2,
		paddingRight: 16,
	},
});
