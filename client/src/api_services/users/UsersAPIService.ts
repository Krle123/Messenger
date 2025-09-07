import axios from "axios";
import type { UserDto } from "../../models/users/UserDto";
import type { IUsersAPIService } from "./IUsersAPIService";
import type { UserResponse } from "../../types/user/UserResponse";

const API_URL: string = import.meta.env.VITE_API_URL;

export const usersApi: IUsersAPIService = {
  async getAllUsers(): Promise<UserDto[]> {
    try {
      const res = await axios.get<UserDto[]>(`${API_URL}users`);
      return res.data;
    } catch {
      return Promise.reject("Failed to fetch users");
    }
  },
  async getUserById(id: number): Promise<UserDto> {
    try {
      const res = await axios.get<UserResponse>(`${API_URL}user${id}`);
      return res.data.data as UserDto;
    } catch {
      return Promise.reject("User not found");
    }
  },

  async updateUser(user: UserDto): Promise<UserResponse> {
    try {
      const res = await axios.put<UserResponse>(`${API_URL}update`, user);
      return res.data;
    } catch {
      return Promise.reject("User not found");
    }
  }
};
