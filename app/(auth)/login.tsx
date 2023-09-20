import { SafeAreaView } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Button, Text, Input } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";
import { setUser } from "@/utils/redux/features/user/userSlice";
import { useLoginQuery } from "@/utils/redux/features/api/apiSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");

  // Conditionally skip the query using the `skip` option
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useLoginQuery(email, { skip: true });

  const handleLogin = () => {
    // refetch();
    //Will try mutations instead
  };

  // if (user) {
  //   console.log("****USER****\n", user);
  //   // dispatch(setUser(user)); // Uncomment this when you're ready to dispatch
  //   // router.replace("/(app)/home"); // Uncomment this when you're ready to navigate
  // } else {
  //   console.log("****NO USER****\n", user);
  // }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text h2>Please login</Text>
      <Input
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
      />
      <Button title={"Login"} onPress={() => handleLogin()} />
    </SafeAreaView>
  );
};

export default Login;
