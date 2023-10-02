import { View } from "react-native";
// hooks/useRefreshUser.js
import React, { useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/utils/redux/features/user/userSlice";
import { getUser } from "@/utils/redux/features/user/user";
import { User } from "@/types";
export const useRefreshUser = () => {
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(selectUser) as User;
  const dispatch = useDispatch();

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    console.log("\n\nBEFORE UPDATE\n\n", JSON.stringify(user, null, 2));
    try {
      const updatedUserData = await getUser(user._id, user.token);
      dispatch(setUser(updatedUserData));
      console.log("\n\n[NEW USER]\n", updatedUserData);
    } catch (error) {
      console.error("Failed to refresh user data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return {
    refreshing,
    handleRefresh,
  };
};
