import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { aToE, fToJ, kToO, pToT, uToZ } from "../../configs/constants";

const ProfilePicOrChar = ({ image = "", name = "", styleProp }) => {
  const { colors } = useTheme();
  if (image !== "") {
    return (
      <Image
        accessibilityLabel="home_prof_pic_id"
        testID="home_prof_pic_id"
        source={{
          uri: image
            ? image?.includes("base64,")
              ? image
              : "data:image/jpeg;base64," + image
            : undefined,
        }}
        style={[
          styleProp,
          {
            borderWidth: 2,
            backgroundColor: "white",
            borderColor: "white",
          },
        ]}
      />
    );
  } else {
    return (
      <View
        style={[
          styleProp,
          {
            borderWidth: 2,
            borderColor: "white",
            backgroundColor: aToE?.includes(name)
              ? "#AAD6A0"
              : fToJ?.includes(name)
              ? "#749EB2"
              : kToO?.includes(name)
              ? "#E2B080"
              : pToT?.includes(name)
              ? "#EAB4E8"
              : uToZ?.includes(name)
              ? "#4D5264"
              : "#0098a7",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Text style={{ fontSize: 15, color: "white" }}>{name}</Text>
      </View>
    );
  }
};

export default ProfilePicOrChar;
