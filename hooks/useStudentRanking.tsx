// useWalletChange.ts
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import socket from "@/utils/redux/socket";
import { getUserRanking } from "@/utils/redux/features/user/user";
import { selectUser } from "@/utils/redux/features/user/userSlice";
import { useSelector } from "react-redux";
import { User } from "@/types";
import Toast from "react-native-toast-message";

export const useStudentRanking = () => {
  const user = useSelector(selectUser) as User;
  const { data, error, refetch } = useQuery(["userRanking"], () =>
    getUserRanking(user._id)
  );

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
  useEffect(() => {
    const handleWalletChange = async () => {
      await refetch();
    };

    socket.on("wallet change", handleWalletChange);

    return () => {
      socket.off("wallet change", handleWalletChange);
    };
  }, [refetch]);

  return { data, error };
};
