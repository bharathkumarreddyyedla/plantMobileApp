import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import PlantCard from "../customComponents/plantCard";
import { NativeIcon } from "../../icons/NativeIcons";
import { commonStyles } from "../../styles/commonStyles";
import SeasonPlants from "./seasonPlants";
import { appImages } from "../../configs/appImages";

const MyPlants = () => {
  const list = [
    {
      id: 0,
      name: "Sun Flower",
      species: "sun",
      image: appImages.splashScreenLogo,
    },
  ];
  return (
    <View style={{ minHeight: 100, paddingHorizontal: 20, marginVertical: 10 }}>
      <Text
        style={{
          color: "black",
          fontSize: 14,
          fontWeight: "bold",
          marginVertical: 10,
        }}
      >
        My Plants
      </Text>
      <View style={{ flexDirection: "row" }}>
        {/* {list.map((item, index) => {
          return (
            <PlantCard
              item={item}
              index={index}
              marginValue={index !== 0 ? 12 : 0}
            />
          );
        })} */}
        <View
          style={[
            commonStyles.miniCardShadowEffect,
            {
              height: 150,
              width: 100,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FEF9F1",
              borderRadius: 10,
              borderWidth: 0.7,
              marginLeft: 12,
            },
          ]}
        >
          <NativeIcon
            iconName={"plus-circle"}
            iconLib={"Feather"}
            iconColor={"grey"}
            iconSize={40}
          />
        </View>
      </View>
    </View>
  );
};

export default MyPlants;
