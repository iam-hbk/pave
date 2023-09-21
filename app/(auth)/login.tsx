import { SafeAreaView, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, Text, Input, Icon, useTheme } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { RootState } from "@/utils/redux/store";
import { setUser } from "@/utils/redux/features/user/userSlice";
import { loginUser } from "@/utils/api/user";
import { User } from "@/types";
import { Stack } from "@rneui/layout";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const { theme } = useTheme();

  const handleLogin = async () => {
    if (email.trim() === "") {
      // Handle case when email is empty
      console.log("Email is required");
      return;
    }

    const result = await loginUser(email);

    if (result instanceof Error) {
      console.log("Error logging in:", result.message);
    } else {
      dispatch(setUser(result));
      router.replace("/(app)/home");
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
      <Text
        h2
        style={{
          alignSelf: "center",
          paddingHorizontal: 14,
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
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your student email"
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
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password"
        />
        <Link href={"/(auth)/forgotPassword"} asChild>
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
        </Link>
        <Button
          style={{
            margin: 10,
          }}
          title={"Login"}
          onPress={() => handleLogin()}
        />
      </View>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 18,
          margin: 10,
        }}
      >
        Don’t have an account?{" "}
        <Link href={"/(auth)/register"} asChild>
          <Text style={{ color: theme.colors.primary }}>Register Now</Text>
        </Link>
      </Text>
    </SafeAreaView>
  );
};

export default Login;
