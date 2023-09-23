import { KeyboardAvoidingView, SafeAreaView, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, Text, Input, Icon, useTheme, InputProps } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/redux/features/user/userSlice";
import { loginUser } from "@/utils/redux/features/user/user";

import { Formik } from "formik";
import * as Yup from "yup";
import { OTPBlob } from "@/components/icons";
import { useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "expo-router";
const LoginSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
});

const CodeVerification = () => {
  const dispatch = useDispatch();
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
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: 15,
        margin: 20,
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
            <Text
              style={{
                alignSelf: "center",
                fontSize: 18,
                margin: 10,
              }}
            >
              Didn’t received code?{" "}
              <Link href={"/(auth)/login"} asChild>
                <Text style={{ color: theme.colors.primary }}>Resend</Text>
              </Link>
            </Text>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default CodeVerification;
