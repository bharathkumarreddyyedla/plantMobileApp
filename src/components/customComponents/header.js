import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { NativeIcon } from "../../icons/NativeIcons";

const Header = (props) => {
  const {
    title = "",
    navigation,
    logo = "",
    onGoback = () => {
      return navigation.goBack();
    },
    onLogoClick = () => {
      return;
    },
  } = props;
  return (
    <View
      style={{
        height: 40,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Pressable
        style={{
          height: "100%",
          width: 50,
          justifyContent: "center",
        }}
        onPress={() => {
          onGoback();
        }}
      >
        <NativeIcon
          iconName={"long-arrow-alt-left"}
          iconLib={"FontAwesome5"}
          iconSize={20}
          iconColor={"black"}
        />
      </Pressable>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          position: "absolute",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {title}
        </Text>
      </View>
      {logo && (
        <Pressable
          onPress={() => {
            onLogoClick();
          }}
          style={{
            width: "100%",
            alignItems: "flex-end",
            position: "absolute",
            justifyContent: "center",
          }}
        >
          <Image source={logo} style={{ height: 20, width: 20 }} />
        </Pressable>
      )}
    </View>
  );
};

export default Header;
