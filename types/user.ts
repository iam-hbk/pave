export type User = {
  _id: string;
  email: string;
  role: "Student" | "Lecturer" | "Admin";
  name: string;
  profilePicture?: string; // url
  wallet: number;
  token: string;
  localRank?: number;
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
