export type User = {
  token: string;
  user: {
    _id: string;
    email: string;
    password: string;
    role: "Student" | "Lecturer" | "Admin";
    name: string;
    profilePicture?: string; // url
    wallet: number;
    __v?: number;
  };
};
export type RegisterProps = {
  email: string;
  password: string;
  name: string;
  role: "Student" | "Lecturer" | "Admin";
};

export type LoginProps = {
  email: string;
  password: string;
};

export type LocalToken = {
  token: string;
  expiry: number;
  user: User;
};
