import moment from "moment";
import React from "react";
import { Dimensions, Image, Text, View } from "react-native";

const PlantProgressCard = ({ item, index }) => {
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
        height: 100,
        width: "100%",
        backgroundColor: "white",
        flexDirection: "row",
        marginVertical: 10,
      }}
    >
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
          style={{ height: 70, width: 60 }}
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
        <Text>{moment(item?.plantDob || "").format("DD-MM-YYYY")}</Text>
        <Text>{item?.plantName}</Text>
        <Text numberOfLines={3}>{item?.plantNotes || "NA"} </Text>
      </View>
    </View>
  );
};

export default PlantProgressCard;
