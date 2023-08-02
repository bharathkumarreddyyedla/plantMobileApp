import React from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/customComponents/header";
import { appImages } from "../../configs/appImages";
import { useDispatch, useSelector } from "react-redux";
import CustomCamera from "../../components/customComponents/camera";
import { Magnetometer } from "expo-sensors";
import { Button, CheckBox, Input } from "react-native-elements";
import { UserContext } from "../../configs/contexts";
import {
  savePlantProgress,
  saveToProgress,
  updateToProgress,
} from "../../services/redux/reduxActions/plantActions";
import { validateInput } from "../../configs/Validations";
import { Constants } from "../../configs/constants";
import { bindActionCreators } from "redux";
import { plantActions } from "../../services/redux/reduxActions/exportAllActions";
import { getAllPost } from "../../services/redux/reduxActions/postActions";
import PopupCard from "../../components/customComponents/PopupCard";
import { NativeIcon } from "../../icons/NativeIcons";

const AddPlantProgress = ({ navigation, route }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  const { editDetails = {}, plantID = "", screen = "" } = route?.params || {};
  const dispatch = useDispatch();
  const { setPlantMessage } = bindActionCreators(plantActions, dispatch);
  const [imageUrl, setImageUrl] = React.useState("");
  const { myPlantDetails } = useSelector((state) => state?.plants);
  const { userLocation, userAddress } = useSelector((state) => state.home);
  const [showCamera, setShowCamera] = React.useState(false);
  const [direction, setDirection] = React.useState("N/A");
  const [cameraBase64, setCameraBase64] = React.useState("");
  const [plantNotesErrorMessage, setPlantNotesErrorMessage] =
    React.useState("");
  const [plantPositionErrorMessage, setPlantPositionErrorMessage] =
    React.useState("");
  const [plantLocationErrorMessage, setPlantLocationErrorMessage] =
    React.useState("");
  const [progressData, setProgressData] = React.useState({
    _id: editDetails?._id,
    plantId: editDetails?.plantId,
    picture: editDetails?.picture || "",
    plantDob: editDetails?.plantDob || new Date(),
    perenulaPlantId:
      editDetails?.perenulaPlantId || myPlantDetails?.perenulaPlantId,
    plantName: editDetails?.plantName || myPlantDetails?.plantName,
    plantNotes: editDetails?.plantNotes || "",
    share: editDetails?.share || true,
    platPosition: "",
    plantLat: editDetails?.plantLat || "",
    plantLong: editDetails?.plantLong || "",
    city: "",
    state: "",
  });
  const [popupData, setPopupData] = React.useState({
    message: "",
    title: "",
    onSubmit: () => {
      return;
    },
    onCancel: () => {
      return;
    },
  });
  const addPlantProgressForm = {
    plantNotes: {
      value: progressData?.plantNotes,
      validations: [
        {
          type: Constants.VALIDATIONS_TYPE.MINLENGTH,
          message: Constants.ErrorMessage.MINLENGTH_REQUIRED,
          length: 3,
        },
        {
          type: Constants.VALIDATIONS_TYPE.REQ,
          message: Constants.ErrorMessage.NOTES_REQUIRED,
        },
      ],
    },
    platPosition: {
      value: progressData?.platPosition,
      validations: [
        {
          type: Constants.VALIDATIONS_TYPE.REQ,
          message: Constants.ErrorMessage.POSITION_REQUIRED,
        },
      ],
    },
    city: {
      value: progressData?.city,
      validations: [
        {
          type: Constants.VALIDATIONS_TYPE.REQ,
          message: Constants.ErrorMessage.LOCATION_REQUIRED,
        },
      ],
    },
  };
  React.useEffect(() => {
    if (cameraBase64) {
      setProgressData({
        ...progressData,
        picture: cameraBase64?.includes("base64,")
          ? cameraBase64
          : "data:image/jpeg;base64," + cameraBase64,
      });
      setShowCamera(false);
    }
  }, [cameraBase64]);
  React.useEffect(() => {
    subscribeToCompass();

    return () => {
      Magnetometer.removeAllListeners();
    };
  }, []);
  // React.useEffect(() => {
  //   if (direction) {
  //     setProgressData({
  //       ...progressData,
  //       platPosition: direction,
  //     });
  //   }
  // }, [direction]);
  const subscribeToCompass = async () => {
    const { status } = await Magnetometer.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Compass permission not granted!");
      return;
    }

    Magnetometer.setUpdateInterval(100); // Set the update interval (in milliseconds) as per your requirement

    Magnetometer.addListener(({ x, y }) => {
      const heading = -Math.atan2(y, x);
      const directionInDegrees = Math.round((heading * 180) / Math.PI);
      const cardinalDirections = [
        "NORTH",
        "NORTH-EAST",
        "EAST",
        "SOUTH-EAST",
        "SOUTH",
        "SOUTH-WEST",
        "WEST",
        "NORTH-WEST",
      ];
      const index = Math.round(directionInDegrees / 45);
      const normalizedIndex = (index + 8) % 8;
      setDirection(cardinalDirections[normalizedIndex]);
    });
  };
  const setFormErrorMessage = (errors) => {
    if (errors.plantNotes) {
      setPlantNotesErrorMessage(errors.plantNotes);
    }
    if (errors.city) {
      setPlantLocationErrorMessage(errors.city);
    }
    if (errors.platPosition) {
      setPlantPositionErrorMessage(errors.platPosition);
    }
  };
  const onSaveProgress = () => {
    try {
      const { errors, valid } = validateInput(addPlantProgressForm);
      if (!valid) {
        setFormErrorMessage(errors);
      } else {
        let obj = {
          userId: user?._id,
          plantId: plantID || progressData?.plantId,
          plantName: progressData.plantName,
          plantNotes: progressData?.plantNotes,
          picture: progressData?.picture,
          perenulaPlantId: progressData?.perenulaPlantId,
          share: progressData?.share,
          platPosition: progressData?.platPosition,
          plantLat: progressData?.plantLat,
          plantLong: progressData?.plantLong,
          city: userAddress?.split(",")[1]?.trim() || "",
          state: userAddress?.split(",")[2]?.trim() || "",
        };
        if (Object.keys(editDetails).length > 0) {
          updateToProgress(progressData?._id, obj, token)
            .then((progressRes) => {
              // setPlantMessage(progressRes?.message);
              setPopupData({
                ...popupData,
                title: "Saved!",
                message:
                  "The plant progress has been saved and added to the feed",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          saveToProgress(obj, token)
            .then((progressRes) => {
              // setPlantMessage(progressRes?.message);
              setPopupData({
                ...popupData,
                title: "Saved!",
                message:
                  "The plant progress has been saved and added to the feed",
              });
              // if (screen) {
              //   navigation.navigate("communityScreen");
              // } else {
              //   navigation.navigate("homeScreen");
              // }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        // let plantD = myPlantDetails;
        // let arr = [...(myPlantDetails?.plantProgress || [])];
        // if (Object.keys(editDetails).length > 0) {
        //   const index = arr?.findIndex((i) => i?._id === editDetails?._id);
        //   arr[index] = progressData;
        // } else {
        //   arr?.push(progressData);
        // }
        // plantD.plantProgress = arr;
        // savePlantProgress(plantD?._id, plantD, token);
        // navigation.navigate("homeScreen");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onPlantNotesChange = async (val) => {
    try {
      setProgressData({
        ...progressData,
        plantNotes: val,
      });
      if (val === "") {
        setPlantNotesErrorMessage("");
      } else {
        addPlantProgressForm.plantNotes.value = val;
        const { errors, valid } = validateInput({
          plantNotes: addPlantProgressForm?.plantNotes,
        });
        if (!valid) {
          setPlantNotesErrorMessage(errors.plantName);
        } else {
          setPlantNotesErrorMessage("");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onPlantPositionChange = () => {
    try {
      setProgressData({
        ...progressData,
        platPosition: direction,
      });
      if (direction !== "") {
        setPlantPositionErrorMessage("");
      } else {
        addPlantProgressForm.platPosition.value = val;
        const { errors, valid } = validateInput({
          platPosition: addPlantProgressForm?.platPosition,
        });
        if (!valid) {
          setPlantPositionErrorMessage("");
          errors.platPosition;
        } else {
          setPlantPositionErrorMessage("");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onPlantLocationChange = () => {
    try {
      setProgressData({
        ...progressData,
        plantLat: userLocation?.coords?.latitude || "",
        plantLong: userLocation?.coords?.longitude || "",
        city: userAddress?.split(",")[1]?.trim() || "",
        state: userAddress?.split(",")[2]?.trim() || "",
      });
      if (Object.keys(userAddress).length > 0) {
        setPlantLocationErrorMessage("");
      } else {
        addPlantProgressForm.city.value = userAddress?.split(",")[1]?.trim();
        const { errors, valid } = validateInput({
          city: addPlantProgressForm?.city,
        });
        if (!valid) {
          setPlantLocationErrorMessage("");
          errors.city;
        } else {
          setPlantLocationErrorMessage("");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onActionPopUp = () => {
    try {
      setPopupData({
        ...popupData,
        message: "",
      });
      if (screen && progressData?.share) {
        getAllPost(user?._id, token);
        navigation.navigate("communityScreen");
      } else {
        navigation.navigate("homeScreen");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9F1" }}>
      {popupData?.message ? (
        <PopupCard
          title={popupData?.title}
          message={popupData?.message}
          buttons={[
            {
              action: onActionPopUp,
              title: "Go to My plant",
              backgroundColor: "green",
              color: "white",
            },
          ]}
        />
      ) : (
        <View />
      )}
      {showCamera && (
        <CustomCamera
          setShowCamera={setShowCamera}
          setCameraBase64={setCameraBase64}
        />
      )}
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS === "ios" ? 50 : 0,
          paddingHorizontal: 20,
        }}
      >
        <Header
          title={
            Object.keys(editDetails).length > 0
              ? "Edit Plant Progress"
              : "Add Plant Progress"
          }
          navigation={navigation}
        />
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: 200,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {progressData?.picture ? (
                <Image
                  source={{ uri: progressData?.picture || undefined }}
                  style={{ height: 150, width: 150, borderRadius: 25 }}
                  resizeMode="cover"
                />
              ) : (
                <Pressable
                  onPress={() => {
                    setShowCamera(true);
                  }}
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 25,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text>Upload</Text>
                </Pressable>
              )}
              <View
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: "white",
                  position: "absolute",
                  bottom: 30,
                  right: 110,
                  borderRadius: 15,
                }}
              >
                <NativeIcon
                iconName={"camera"}
                iconLib={"Feather"}
                iconSize={30}
                iconColor={"black"}
              />
                {/* <Image
                  source={appImages?.cameraOutlinedLogo}
                  style={{ height: 40, width: 40, alignSelf: "center" }}
                /> */}
              </View>
            </View>
            <View
              style={{
                minHeight: 40,
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 16, fontFamily: "MB", color: "black" }}>
                Notes
              </Text>
              <Input
                autoCorrect={false}
                value={progressData?.plantNotes}
                multiline={true}
                errorMessage={plantNotesErrorMessage || ""}
                autoComplete="off"
                placeholder="Write about your plant..."
                placeholderTextColor={"#A39E9E"}
                style={{
                  paddingLeft: 10,
                  // backgroundColor: "white",
                }}
                onChangeText={(val) => {
                  onPlantNotesChange(val);
                }}
                inputContainerStyle={{
                  marginTop: 10,
                  minHeight: 80,
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: "#A39E9E",
                  right: 10,
                  backgroundColor: "white",
                }}
                inputStyle={{ fontSize: 13, fontFamily: "MM", color: "black" }}
              />
            </View>
            <View
              style={{
                minHeight: 40,
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 16, fontFamily: "MB", color: "black" }}>
                Plant location
              </Text>
              <Input
                autoCorrect={false}
                value={
                  progressData?.city && progressData?.state
                    ? `${
                        progressData?.city ? progressData?.city + ", " : "NA"
                      }${progressData?.state || "NA"}`
                    : ""
                }
                errorMessage={plantLocationErrorMessage || ""}
                autoComplete="off"
                placeholder="Select your location"
                placeholderTextColor={"#A39E9E"}
                rightIcon={() => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        onPlantLocationChange();
                      }}
                      style={{
                        height: "100%",
                        backgroundColor: "#3A3939",
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "MB",
                          color: "white",
                        }}
                      >
                        Get location
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                rightIconContainerStyle={{ right: -4 }}
                style={{
                  paddingLeft: 10,
                  // backgroundColor: "white",
                }}
                inputContainerStyle={{
                  marginTop: 10,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: "#A39E9E",
                  // borderBottomWidth: 0,
                  right: 10,
                  backgroundColor: "white",
                }}
                inputStyle={{ fontSize: 13, fontFamily: "MM", color: "black" }}
              />
            </View>
            <View
              style={{
                minHeight: 40,
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 16, fontFamily: "MB", color: "black" }}>
                Plant position
              </Text>
              <Input
                autoCorrect={false}
                value={progressData?.platPosition}
                autoComplete="off"
                // disabled={true}
                errorMessage={plantPositionErrorMessage || ""}
                placeholder="Select plant position"
                placeholderTextColor={"#A39E9E"}
                rightIcon={() => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        onPlantPositionChange();
                      }}
                      style={{
                        height: "100%",
                        backgroundColor: "#3A3939",
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "MB",
                          color: "white",
                        }}
                      >
                        Get position
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                rightIconContainerStyle={{ right: -4 }}
                style={{
                  paddingLeft: 10,
                  // backgroundColor: "white",
                }}
                inputContainerStyle={{
                  marginTop: 10,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: "#A39E9E",
                  // borderBottomWidth: 0,
                  right: 10,
                  backgroundColor: "white",
                }}
                inputStyle={{ fontSize: 13, fontFamily: "MM", color: "black" }}
              />
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>Share your post to feed</Text>
              <CheckBox
                checked={progressData?.share}
                onPress={() => {
                  setProgressData({
                    ...progressData,
                    share: !progressData?.share,
                  });
                }}
              />
            </View>
            <View
              style={{
                width: "100%",
                marginVertical: 10,
                flexDirection: "row",
                // paddingHorizontal:30,
                justifyContent:
                  Object.keys(editDetails).length > 0 ? "center" : "center",
              }}
            >
              {Object.keys(editDetails).length > 0 && (
                <Button
                  title={"Cancel"}
                  onPress={() => {
                    navigation.goBack();
                  }}
                  buttonStyle={{
                    height: 40,
                    width: 120,
                    backgroundColor: "transparent",
                    // alignSelf: "center",
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 10,
                    paddingHorizontal: 30,
                    paddingVertical: 0,
                    margin: 0,
                  }}
                  titleStyle={{ color: "black", textAlign: "center" }}
                />
              )}
              <Button
                onPress={() => {
                  onSaveProgress();
                }}
                buttonStyle={{
                  height: 40,
                  width: 120,
                  backgroundColor: "#56A434",
                  // alignSelf: "center",
                  borderRadius: 10,
                  // paddingHorizontal: 0,
                  marginLeft: 10,
                  paddingVertical: 0,
                  margin: 0,
                }}
                title={Object.keys(editDetails).length > 0 ? "Save" : "Proceed"}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddPlantProgress;
