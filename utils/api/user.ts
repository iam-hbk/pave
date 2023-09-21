import { User } from "@/types";
import wretch from "wretch";

const api = wretch("https://jsonplaceholder.typicode.com")
  .errorType("json")
  .resolve((r) => r.json());

export async function loginUser(userEmail: string): Promise<User | Error> {
  try {
    const user = await api.get(`/users?email=${userEmail}`);
    console.log(user);
    return user as User;
  } catch (error) {
    console.log(error);
    return error as Error;
  }
}
