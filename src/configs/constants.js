import { getDeviceTypeAsync } from "expo-device";

export const tabletDimensions = {
  tabletView: getDeviceTypeAsync() === "Tablet",
};
