import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-elements";

const SignInScreen = () => {
  const { theme } = useTheme();
  console.log("object", theme);
  return (
    <View>
      <Text style={{ color: theme.colors.error }}>SignInScreen</Text>
    </View>
  );
};

export default SignInScreen;
