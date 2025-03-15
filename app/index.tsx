import { StyleSheet, View } from "react-native";
import { theme } from "../theme";
import ShoppingListItem from "../components/ShoppingListItem";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Link
        href="/counter"
        style={{
          textAlign: "center",
          marginBottom: 18,
          textTransform: "capitalize",
          fontSize: 18,
        }}
      >
        go to counter
      </Link>
      <ShoppingListItem name="coffee" />
      <ShoppingListItem name="tea" />
      <ShoppingListItem name="sugar" isCompleted />
    </View>
  );
}

// styles for the App component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
    padding: 20,
  },
});
