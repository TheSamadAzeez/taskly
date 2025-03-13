import { Alert, StyleSheet, View } from 'react-native';
import { theme } from './theme';
import ShoppingListItem from './components/ShoppingListItem';

export default function App() {
  return (
    <View style={styles.container}>
      <ShoppingListItem name='coffee' />
      <ShoppingListItem name='tea' />
      <ShoppingListItem name='sugar' />
    </View>
  );
}

// styles for the App component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: 'center',
    padding: 20,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulean,
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 18,
    fontWeight: '200',
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
