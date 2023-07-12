import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider as ReduxProvider } from "react-redux";
import { Platform, StyleSheet, Text, View } from "react-native";
import store from "./src/services/redux/reduxStore/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "react-native-elements";
import { theme } from "./src/themes/colorsTheme";
import { AuthContext, UserContext } from "./src/configs/contexts";
import { Provider } from "react-native-paper";
import Interceptors from "./src/services/interceptor";
import AuthInterceptors from "./src/services/authInterceptors";
import { useAuth } from "./src/services/auth";
import { PaperTheme } from "./src/themes/paperTheme";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn); // it's good to explicitly catch and inspect any error

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      console.log("exis", existingStatus);
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("token:", token);
    AsyncStorage.setItem("firebaseToken", JSON.stringify(token));
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
}

const RootStack = createNativeStackNavigator();

export default function App() {
  const { auth, state = {} } = useAuth();
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const renderScreens = () => {
    return state?.user && state?.user?.token ? (
      <RootStack.Screen
        name="HomeStack"
        component={Interceptors}
        initialParams={{ userData: state?.user, token: state?.user?.token }}
      />
    ) : (
      <RootStack.Screen name={"Auth"} component={AuthInterceptors} />
    );
  };
  return (
    <ReduxProvider store={store}>
      <Provider theme={PaperTheme}>
        {/* <ThemeProvider theme={theme}> */}
        <AuthContext.Provider value={auth}>
          <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
              {renderScreens()}
            </RootStack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
        {/* </ThemeProvider> */}
      </Provider>
    </ReduxProvider>
  );
}
