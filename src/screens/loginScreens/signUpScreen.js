import { Input } from "@rneui/themed";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { AuthContext } from "../../configs/contexts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUpScreen = () => {
  const { register } = React.useContext(AuthContext);
  const [registerData, setRegisterData] = React.useState({
    firstName: "",
    surName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onRegisterClick = async () => {
    try {
      const registerResponse = await register(
        registerData.firstName,
        registerData.surName,
        registerData?.email,
        registerData.password
      );
      console.log("registerResponse", registerResponse);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <KeyboardAvoidingView>
        <KeyboardAwareScrollView>
          <Image
            source={require("../../../assets/images/leafySignInLogo.png")}
            style={{ height: 300, width: "100%" }}
            resizeMode="stretch"
          />
          <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}>
            <View style={{ minHeight: 70, width: "100%" }}>
              <Image
                source={require("../../../assets/images/leafLogo.png")}
                style={{
                  height: 40,
                  width: "100%",
                  position: "absolute",
                  right: 73,
                  bottom: 53,
                }}
                resizeMode="contain"
              />

              <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sign up</Text>
            </View>
            <View style={{}}>
              <Input
                placeholder="Full name"
                autoCapitalize="none"
                value={registerData?.firstName}
                placeholderTextColor={"grey"}
                errorStyle={{ color: "red" }}
                errorMessage=""
                onChangeText={(val) => {
                  setRegisterData({
                    ...registerData,
                    firstName: val,
                  });
                }}
              />
              <Input
                placeholder="Sur name"
                autoCapitalize="none"
                value={registerData?.surName}
                placeholderTextColor={"grey"}
                errorStyle={{ color: "red" }}
                errorMessage=""
                onChangeText={(val) => {
                  setRegisterData({
                    ...registerData,
                    surName: val,
                  });
                }}
              />
              <Input
                placeholder="Email"
                autoCapitalize="none"
                value={registerData?.email}
                placeholderTextColor={"grey"}
                errorStyle={{ color: "red" }}
                errorMessage=""
                onChangeText={(val) => {
                  setRegisterData({
                    ...registerData,
                    email: val,
                  });
                }}
              />
              <Input
                placeholder="Password"
                autoCapitalize="none"
                value={registerData?.password}
                placeholderTextColor={"grey"}
                errorStyle={{ color: "red" }}
                errorMessage=""
                onChangeText={(val) => {
                  setRegisterData({
                    ...registerData,
                    password: val,
                  });
                }}
              />
              <Input
                placeholder="Confirm password"
                autoCapitalize="none"
                value={registerData?.confirmPassword}
                placeholderTextColor={"grey"}
                errorStyle={{ color: "red" }}
                errorMessage=""
                onChangeText={(val) => {
                  setRegisterData({
                    ...registerData,
                    confirmPassword: val,
                  });
                }}
              />
              {/* <Text style={{fontSize:14,color:'black',fontWeight:'bold',paddingHorizontal:10}}>Forgot password? </Text> */}
              <View style={{ paddingHorizontal: 10 }}>
                <Button
                  title={"Sign up"}
                  onPress={() => {
                    onRegisterClick();
                  }}
                  buttonStyle={{
                    backgroundColor: "#56A434",
                    borderRadius: 20,
                    marginVertical: 10,
                    height: 40,
                  }}
                />
                <Button
                  title={"Sign up with Google"}
                  icon={
                    <Icon
                      name="google"
                      type="font-awesome-5"
                      size={20}
                      color={"blue"}
                      style={{ marginRight: 10 }}
                    />
                  }
                  buttonStyle={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    marginVertical: 10,
                    height: 40,
                    borderWidth: 1,
                    borderColor: "black",
                  }}
                  titleStyle={{ color: "black" }}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;
