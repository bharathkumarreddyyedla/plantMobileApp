import { Platform, StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  shadowEffect: {
    elevation: 2,
    shadowColor: "#BCCCCE",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  dashboardShadowEffect: {
    elevation: 1,
    shadowColor: "#BED8DB",
    shadowOpacity: 0.4,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 8,
  },
  normalShadowEffect: {
    shadowColor: "#171717",
    elevation: 5,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  boldShadowEffect: {
    shadowColor: "#171717",
    elevation: 10,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 9,
  },
  lightShadowEffect: {
    shadowColor: "#171717",
    elevation: 2,
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  cardShadowEffect: {
    elevation: Platform.OS === "android" ? 7 : 4, //shadow not showing properly in android thats why elevation increased.
    shadowColor: "#BED8DB",
    shadowOpacity: 0.8,
    shadowOffset: { width: -7, height: 7 },
    shadowRadius: 5.22,
  },
  dropdownShadowEffect: {
    elevation: 4,
    shadowColor: "#BED8DB",
    shadowOpacity: 0.8,
    shadowOffset: { width: -2, height: 2 },
    shadowRadius: 5.22,
  },
  miniCardShadowEffect: {
    elevation: 2,
    shadowColor: "#BED8DB",
    shadowOpacity: 0.8,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2.22,
  },
});
