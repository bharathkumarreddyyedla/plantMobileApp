import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { AuthContext } from "../../configs/contexts";

const HomeScreen = () => {
  const { logout } = React.useContext(AuthContext);
  const onLogot = async () => {
    try {
      const logutResponse = await logout();
      console.log("logutResponse", logutResponse);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Text>homeScreen</Text>
      <Button
        title={"Logout"}
        onPress={() => {
          onLogot();
        }}
      />
    </View>
  );
};

export default HomeScreen;
