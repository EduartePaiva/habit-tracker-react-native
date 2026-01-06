import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { CodeField, Cursor, useClearByFocusCell } from "react-native-confirmation-code-field";
import { Button, Divider, MD3Colors, Text, TextInput, useTheme } from "react-native-paper";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<null | string>(null);
  const { signUp, isLoaded, setActive } = useSignUp();
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  const [codeFieldProps, getCellOnLayout] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const theme = useTheme();
  const router = useRouter();

  const onSignUpPress = async () => {
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

    // error = await signUp(email, password);
    setIsSignUpLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      if (err instanceof Error) {
        error = err.message;
      } else {
        error = "Failed to sign up";
      }
      console.error(err);
    } finally {
      setIsSignUpLoading(false);
    }

    if (error) {
      setError(error);
      return;
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
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

          <CodeField
            {...codeFieldProps}
            value={code}
            onChangeText={setCode}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View key={index}>
                <Text
                  onLayout={getCellOnLayout(index)}
                  style={[styles.cell, isFocused && styles.focusCell]}
                >
                  {symbol || (isFocused && <Cursor />)}
                </Text>
              </View>
            )}
          />

          {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
          <Button mode="contained" style={styles.button} onPress={onVerifyPress}>
            Verify
          </Button>
          <Button
            mode="text"
            style={styles.switchModeButton}
            onPress={() => router.navigate("/sign-in")}
          >
            Already have an account? Sign In
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
          Create Account
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
          onPress={onSignUpPress}
          disabled={isSignUpLoading}
        >
          {isSignUpLoading ? "Signing up..." : "Sign Up"}
        </Button>
        <Button
          mode="text"
          style={styles.switchModeButton}
          disabled={isSignUpLoading}
          onPress={() => router.navigate("/sign-in")}
        >
          Already have an account? Sign In
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
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: { marginTop: 16 },
  root: { flex: 1, padding: 20 },
  codeFieldRoot: { marginTop: 20, marginBottom: 20 },
  cell: {
    width: 40,
    height: 50,
    lineHeight: 50,
    fontSize: 24,
    borderWidth: 1,
    borderColor: MD3Colors.primary50,
    textAlign: "center",
    color: MD3Colors.primary50, // text color
  },
  focusCell: {
    borderColor: MD3Colors.primary20,
  },
});
