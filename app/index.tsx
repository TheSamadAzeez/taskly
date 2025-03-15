import { View, StyleSheet, TextInput, FlatList } from "react-native";
import { theme } from "../theme";
import ShoppingListItem from "../components/ShoppingListItem";
import { useState } from "react";

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

  // function to hans=dle submit submit event
  const handleSubmit = () => {
    if (value) {
      const newShoppingList: ShoppingListItemType[] = [
        { id: new Date().toTimeString(), name: value },
        ...shoppingList,
      ];

      setShoppingList(newShoppingList);
      setValue("");
    }
  };

  return (
    <View style={styles.container}>
      {/* input field to add new shopping item */}
      <TextInput
        style={styles.textInput}
        placeholder="E.g. Coffee"
        value={value}
        onChangeText={(text) => setValue(text)} // update the value state. we call also just pass in the setValue function e.g onChangeText={setValue}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />

      {/* list of shopping items */}
      <FlatList
        style={styles.container}
        data={shoppingList} // data to render
        renderItem={({ item }) => {
          return (
            // render the list of shopping items
            <ShoppingListItem name={item.name} isCompleted={item.isCompleted} />
          );
        }}
      />
    </View>
  );
}

// styles for the App component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    padding: 12,
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
