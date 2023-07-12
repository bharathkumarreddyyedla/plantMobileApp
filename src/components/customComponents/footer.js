import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { NativeIcon } from "../../icons/NativeIcons";
import { appImages } from "../../configs/appImages";

const Footer = ({ navigation }) => {
  const list = [
    {
      id: 0,
      name: "homeScreen",
      icon: ["home", "FontAwesome", 30],
      logo: appImages?.homeLogo,
    },
    {
      id: 1,
      name: "communityScreen",
      icon: ["post", "MaterialCommunityIcons", 25],
      logo: appImages?.postLogo,
    },
    {
      id: 2,
      name: "whishlistScreen",
      icon: ["bookmark-o", "FontAwesome", 25],
      logo: appImages?.favouritesLogo,
    },
    {
      id: 3,
      name: "profileScreen",
      icon: ["user-o", "FontAwesome", 25],
      logo: appImages?.userLogo,
    },
  ];
  return (
    <View
      style={{
        height: 80,
        width: "100%",
        backgroundColor: "#4D3B26",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <View
        style={{
          height: 50,
          width: "100%",
          flexDirection: "row",
        }}
      >
        {list?.map((item, index) => {
          return (
            <Pressable
              onPress={() => {
                navigation?.navigate(item?.name);
              }}
              key={index}
              style={{
                height: "100%",
                width: "25%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item?.logo ? (
                <Image
                  source={item?.logo}
                  style={{ height: 25, width: 25, marginTop: 10 }}
                  resizeMode="contain"
                />
              ) : (
                <NativeIcon
                  iconName={item?.icon[0]}
                  iconLib={item?.icon[1]}
                  iconSize={item?.icon[2]}
                  iconColor={"white"}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default Footer;
