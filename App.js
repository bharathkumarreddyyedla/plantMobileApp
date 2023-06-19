import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider as ReduxProvider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
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

const RootStack = createNativeStackNavigator();

export default function App() {
  const { auth, state={} } = useAuth();
  const renderScreens = () => {
    console.log("state", state);
    return state?.user && state?.user?.token ? (
      <>
        <RootStack.Screen name="HomeStack">
          {() => (
            <UserContext.Provider
              value={{
                userState: state.user,
              }}
            >
              <Interceptors token={state?.user?.token} />
            </UserContext.Provider>
          )}
        </RootStack.Screen>
      </>
    ) : (
      <RootStack.Screen name={"Auth"}>
        {() => <AuthInterceptors />}
      </RootStack.Screen>
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
