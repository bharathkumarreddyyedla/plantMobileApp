import { Input } from "@rneui/themed";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { AuthContext } from "../../configs/contexts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NativeIcon } from "../../icons/NativeIcons";
import { Constants } from "../../configs/constants";
import { validateInput } from "../../configs/Validations";

const SignUpScreen = () => {
  const { register } = React.useContext(AuthContext);
  const [registerData, setRegisterData] = React.useState({
    firstName: "",
    surName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState("");
  const [surNameErrorMessage, setSurNameErrorMessage] = React.useState("");
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    React.useState("");
  const registrationForm = {
    firstName: {
      value: registerData?.firstName,
      validations: [
        {
          type: Constants.VALIDATIONS_TYPE.MINLENGTH,
          message: Constants.ErrorMessage.MINLENGTH_REQUIRED,
          length: 3,
        },
        {
          type: Constants.VALIDATIONS_TYPE.REQ,
          message: Constants.ErrorMessage.NAME_REQUIRED,
        },
      ],
    },
    surName: {
      value: registerData?.surName,
      validations: [
        {
          type: Constants.VALIDATIONS_TYPE.MINLENGTH,
          message: Constants.ErrorMessage.MINLENGTH_REQUIRED,
          length: 3,
        },
        {
          type: Constants.VALIDATIONS_TYPE.REQ,
          message: Constants.ErrorMessage.NAME_REQUIRED,
        },
      ],
    },

    email: {
      value: registerData?.email,
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
      value: registerData?.password,
      validations: [
        {
          type: Constants.VALIDATIONS_TYPE.PSWRD,
          message: Constants.ErrorMessage.PASSWORD_REQUIRD,
        },
        {
          type: Constants.VALIDATIONS_TYPE.REQ,
          message: Constants.ErrorMessage.PASSWORD_REQUIRD,
        },
      ],
    },
    confirmPassword: {
      value: registerData?.confirmPassword,
      validations: [
        {
          type: Constants.VALIDATIONS_TYPE.MATCH_PASWRD,
          message: Constants.ErrorMessage.PASSWORD_MATCH,
        },
        {
          type: Constants.VALIDATIONS_TYPE.REQ,
          message: Constants.ErrorMessage.CPASSWORD_REQUIRD,
        },
      ],
    },
  };
  const onFirstNameChange = (firstName) => {
    setRegisterData({
      ...registerData,
      firstName: firstName,
    });
    if (firstName === "") {
      setFirstNameErrorMessage("");
    }
    if (firstName) {
      if (firstName.startsWith(" ")) {
        setRegisterData({
          ...registerData,
          firstName: "",
        });
      } else {
        registrationForm.firstName.value = firstName;
        const { errors, valid } = validateInput({
          firstName: registrationForm.firstName,
        });
        if (!valid) {
          setFirstNameErrorMessage(errors.firstName);
        } else {
          setFirstNameErrorMessage("");
        }
      }
    }
  };
  const onSurNameChange = (surName) => {
    setRegisterData({
      ...registerData,
      surName: surName,
    });
    if (surName === "") {
      setSurNameErrorMessage("");
    }
    if (surName) {
      if (surName.startsWith(" ")) {
        setRegisterData({
          ...registerData,
          surName: "",
        });
      } else {
        registrationForm.surName.value = surName;
        const { errors, valid } = validateInput({
          surName: registrationForm.surName,
        });
        if (!valid) {
          setSurNameErrorMessage(errors.surName);
        } else {
          setSurNameErrorMessage("");
        }
      }
    }
  };
  const onEmailChange = (emailVal) => {
    setRegisterData({
      ...registerData,
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
        registrationForm.email.value = emailVal;
        const { errors, valid } = validateInput({
          email: registrationForm.email,
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
    setRegisterData({
      ...registerData,
      password: passwordVal,
      confirmPassword: "",
    });

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$_])[A-Za-z\d@$_]{8,15}$/;
    if (passwordVal === "") {
      setPasswordErrorMessage("");
    }
    if (passwordVal) {
      registrationForm.password.value = passwordVal;
      const { errors, valid } = validateInput({
        password: registrationForm.password,
      });
      if (!valid) {
        setPasswordErrorMessage(errors.password);
      } else if (!regex.test(passwordVal)) {
        setPasswordErrorMessage(Constants.ErrorMessage.PSWRD_VALIDATION);
      } else {
        setPasswordErrorMessage("");
      }
    }
  };
  const onConfirmPasswordChange = (confirmPasswordVal) => {
    setRegisterData({
      ...registerData,
      confirmPassword: confirmPasswordVal,
    });
    if (confirmPasswordVal === "") {
      setConfirmPasswordErrorMessage("");
    }
    if (confirmPasswordVal) {
      registrationForm.confirmPassword.value = confirmPasswordVal;
      const { errors, valid } = validateInput({
        confirmPassword: registrationForm.confirmPassword,
        password: registrationForm.password,
      });
      if (!valid) {
        setConfirmPasswordErrorMessage(errors.confirmPassword);
      } else {
        setConfirmPasswordErrorMessage("");
      }
    }
  };
  const setFormErrorMessage = (errors) => {
    if (errors.firstName) {
      setFirstNameErrorMessage(errors.firstName);
    }
    if (errors.surName) {
      setSurNameErrorMessage(errors.surName);
    }
    if (errors.email) {
      setEmailErrorMessage(errors.email);
    }
    if (errors.password) {
      setPasswordErrorMessage(errors.password);
    }
    if (errors.confirmPassword) {
      setConfirmPasswordErrorMessage(errors.confirmPassword);
    }
  };
  const onRegisterClick = async () => {
    try {
      const { errors, valid } = validateInput(registrationForm);
      console.log("errors", errors, valid);
      if (registerData?.password === "") {
        setPasswordErrorMessage(Constants.ErrorMessage.PASSWORD_REQUIRD);
      }
      if (!valid) {
        setFormErrorMessage(errors);
      } else {
        const registerResponse = await register(
          registerData.firstName,
          registerData.surName,
          registerData?.email,
          registerData.password
        );
        console.log("registerResponse", registerResponse);
      }
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
                errorMessage={firstNameErrorMessage || ""}
                onChangeText={(val) => {
                  onFirstNameChange(val);
                }}
              />
              <Input
                placeholder="Sur name"
                autoCapitalize="none"
                value={registerData?.surName}
                placeholderTextColor={"grey"}
                errorStyle={{ color: "red" }}
                errorMessage={surNameErrorMessage || ""}
                onChangeText={(val) => {
                  onSurNameChange(val)
                }}
              />
              <Input
                placeholder="Email"
                autoCapitalize="none"
                textContentType="emailAddress"
                value={registerData?.email}
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
                value={registerData?.password}
                placeholderTextColor={"grey"}
                errorStyle={{ color: "red" }}
                errorMessage={passwordErrorMessage || ""}
                onChangeText={(val) => {
                  onPasswordChange(val);
                }}
              />
              <Input
                placeholder="Confirm password"
                autoCapitalize="none"
                value={registerData?.confirmPassword}
                textContentType="password"
                secureTextEntry={!showConfirmPassword}
                rightIcon={
                  showConfirmPassword ? (
                    <Pressable
                      style={{
                        height: "100%",
                        width: 30,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        setShowConfirmPassword(!showConfirmPassword);
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
                        setShowConfirmPassword(!showConfirmPassword);
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
                placeholderTextColor={"grey"}
                errorStyle={{ color: "red" }}
                errorMessage={confirmPasswordErrorMessage || ""}
                onChangeText={(val) => {
                  onConfirmPasswordChange(val);
                }}
              />
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
