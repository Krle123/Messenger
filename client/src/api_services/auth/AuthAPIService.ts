import type { AuthResponse } from "../../types/auth/AuthResponse";
import type { IAuthAPIService } from "./IAuthAPIService";
import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_URL + "auth";

export const authApi: IAuthAPIService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const res = await axios.post<AuthResponse>(`${API_URL}/login`, {
        username,
        password,
      });
      return res.data;
    } catch (error) {
      let message = "An error has occurred while logging in.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return {
        success: false,
        message,
        data: undefined,
      };
    }
  },

  async registration(
    username: string,
    password: string,
    role: string
  ): Promise<AuthResponse> {
    try {
      const res = await axios.post<AuthResponse>(`${API_URL}/register`, {
        username,
        password,
        role
      });
      return res.data;
    } catch (error) {
      let message = "An error has occurred during registration.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return {
        success: false,
        message,
        data: undefined,
      };
    }
  },
};
