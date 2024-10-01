export type LoginRequestType = {
  email: string;
  password: string;
};
export type LoginResponseType = {
  user: User;
  accessToken: string;
  refreshToken: string;
} | null;

export interface User {
  id: string;
  email: string;
}

export type SignUpRequestType = {
  name: string;
  email: string;
  password: string;
};
export type SignUpResponseType = {
  name: string;
  email: string;
  password: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export interface Root {
  user: User
  accessToken: string
  refreshToken: string
}

export interface User {
  id: string
  email: string
}

export type GetUsersResponseType = GetUserResponse[];

export type GetUserResponse = {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
