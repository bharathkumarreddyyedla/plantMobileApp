import React from "react";
import { Image, Text } from "react-native";
import { View } from "react-native";
import { appImages } from "../../configs/appImages";
import { commonStyles } from "../../styles/commonStyles";
import FastImage from "expo-fast-image";

const PlantCard = ({ item, index, marginValue = 0 }) => {
  console.log("index", index);
  const [imageUrl, setImageUrl] = React.useState("");
  React.useEffect(() => {
    fetchImage();
  }, []);
  const fetchImage = async () => {
    try {
      const response = await fetch(item?.default_image?.original_url);
      const blob = await response.blob();
      const uri = URL.createObjectURL(blob);

      setImageUrl(uri);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  return (
    <View
      key={index}
      style={{
        height: 150,
        width: 100,
        marginLeft: marginValue,
        marginBottom: 12,
      }}
    >
      <View
        style={[
          commonStyles.miniCardShadowEffect,
          {
            height: "70%",
            width: "100%",
            backgroundColor: "#D9D9D9",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        ]}
      >
        {/* <FastImage
          source={{
            uri: imageUrl,
            priority: FastImage.priority.normal,
          }}
          style={{
            height: "100%",
            width: "100%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          resizeMode={FastImage.resizeMode.cover}
        /> */}
        <FastImage
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={{
            height: "100%",
            width: "100%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </View>
      <View
        style={{
          height: "30%",
          width: "100%",
          backgroundColor: "white",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "black", fontSize: 12, fontWeight: "500" }}>
          {item?.common_name || ""}
        </Text>
        <Text style={{ color: "black", fontSize: 8, fontWeight: "300" }}>
          {item?.cycle}
        </Text>
      </View>
    </View>
  );
};

export default PlantCard;
