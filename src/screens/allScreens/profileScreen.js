import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { AuthContext } from "../../configs/contexts";

const ProfileScreen = () => {
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile</Text>
      <Button
        title={"Logout"}
        buttonStyle={{ marginTop: 20 }}
        onPress={() => {
          onLogot();
        }}
      />
    </View>
  );
};

export default ProfileScreen;
