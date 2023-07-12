import { Input } from "@rneui/themed";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { FontAwesome5 } from "react-native-vector-icons";
import { AuthContext } from "../../configs/contexts";
import { API_URL } from "@env";
import { NativeIcon } from "../../icons/NativeIcons";
import { Constants } from "../../configs/constants";
import { validateInput } from "../../configs/Validations";
const SignInScreen = ({ navigation }) => {
  const { login } = React.useContext(AuthContext);
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const loginForm = {
    email: {
      value: loginData?.email,
      validations: [
        {
          type: Constants.VALIDATIONS_TYPE.EMAIL_PATERN,
          message: Constants.ErrorMessage.EMAIL_REGX,
        },
        {
          type: Constants.VALIDATIONS_TYPE.REQ,
          message: Constants.ErrorMessage.EMAIL_REQUIRED,
        },
      ],
    },
    password: {
      value: loginData?.password,
      validations: [
        // {
        //   type: Constants.VALIDATIONS_TYPE.PSWRD,
        //   message: Constants.ErrorMessage.PASSWORD_REQUIRD,
        // },
        {
          type: Constants.VALIDATIONS_TYPE.REQ,
          message: Constants.ErrorMessage.PASSWORD_REQUIRD,
        },
      ],
    },
  };
  const onEmailChange = (emailVal) => {
    setLoginData({
      ...loginData,
      email: emailVal,
    });
    if (emailVal === "") {
      setEmailErrorMessage("");
    }
    if (emailVal) {
      if (emailVal.startsWith(" ")) {
        setRegisterData({
          ...registerData,
          email: "",
        });
      } else {
        loginForm.email.value = emailVal;
        const { errors, valid } = validateInput({
          email: loginForm.email,
        });
        if (!valid) {
          setEmailErrorMessage(errors.email);
        } else {
          setEmailErrorMessage("");
        }
      }
    }
  };
  const onPasswordChange = (passwordVal) => {
    setLoginData({
      ...loginData,
      password: passwordVal,
    });
    if (passwordVal) {
      loginForm.password.value = passwordVal;
      const { errors, valid } = validateInput({
        password: loginForm.password,
      });
      if (!valid) {
        setPasswordErrorMessage(errors.password);
      } else {
        setPasswordErrorMessage("");
      }
    }
  };
  const setFormErrorMessage = (errors) => {
    if (errors.email) {
      setEmailErrorMessage(errors.email);
    }
    if (errors.password) {
      setPasswordErrorMessage(errors.password);
    }
  };
  const onLoginClick = async () => {
    try {
      const { errors, valid } = validateInput(loginForm);
      console.log("errors", errors, valid);
      if (!valid) {
        setFormErrorMessage(errors);
      } else {
        const loginResponse = await login(loginData.email, loginData.password);
        console.log("loginResponse", loginResponse);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <ScrollView>
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

            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sign in</Text>
            <Text
              onPress={() => {
                navigation.navigate("registration");
              }}
              style={{ fontSize: 12, fontWeight: "400", color: "grey" }}
            >
              New to leafy?{" "}
              <Text style={{ color: "black", fontWeight: "bold" }}>
                sign up
              </Text>
            </Text>
          </View>
          <View style={{}}>
            <Input
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={loginData?.email}
              placeholderTextColor={"grey"}
              errorStyle={{ color: "red" }}
              errorMessage={emailErrorMessage || ""}
              onChangeText={(val) => {
                onEmailChange(val);
              }}
            />
            <Input
              placeholder="Password"
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry={!showPassword}
              rightIcon={
                showPassword ? (
                  <Pressable
                    style={{
                      height: "100%",
                      width: 30,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    <NativeIcon
                      iconName={"eye"}
                      iconLib={"FontAwesome"}
                      iconSize={20}
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    style={{
                      height: "100%",
                      width: 30,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    <NativeIcon
                      iconName={"eye-slash"}
                      iconLib={"FontAwesome"}
                      iconSize={20}
                      iconColor={"black"}
                    />
                  </Pressable>
                )
              }
              value={loginData?.password}
              placeholderTextColor={"grey"}
              errorStyle={{ color: "red" }}
              errorMessage={passwordErrorMessage || ""}
              onChangeText={(val) => {
                onPasswordChange(val);
              }}
            />
            <Text
              style={{
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
                paddingHorizontal: 10,
              }}
            >
              Forgot password?{" "}
            </Text>
            <View style={{ paddingHorizontal: 10 }}>
              <Button
                title={"Sign in"}
                onPress={() => {
                  onLoginClick();
                }}
                buttonStyle={{
                  backgroundColor: "#56A434",
                  borderRadius: 20,
                  marginVertical: 10,
                  height: 40,
                }}
              />
              <Button
                title={"Sign in with Google"}
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
      </ScrollView>
    </View>
  );
};

export default SignInScreen;
