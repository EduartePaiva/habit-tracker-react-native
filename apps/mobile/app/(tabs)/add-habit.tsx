import { useAuth } from "@clerk/clerk-expo";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";

const FREQUENCIES = [
	{ value: "daily", label: "Daily" },
	{ value: "weekly", label: "Weekly" },
	{ value: "monthly", label: "Monthly" },
] as const satisfies Record<string, string>[];

type Frequency = (typeof FREQUENCIES)[number]["value"];

export default function AddHabitScreen() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [frequency, setFrequency] = useState<Frequency>("daily");
	const { userId, isSignedIn } = useAuth();

	const handleSubmit = async () => {
		if (!isSignedIn) return;

		// handle adding a habit
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				label="Title"
				mode="outlined"
				onChangeText={setTitle}
				value={title}
			/>
			<TextInput
				style={styles.input}
				label="Description"
				mode="outlined"
				onChangeText={setDescription}
				value={description}
			/>
			<View style={styles.frequencyContainer}>
				<SegmentedButtons buttons={FREQUENCIES} onValueChange={setFrequency} value={frequency} />
			</View>
			<Button mode="contained" disabled={!title || !description} onPress={handleSubmit}>
				Add Habit
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, justifyContent: "center", backgroundColor: "#f5f5f5" },
	input: { marginBottom: 16 },
	frequencyContainer: { marginBottom: 24 },
});
