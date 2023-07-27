import { Dimensions, PixelRatio, Platform } from "react-native";
import { tabletDimensions } from "./constants";
export * from "expo-font";
import * as Font from "expo-font";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 360;

export function normalize(size) {
  let newSize = "";
  // let val =getDeviceType() === 'Tablet' ? 10 : 0
  newSize = size * (SCREEN_WIDTH / 375) - tabletDimensions.tabletView ? 10 : 0;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
export const useFonts = async () =>
  await Font.loadAsync({
    MB: require("../../assets/fonts/Manrope-Bold.ttf"),
    MEB: require("../../assets/fonts/Manrope-ExtraBold.ttf"),
    MEL: require("../../assets/fonts/Manrope-ExtraLight.ttf"),
    ML: require("../../assets/fonts/Manrope-Light.ttf"),
    MM: require("../../assets/fonts/Manrope-Medium.ttf"),
    MR: require("../../assets/fonts/Manrope-Regular.ttf"),
    MSB: require("../../assets/fonts/Manrope-SemiBold.ttf"),
  });

export default {
  RBLACK: "RBlack",
  RBLACKI: "RBlackI",
  RB: "RB",
  RBI: "RBI",
  RI: "RI",
  RL: "RL",
  RLI: "RLI",
  RM: "RM",
  RMI: "RMI",
  RR: "RR",
  RRI: "RRI",
  RT: "RT",
  RTI: "RTI",
  n: normalize,
};
