import { getDeviceTypeAsync } from "expo-device";

export const tabletDimensions = {
  tabletView: getDeviceTypeAsync() === "Tablet",
};

export const plantCycleList = [
  { label: "1st cycle", value: "1" },
  { label: "2nd cycle", value: "2" },
  { label: "3rd cycle", value: "3" },
  { label: "4th cycle", value: "4" },
];

export const careLevel = [
  { label: "High" },
  { label: "Medium" },
  { label: "Low" },
];
export const yesOrNO = [{ label: "Yes" }, { label: "No" }];
