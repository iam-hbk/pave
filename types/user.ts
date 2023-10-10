export type User = {
  _id: string;
  email: string;
  role: "Student" | "Lecturer" | "Admin";
  name: string;
  profilePicture?: string; // url
  wallet: number;
  token: string;
  modules: string[];
  consecutiveLogins: number;
};
export type RegisterProps = {
  email: string;
  password: string;
  name: string;
  role: "Student" | "Lecturer" | "Admin";
  consecutiveLogins: 0;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type LocalStorageUser = {
  _id: string;
  token: string;
};
