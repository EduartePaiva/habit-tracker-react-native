import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "coral" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused, size }) => {
            if (focused) {
              return <FontAwesome5 name="home" color={color} size={size} />;
            } else {
              return <AntDesign name="home" color={color} size={size} />;
            }
          },
        }}
      />
      <Tabs.Screen name="login" options={{ title: "Login" }} />
    </Tabs>
  );
}
