import { KeyboardAvoidingView, Platform, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, Text, Input, Icon, useTheme, InputProps } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/redux/features/user/userSlice";
import { loginUser } from "@/utils/redux/features/user/user";

import { Formik } from "formik";
import * as Yup from "yup";
import { LoginProps } from "@/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(
      /^\d{9}@student\.uj\.ac\.za$/,
      "Please enter a valid UJ student email address <student_number>@student.uj.ac.za"
    ),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const handleLogin = async (values: LoginProps) => {
    const v: LoginProps = {
      ...values,
      email: values.email.toLowerCase(),
    };
    try {
      const result = await loginUser(v);
      dispatch(setUser(result));
      Toast.show({
        type: "success",
        position: "top",
        text2: "Successfully logged in",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
      });
      router.replace("/(app)/home/main");
    } catch (error: any) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: JSON.parse(error.message).message,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        gap: 30,
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
          touched,
          errors,
          isSubmitting,
        }) => (
          <>
            <Text
              h2
              style={{
                alignSelf: "center",
                paddingHorizontal: 14,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Welcome back! Glad to see you, Again!
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
              <Input
                leftIcon={
                  <Icon
                    name="lock"
                    size={25}
                    color={"#8391A1"}
                    style={{
                      marginRight: 15,
                    }}
                  />
                }
                rightIcon={
                  <Icon
                    onPress={() => setShowPassword(!showPassword)}
                    type="font-awesome-5"
                    name={showPassword ? "eye-slash" : "eye"}
                    size={25}
                    color={"#8391A1"}
                    style={{
                      marginRight: 15,
                    }}
                  />
                }
                secureTextEntry={!showPassword}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                errorMessage={touched.password ? errors.password : undefined}
                placeholder="Enter your password"
              />
              <TouchableOpacity
                onPress={() =>
                  router.push("/(auth)/(forgotPassword)/forgotPassword")
                }
              >
                <Text
                  style={{
                    alignSelf: "flex-end",
                    fontSize: 16,
                    color: "#8391A1",
                    marginBottom: 10,
                  }}
                >
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
              <Button
                style={{
                  margin: 10,
                }}
                disabled={isSubmitting}
                loading={isSubmitting}
                title={"Login"}
                onPress={() => handleSubmit()}
              />
            </View>
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                margin: 10,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                Don’t have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                <Text style={{ color: theme.colors.primary, fontSize: 18 }}>
                  Register Now
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default Login;
