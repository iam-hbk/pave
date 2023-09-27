import { KeyboardAvoidingView, SafeAreaView, View } from "react-native";
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
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const { theme } = useTheme();

  const handleLogin = async (values: LoginProps) => {
    try {
      console.log("Logging in with:", values);
      const result = await loginUser(values);
      console.log("Result:", result);
      dispatch(setUser(result));
      router.replace("/(app)/home/main");
    } catch (error: any) {
      console.log("Error logging in:", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: 15,
        margin: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        gap: 10,
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
          <KeyboardAvoidingView behavior="padding">
            <Text
              h2
              style={{
                alignSelf: "center",
                paddingHorizontal: 14,
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
                errorMessage={errors.email}
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
                errorMessage={errors.password}
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
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Login;
