import React from "react";
import { Image, Pressable, Text, View, ScrollView } from "react-native";
import Header from "../../components/customComponents/header";
import { appImages } from "../../configs/appImages";
import { Button, CheckBox, Input } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";
import { calenderTypes } from "../../configs/constants";
import { useDispatch, useSelector } from "react-redux";
import CustomDateTimePicker from "../../components/customComponents/customDateTimePicker";
import moment from "moment";
import { Gyroscope, Magnetometer } from "expo-sensors";
import { UserContext } from "../../configs/contexts";
import {
  addMyPlant,
  savePlantProgress,
} from "../../services/redux/reduxActions/plantActions";
import { bindActionCreators } from "redux";
import { plantActions } from "../../services/redux/reduxActions/exportAllActions";
import CustomCamera from "../../components/customComponents/camera";

const AddPlantScreen = ({ navigation, route }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  const { editPlantDetails = {} } = route?.params || {};
  const { plantDetails } = useSelector((state) => state.plants);
  const { userLocation, userAddress } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const { setPlantMessage } = bindActionCreators(plantActions, dispatch);
  const [direction, setDirection] = React.useState("N/A");
  const [imageUrl, setImageUrl] = React.useState("");
  const [datePicker, setDatePicker] = React.useState(false);
  const [share, setShare] = React.useState(false);
  const [imageFetched, setImageFetched] = React.useState(false);
  const [showCamera, setShowCamera] = React.useState(false);
  const [cameraBase64, setCameraBase64] = React.useState("");
  const [edit, setEdit] = React.useState(editPlantDetails);
  const [plantData, setPlantData] = React.useState({
    userId: "",
    perenulaPlantId: "",
    cycle: editPlantDetails?.cycle || plantDetails?.cycle,
    plantDob: editPlantDetails?.plantDob || new Date(),
    plantLat: editPlantDetails?.plantLat || userLocation?.coords?.latitude,
    plantLong: editPlantDetails?.plantLong || userLocation?.coords?.longitude,
    plantName: "",
    scientific_name:
      editPlantDetails?.scientific_name || plantDetails?.scientific_name,
    dimension: editPlantDetails?.dimension || plantDetails?.dimension,
    sunlight: editPlantDetails?.sunlight || plantDetails?.sunlight,
    edible_leaf: editPlantDetails?.edible_leaf || plantDetails?.edible_leaf,
    indoor: editPlantDetails?.indoor || plantDetails?.indoor,
    watering: editPlantDetails?.watering || plantDetails?.watering,
    maintenance: editPlantDetails?.maintenance || plantDetails?.maintenance,
    plantDescription: "",
    city: userAddress?.split(",")[1]?.trim() || "",
    state: userAddress?.split(",")[2]?.trim() || "",
    platPosition: "",
    share: editPlantDetails?.shareSocialFeed || true,
    plantPicture: "",
    plantProgress: editPlantDetails?.plantProgress || [],
    reminders: editPlantDetails?.reminders || "DAILY",
  });
  React.useEffect(() => {
    if (
      Object.keys(plantDetails)?.length > 0 ||
      (Object.keys(editPlantDetails)?.length > 0 && !hasFetchedImage())
    ) {
      fetchImage();
    }
  }, [plantDetails, edit]);
  const hasFetchedImage = () => {
    return imageFetched;
  };
  React.useEffect(() => {
    subscribeToCompass();

    return () => {
      Magnetometer.removeAllListeners();
    };
  }, []);
  React.useEffect(() => {
    if (cameraBase64) {
      setPlantData({
        ...plantData,
        plantPicture: cameraBase64?.includes("base64,")
          ? cameraBase64
          : "data:image/jpeg;base64," + cameraBase64,
        plantProgress: [
          {
            picture: cameraBase64?.includes("base64,")
              ? cameraBase64
              : "data:image/jpeg;base64," + cameraBase64,
            plantDob: new Date(),
            perenulaPlantId: plantDetails?.id,
            plantName: plantDetails?.common_name,
            plantNotes: "",
          },
        ],
      });
      setImageUrl(
        cameraBase64?.includes("base64,")
          ? cameraBase64
          : "data:image/jpeg;base64," + cameraBase64
      );
      setShowCamera(false);
    }
  }, [cameraBase64]);
  React.useEffect(() => {
    if (direction) {
      setPlantData({
        ...plantData,
        platPosition: direction,
      });
    }
  }, [direction]);
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
  const fetchImage = async () => {
    try {
      const response = await fetch(
        Object.keys(editPlantDetails)?.length > 0
          ? editPlantDetails?.plantPicture
          : plantDetails?.default_image?.medium_url
      );
      const blob = await response.blob();
      const uri = URL.createObjectURL(blob);

      setImageUrl(uri);
      setPlantData({
        ...plantData,
        plantName: editPlantDetails?.plantName || plantDetails?.common_name,
        plantDescription:
          editPlantDetails?.plantDescription || plantDetails?.description,
        perenulaPlantId: editPlantDetails?.perenulaPlantId || plantDetails?.id,
        userId: editPlantDetails?.userId || user?._id,
        plantPicture:
          editPlantDetails?.plantPicture ||
          plantDetails?.default_image?.medium_url,
        plantProgress: editPlantDetails?.plantProgress || [
          {
            picture: plantDetails?.default_image?.medium_url,
            plantDob: new Date(),
            perenulaPlantId: plantDetails?.id,
            plantName: plantDetails?.common_name,
            plantNotes: "",
          },
        ],
      });
      setImageFetched(true);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  const onDateSelected = (dates, flag) => {
    if (dates !== undefined) {
      if (Platform.OS === "ios") {
        if (flag) {
          setDatePicker(false);
        } else {
        }
      } else {
        setDatePicker(false);
      }
      // setDate(dates)
      setPlantData({
        ...plantData,
        plantDob: moment(dates).format("YYYY-MM-DD"),
      });
    }
  };
  const onProceed = () => {
    try {
      if (Object.keys(editPlantDetails).length > 0) {
        savePlantProgress(editPlantDetails?._id, plantData, token).then(
          (res) => {
            if (res) {
              navigation.navigate("homeScreen");
            }
          }
        );
      } else {
        addMyPlant(plantData, token).then((res) => {
          console.log("message", res);
          if (res) {
            setPlantMessage(res);
            navigation.navigate("homeScreen");
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
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
        <Header title={"Plants"} navigation={navigation} />
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
              <Pressable
                onPress={() => {
                  setShowCamera(true);
                }}
              >
                <Image
                  source={{ uri: imageUrl }}
                  style={{ height: 150, width: 150, borderRadius: 25 }}
                  resizeMode="cover"
                />
              </Pressable>
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
                <Image
                  source={appImages?.cameraOutlinedLogo}
                  style={{ height: 40, width: 40, alignSelf: "center" }}
                />
              </View>
            </View>
            <View
              style={{
                minHeight: 40,
                width: "100%",
                marginTop: 10,
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
              >
                Give a name to your Plant
              </Text>
              <Input
                autoCorrect={false}
                value={plantData?.plantName}
                autoComplete="off"
                placeholder="Plant name"
                placeholderTextColor={"#A39E9E"}
                style={{
                  borderWidth: 1,
                  borderRadius: 15,
                  paddingHorizontal: 10,
                  marginTop: 10,
                  borderColor: "#A39E9E",
                  backgroundColor: "white",
                }}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                  right: 10,
                }}
                inputStyle={{ fontSize: 13, fontWeight: "300", color: "black" }}
                onChangeText={(val) => {
                  setPlantData({
                    ...plantData,
                    plantName: val,
                  });
                }}
              />
            </View>
            <View
              style={{
                minHeight: 40,
                width: "100%",
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
              >
                Plant Birthday
              </Text>
              <Input
                autoCorrect={false}
                value={
                  plantData?.plantDob
                    ? moment(plantData?.plantDob).format("YYYY-MM-DD")
                    : ""
                }
                autoComplete="off"
                placeholder="Select date"
                placeholderTextColor={"#A39E9E"}
                rightIcon={() => {
                  return (
                    <Pressable
                      onPress={() => {
                        setDatePicker(true);
                      }}
                    >
                      <Image
                        source={appImages?.callenderLogo}
                        style={{ height: 25, width: 25 }}
                        resizeMode="contain"
                      />
                    </Pressable>
                  );
                }}
                rightIconContainerStyle={{ right: 10 }}
                style={{
                  paddingHorizontal: 10,
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
                inputStyle={{ fontSize: 13, fontWeight: "300", color: "black" }}
              />
            </View>
            <View
              style={{
                minHeight: 40,
                width: "100%",
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
              >
                Plant location
              </Text>
              <Input
                autoCorrect={false}
                value={`${plantData?.city || ""}, ${plantData?.state || ""}`}
                autoComplete="off"
                placeholder="Select your location"
                placeholderTextColor={"#A39E9E"}
                rightIcon={() => {
                  return (
                    <Pressable
                      onPress={() => {
                        return;
                        // setPlantData({
                        //   ...plantData,
                        //   plantLat: userLocation?.coords?.latitude || "",
                        //   plantLong: userLocation?.coords?.longitude || "",
                        // });
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
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        Get location
                      </Text>
                    </Pressable>
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
                inputStyle={{ fontSize: 13, fontWeight: "300", color: "black" }}
              />
            </View>
            <View
              style={{
                minHeight: 40,
                width: "100%",
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
              >
                Plant direction
              </Text>
              <Input
                autoCorrect={false}
                value={direction}
                autoComplete="off"
                disabled={true}
                placeholder="Select plant direction"
                placeholderTextColor={"#A39E9E"}
                rightIcon={() => {
                  return (
                    <Pressable
                      onPress={() => {
                        subscribeToCompass();
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
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        Get position
                      </Text>
                    </Pressable>
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
                inputStyle={{ fontSize: 13, fontWeight: "300", color: "black" }}
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
                checked={plantData?.share}
                onPress={() => {
                  setPlantData({ ...plantData, share: !plantData?.share });
                }}
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
              <Text style={{ width: "50%" }}>Get reminders</Text>
              <Dropdown
                data={calenderTypes}
                value={plantData?.reminders}
                labelField={"label"}
                valueField={"value"}
                placeholder="Select"
                itemTextStyle={{
                  fontSize: 10,
                  fontWeight: "Bold",
                  color: "grey",
                  textTransform: "capitalize",
                }}
                confirmSelectItem={true}
                maxHeight={300}
                itemContainerStyle={{ backgroundColor: "white" }}
                selectedTextStyle={{
                  fontSize: 10,
                  fontWeight: "Bold",
                  color: "grey",
                  textTransform: "capitalize",
                }}
                onChange={(val) => {
                  setPlantData({
                    ...plantData,
                    reminders: val?.value,
                  });
                }}
                iconColor={"grey"}
                style={[
                  // commonStyles.dropdownShadowEffect,
                  {
                    paddingHorizontal: 10,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "grey",
                    height: 30,
                    width: "50%",
                    marginVertical: 5,
                  },
                ]}
              />
            </View>
            <Button
              onPress={() => {
                onProceed();
              }}
              buttonStyle={{
                height: 40,
                width: "70%",
                backgroundColor: "#56A434",
                alignSelf: "center",
                marginVertical: 10,
                borderRadius: 10,
              }}
              title={
                Object.keys(editPlantDetails)?.length > 0 ? "Update" : "Proceed"
              }
            />
          </View>
        </ScrollView>
      </View>
      <CustomDateTimePicker
        showDatimePicker={datePicker}
        date={new Date(plantData?.plantDob)}
        onChange={(dates, flag) => {
          onDateSelected(dates, flag);
        }}
        onCancel={() => {
          setDatePicker(false);
        }}
      />
    </View>
  );
};

export default AddPlantScreen;
