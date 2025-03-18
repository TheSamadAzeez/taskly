import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { getFromStorage, saveToStorage } from "../utils/storage";

const storageKey = "shopping-list";

// ShoppingListItemType
type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp?: number;
};

// initial list of shopping items (mock data)
const initialList: ShoppingListItemType[] = [
  { id: "1", name: "coffee" },
  { id: "2", name: "tea" },
  { id: "3", name: "sugar" },
];

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [shoppingList, setShoppingList] = useState(initialList);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey);
      // console.log(data);
      if (data) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // animate the list when new item is added
        setShoppingList(data);
      }
    };
    fetchInitial();
  }, []);

  // function to handle submit submit event
  const handleSubmit = useCallback(() => {
    if (value) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // animate the list when new item is added
      const newShoppingList: ShoppingListItemType[] = [
        {
          id: new Date().toTimeString(),
          name: value,
          lastUpdatedTimestamp: Date.now(),
        },
        ...shoppingList,
      ];

      setShoppingList(newShoppingList);
      saveToStorage(storageKey, newShoppingList);
      setValue("");
    }
  }, [shoppingList, value]);

  // function to handle delete event
  const handleDelete = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // animate the list when new item is added
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    saveToStorage(storageKey, newShoppingList);
    setShoppingList(newShoppingList);
  };

  // function to handle toggle complete event
  const handleToggleComplete = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // animate the list when new item is added
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          lastUpdatedTimestamp: Date.now(),
          completedAtTimestamp: item.completedAtTimestamp
            ? undefined
            : Date.now(),
        };
      }
      return item;
    });
    saveToStorage(storageKey, newShoppingList);
    setShoppingList(newShoppingList);
  };

  const renderListHeader = useMemo(() => {
    return (
      // input field to add new shopping item
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
      contentContainerStyle={styles.containerStyle}
      data={orderShoppingList(shoppingList)} // data to render
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
          <ShoppingListItem
            name={item.name}
            onDelete={() => handleDelete(item.id)}
            onToggleComplete={() => handleToggleComplete(item.id)}
            isCompleted={Boolean(item.completedAtTimestamp)}
          />
        );
      }}
    />
  );
}

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
  return shoppingList.sort((item1, item2) => {
    // if both items are completed, sort by completed timestamp in descending order
    if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return item2.completedAtTimestamp - item1.completedAtTimestamp;
    }

    // if item1 is completed and item2 is not, item1 should come first
    if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return 1;
    }

    // if item2 is completed and item1 is not, item2 should come first
    if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return -1;
    }

    // if both items are not completed, sort by last updated timestamp in descending order
    if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      // added a fallback value of 0 in case lastUpdatedTimestamp is undefined
      const timestamp1 = item1.lastUpdatedTimestamp || 0;
      const timestamp2 = item2.lastUpdatedTimestamp || 0;

      return timestamp2 - timestamp1;
    }

    // if both items are not completed and have the same last updated timestamp, sort by name in ascending order
    return 0;
  });
}

// styles for the App component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    padding: 12,
  },
  containerStyle: {
    paddingBottom: 24,
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
