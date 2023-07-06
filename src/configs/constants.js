import { getDeviceTypeAsync } from "expo-device";

export const tabletDimensions = {
  tabletView: getDeviceTypeAsync() === "Tablet",
};
export const aToE = ["A", "B", "C", "D", "E"];
export const fToJ = ["F", "G", "H", "I", "J"];
export const kToO = ["K", "L", "M", "N", "O"];
export const pToT = ["P", "Q", "R", "S", "T"];
export const uToZ = ["U", "V", "W", "X", "Y", "Z"];

export const plantCycleList = [
  { label: "perennial", value: "perennial" },
  { label: "annual", value: "annual" },
  { label: "biennial", value: "biennial" },
  { label: "biannual", value: "biannual" },
];
export const plantWateringList = [
  { label: "frequent", value: "frequent" },
  { label: "average", value: "average" },
  { label: "minimum", value: "minimum" },
  { label: "none", value: "none" },
];
export const plantSunExposureList = [
  { label: "Full Shade", value: "full_shade" },
  { label: "Part Shade", value: "part_shade" },
  { label: "Sun-part Shade", value: "sun-part_shade" },
  { label: "Full Sun", value: "full_sun" },
];

export const careLevel = [
  { label: "High" },
  { label: "Medium" },
  { label: "Low" },
];
export const yesOrNO = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];

export const plantFAQ = [
  {
    id: 0,
    question: "What kind of plant you would like to grow ?",
    options: ["Indoor Plant", "Outdoor Plant"],
  },
];
export const indoorPlantFAQ = [
  {
    id: 0,
    tag: "Cycle",
    question: "Are you looking for a plant to come back to life?",
    options: [
      {
        id: 0,
        label:
          "I want a plant that's a botanical phoenix, reblooming each year",
        value: "perennial",
      },
      {
        id: 1,
        label: "One life is enough for plants",
        value: "annual",
      },
      {
        id: 2,
        label: "Skip Question",
        value: "NA",
      },
    ],
  },
  {
    id: 1,
    tag: "Watering",
    question: "Are you a person that has time to water?",
    options: [
      {
        id: 0,
        label: "Yes I got all the time in the world",
        value: "frequent",
      },
      {
        id: 1,
        label: "I might have a minute or two!",
        value: "average",
      },
      {
        id: 2,
        label: "I can barely sit down",
        value: "minimum",
      },
      {
        id: 3,
        label: "Skip Question",
        value: "NA",
      },
    ],
  },
  {
    id: 2,
    tag: "Sunlight",
    question: "How much sunlight do you get?",
    options: [
      {
        id: 0,
        label: "I'm drowning in sunlight",
        value: "full_sun",
      },
      {
        id: 1,
        label: "I get it then and there",
        value: "part_shade",
      },
      {
        id: 2,
        label: "What's sunlight?!",
        value: "full_shade",
      },
      {
        id: 3,
        label: "Skip Question",
        value: "NA",
      },
    ],
  },
];
export const indoorPlantFAQlabels = ["Cycle", "Watering", "Sunlight"];
export const outdoorPlantFAQlabels = ["Cycle", "Watering", "Sunlight"];
export const outdoorPlantFAQ = [
  {
    id: 0,
    tag: "Cycle",
    question: "Are you looking for a plant to come back to life?",
    options: [
      {
        id: 0,
        label:
          "I want a plant that's a botanical phoenix, reblooming each year",
        value: "perennial",
      },
      {
        id: 1,
        label: "One life is enough for plants",
        value: "annual",
      },
      {
        id: 2,
        label: "Skip Question",
        value: "NA",
      },
    ],
  },
  {
    id: 1,
    tag: "Watering",
    question: "Are you a person that has time to water?",
    options: [
      {
        id: 0,
        label: "Yes I got all the time in the world",
        value: "frequent",
      },
      {
        id: 1,
        label: "I might have a minute or two!",
        value: "average",
      },
      {
        id: 2,
        label: "I can barely sit down",
        value: "minimum",
      },
      {
        id: 3,
        label: "Skip Question",
        value: "NA",
      },
    ],
  },
  {
    id: 2,
    tag: "Sunlight",
    question: "How much sunlight do you get?",
    options: [
      {
        id: 0,
        label: "I'm drowning in sunlight",
        value: "full_sun",
      },
      {
        id: 1,
        label: "I get it then and there",
        value: "part_shade",
      },
      {
        id: 2,
        label: "What's sunlight?!",
        value: "full_shade",
      },
      {
        id: 3,
        label: "Skip Question",
        value: "NA",
      },
    ],
  },
];

export const calenderTypes = [

  {
    label: "Daily",
    value: "DAILY",
  },
  {
    label: "Weekly",
    value: "WEEKLY",
  },
  {
    label: "Monthly",
    value: "MONTHLY",
  },
];
