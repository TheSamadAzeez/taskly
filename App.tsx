import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from './theme';

export default function App() {
  const handleDe1ete = () => {
    Alert.alert(
      'Are you sure you want to delete this?',
      "You can't undo this",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => console.log('deleting...'),
          style: 'destructive',
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      {/* header section */}
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Coffee</Text>
        {/* button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleDe1ete}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
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
