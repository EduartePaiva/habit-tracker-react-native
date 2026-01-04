import { AuthProvider } from "@/lib/auth-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  const isAuth = true;

  return (
    <AuthProvider>
      <Stack>
        <Stack.Protected guard={!isAuth}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={isAuth}>
          <Stack.Screen name="auth" options={{ headerShown: true }} />
        </Stack.Protected>
      </Stack>
    </AuthProvider>
  );
}
