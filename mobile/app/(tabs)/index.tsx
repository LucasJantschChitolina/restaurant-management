import { Button, StyleSheet } from "react-native";

import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { useSession } from "../context";

export default function TabOneScreen() {
  const { signOut, session } = useSession();

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text>Welcome, {session}</Text>
      <View
        style={styles.separator}
      />
      <Text>Edit screen info</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});