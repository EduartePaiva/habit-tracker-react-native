import { Stack } from "expo-router";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const isAuth = false;

  return (
    <>
      <Stack.Protected guard={isAuth}>{children}</Stack.Protected>
      <Stack.Protected guard={!isAuth}>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack.Protected>
    </>
  );
}

export default function RootLayout() {
  const isAuth = true;

  return (
    <Stack>
      <Stack.Protected guard={!isAuth}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isAuth}>
        <Stack.Screen name="auth" options={{ headerShown: true }} />
      </Stack.Protected>
    </Stack>
  );
}
