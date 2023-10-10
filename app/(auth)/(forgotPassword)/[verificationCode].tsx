import { KeyboardAvoidingView, SafeAreaView, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, Text, Input, Icon, useTheme, InputProps } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/redux/features/user/userSlice";
import { loginUser } from "@/utils/redux/features/user/user";
import {Platform} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { OTPBlob } from "@/components/icons";
import { useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "expo-router";
import themeColors from "@/assets/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const LoginSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
});

const CodeVerification = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ verificationCode: string }>();
  //   const { verificationCode } = useLocalSearchParams();
  const { theme } = useTheme();

  console.log("CODE PARAMS: ", params);

  const handleLogin = async (values: { code: string }) => {
    if (params.verificationCode !== values.code) {
      console.log("Error logging in:", "Invalid code");
    } else {
      router.replace("/(auth)/login");
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    style={{
      paddingTop: insets.top,
      alignItems: "center",
      flex: 1,
      backgroundColor: themeColors.quaternaryShaded[100],
    }}
    >
      <Formik
        initialValues={{ code: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isSubmitting,
        }) => (
          <>
            <Text
              h1
              style={{
                paddingHorizontal: 14,
                marginVertical: 20,
              }}
            >
              OTP Verification
            </Text>

            <View
              style={{
                margin: 60,
              }}
            >
              <OTPBlob />
            </View>

            <Text
              style={{
                paddingHorizontal: 14,
                marginVertical: 20,
                color: "#8391A1",
                fontSize: 20,
              }}
            >
              Enter the verification code we just sent on your email address.
            </Text>
            <View
              style={{
                alignItems: "stretch",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                paddingHorizontal: 10,
              }}
            >
              <Input
                keyboardType="numeric"
                onChangeText={handleChange("code")}
                onBlur={handleBlur("code")}
                value={values.code}
                errorMessage={errors.code}
              />

              <Button
                style={{
                  margin: 10,
                }}
                disabled={isSubmitting}
                loading={isSubmitting}
                title={"Verify"}
                onPress={() => handleSubmit()}
              />
            </View>
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                alignItems: "center",
                margin: 10,
              }}
            >
              <Text style={{ fontSize: 18 }}>Didn't get the code ? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text style={{ color: theme.colors.primary, fontSize: 18 }}>
                  Resend
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default CodeVerification;
