import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider as ReduxProvider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import store from "./src/services/redux/reduxStore/store";
import AuthNavigator from "./src/navigators/authNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "react-native-elements";
import { theme } from "./src/themes/colorsTheme";

const RootStack = createNativeStackNavigator();

export default function App() {
  const renderScreens = () => {
    return <RootStack.Screen name={"Auth"} component={AuthNavigator} />;
  };
  return (
    // <ReduxProvider store={store}>
    //   <AuthContext.Provider value={auth}>
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {renderScreens()}
        </RootStack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
    //   </AuthContext.Provider>
    // </ReduxProvider>
  );
}
