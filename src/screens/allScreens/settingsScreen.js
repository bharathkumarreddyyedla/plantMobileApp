import React from "react";
import { Switch, Text, View } from "react-native";
import Header from "../../components/customComponents/header";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import { AuthContext, UserContext } from "../../configs/contexts";
import { bindActionCreators } from "redux";
import { profileActions } from "../../services/redux/reduxActions/exportAllActions";

const SettingsScreen = ({ navigation }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "" } = userState || {};
  const { logout } = React.useContext(AuthContext);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { profileUpdate } = bindActionCreators(profileActions, dispatch);
  const [isEnabled, setIsEnabled] = React.useState(
    profile?.notificationEnabled || false
  );
  const onLogot = async () => {
    try {
      const logutResponse = await logout();
      console.log("logutResponse", logutResponse);
    } catch (err) {
      console.log(err);
    }
  };
  const onUpdateProfile = (val) => {
    try {
      setIsEnabled(!isEnabled);
      profileUpdate(profile?._id, { notificationEnabled: val }, token);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9F1" }}>
      <View style={{ flex: 1, marginTop: Platform.OS === "ios" ? 50 : 0, paddingHorizontal: 20 }}>
        <Header title={"Settings"} navigation={navigation} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Push Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              onUpdateProfile(!isEnabled);
            }}
            value={isEnabled}
          />
        </View>
        <Button
          title={"Logout"}
          buttonStyle={{
            marginTop: 20,
            backgroundColor: "red",
            borderRadius: 10,
            width: "50%",
            alignSelf: "center",
          }}
          onPress={() => {
            onLogot();
          }}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
