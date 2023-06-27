import React from "react";
import { Text, View } from "react-native";
import Header from "../../components/customComponents/header";

const NotificationScreen = ({ navigation }) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: "#FEF9F1", paddingHorizontal: 20 }}
    >
      <View style={{ marginTop: 50 }}>
        <Header title={"Notifications"} navigation={navigation} />
        <Text>ksdjvn</Text>
      </View>
    </View>
  );
};

export default NotificationScreen;
