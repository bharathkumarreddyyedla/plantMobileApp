import React from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/customComponents/header";
import { appImages } from "../../configs/appImages";
import { Button } from "react-native-elements";
import moment from "moment";
import PlantProgressCard from "../../components/customComponents/plantProgressCard";
import PlantGalleryCard from "../../components/customComponents/plantGalleryCard";
import {
  deleteToProgress,
  getPlantProgress,
  savePlantProgress,
} from "../../services/redux/reduxActions/plantActions";
import { UserContext } from "../../configs/contexts";
import PopupCard from "../../components/customComponents/PopupCard";
import MyPlants from "../../components/dashboard/myPlants";
import { useTheme } from "react-native-paper";
import ProfilePicOrChar from "../../components/customComponents/profilePicOrChar";
import { bindActionCreators } from "redux";
import { plantActions } from "../../services/redux/reduxActions/exportAllActions";

const PlantProgressScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const {
    screen = "",
    showAddPlant = false,
    userDetails = {},
    favourite = false,
  } = route?.params || {};
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  const [favPlant, setFavPlant] = React.useState(favourite || false);
  const { myPlantDetails, favouritePlants } = useSelector(
    (state) => state?.plants
  );
  const dispatch = useDispatch();
  const { getFavourites, onAddToUserFavourite } = bindActionCreators(
    plantActions,
    dispatch
  );
  const [selectedtag, setSelectedTag] = React.useState("Info");
  const [numColumns, setNumColumns] = React.useState(3);
  const [enlargedPicture, setEnlargedPictrue] = React.useState({});
  const [selectedItem, setSelectedItem] = React.useState({});
  const [plantProgress, setPlantProgress] = React.useState([]);
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
  React.useEffect(() => {
    getProgress();
    checkFavourite();
  }, []);
  const getProgress = async () => {
    await getPlantProgress(
      userDetails?.userId ? userDetails?.userId : user?._id,
      myPlantDetails?._id,
      token
    ).then((res) => {
      if (res) {
        setPlantProgress(res || []);
      }
    });
  };
  const onEditClick = (item) => {
    try {
      navigation.navigate("addPlantProgress", { editDetails: item });
    } catch (err) {
      console.log(err);
    }
  };
  const onDeleteClick = (item) => {
    setSelectedItem(item);
    setPopupData({
      ...popupData,
      title: "Journey will be deleted",
      message:
        "Are you sure you want to delete? you will not be able to restore the journey",
      onSubmit: () => {
        onActionPopUp(item);
      },
      onCancel: () => {
        onClosePopup();
      },
    });
  };
  const onClosePopup = () => {
    setPopupData({
      ...popupData,
      message: "",
    });
  };
  const onActionPopUp = () => {
    try {
      const index = plantProgress?.findIndex(
        (i) => i?._id === selectedItem?._id
      );

      deleteToProgress(selectedItem?._id, token).then((res) => {
        if (index >= 0) {
          plantProgress?.splice(index, 1);
        }
        setPopupData({
          ...popupData,
          message: "",
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  const enlargePicture = (item) => {
    setEnlargedPictrue(item);
  };
  const checkFavourite = () => {
    let favArray = [...(favouritePlants || [])];
    console.log("favArray", favArray, myPlantDetails?.perenulaPlantId);
    const index = favArray?.findIndex(
      (i) => i?.perenulaPlantId === myPlantDetails?.perenulaPlantId
    );
    console.log("index", index);
    if (index >= 0) {
      setFavPlant(true);
    } else {
      setFavPlant(false);
    }
  };
  const onAddFavourite = () => {
    let favArray = [...(favouritePlants || [])];
    console.log("favArray", favArray, myPlantDetails?.perenulaPlantId);
    const index = favArray?.findIndex(
      (i) => i?.perenulaPlantId === myPlantDetails?.perenulaPlantId
    );
    console.log("index", index);
    if (index === -1) {
      let obj = {
        userId: user?._id,
        plantId: myPlantDetails?._id || "",
        perenulaPlantId: myPlantDetails?.perenulaPlantId || "",
        plantPicture: myPlantDetails?.plantPicture || "",
        plantName: myPlantDetails?.plantName || "",
        cycle: myPlantDetails?.cycle || "",
      };
      favArray.push(obj);
      onAddToUserFavourite(obj, favArray, token);
      setFavPlant(true);
    } else {
      Alert.alert("Already added to wishlist");
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9F1" }}>
      {/* {console.log("userDetails", myPlantDetails)} */}
      {popupData?.message ? (
        <PopupCard
          title={popupData?.title}
          message={popupData?.message}
          buttons={[
            {
              action: onClosePopup,
              title: "Cancel",
              backgroundColor: "transparent",
              color: "black",
            },
            {
              action: onActionPopUp,
              title: "Delete",
              backgroundColor: "red",
              color: "white",
            },
          ]}
        />
      ) : (
        <View />
      )}
      <View
        style={{
          height: Dimensions.get("screen").height / 3,
          width: "100%",
          backgroundColor: "red",
        }}
      >
        {Object.keys(userDetails).length > 0 && (
          <View
            style={{
              position: "absolute",
              height: 50,
              width: 50,
              backgroundColor: "red",
              borderRadius: 25,
              zIndex: 1000,
              right: 20,
              top: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProfilePicOrChar
              image={userDetails?.profilePicture || ""}
              name={userDetails?.firstName?.charAt("0").toUpperCase()}
              styleProp={{ height: "100%", width: "100%", borderRadius: 25 }}
            />
          </View>
        )}
        <Image
          source={{ uri: myPlantDetails?.plantPicture }}
          style={{ height: "100%", width: "100%" }}
          resizeMode="cover"
        />
        <View
          style={{
            position: "absolute",
            height: 50,
            width: "100%",
            backgroundColor: "black",
            opacity: 0.5,
            bottom: 10,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: "MB",
              width: "48%",
              textAlign: "left",
            }}
            numberOfLines={1}
          >
            {myPlantDetails?.plantName}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: "MB",
              width: "48%",
              textAlign: "right",
            }}
            numberOfLines={1}
          >
            {myPlantDetails?.scientific_name?.length > 0
              ? myPlantDetails?.scientific_name[0]
              : "NA"}
          </Text>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          marginTop: Platform.OS === "ios" ? 50 : 0,
          paddingHorizontal: 20,
        }}
      >
        <Header title={""} navigation={navigation} arrowColor={"white"} />
      </View>
      <View style={{ flex: 1, top: -20 }}>
        <View
          style={{
            height: 60,
            width: "100%",
            flexDirection: "row",
            backgroundColor: colors.backdrop,
          }}
        >
          <Pressable
            onPress={() => {
              setSelectedTag("Info");
            }}
            style={{
              height: "100%",
              width: "33.3%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: selectedtag === "Info" ? "#7BC75A" : "#56A434",
              borderTopLeftRadius: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "MB", color: "white" }}>
              Info
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedTag("Journey");
            }}
            style={{
              height: "100%",
              width: "33.3%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedtag === "Journey" ? "#7BC75A" : "#56A434",
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "MB", color: "white" }}>
              Journey
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedTag("Gallery");
            }}
            style={{
              height: "100%",
              width: "33.3%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedtag === "Gallery" ? "#7BC75A" : "#56A434",
              borderTopRightRadius: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "MB", color: "white" }}>
              Gallery
            </Text>
          </Pressable>
          {/* {screen && (
            <Pressable
              onPress={() => {
                setSelectedTag("Garden");
              }}
              style={{
                height: "100%",
                width: screen ? "25%" : "33.3%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  selectedtag === "Garden" ? "#7BC75A" : "#56A434",
                borderTopRightRadius: 20,
              }}
            >
              <Text
                style={{ fontSize: 16, fontFamily:'MB', color: "white" }}
              >
                Garden
              </Text>
            </Pressable>
          )} */}
        </View>
        <ScrollView>
          {selectedtag === "Info" ? (
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
              <View style={{ marginVertical: 20 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "MB",
                    color: "black",
                    lineHeight: 30,
                  }}
                >
                  Description
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "MR",
                    color: "black",
                    textAlign: "justify",
                    lineHeight: 20,
                    paddingRight: 2,
                  }}
                >
                  {myPlantDetails?.plantDescription || "NA"}
                </Text>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "MB",
                    color: "black",
                    lineHeight: 30,
                  }}
                >
                  Care Details
                </Text>
                <View
                  style={{
                    backgroundColor: "white",
                    marginTop: 10,
                    minHeight: 100,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      height: 50,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={appImages.heightLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Height</Text>
                    </View>

                    <Text>
                      {myPlantDetails?.dimension?.includes("Height:")
                        ? myPlantDetails?.dimension?.split(":")[1]?.trim()
                        : "NA"}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 50,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={appImages.sunLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Light</Text>
                    </View>

                    <Text>
                      {myPlantDetails?.sunlight?.length > 0
                        ? myPlantDetails?.sunlight[0]
                        : "NA"}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 50,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={appImages.edibleLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Edible</Text>
                    </View>

                    <Text>{myPlantDetails?.edible_leaf ? "Yes" : "No"}</Text>
                  </View>
                  <View
                    style={{
                      height: 50,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={appImages.typeLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Type</Text>
                    </View>

                    <Text>{myPlantDetails?.indoor ? "Indoor" : "Outdoor"}</Text>
                  </View>
                  <View
                    style={{
                      height: 50,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={appImages.waterLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Water</Text>
                    </View>

                    <Text>{myPlantDetails?.watering || "NA"}</Text>
                  </View>
                  <View
                    style={{
                      height: 50,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={appImages.heightLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Maintenance</Text>
                    </View>

                    <Text>{myPlantDetails?.maintenance || "NA"}</Text>
                  </View>
                  <View
                    style={{
                      height: 50,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={appImages.cycleLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Cycle</Text>
                    </View>
                    <Text>{myPlantDetails?.cycle || "NA"}</Text>
                  </View>
                  {/* <View
                    style={{
                      height: 50,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={appImages.heightLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Care level</Text>
                    </View>

                    <Text>{myPlantDetails?.maintenance || "NA"}</Text>
                  </View> */}
                </View>
                <View
                  style={{
                    minHeight: 40,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                >
                  {showAddPlant ? (
                    <Button
                      title={"Wishlist"}
                      onPress={() => {
                        onAddFavourite();
                      }}
                      iconPosition="left"
                      icon={() => {
                        return (
                          <Image
                            source={
                              favPlant
                                ? appImages?.filledFavouritesLogo
                                : appImages.whishlistLogo
                            }
                            style={{ height: 20, width: 20, right: 5 }}
                            resizeMode="contain"
                          />
                        );
                      }}
                      buttonStyle={{
                        height: 40,
                        width: 130,
                        backgroundColor: "transparent",
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: "black",
                      }}
                      titleStyle={{ color: "black" }}
                    />
                  ) : (
                    <Button
                      title={"Edit Plant"}
                      onPress={() => {
                        // if (screen) {
                        //   onAddFavourite();
                        // } else {
                        navigation.navigate("addPlantScreen", {
                          editPlantDetails: myPlantDetails,
                        });
                        // }
                      }}
                      // iconPosition="left"
                      // icon={() => {
                      //   if (screen) {
                      //     return (
                      //       <Image
                      //         source={
                      //           favPlant
                      //             ? appImages?.filledFavouritesLogo
                      //             : appImages.whishlistLogo
                      //         }
                      //         style={{ height: 20, width: 20, right: 5 }}
                      //         resizeMode="contain"
                      //       />
                      //     );
                      //   }
                      // }}
                      buttonStyle={{
                        height: 40,
                        width: 130,
                        backgroundColor: "transparent",
                        paddingHorizontal: 10,
                        paddingVertical: 0,
                        margin: 0,
                        borderWidth: 1,
                        borderRadius: 15,
                        borderColor: "black",
                      }}
                      titleStyle={{ color: "black", textAlign: "center" }}
                    />
                  )}
                  {showAddPlant ? (
                    <Button
                      title={"My Plants"}
                      iconPosition="left"
                      onPress={() => {
                        navigation.navigate("addPlantScreen");
                      }}
                      icon={() => {
                        return (
                          <Image
                            source={appImages.addCircleLogo}
                            style={{ height: 20, width: 20, right: 5 }}
                            resizeMode="contain"
                          />
                        );
                      }}
                      buttonStyle={{
                        height: 40,
                        width: 130,
                        backgroundColor: "#56A434",
                        borderRadius: 10,
                      }}
                      titleStyle={{ color: "white" }}
                    />
                  ) : (
                    <Button
                      title={"Add Progress"}
                      onPress={() => {
                        navigation.navigate("addPlantProgress", {
                          plantID: myPlantDetails?._id,
                          screen: screen,
                        });
                      }}
                      buttonStyle={{
                        height: 40,
                        width: 130,
                        backgroundColor: "#56A434",
                        borderRadius: 15,
                        
                      }}
                      titleStyle={{ color: "white" }}
                    />
                  )}
                </View>
              </View>
            </View>
          ) : selectedtag === "Journey" ? (
            <View
              style={{
                // height: Dimensions.get("window").height,
                width: "100%",
                paddingHorizontal: 20,
              }}
            >
              <FlatList
                data={plantProgress || []}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item?._id}
                renderItem={({ item, index }) => (
                  <PlantProgressCard
                    item={item}
                    index={index}
                    showAddPlant={showAddPlant}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                  />
                )}
              />
            </View>
          ) : selectedtag === "Gallery" ? (
            <View
              style={{
                // height: Dimensions.get("window").height,
                width: "100%",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              {Object.keys(enlargedPicture).length > 0 ? (
                <Pressable
                  onPress={() => {
                    setEnlargedPictrue({});
                  }}
                  style={{
                    height: 500,
                    backgroundColor: colors.backdrop,
                    width: "100%",
                    position: "absolute",
                    zIndex: 1000,
                    // marginLeft: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    // opacity: 0.5,
                  }}
                >
                  <Image
                    source={{ uri: enlargedPicture?.picture }}
                    style={{
                      height: 200,
                      width: 200,
                      borderRadius: 20,
                      opacity: 1,
                    }}
                  />
                  {/* <Text
                    style={{
                      position: "absolute",
                      fontSize: 11,
                      fontFamily:'MR',
                      color: "white",
                      alignSelf: "center",
                      paddingTop: 130,
                    }}
                  >
                    {moment(enlargedPicture?.plantDob).format("DD-MM-YYYY")}
                  </Text> */}
                </Pressable>
              ) : (
                <View />
              )}
              <FlatList
                key={numColumns.toString()}
                data={plantProgress || []}
                scrollEnabled={false}
                numColumns={numColumns}
                showsHorizontalScrollIndicator={false}
                style={{
                  paddingHorizontal: 20,
                }}
                keyExtractor={(item) => item?._id}
                renderItem={({ item, index }) => (
                  <PlantGalleryCard
                    item={item}
                    index={index}
                    enlargePicture={enlargePicture}
                  />
                )}
              />
            </View>
          ) : (
            // <MyPlants navigation={navigation} screen={"PlantProgress"} />
            <View />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default PlantProgressScreen;
