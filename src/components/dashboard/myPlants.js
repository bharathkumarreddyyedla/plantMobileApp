import React from "react";
import { Pressable, Text } from "react-native";
import { View } from "react-native";
import { NativeIcon } from "../../icons/NativeIcons";
import { commonStyles } from "../../styles/commonStyles";

const MyPlants = ({ navigation }) => {
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
        <Pressable
          onPress={() => {
            navigation.navigate("searchScreen");
          }}
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
        </Pressable>
      </View>
    </View>
  );
};

export default MyPlants;
