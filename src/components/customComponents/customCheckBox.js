import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { CheckBox } from "react-native-elements";

const CustomCheckBox = (props) => {
  const {
    label = "",
    onSelect = () => {
      return;
    },
    checked = false,
  } = props;
  return (
    <Pressable
      onPress={() => {
        onSelect(!checked);
      }}
      style={{ height: 50, width: "30%", flexDirection: "row" }}
    >
      <TouchableOpacity
        style={{
          height: "100%",
          width: "45%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <CheckBox
          checked={checked}
          size={20}
          onPress={() => {
            onSelect(!checked);
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          height: "100%",
          width: "65%",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: "bold" }}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default CustomCheckBox;
