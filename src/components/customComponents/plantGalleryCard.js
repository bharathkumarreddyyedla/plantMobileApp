import moment from "moment";
import React from "react";
import { Image, Text, View } from "react-native";

const PlantGalleryCard = ({ item, index }) => {
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
    </View>
  );
};

export default PlantGalleryCard;
