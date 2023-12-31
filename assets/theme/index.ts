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
        // backgroundColor: themeColors.primaryButtonBackground,
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
      h4Style: {
        fontFamily: "UrbanistSemiBold",
        fontSize: 16,
      },
    },
    Input: {
      inputStyle: {
        fontFamily: "UrbanistRegular",
      },
      inputContainerStyle: {
        padding: 10,
        backgroundColor: "#fff",
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
