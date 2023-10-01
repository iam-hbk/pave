import { LoginProps, RegisterProps, User } from "@/types";
import api from "../../api";
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

    const user: User = {
      _id: responseData.user._id,
      email: responseData.user.email,
      role: responseData.user.role,
      name: responseData.user.name,
      profilePicture: responseData.user.profilePicture,
      wallet: responseData.user.wallet,
      token: responseData.token,
    };

    // Save the user data to local storage
    await setUserTokenToLocalStorage(user);

    return user;
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
    const responseData: any = await api.url("/users/register").post({
      email,
      password,
      name,
      role,
    });

    const user: User = {
      _id: responseData.user._id,
      email: responseData.user.email,
      role: responseData.user.role,
      name: responseData.user.name,
      profilePicture: responseData.user.profilePicture,
      wallet: responseData.user.wallet,
      token: responseData.token,
    };

    // Save the user data to local storage
    await setUserTokenToLocalStorage(user);

    return user;
  } catch (error) {
    throw Error((error as Error).message);
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
              "Generate only one,short,funny quote to motivate student,  be creative, keep it to one short line, max 10 words.",
          },
        ],
        // max_tokens: 2000,
        // n: 1,
        // stop: null,
        // temperature: 0.5,
        // top_p: 1.0,
        // frequency_penalty: 0.0,
        // presence_penalty: 0.0,,
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
