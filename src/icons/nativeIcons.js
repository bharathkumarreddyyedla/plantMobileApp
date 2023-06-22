import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icons from "../icons/Icons";

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
        <Icons.SimpleLineIcons
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "FontAwesome5" && (
        <Icons.FontAwesome5
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "MaterialCommunityIcons" && (
        <Icons.MaterialCommunityIcons
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "FontAwesome" && (
        <Icons.FontAwesome
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "Foundation" && (
        <Icons.Foundation
          name={iconName}
          color={iconClr}
          size={size}
          style={styles.icon}
        />
      )}
      {iconLib && iconLib === "EvilIcons" && (
        <Icons.EvilIcons
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
        <Icons.Octicons
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "Feather" && (
        <Icons.Feather
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "Entypo" && (
        <Icons.Entypo
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "Zocial" && (
        <Icons.Zocial
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "AntDesign" && (
        <Icons.AntDesign
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
      {iconLib && iconLib === "Fontisto" && (
        <Icons.Fontisto
          name={iconName}
          color={iconClr}
          size={size}
          style={style}
        />
      )}
    </View>
  );
}
