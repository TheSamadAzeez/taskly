import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  name: string;
  isCompleted?: boolean;
};

function ShoppingListItems({ name, isCompleted }: Props) {
  const handleDe1ete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}?`,
      "You can't undo this",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => console.log("deleting..."),
          style: "destructive",
        },
      ],
    );
  };
  return (
    <View
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          isCompleted ? styles.completedText : undefined,
        ]}
      >
        {name}
      </Text>
      {/* delete button */}
      <TouchableOpacity onPress={handleDe1ete} activeOpacity={0.7}>
        <MaterialIcons
          name="delete"
          size={20}
          color={isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </View>
  );
}

// styles for the App component
const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulean,
    paddingHorizontal: 10,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
    textTransform: "capitalize",
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
    color: theme.colorGrey,
  },
});

export default ShoppingListItems;
