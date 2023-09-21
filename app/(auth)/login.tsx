import { SafeAreaView, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, Text, Input, Icon } from "@rneui/themed";
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
        margin: 20,
      }}
    >
      <Text
        h2
        style={{
          // marginBottom: 200,
          marginVertical: 50,
        }}
      >
        Welcome back! Glad to see you, Again!
      </Text>
      <View
        style={{
          marginVertical: 20,
          borderWidth: 1,
          width: "100%",
          padding: 10,
          display: "flex",
          flexDirection: "column",
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
          placeholder="Enter your email"
          inputContainerStyle={{
            padding: 10,
            backgroundColor: "#E7E7E7",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#8391A1",
          }}
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
          inputContainerStyle={{
            padding: 10,
            backgroundColor: "#E7E7E7",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#8391A1",
          }}
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
        <Button title={"Login"} onPress={() => handleLogin()} />


      </View>
    </SafeAreaView>
  );
};

export default Login;
