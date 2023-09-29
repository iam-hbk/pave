import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, Text, Input, Icon, useTheme, InputProps } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/redux/features/user/userSlice";
import { loginUser, verifyUser } from "@/utils/redux/features/user/user";

import { Formik, insert } from "formik";
import * as Yup from "yup";
import { ForgotPasswordBlob } from "@/components/icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(
      /^\d{9}@student\.uj\.ac\.za$/,
      "Please enter a valid UJ student email address <student_number>@student.uj.ac.za"
    ),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const handleLogin = async (values: { email: string }) => {
    const result = await verifyUser(values.email);

    if (result instanceof Error) {
      console.log("Error logging in:", result.message);
    } else {
      router.push(`/${result.code}`);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        paddingTop: insets.top,
        alignItems: "center",
        flex: 1,
      }}
    >
      <Formik
        initialValues={{ email: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
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
              Forgot Password?
            </Text>

            <ForgotPasswordBlob />

            <Text
              style={{
                paddingHorizontal: 14,
                marginVertical: 20,
                color: "#8391A1",
                fontSize: 20,
              }}
            >
              Don't worry! It occurs. Please enter the email address linked with
              your account.
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
                leftIcon={
                  <Icon
                    name="email"
                    size={25}
                    color={"#8391A1"}
                    style={{
                      marginRight: 15,
                    }}
                  />
                }
                placeholder="Enter your student email"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                errorMessage={touched.email ? errors.email : undefined}
              />

              <Button
                style={{
                  margin: 10,
                }}
                disabled={isSubmitting}
                loading={isSubmitting}
                title={"Send Code"}
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
              <Text style={{ fontSize: 18 }}>Remember Password? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text style={{ color: theme.colors.primary, fontSize: 18 }}>
                  Login Now
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
