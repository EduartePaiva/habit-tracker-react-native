import ConfirmationCodeField from "@/components/confirmation-code-field";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);
  const { signIn, setActive, isLoaded } = useSignIn();
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [pendingSecondFactor, setPendingSecondFactor] = useState(false);
  const [secondFactorCode, setSecondFactorCode] = useState("");

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
    try {
      setIsSignInLoading(true);
      const signInAttempt = await signIn.create({ identifier: email, password });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else if (signInAttempt.status === "needs_second_factor") {
        await signInAttempt.prepareSecondFactor({ strategy: "email_code" });
        setPendingSecondFactor(true);
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        setError("Error while signing in");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error while signing in");
      }
    } finally {
      setIsSignInLoading(false);
    }
  };

  const handleSecondFactorVerify = async () => {
    if (!isLoaded) return;

    setIsSignInLoading(true);
    try {
      // Use the code the user provided to attempt verification
      const secondFactorAttempt = await signIn.attemptSecondFactor({
        code: secondFactorCode,
        strategy: "email_code",
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (secondFactorAttempt.status === "complete") {
        await setActive({ session: secondFactorAttempt.createdSessionId });
        router.replace("/");
      } else {
        setError(secondFactorAttempt.status);
        console.error(JSON.stringify(secondFactorAttempt, null, 2));
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsSignInLoading(false);
    }
  };

  if (pendingSecondFactor) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <Text style={styles.title} variant="headlineMedium">
            Verify Your Email
          </Text>
          <Divider style={{ marginBottom: 22 }} />
          <Text style={{ textAlign: "center" }}>Enter the 6-digit code sent to:</Text>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", textDecorationLine: "underline" }}
          >
            {email}
          </Text>

          <Text style={{ textAlign: "center", marginTop: 20 }}>Enter the code below:</Text>

          <ConfirmationCodeField code={secondFactorCode} setCode={setSecondFactorCode} />

          {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleSecondFactorVerify}
            disabled={isSignInLoading}
          >
            {isSignInLoading ? "Verifying..." : "Verify"}
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
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSignIn}
          disabled={isSignInLoading}
        >
          {isSignInLoading ? "Signing in..." : "Sign In"}
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
