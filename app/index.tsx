import { View, StyleSheet, TextInput, FlatList, Text } from "react-native";
import { theme } from "../theme";
import ShoppingListItem from "../components/ShoppingListItem";
import { useCallback, useMemo, useState } from "react";

// ShoppingListItemType
type ShoppingListItemType = {
  id: string;
  name: string;
  isCompleted?: boolean;
};

// initial list of shopping items (mock data)
const initialList: ShoppingListItemType[] = [
  { id: "1", name: "coffee" },
  { id: "2", name: "tea" },
  { id: "3", name: "sugar", isCompleted: true },
];

export default function App() {
  const [shoppingList, setShoppingList] = useState(initialList);
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(() => {
    if (value) {
      const newShoppingList: ShoppingListItemType[] = [
        { id: new Date().toTimeString(), name: value },
        ...shoppingList,
      ];

      setShoppingList(newShoppingList);
      setValue("");
    }
  }, [shoppingList, value]);

  const renderListHeader = useMemo(() => {
    return (
      <TextInput
        style={styles.textInput}
        placeholder="E.g. Coffee"
        value={value}
        onChangeText={(text) => setValue(text)} // update the value state. we call also just pass in the setValue function e.g onChangeText={setValue}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
    );
  }, [handleSubmit, value]);

  return (
    //* list of shopping items
    <FlatList
      style={styles.container}
      data={shoppingList} // data to render
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text style={{ textTransform: "capitalize", fontSize: 15 }}>
            Your shopping list is empty
          </Text>
        </View>
      }
      ListHeaderComponent={renderListHeader}
      renderItem={({ item }) => {
        return (
          // render the list of shopping items
          <ShoppingListItem name={item.name} isCompleted={item.isCompleted} />
        );
      }}
    />
  );
}

// styles for the App component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    padding: 12,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 15,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,
  },
});
