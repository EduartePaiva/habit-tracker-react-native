import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const { signOut } = useAuth();
  return (
    <View style={styles.view}>
      <Text>Home Page</Text>
      <Button icon={"logout"} onPress={() => signOut()}>
        Sign Out
      </Button>
      <Ionicons size={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
