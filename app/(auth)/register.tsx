import { View, Platform } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Button, Text, Input, Icon, useTheme } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/redux/features/user/userSlice";
import { registerUser, loginUser } from "@/utils/redux/features/user/user";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import * as Yup from "yup";
import { KeyboardAvoidingView } from "react-native";
import { RegisterProps } from "@/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

interface RegisterPropsExt extends RegisterProps {
  confirmPassword: string;
}

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(
      /^\d{9}@student\.uj\.ac\.za$/,
      "Please enter a valid UJ student email address <student_number>@student.uj.ac.za"
    ),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const { theme } = useTheme();

  const registerMutation = useMutation(registerUser, {
    onSuccess: (result) => {
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
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: JSON.parse(error.message).message,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
      });
    },
  });

  const handleRegister = async (values: RegisterPropsExt) => {
    const v: RegisterProps = {
      ...values,
      email: values.email.toLowerCase(),
      name: values.name.toLowerCase(),
    };
    console.log("DATA:", JSON.stringify(v, null, 2));
    if (registerMutation.isLoading) return;
    if (registerMutation.isSuccess) return;
    if (registerMutation.isError) registerMutation.reset();
    registerMutation.mutate(v);
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
          consecutiveLogins: 0,
        }}
        validationSchema={RegisterSchema}
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
