import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

// Track if channel is already created
let channelCreated = false;

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android" && !channelCreated) {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      showBadge: false,
    });
    channelCreated = true;
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      return status;
    } else {
      return existingStatus;
    }
  } else {
    return null;
  }
}
