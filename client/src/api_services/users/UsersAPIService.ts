import axios from "axios";
import type { UserDto } from "../../models/users/UserDto";
import type { IUsersAPIService } from "./IUsersAPIService";

const API_URL: string = import.meta.env.VITE_API_URL + "user";

export const usersApi: IUsersAPIService = {
  async getAllUsers(): Promise<UserDto[]> {
    try {
      console.log("Fetching all users");
      const res = await axios.get<UserDto[]>(`${API_URL}s`, {});
      console.log("Users fetched:", res.data);
      return res.data;
    } catch {
      return [];
    }
  },
  async getUserById(id: number): Promise<UserDto> {
    try {
      const res = await axios.get<UserDto>(`${API_URL}/${id}`);
      return res.data;
    } catch {
      return Promise.reject("User not found");
    }
  }
};
