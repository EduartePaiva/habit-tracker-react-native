import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);
  const { signIn, setActive, isLoaded } = useSignIn();

  const theme = useTheme();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!isLoaded) return;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(null);

    let error;
    try {
      const signInAttempt = await signIn.create({ identifier: email, password });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        const res = await signInAttempt.prepareSecondFactor({ strategy: "email_code" });
        // handle second factor with an email link
        console.error(JSON.stringify(signInAttempt, null, 2));
        setError("Error while signing in");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error while signing in");
      }
    }

    if (error) {
      setError(error);
      return;
    }

    router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          Welcome Back
        </Text>

        <TextInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@gmail.com"
          mode="outlined"
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          label="Password"
          autoCapitalize="none"
          mode="outlined"
          textContentType="password"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setPassword}
        />

        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
        <Button mode="contained" style={styles.button} onPress={handleSignIn}>
          Sign In
        </Button>
        <Button
          mode="text"
          style={styles.switchModeButton}
          onPress={() => router.navigate("/sign-up")}
        >
          Don&apos;t have an account? Sign Up
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: { marginTop: 16 },
});
