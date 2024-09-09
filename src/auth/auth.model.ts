export interface LoginDto {
  userCode: string;
  password: string;
}

export interface LogoutDto {
  userCode: string;
}

export interface IUser {
  userCode: string;
  userName: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export type IAuthUser = IUser & IToken;
