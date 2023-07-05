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
export const yesOrNO = [{ label: "Yes" }, { label: "No" }];

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
    tag: "Care Level",
    question: "How experienced are you with plants?",
    options: [
      "I'm basically a Botanical Connoisseur",
      "I can keep a few plants alive",
      "I have a PhD in plant demise",
      "Skip Question",
    ],
  },
  {
    id: 1,
    tag: "Pets",
    question: "Do you have pets that chew on plants?",
    options: ["Yes, they love to munch", "No plant eaters", "Skip Question"],
  },
  {
    id: 2,
    tag: "Watering",
    question: "Are you a person that has time to water?",
    options: [
      "Yes I got all the time in the world",
      "I might have a minute or two!",
      "I can barely sit down",
      "Skip Question",
    ],
  },
  {
    id: 3,
    tag: "Sunlight",
    question: "How much sunlight do you get?",
    options: [
      "I'm drowning in sunlight",
      "I get it then and there",
      "What's sunlight?!",
      "Skip Question",
    ],
  },
];
export const indoorPlantFAQlabels = [
  "Care Level",
  "Pets",
  "Watering",
  "Sunlight",
];
export const outdoorPlantFAQlabels = [
  "Care Level",
  "Watering",
  "Sunlight",
  "Flower",
  "Fruits",
  "Cycle",
];
export const outdoorPlantFAQ = [
  {
    id: 0,
    tag: "Care Level",
    question: "How experienced are you with plants?",
    options: [
      "I'm basically a Botanical Connoisseur",
      "I can keep a few plants alive",
      "I have a PhD in plant demise",
      "Skip Question",
    ],
  },
  {
    id: 1,
    tag: "Watering",
    question: "Are you a person that has time to water?",
    options: [
      "Yes I got all the time in the world",
      "I might have a minute or two!",
      "I can barely sit down",
      "Skip Question",
    ],
  },
  {
    id: 2,
    tag: "Sunlight",
    question: "How much sunlight do you get?",
    options: [
      "I'm drowning in sunlight",
      "I get it then and there",
      "What's sunlight?!",
      "Skip Question",
    ],
  },
  {
    id: 3,
    tag: "Flower",
    question: "Woud you like some flowers?",
    options: [
      "Yes, I want a confetti blooms",
      "No flowers, please",
      "Skip Question",
    ],
  },
  {
    id: 4,
    tag: "Fruits",
    question: "Would you like some fruits?",
    options: [
      "Yes, I want a plant that drops goodies",
      "No goodies",
      "Skip Question",
    ],
  },
  {
    id: 5,
    tag: "Cycle",
    question: "Are you looking for a plant to come back to life?",
    options: [
      "I want a plant that's a botanical phoenix, reblooming each year",
      "One life is enough for plants",
      "Skip Question",
    ],
  },
];

export const calenderTypes = [
  {
    label: "Weekly",
    value: "WEEKLY",
  },
  {
    label: "Monthly",
    value: "MONTHLY",
  },
  {
    label: "Yearly",
    value: "YEARLY",
  },
];
