import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignInScreen from "../screens/loginScreens/signInScreen";
import SignUpScreen from "../screens/loginScreens/signUpScreen";
const AuthStack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="login" component={SignInScreen} />
      <AuthStack.Screen name="registration" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
