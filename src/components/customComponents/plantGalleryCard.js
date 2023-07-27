import moment from "moment";
import React from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";

const PlantGalleryCard = ({
  item,
  index,
  enlargePicture = () => {
    return;
  },
}) => {
  const [imageUrl, setImageUrl] = React.useState("");
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
    <TouchableOpacity
      onPress={() => {
        enlargePicture(item);
      }}
      key={index}
      style={{
        height: 120,
        width: 100,
        // backgroundColor: "red",
        margin: 10,
      }}
    >
      <Image
        source={{ uri: imageUrl || undefined }}
        style={{ height: "100%", width: "100%", borderRadius: 10 }}
        resizeMode="cover"
      />
      <Text
        style={{
          position: "absolute",
          bottom: 10,
          fontSize: 11,
          fontWeight: "500",
          color: "white",
          alignSelf: "center",
        }}
      >
        {moment(item?.plantDob).format("DD-MM-YYYY")}
      </Text>
    </TouchableOpacity>
  );
};

export default PlantGalleryCard;
