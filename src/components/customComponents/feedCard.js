import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { NativeIcon } from "../../icons/NativeIcons";
import ProfilePicOrChar from "./profilePicOrChar";
import moment from "moment";
import ExpoFastImage from "expo-fast-image";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  plantActions,
  postActions,
} from "../../services/redux/reduxActions/exportAllActions";
import { UserContext } from "../../configs/contexts";
import { getMyPlantsById } from "../../services/redux/reduxActions/plantActions";
import { Platform } from "react-native";

const FeedCard = ({
  item,
  index,
  userDetails = {},
  selectedLabel,
  onLike = () => {
    return;
  },
  navigation = { navigation },
}) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  const [imageUrl, setImageUrl] = React.useState("");
  const dispatch = useDispatch();
  const { setDetailedPost } = bindActionCreators(postActions, dispatch);
  const { savePlantDetailedData, saveMyPlantData } = bindActionCreators(
    plantActions,
    dispatch
  );
  React.useEffect(() => {
    // navigation.addListener("focus", () => {
    fetchImage();
    // });
  }, []);
  const fetchImage = async () => {
    try {
      console.log(
        "item?.picture?.include('base64')",
        item?.picture?.include("base64")
      );
      // if (item?.picture?.include("base64")) {
      const response = await fetch(item?.picture);
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
      // } else {
      //   setImageUrl(item?.picture);
      // }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  const onClick = () =>
    new Promise((resolve, reject) => {
      try {
        // console.log("itemid", item?.perenulaPlantId);
        savePlantDetailedData(item?.perenulaPlantId, user?._id, token);
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  const getPlantData = async () => {
    getMyPlantsById(item?.userId, item?.plantId, token).then((res) => {
      if (res) {
        console.log("plantttttt", res);
        saveMyPlantData(res);
        navigation.navigate("plantProgressScreen", {
          screen: "feed",
          userDetails: item,
          favourite: item?.favourite,
        });
      }
    });
  };
  return (
    <Pressable
      onPress={async () => {
        getPlantData();
        // if (user?._id === item?.userId) {
        //   getPlantData();
        // } else {
        //   await onClick().then((res) => {
        //     if (res) {
        //       navigation.navigate("plantDetailsScreen");
        //     }
        //   });
        // }
      }}
      key={index}
      style={{
        minHeight: 100,
        width: "100%",
        backgroundColor: "white",
        marginVertical: 10,
        borderRadius: 10,
        paddingVertical: 5,
      }}
    >
      {/* {console.log("item", item)} */}
      <View
        style={{
          height: 60,
          width: "100%",
          flexDirection: "row",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            height: "100%",
            width: "20%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProfilePicOrChar
            image={item?.profilePicture || ""}
            name={item?.firstName?.charAt("0").toUpperCase()}
            styleProp={{ width: 50, height: 50, borderRadius: 30 }}
          />
        </View>
        <View
          style={{
            height: "100%",
            width: "55%",
            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
            {item?.firstName || ""}
          </Text>
          <Text style={{ fontSize: 11, fontWeight: "500", color: "black" }}>
            {item?.city || ""}, {item?.state || ""}
          </Text>
        </View>
        <View
          style={{
            height: "100%",
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NativeIcon
            iconName={"dots-three-horizontal"}
            iconLib={"Entypo"}
            iconSize={20}
            iconColor={"black"}
          />
          <Text style={{ fontSize: 9, fontWeight: "500", color: "black" }}>
            {moment.duration(moment().diff(item?.progressDate)).humanize()} ago
          </Text>
        </View>
      </View>
      <View style={{ height: 180, width: "100%", backgroundColor: "red" }}>
        <ExpoFastImage
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={{
            height: "100%",
            width: "100%",
          }}
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
            {item?.plantName}
          </Text>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {item?.cycle}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 50,
          width: "100%",
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{ height: "100%", width: "85%", justifyContent: "center" }}
        >
          <Text
            style={{ fontSize: 11, fontWeight: "500", color: "black" }}
            numberOfLines={2}
          >
            {item?.plantNotes}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onLike(item);
          }}
          style={{
            height: "100%",
            width: "15%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NativeIcon
            iconName={item?.liked ? "heart" : "heart-o"}
            iconLib={"FontAwesome"}
            iconSize={20}
            iconColor={item?.liked ? "green" : "black"}
          />
          <Text style={{ fontSize: 11, fontWeight: "500", color: "black" }}>
            {item?.likes} likes
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default FeedCard;
