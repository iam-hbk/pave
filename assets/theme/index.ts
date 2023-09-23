import { createTheme, darkColors } from "@rneui/themed";
import { Platform } from "react-native";
import themeColors from "../colors";

const theme = createTheme({
  lightColors: {
    ...themeColors,
  },
  components: {
    Button: {
      buttonStyle: {
        borderRadius: 7,
        padding: 15,
        paddingHorizontal: 20,
        backgroundColor: themeColors.primaryButtonBackground,
      },
      titleStyle: {
        fontFamily: "UrbanistRegular",
      },
    },
    Text: {
      style: {
        fontFamily: "UrbanistRegular",
      },
      h1Style: {
        fontFamily: "UrbanistBold",
      },
      h2Style: {
        fontFamily: "UrbanistSemiBold",
      },
    },
    Input: {
      inputStyle: {
        fontFamily: "UrbanistRegular",
      },
      inputContainerStyle: {
        padding: 10,
        backgroundColor: "#E7E7E7",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#8391A150",
      },
    },
  },
  fonts: {
    regular: "UrbanistRegular",
    bold: "UrbanistBold",
    italic: "UrbanistItalic",
    // ... add other font styles as needed
  },
});
export default theme;
