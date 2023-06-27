import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// export default async function registerForPushNotificationsAsync() {
//   let token;
//   if (Platform.OS === "android") {
//     const { status } = await Notifications.getPermissionsAsync();
//     if (status !== "granted") {
//       const { status: askStatus } =
//         await Notifications.requestPermissionsAsync();
//       if (askStatus !== "granted") {
//         return;
//       }
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//   } else {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status: askStatus } =
//         await Notifications.requestPermissionsAsync();
//       finalStatus = askStatus;
//     }
//     if (finalStatus !== "granted") {
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//   }
//   console.log("token", token);
//   return token;
// }

export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log("token", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};
