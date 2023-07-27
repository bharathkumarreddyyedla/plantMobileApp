import moment from "moment";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { NativeIcon } from "../../icons/NativeIcons";

const PlantProgressCard = ({
  item,
  index,
  showAddPlant = false,
  onEditClick = () => {
    return;
  },
  onDeleteClick = () => {
    return;
  },
}) => {
  const [imageUrl, setImageUrl] = React.useState("");
  const [showPopup, setShowPopup] = React.useState("");
  React.useEffect(() => {
    // if (item?.picture?.includes("blob")) {
    fetchImage();
    // }
  }, []);
  const fetchImage = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <View
      key={index}
      style={{
        height: 100,
        width: "100%",
        backgroundColor: "#FEF2F0",
        flexDirection: "row",
        marginVertical: 10,
        borderRadius: 10,
      }}
    >
      {showPopup === index && (
        <Pressable
          onPress={() => {
            setShowPopup("");
          }}
          style={{
            height: 100,
            width: "100%",
            // backgroundColor: "blue",
            position: "absolute",
            zIndex: 1000,
            alignItems: "flex-end",
          }}
        >
          <Pressable
            onPress={() => {
              return;
            }}
            style={{
              minHeight: 40,
              width: 100,
              backgroundColor: "white",
              paddingHorizontal: 10,
              right: 30,
              top: 20,
              zIndex: 1000,
            }}
          >
            <Pressable
              onPress={() => {
                onEditClick(item);
              }}
              style={{
                height: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Edit</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                onDeleteClick(item);
              }}
              style={{
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderTopWidth: 1,
              }}
            >
              <Text>Delete</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      )}
      <Pressable
        onPress={() => {
          setShowPopup(index);
        }}
        style={{
          position: "absolute",
          right: 20,
          top: 5,
          zIndex: 100,
          height: 40,
          width: 50,
          alignItems: "flex-end",
        }}
      >
        {showAddPlant && (
          <NativeIcon
            iconName={"dots-three-horizontal"}
            iconLib={"Entypo"}
            iconSize={20}
            iconColor={"black"}
          />
        )}
      </Pressable>
      <View
        style={{
          width: "20%",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Image
          source={{ uri: imageUrl || undefined }}
          style={{ height: 70, width: 60, borderRadius: 10 }}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          justifyContent: "space-around",
          paddingHorizontal: 10,
          width: "80%",
        }}
      >
        <Text style={{ fontSize: 12, fontFamily: "MB", color: "black" }}>
          {moment(item?.progressDate || "").format("DD-MM-YYYY")}
        </Text>
        <Text style={{ fontSize: 12, fontFamily: "MR", color: "black" }}>
          Location: {item?.city ? item?.city + ", " : ""}
          {item?.state || ""}
        </Text>
        <Text style={{ fontSize: 12, fontFamily: "MR", color: "black" }}>
          Position of the plant: {item?.platPosition}
        </Text>
        <Text
          style={{ fontSize: 12, fontFamily: "MB", color: "black" }}
          numberOfLines={3}
        >
          {item?.plantNotes || "NA"}{" "}
        </Text>
      </View>
    </View>
  );
};

export default PlantProgressCard;
