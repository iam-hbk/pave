import axios from "axios";
import { selectUser, selectUserToken, selectUserId } from "../user/userSlice";
import { useSelector } from "react-redux";
import api from "../../api";

import wretch from "wretch";

const CheckIn = async (token:string,userId:string) => {

  const url = `${api}/users/checkin`;
  try {
    const response = await wretch(url)
      .headers({
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      })
      .post({ id: userId })
      .json();

    console.log(response);
  } catch (error) {
    console.error("Error during the request:", error);
  }
};

export default CheckIn;
