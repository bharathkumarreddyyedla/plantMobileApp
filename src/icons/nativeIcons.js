import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icons from "./icons";

export function NativeIcon({
  iconName,
  iconColor,
  iconLib,
  iconSize,
  iconStyle,
}) {
  const { colors } = useTheme();
  const iconClr = iconColor || colors.white;
  const size = iconSize || 20;
  const style = iconStyle || {};
  return (
    <View>
      {iconLib && iconLib === "MaterialIcons" && (
        <Icons.MaterialIcons
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "SimpleLineIcons" && (
        <Icon.SimpleLineIcons
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "FontAwesome5" && (
        <Icon.FontAwesome5
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "MaterialCommunityIcons" && (
        <Icon.MaterialCommunityIcons
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "FontAwesome" && (
        <Icon.FontAwesome
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "Foundation" && (
        <Icon.Foundation
          name={iconName}
          color={iconClr}
          size={size}
          style={styles.icon}
        />
      )}
      {iconLib && iconLib === "EvilIcons" && (
        <Icon.EvilIcons
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "Ionicons" && (
        <Icon.Ionicons
          name={iconName}
          color={iconClr}
          size={size}
          style={styles.icon}
        />
      )}
      {iconLib && iconLib === "Octicons" && (
        <Icon.Octicons
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "Feather" && (
        <Icon.Feather
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "Entypo" && (
        <Icon.Entypo
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "Zocial" && (
        <Icon.Zocial
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "AntDesign" && (
        <Icon.AntDesign
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "Fontisto" && (
        <Icon.Fontisto
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
    </View>
  );
}
