import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/allScreens/homeScreen";
import SearchScreen from "../screens/allScreens/searchScreen";
import ProfileScreen from "../screens/allScreens/profileScreen";
import WhishlistScreen from "../screens/allScreens/whishlistScreen";
import CommunityScreen from "../screens/allScreens/communityScreen";
import QuestionaryScreen from "../screens/allScreens/questionaryScreen";
import NotificationScreen from "../screens/allScreens/notificationScreen";
import SettingsScreen from "../screens/allScreens/settingsScreen";
import PlantDetailsScreen from "../screens/allScreens/plantDetailsScreen";
import AddPlantScreen from "../screens/allScreens/addPlantScreen";
import MyPlantsScreen from "../screens/allScreens/myPlantsScreen";
import PlantProgressScreen from "../screens/allScreens/plantProgressScreen";
import AddPlantProgress from "../screens/allScreens/addPlantProgress";
const HomeStack = createNativeStackNavigator();
const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="homeScreen" component={HomeScreen} />
      <HomeStack.Screen name="searchScreen" component={SearchScreen} />
      <HomeStack.Screen name="profileScreen" component={ProfileScreen} />
      <HomeStack.Screen name="whishlistScreen" component={WhishlistScreen} />
      <HomeStack.Screen name="communityScreen" component={CommunityScreen} />
      <HomeStack.Screen name="questinaryScreen" component={QuestionaryScreen} />
      <HomeStack.Screen
        name="notificationScreen"
        component={NotificationScreen}
      />
      <HomeStack.Screen name="settingsScreen" component={SettingsScreen} />
      <HomeStack.Screen name="addPlantScreen" component={AddPlantScreen} />
      <HomeStack.Screen
        name="plantDetailsScreen"
        component={PlantDetailsScreen}
      />
      <HomeStack.Screen name="myPlantsScreen" component={MyPlantsScreen} />
      <HomeStack.Screen
        name="plantProgressScreen"
        component={PlantProgressScreen}
      />
      <HomeStack.Screen name="addPlantProgress" component={AddPlantProgress} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
