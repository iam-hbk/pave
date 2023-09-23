import { KeyboardAvoidingView, SafeAreaView, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, Text, Input, Icon, useTheme, InputProps } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/redux/features/user/userSlice";
import { loginUser, verifyUser } from "@/utils/redux/features/user/user";

import { Formik } from "formik";
import * as Yup from "yup";
import { ForgotPasswordBlob } from "@/components/icons";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
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
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: 15,
        margin: 20,
      }}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
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
          <KeyboardAvoidingView
            behavior="padding"
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
                errorMessage={errors.email}
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
            <Text
              style={{
                alignSelf: "center",
                fontSize: 18,
                margin: 10,
              }}
            >
              Remember Password?{" "}
              <Link href={"/(auth)/login"} asChild>
                <Text style={{ color: theme.colors.primary }}>Login Now</Text>
              </Link>
            </Text>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ForgotPassword;
