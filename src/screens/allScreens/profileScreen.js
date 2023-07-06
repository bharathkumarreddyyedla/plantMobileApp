import React from "react";
import { Alert, Image, Pressable, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Button, Input } from "react-native-elements";
import { AuthContext, UserContext } from "../../configs/contexts";
import ExpoFastImage from "expo-fast-image";
import { useDispatch, useSelector } from "react-redux";
import ProfilePicOrChar from "../../components/customComponents/profilePicOrChar";
import { NativeIcon } from "../../icons/NativeIcons";
import * as ImagePicker from "expo-image-picker";
import { bindActionCreators } from "redux";
import { profileActions } from "../../services/redux/reduxActions/exportAllActions";
import { ImageManipulator } from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import Header from "../../components/customComponents/header";
import { appImages } from "../../configs/appImages";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { commonStyles } from "../../styles/commonStyles";
import { Camera, CameraType } from "expo-camera";
import CustomCamera from "../../components/customComponents/camera";

const ProfileScreen = ({ navigation }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "" } = userState || {};
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { profileUpdate } = bindActionCreators(profileActions, dispatch);
  const [showCamera, setShowCamera] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);
  const [hasPermission, setHasPermission] = React.useState(null);
  const [cameraBase64, setCameraBase64] = React.useState("");
  const [profileData, setProfileData] = React.useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    surName: profile?.surName || "",
    email: profile?.email || "",
    profilePicture: profile?.profilePicture,
  });
  React.useEffect(() => {
    if (cameraBase64) {
      setProfileData({
        ...profileData,
        profilePicture: cameraBase64?.includes("base64,")
          ? cameraBase64
          : "data:image/jpeg;base64," + cameraBase64,
      });
      setShowCamera(false);
    }
  }, [cameraBase64]);
  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true, // Retrieve base64 representation
      });

      if (!result.canceled) {
        const { assets } = result;

        if (assets.length > 0) {
          const { uri } = assets[0];
          const fileInfo = await FileSystem.getInfoAsync(uri);
          const fileSize = fileInfo.size;
          console.log("fileSize", fileSize);

          const maxSizeBytes = 2 * 1024 * 1024; // 2MB

          if (fileSize <= maxSizeBytes) {
            // Image size is within the limit
            console.log("Image size is within the limit");
            setProfileData({
              ...profileData,
              profilePicture: result.assets[0].base64?.includes("base64,")
                ? result.assets[0].base64
                : "data:image/jpeg;base64," + result.assets[0].base64,
            });
            // Proceed with further operations
          } else {
            // Image size exceeds the limit
            console.log("Image size exceeds the limit");
            Alert.alert("Image size exceeds the limit 2Mb");
            // Handle the case when the image size is too large
          }
        }
      }
    } catch (error) {
      console.log("Error picking an image:", error);
    }
  };
  const onUpdateProfile = () => {
    try {
      profileUpdate(profile?._id, profileData, token);
    } catch (err) {
      console.log(err);
    }
  };

  const onLogoClick = () => {
    return navigation.navigate("settingsScreen");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9F1" }}>
      {showCamera && (
        <CustomCamera
          setShowCamera={setShowCamera}
          setCameraBase64={setCameraBase64}
        />
      )}
      <View style={{ flex: 1, marginTop: 50, paddingHorizontal: 20 }}>
        <Header
          title={"Profile"}
          navigation={navigation}
          logo={appImages.settingsLogo}
          onLogoClick={onLogoClick}
        />
        {showOptions && (
          <Pressable
            onPress={() => {
              setShowOptions(!showOptions);
            }}
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "transparent",
              position: "absolute",
              marginLeft: 20,
              zIndex: 1000,
            }}
          >
            <View
              style={[
                commonStyles.miniCardShadowEffect,
                {
                  height: 80,
                  width: 150,
                  backgroundColor: "white",
                  position: "absolute",
                  top: 240,
                  right: 10,
                  borderRadius: 10,
                  zIndex: 1000,
                },
              ]}
            >
              <Pressable
                onPress={() => {
                  setShowCamera(!showCamera);
                  setShowOptions(!showOptions);
                }}
                style={{
                  height: "50%",
                  width: "100%",
                  borderBottomWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "500", color: "grey" }}
                >
                  Camera
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  openImagePicker();
                  setShowOptions(!showOptions);
                }}
                style={{
                  height: "50%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "grey" }}
                >
                  Gallery
                </Text>
              </Pressable>
            </View>
          </Pressable>
        )}
        <KeyboardAwareScrollView>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <ProfilePicOrChar
              image={profileData?.profilePicture || ""}
              name={profile?.firstName?.charAt("0").toUpperCase()}
              styleProp={{ width: 200, height: 200, borderRadius: 100 }}
            />
            <Pressable
              onPress={() => {
                setShowOptions(!showOptions);
              }}
              style={{
                position: "absolute",
                height: 30,
                width: 30,
                backgroundColor: "white",
                left: "58%",
                borderWidth: 1,
                bottom: 10,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NativeIcon
                iconName={"camera"}
                iconLib={"Feather"}
                iconSize={20}
                iconColor={"black"}
              />
            </Pressable>
          </View>
          <View style={{ marginTop: 30 }}>
            <Input
              placeholder="Full name"
              autoCapitalize="none"
              value={profileData?.firstName}
              placeholderTextColor={"grey"}
              errorStyle={{ color: "red" }}
              errorMessage=""
              onChangeText={(val) => {
                setProfileData({
                  ...profileData,
                  firstName: val,
                });
              }}
            />
            <Input
              placeholder="Sur name"
              autoCapitalize="none"
              value={profileData?.surName}
              placeholderTextColor={"grey"}
              errorStyle={{ color: "red" }}
              errorMessage=""
              onChangeText={(val) => {
                setProfileData({
                  ...profileData,
                  surName: val,
                });
              }}
            />
            <Input
              placeholder="Email"
              disabled={true}
              autoCapitalize="none"
              value={profileData?.email}
              placeholderTextColor={"grey"}
              errorStyle={{ color: "red" }}
              errorMessage=""
              onChangeText={(val) => {
                setProfileData({
                  ...profileData,
                  email: val,
                });
              }}
            />
          </View>
          <Button
            title={"Update"}
            buttonStyle={{
              marginTop: 20,
              backgroundColor: "#56A434",
              width: "70%",
              alignSelf: "center",
            }}
            onPress={() => {
              onUpdateProfile();
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;
