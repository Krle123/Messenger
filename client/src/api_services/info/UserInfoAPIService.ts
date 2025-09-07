import axios from "axios";
import type { InfoResponse } from "../../types/user/infoResponse";

const API_URL: string = import.meta.env.VITE_API_URL + "info";

export const userInfoAPI = {   
    async getUserInfo(id: number): Promise<InfoResponse> {
         try {
            const res = axios.get<InfoResponse>(`${API_URL}messages/unread/${id}`);
            return res.then(response => response.data);
        } catch (error) {
            let message = "An error has occurred while fetching unread messages.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            console.error(message);
            return {id,
                success: false,
                message,
                data: undefined,
            }
        }
    },


    async updateUserInfo(id: number, firstName: string, lastName: string, phone: string): Promise<InfoResponse> { 
    try {
      const res = await axios.post<InfoResponse>(`${API_URL}/register`, {
        id,
        firstName,
        lastName,
        phone
      });
      return res.data;
    } catch (error) {
      let message = "An error has occurred during registration.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return {
        id,
        success: false,
        message,
        data: undefined,
      };
    }
}
} 