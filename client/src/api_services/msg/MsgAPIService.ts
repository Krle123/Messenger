import axios from "axios";
import type { IMsgAPIService } from "./IMsgAPIService";
import type { MsgResponse } from "../../types/msg/MsgResponse";
import type { UnreadResponse } from "../../types/msg/UnreadResponse";


const API_URL: string = import.meta.env.VITE_API_URL;

export const msgAPI : IMsgAPIService =
{
    async sendMessage(idRcv: number, idSnd: number, messageContent: string): Promise<MsgResponse> {
        try {
            const res = await axios.post(`${API_URL}messages/send`, { idRcv, idSnd, messageContent });
            return res.data;
        } catch (error) {
            let message = "An error has occurred while sending the message.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            return { success: false, message, data: undefined };
        }
    },

    async getConversation(idUser: number, idConversationPartner: number): Promise<MsgResponse> {
        try {
            console.log("Fetching conversation between", idUser, "and", idConversationPartner);
            const res = await axios.get<MsgResponse>(`${API_URL}messages/conversation/${idUser}/${idConversationPartner}`);
            return res.data;
        } catch (error) {
            let message = "An error has occurred while fetching messages.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            console.error(message);
            return { success: false, message, data: undefined };
        }
    },

    async markAsRead(id: number): Promise<boolean> {
        try {
            const res = await axios.post<boolean>(`${API_URL}messages/markAsRead/${id}`);
            return res.data;
        } catch (error) {
            let message = "An error has occurred while marking the message as read.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            console.error(message);
            return false;
        }
    },

    async getUnreadCount(idRcv: number): Promise<UnreadResponse> {
        try {
            const res = await axios.get<UnreadResponse>(`${API_URL}messages/unread/${idRcv}`);
            return res.data;
        } catch (error) {
            let message = "An error has occurred while fetching unread messages.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            console.error(message);
            return { success: false, message, data: undefined };
        }
    },

    async getContactList(idRcv: number): Promise<MsgResponse> {
        try {
            const res = axios.get<MsgResponse>(`${API_URL}messages/contacts/${idRcv}`);
            return res.then(response => response.data);
        } catch (error) {
            let message = "An error has occurred while fetching the contact list.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            console.error(message);
            return { success: false, message, data: undefined };
        }
    }
}