import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { NativeIcon } from "../../icons/NativeIcons";
import ProfilePicOrChar from "./profilePicOrChar";
import moment from "moment";
import ExpoFastImage from "expo-fast-image";

const FeedCard = ({
  item,
  index,
  userDetails = {},
  selectedLabel,
  onLike = () => {
    return;
  },
}) => {
  const [imageUrl, setImageUrl] = React.useState("");
  React.useEffect(() => {
    fetchImage();
  }, []);
  const fetchImage = async () => {
    try {
      const response = await fetch(
        selectedLabel === "My Posts"
          ? item?.plant?.plantPicture || ""
          : item?.plants[0]?.plantPicture || ""
      );
      const blob = await response.blob();
      const uri = URL.createObjectURL(blob);
      setImageUrl(uri);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  return (
    <View
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
            image={
              selectedLabel === "My Posts"
                ? userDetails?.profilePicture || ""
                : item?.profilePicture || ""
            }
            name={
              selectedLabel === "My Posts"
                ? userDetails?.firstName?.charAt("0").toUpperCase()
                : item?.firstName?.charAt("0").toUpperCase()
            }
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
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "black" }}>
            {selectedLabel === "My Posts"
              ? userDetails?.firstName
              : item?.firstName || ""}
          </Text>
          <Text style={{ fontSize: 11, fontWeight: "500", color: "black" }}>
            {selectedLabel === "My Posts"
              ? userDetails?.city
              : item?.plants[0]?.city || ""}
            ,{" "}
            {selectedLabel === "My Posts"
              ? userDetails?.state
              : item?.plants[0]?.state || ""}
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
            {moment
              .duration(
                moment().diff(
                  selectedLabel === "My Posts"
                    ? item?.post?.postedDate
                    : item?.posts[0]?.postedDate
                )
              )
              .humanize()}{" "}
            ago
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
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            {selectedLabel === "My Posts"
              ? item?.plant?.plantName
              : item?.plants[0]?.plantName}
          </Text>
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            {selectedLabel === "My Posts"
              ? item?.plant?.cycle
              : item?.plants[0]?.cycle}
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
            {selectedLabel === "My Posts"
              ? item?.plant?.plantDescription
              : item?.plants[0]?.plantDescription}
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
            iconName={
              selectedLabel === "My Posts"
                ? item?.post?.liked
                  ? "heart"
                  : "heart-o"
                : item?.posts[0]?.liked
                ? "heart"
                : "heart-o"
            }
            iconLib={"FontAwesome"}
            iconSize={20}
            iconColor={
              selectedLabel === "My Posts"
                ? item?.post?.liked
                  ? "green"
                  : "black"
                : item?.posts[0]?.liked
                ? "green"
                : "black"
            }
          />
          <Text style={{ fontSize: 11, fontWeight: "500", color: "black" }}>
            {selectedLabel === "My Posts"
              ? item?.post?.likes
              : item?.posts[0]?.likes}{" "}
            likes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedCard;
