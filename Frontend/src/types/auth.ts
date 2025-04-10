export type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

export type SignupData = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  organisation_name?: string;
};
