import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator } from "@/components/activity-indicator";

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<ClerkProvider tokenCache={tokenCache}>
			<QueryClientProvider client={queryClient}>
				<PaperProvider theme={{ dark: false }}>
					<SafeAreaProvider>
						<AuthStackGuard />
					</SafeAreaProvider>
				</PaperProvider>
			</QueryClientProvider>
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
