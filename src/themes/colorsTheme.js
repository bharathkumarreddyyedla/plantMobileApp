import { createTheme } from "@rneui/themed";
import { ThemeConsumer } from "react-native-elements";

const theme = createTheme({
  theme: {
    lightColors: {
      primary: "#899656",
    },
    darkColors: {
      primary: "#344512",
    },
    mode: "light",
  },
});
// const theme = {
//   ...ThemeConsumer,
//   colors: {
//     lightColors: {
//       primary: "#899656",
//     },
//     darkColors: {
//       primary: "#344512",
//     },
//     mode: "light",
//   },
// };

export default theme;
