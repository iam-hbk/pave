import { SafeAreaView, View, Platform } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, Text, Input, Icon, useTheme, InputProps } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/redux/features/user/userSlice";
import { registerUser, loginUser } from "@/utils/redux/features/user/user";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

import { Formik } from "formik";
import * as Yup from "yup";
import { KeyboardAvoidingView } from "react-native";
import { RegisterProps } from "@/types";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface RegisterPropsExt extends RegisterProps {
  confirmPassword: string;
}

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const { theme } = useTheme();

  const handleRegister = async (values: RegisterPropsExt) => {
    const v: RegisterProps = {
      ...values,
      email: values.email.toLowerCase(),
      name: values.name.toLowerCase(),
    };
    try {
      const result = await registerUser(v);
      console.log("============Result:", result);
      dispatch(setUser(result));
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
        gap: 40,
      }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          confirmPassword: "",
          role: "Student",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleRegister}
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
              h2
              style={{
                alignSelf: "center",
                paddingHorizontal: 14,
                textAlign: "center",
              }}
            >
              Hello! Register to get started
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
                    type="font-awesome-5"
                    name="user"
                    size={25}
                    color={"#8391A1"}
                    style={{
                      marginRight: 15,
                    }}
                  />
                }
                onFocus={(e) => console.log("Focus", e)}
                placeholder="Enter your name and surname"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                errorMessage={touched.name ? errors.name : undefined}
              />
              <Input
                leftIcon={
                  <Icon
                    type="antdesign"
                    name="mail"
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
                leftIcon={<EvilIcons name="lock" size={35} color="#8391A1" />}
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
              <Input
                leftIcon={
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={24}
                    color="#8391A1"
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
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                errorMessage={
                  touched.confirmPassword ? errors.confirmPassword : undefined
                }
                placeholder="Confirm your password"
              />
              <Button
                style={{
                  margin: 10,
                }}
                disabled={isSubmitting}
                loading={isSubmitting}
                title={"Register"}
                onPress={() => handleSubmit()}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
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
                Have an account ?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 18,
                    color: theme.colors.primary,
                  }}
                >
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

export default Register;
