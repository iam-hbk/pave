import { RegisterProps, User } from "@/types";
import wretch from "wretch";

const api = wretch("https://jsonplaceholder.typicode.com")
  .errorType("json")
  .resolve((r) => r.json());

export async function loginUser(userEmail: string): Promise<User> {
  try {
    const user = await api.get(`/users?email=${userEmail}`);
    console.log(user);
    return user as User;
  } catch (error) {
    throw Error();
  }
}

export async function registerUser({
  username,
  email,
  password,
}: RegisterProps): Promise<User> {
  console.log(username, email, password);
  return new Promise((resolve) => {
    setTimeout(() => {
      const res: User = {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        address: {
          street: "Douglas Extension",
          suite: "Suite 847",
          city: "McKenziehaven",
          zipcode: "59590-4157",
          geo: {
            lat: "-68.6102",
            lng: "-47.0653",
          },
        },
        phone: "1-463-123-4447",
        website: "ramiro.info",
        company: {
          name: "Romaguera-Jacobson",
          catchPhrase: "Face to face bifurcated interface",
          bs: "e-enable strategic applications",
        },
      };
      resolve(res);
    }, 3000);
  });
}

export async function verifyUser(email: string): Promise<{ code: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res: { code: string } = { code: "1234" };
      resolve(res);
    }, 3000);
  });
}
