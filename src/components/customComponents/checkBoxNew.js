import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

const CheckBoxNew = (props) => {
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
        onSelect(label);
      }}
      style={{
        height: 30,
        width: "20%",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          console.log("cccccc");
          onSelect(label);
        }}
        style={{
          height: "100%",
          width: "45%",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: 2,
          borderRadius: 5,
          borderWidth: 1,
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: checked ? "green" : "transparent",
            borderRadius: 5,
          }}
        ></View>
        {/* </View> */}
        {/* <CheckBox
          checked={checked}
          checkedColor="#56A434"
          size={20}
          onPress={() => {
            onSelect(label);
          }}
        /> */}
      </TouchableOpacity>
      <View
        style={{
          height: "100%",
          width: "65%",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 13, fontFamily: "MR", color: "#5A5A5F" }}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

export default CheckBoxNew;
