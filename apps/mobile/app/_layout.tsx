import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator } from "@/components/activity-indicator";

export default function RootLayout() {
	return (
		<ClerkProvider tokenCache={tokenCache}>
			<PaperProvider theme={{ dark: false }}>
				<SafeAreaProvider>
					<AuthStackGuard />
				</SafeAreaProvider>
			</PaperProvider>
		</ClerkProvider>
	);
}

function AuthStackGuard() {
	const { isSignedIn, isLoaded } = useAuth();

	if (!isLoaded) {
		return <ActivityIndicator />;
	}

	return (
		<Stack>
			<Stack.Protected guard={!!isSignedIn}>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack.Protected>
			<Stack.Protected guard={!isSignedIn}>
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			</Stack.Protected>
		</Stack>
	);
}
