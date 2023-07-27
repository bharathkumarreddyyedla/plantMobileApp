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
import { appImages } from "../../configs/appImages";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignInScreen = ({ navigation }) => {
  const { login } = React.useContext(AuthContext);
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   iosClientId:
  //     "221059836769-t9fc1c28ruud8admu7eghqkdf9lcaa44.apps.googleusercontent.com",
  //   androidClientId:
  //     "221059836769-hosbio25vhdq5vqp2anfc09ges7q1p7h.apps.googleusercontent.com",
  //   expoClientId: "https://auth.expo.io/@leafy/leafy",
  // });
  // const [token, setToken] = React.useState("");
  // const [userInfo, setUserInfo] = React.useState(null);
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
        {
          type: Constants.VALIDATIONS_TYPE.REQ,
          message: Constants.ErrorMessage.PASSWORD_REQUIRD,
        },
      ],
    },
  };
  // React.useEffect(() => {
  //   handleEffect();
  // }, [response, token]);

  // async function handleEffect() {
  //   const user = await getLocalUser();
  //   console.log("user", user);
  //   if (!user) {
  //     if (response?.type === "success") {
  //       // setToken(response.authentication.accessToken);
  //       getUserInfo(response.authentication.accessToken);
  //     }
  //   } else {
  //     setUserInfo(user);
  //     setLoginData({
  //       ...loginData,
  //       email: user?.email,
  //     });
  //     console.log("loaded locally");
  //   }
  // }
  // const getLocalUser = async () => {
  //   const data = await AsyncStorage.getItem("@googleUserInfo");
  //   if (!data) return null;
  //   return JSON.parse(data);
  // };

  // const getUserInfo = async (token) => {
  //   if (!token) return;
  //   try {
  //     console.log("google token", token);
  //     const response = await fetch(
  //       "https://www.googleapis.com/userinfo/v2/me",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     const user = await response.json();
  //     await AsyncStorage.setItem("@googleUserInfo", JSON.stringify(user));
  //     setUserInfo(user);
  //     setLoginData({
  //       ...loginData,
  //       email: user?.email,
  //     });
  //   } catch (error) {
  //     // Add your own error handler here
  //   }
  // };
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
          style={{ height: 250, width: "100%" }}
          resizeMode="stretch"
        />
        <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 30 }}>
          <View style={{ minHeight: 70, width: "100%" }}>
            <Image
              source={require("../../../assets/images/leafLogo.png")}
              style={{
                height: 50,
                width: "100%",
                position: "absolute",
                right: 80,
                bottom: 55,
              }}
              resizeMode="contain"
            />

            <Text style={{ fontSize: 24, fontFamily: "MB" }}>Sign in</Text>
            <Text
              onPress={() => {
                navigation.navigate("registration");
              }}
              style={{ fontSize: 14, fontFamily: "MM", lineHeight: 20 }}
            >
              New to leafy?{" "}
              <Text
                style={{ fontSize: 14, color: "black", fontWeight: "bold" }}
              >
                sign up
              </Text>
            </Text>
          </View>
          <View style={{ paddingHorizontal: 30 }}>
            <Input
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              containerStyle={{ height: 60 }}
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
              containerStyle={{ height: 60 }}
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
                fontSize: 16,
                color: "black",
                fontFamily: "MB",
                paddingHorizontal: 10,
                marginBottom: 30,
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
                  height: 50,
                }}
              />
              <Button
                title={"Sign in with Google"}
                icon={
                  <Image
                    source={appImages.googleLogo}
                    style={{ height: 25, width: 25, marginRight: 5 }}
                    resizeMode="cover"
                  />
                }
                // onPress={() => {
                //   promptAsync();
                // }}
                buttonStyle={{
                  backgroundColor: "white",
                  borderRadius: 20,
                  marginVertical: 10,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "black",
                }}
                titleStyle={{ color: "black" }}
              />
              {/* <Button
                title={"remove"}
                icon={
                  <Image
                    source={appImages.googleLogo}
                    style={{ height: 25, width: 25, marginRight: 5 }}
                    resizeMode="cover"
                  />
                }
                onPress={async () => {
                  await AsyncStorage.removeItem("@googleUserInfo");
                }}
                buttonStyle={{
                  backgroundColor: "white",
                  borderRadius: 20,
                  marginVertical: 10,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "black",
                }}
                titleStyle={{ color: "black" }}
              /> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;
