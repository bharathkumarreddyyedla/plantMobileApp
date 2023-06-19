import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/allScreens/homeScreen";
const HomeStack = createNativeStackNavigator();
const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="homeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
