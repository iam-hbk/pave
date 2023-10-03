import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import socket from "@/utils/redux/socket";
import { getUserRanking } from "@/utils/redux/features/user/user";
import { selectUser } from "@/utils/redux/features/user/userSlice";
import { useSelector } from "react-redux";
import { User } from "@/types";
import Toast from "react-native-toast-message";
import useSocket from "./useSocket";

export const useStudentRanking = () => {
  const user = useSelector(selectUser) as User;
  const { data, error, refetch } = useQuery(["userRanking"], () =>
    getUserRanking(user._id)
  );

  useSocket("wallet change", async (...args: any[]) => {
    console.log("wallet change", args);
    await refetch();
  });

  if (error) {
    Toast.show({
      type: "error",
      position: "top",
      text2: (error as any).message,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
    });
  }

  return { data, error };
};
