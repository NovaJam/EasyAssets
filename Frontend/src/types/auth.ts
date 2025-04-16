export type Role = "Admin" | "User";

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
};

export type SignupData = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: Role;
  organisation_name?: string;
};
