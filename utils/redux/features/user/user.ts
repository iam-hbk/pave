import { LocalStorageUser, LoginProps, RegisterProps, User } from "@/types";
import api, { axios_api } from "../../api";
import { setUserTokenToLocalStorage } from "@/utils/helpers";
import axios from "axios";

import { OPENAI_API_KEY } from "@env";

export async function loginUser({
  email,
  password,
}: LoginProps): Promise<User> {
  try {
    const responseData: any = await api.url("/users/login").post({
      email,
      password,
    });
    console.log("[LOGIN][TOKEN]:", JSON.stringify(responseData, null, 2));
    const user: User = {
      _id: responseData.user._id,
      email: responseData.user.email,
      role: responseData.user.role,
      name: responseData.user.name,
      profilePicture: responseData.user.profilePicture,
      wallet: responseData.user.wallet,
      token: responseData.user.token,
      modules: responseData.user.modules,
      consecutiveLogins: responseData.user.consecutiveLogins,
    };

    // Save the user data to local storage
    const localData: LocalStorageUser = {
      _id: user._id,
      token: user.token,
    };
    await setUserTokenToLocalStorage(localData);

    return user;
  } catch (error) {
    throw Error((error as Error).message);
  }
}

// export async function registerUser({
//   name,
//   email,
//   password,
//   role = "Student",
// }: RegisterProps): Promise<User> {
//   try {
//     const responseData: any = await api.url("/users/register").post({
//       email,
//       password,
//       name,
//       role,
//     });

//     console.log(
//       "\n\n[REGISTER][TOKEN]:",
//       JSON.stringify(responseData, null, 2)
//     );

//     const user: User = {
//       _id: responseData.user._id,
//       email: responseData.user.email,
//       role: responseData.user.role,
//       name: responseData.user.name,
//       profilePicture: responseData.user.profilePicture,
//       wallet: responseData.user.wallet,
//       token: responseData.user.token,
//     };

//     console.log("\n\n[REGISTER][TOKEN]:", JSON.stringify(user, null, 2));
//     // Save the user data to local storage
//     await setUserTokenToLocalStorage(user);

//     return user;
//   } catch (error) {
//     console.log("\n\n[REGISTER][ERROR]:", JSON.stringify(error, null, 2));
//     throw Error((error as Error).message);
//   }
// }
export async function registerUser({
  name,
  email,
  password,
  role = "Student",
  consecutiveLogins = 0,
}: RegisterProps): Promise<User> {
  try {
    // Use the axios instance to make your POST request
    const response = await axios_api.post("/users/register", {
      name,
      email,
      password,
      role,
      consecutiveLogins,
    });

    const responseData = response.data;

    console.log(
      "\n\n[REGISTER][TOKEN]:",
      JSON.stringify(responseData, null, 2)
    );

    const user: User = {
      _id: responseData.userResponse._id,
      email: responseData.userResponse.email,
      role: responseData.userResponse.role,
      name: responseData.userResponse.name,
      profilePicture: responseData.userResponse.profilePicture,
      wallet: responseData.userResponse.wallet,
      token: responseData.userResponse.token,
      modules: responseData.userResponse.modules,
      consecutiveLogins: responseData.user.consecutiveLogins,
    };

    console.log("\n\n[REGISTER][TOKEN]:", JSON.stringify(user, null, 2));
    // Save the user data to local storage
    const localData: LocalStorageUser = {
      _id: user._id,
      token: user.token,
    };
    await setUserTokenToLocalStorage(localData);

    return user;
  } catch (error) {
    console.log("\n\n[REGISTER][ERROR]:", JSON.stringify(error, null, 2));
    throw Error((error as Error).message);
  }
}
export async function getUser(id: string, token: string): Promise<User> {
  try {
    const responseData: any = await api
      .auth(`Bearer ${token}`)
      .url(/users/ + id)
      .get();

    const user: User = {
      _id: responseData.user._id,
      email: responseData.user.email,
      role: responseData.user.role,
      name: responseData.user.name,
      profilePicture: responseData.user.profilePicture,
      wallet: responseData.user.wallet,
      modules: responseData.user.modules,
      token: responseData.user.token,
      consecutiveLogins: responseData.user.consecutiveLogins,
    };

    return user;
  } catch (error) {
    console.log("\n\n[GET USER][ERROR]:", JSON.stringify(error, null, 2));
    throw Error((error as Error).message);
  }
}
interface ErrorResponse {
  message: string;
}
// Usage within your function
export async function getUserRanking(userId: string): Promise<number> {
  try {
    const responseData: any = await api
      .auth("Bear")
      .url(`/users/ranking/${userId}`)
      .get();
    return responseData.ranking;
  } catch (error) {
    const apiError = error as ErrorResponse;
    const message: string = JSON.parse(apiError.message).message;

    // console.log("\n\n\n[API] Error Response:\n", JSON.stringify(error, null, 2));
    throw Error(message);
  }
}

//function to generate a random quote
export async function generateShortCode(): Promise<string> {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Craft a witty, be original, short quote, max 10 words, to inspire students.",
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    // Check if the response has the 'choices' property and at least one choice
    if (
      response &&
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0
    ) {
      console.log(response.data.choices[0].message.content);
      return response.data.choices[0].message.content;
    } else {
      console.error(
        "Error: Unexpected response format from OpenAI API. Status:",
        response.status,
        "Data:",
        response.data
      );
      return "";
    }
  } catch (error) {
    console.error("Error during summary and action steps generation:", error);
    return "Leave Snapchat, It will still be there tomorrow";
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
