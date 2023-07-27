import React from "react";
import {
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
import { UserContext } from "../../configs/contexts";
import { appImages } from "../../configs/appImages";
import PlantProgressCard from "../../components/customComponents/plantProgressCard";
import PlantGalleryCard from "../../components/customComponents/plantGalleryCard";
import moment from "moment";
import { bindActionCreators } from "redux";
import { plantActions } from "../../services/redux/reduxActions/exportAllActions";
import { Button } from "react-native-elements";

const DetailedPostScreen = ({ navigation }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  const { postDetails } = useSelector((state) => state.posts);
  const { favouritePlants } = useSelector((state) => state.plants);
  const [selectedtag, setSelectedTag] = React.useState("Info");
  const [numColumns, setNumColumns] = React.useState(3);
  const [enlargedPicture, setEnlargedPictrue] = React.useState({});
  const [imageUrl, setImageUrl] = React.useState("");
  const dispatch = useDispatch();
  const { getFavourites, onAddToUserFavourite } = bindActionCreators(
    plantActions,
    dispatch
  );
  React.useEffect(() => {
    if (Object.keys(postDetails)?.length > 0) {
      fetchImage();
    }
  }, [postDetails]);
  const fetchImage = async () => {
    try {
      const response = await fetch(postDetails?.plant?.plantPicture);
      const blob = await response.blob();
      if (Platform.OS === "ios") {
        const uri = URL.createObjectURL(blob);
        setImageUrl(uri);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result;
          setImageUrl(dataUrl);
        };
        reader.readAsDataURL(blob);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  const onDeleteClick = (item) => {
    console.log("object");
    // setPopupData({
    //   ...popupData,
    //   title: "Journey will be deleted",
    //   message:
    //     "Are you sure you want to delete? you will not be able to restore the journey",
    //   onSubmit: (item) => {
    //     onActionPopUp(item);
    //   },
    //   onCancel: () => {
    //     onClosePopup;
    //   },
    // });
  };
  const onAddFavourite = () => {
    let favArray = [...(favouritePlants || [])];
    console.log("favArray", favArray);
    const index = favArray?.findIndex(
      (i) => i?.perenulaPlantId === postDetails?.plant?.perenulaPlantId
    );
    console.log("index", index);
    if (index === -1) {
      let obj = {
        userId: user?._id,
        plantId: postDetails?.plant?._id || "",
        perenulaPlantId: postDetails?.plant?.perenulaPlantId || "",
        plantPicture: postDetails?.plant?.plantPicture || "",
        plantName: postDetails?.plant?.common_name || "",
        cycle: postDetails?.plant?.cycle || "",
      };
      favArray.push(obj);
      onAddToUserFavourite(obj, favArray, token);
      postDetails.plant.favourite = true;
    } else {
      Alert.alert("Already added to whishlist");
    }
  };
  const enlargePicture = (item) => {
    setEnlargedPictrue(item);
  };
  const onEditClick = (item) => {
    try {
      navigation.navigate("addPlantProgress", { editDetails: item });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9F1" }}>
      {console.log("postDetails", postDetails)}
      <View
        style={{
          height: Dimensions.get("screen").height / 3,
          width: "100%",
          backgroundColor: "red",
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{ height: "100%", width: "100%" }}
          resizeMode="cover"
        />
        <View
          style={{
            position: "absolute",
            height: 40,
            width: "100%",
            backgroundColor: "black",
            opacity: 0.5,
            bottom: 0,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {postDetails?.plant?.plantName}
          </Text>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {postDetails?.plant?.scientific_name?.length > 0
              ? postDetails?.plant?.scientific_name[0]
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
      <View style={{ flex: 1, top: -5 }}>
        <View
          style={{
            height: 60,
            width: "100%",
            flexDirection: "row",
            backgroundColor: "grey",
          }}
        >
          <Pressable
            onPress={() => {
              setSelectedTag("Info");
            }}
            style={{
              height: "100%",
              width: "25%",
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
              width: "25%",
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
              width: "25%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedtag === "Gallery" ? "#7BC75A" : "#56A434",
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "MB", color: "white" }}>
              Gallery
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedTag("Garden");
            }}
            style={{
              height: "100%",
              width: "25%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: selectedtag === "Garden" ? "#7BC75A" : "#56A434",
              borderTopRightRadius: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "MB", color: "white" }}>
              Garden
            </Text>
          </Pressable>
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
                    fontSize: 14,
                    fontFamily: "MR",
                    color: "black",
                    textAlign: "left",
                    lineHeight: 20,
                  }}
                >
                  {postDetails?.plant?.plantDescription || "NA"}
                </Text>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text>Care Details</Text>
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
                      {postDetails?.plant?.dimension?.includes("Height:")
                        ? postDetails?.plant?.dimension?.split(":")[1]?.trim()
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
                      {postDetails?.plant?.sunlight?.length > 0
                        ? postDetails?.plant?.sunlight[0]
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
                        source={appImages.heightLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Edible</Text>
                    </View>

                    <Text>
                      {postDetails?.plant?.edible_leaf ? "Yes" : "No"}
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
                        source={appImages.typeLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Type</Text>
                    </View>

                    <Text>
                      {postDetails?.plant?.indoor ? "Indoor" : "Outdoor"}
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
                        source={appImages.waterLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Water</Text>
                    </View>

                    <Text>{postDetails?.plant?.watering || "NA"}</Text>
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
                      <Text style={{ alignItems: "center" }}> Maintanece</Text>
                    </View>

                    <Text>{postDetails?.plant?.maintenance || "NA"}</Text>
                  </View>
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
                            postDetails?.plant?.favourite
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
                    }}
                    titleStyle={{ color: "black" }}
                  />
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
                data={postDetails?.plant?.plantProgress || []}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item?.plantDob}
                renderItem={({ item, index }) => (
                  <PlantProgressCard
                    item={item}
                    index={index}
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
                paddingHorizontal: 20,
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
                    // backgroundColor: colors.backdrop,
                    width: "100%",
                    position: "absolute",
                    zIndex: 1000,
                    marginLeft: 20,
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
                  <Text
                    style={{
                      position: "absolute",
                      fontSize: 11,
                      fontFamily: "MR",
                      color: "white",
                      alignSelf: "center",
                      paddingTop: 130,
                    }}
                  >
                    {moment(enlargedPicture?.plantDob).format("DD-MM-YYYY")}
                  </Text>
                </Pressable>
              ) : (
                <View />
              )}
              <FlatList
                key={numColumns.toString()}
                data={postDetails?.plant?.plantProgress || []}
                scrollEnabled={false}
                numColumns={numColumns}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item?.plantDob}
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

export default DetailedPostScreen;
