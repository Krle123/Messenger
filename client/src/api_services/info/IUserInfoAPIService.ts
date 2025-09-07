import type { UserInfoDto } from "../../models/users/UserInfoDto";

export interface IUserInfoAPIService {
  getUserInfo(): Promise<UserInfoDto>;
  updateUserInfo(firstName: string, lastName: string, phone: string): Promise<UserInfoDto>;
}