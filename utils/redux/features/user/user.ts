import { LoginProps, RegisterProps, User } from "@/types";
import Toast from "react-native-toast-message";
import api from "../../api";

export async function loginUser({
  email,
  password,
}: LoginProps): Promise<User> {
  try {
    const user = await api.url("/users/login").post({
      email,
      password,
    });
    console.log("LOGGED IN:", user);
    return user as User;
  } catch (error) {
    throw Error((error as Error).message);
  }
}

export async function registerUser({
  name,
  email,
  password,
  role = "Student",
}: RegisterProps): Promise<User> {
  try {
    const user = await api.url("/users/register").post({
      email,
      password,
      name,
      role,
    });
    console.log("[user-api/register]\tLOGGED IN:", user);
    return user as User;
  } catch (error) {
    throw Error((error as Error).message);
  }
}

//This is for the forgot password api
export async function verifyUser(email: string): Promise<{ code: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res: { code: string } = { code: "1234" };
      resolve(res);
    }, 3000);
  });
}
