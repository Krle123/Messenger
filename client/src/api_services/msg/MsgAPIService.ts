import axios from "axios";
import type { IMsgAPIService } from "./IMsgAPIService";
import type { MessageDto } from "../../models/msg/MessageDto";
import type { MsgResponse } from "../../types/msg/MsgResponse";


const API_URL: string = import.meta.env.VITE_API_URL;

export const msgAPI : IMsgAPIService =
{
    async sendMessage(idRcv: number, idSnd: number, messageContent: string): Promise<MsgResponse> {
        try {
            console.log(`${API_URL}messages/send`);
            const res = await axios.post(`${API_URL}messages/send`, { idRcv, idSnd, messageContent });
            console.log(`${API_URL}messages/send`);
            return res.data;
        } catch (error) {
            let message = "An error has occurred while sending the message.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            return { success: false, message, data: undefined };
        }
    },

    async getConversation(idRcv: number, idSnd: number): Promise<MessageDto[] | null> {
        try {
            const res = await axios.get<MessageDto[]>(`${API_URL}messages/conversation/${idRcv}/${idSnd}`);
            return res.data;
        } catch (error) {
            let message = "An error has occurred while fetching messages.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            console.error(message);
            return null;
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

    async getUnreadCount(idRcv: number): Promise<number | null> {
        try {
            const res = axios.get<number>(`${API_URL}messages/unread/${idRcv}`);
            return res.then(response => response.data);
        } catch (error) {
            let message = "An error has occurred while fetching unread messages.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            console.error(message);
            return Promise.resolve(null);
        }
    },

    async getContactList(idRcv: number): Promise<number[] | null> {
        try {
            const res = axios.get<number[]>(`${API_URL}messages/contacts/${idRcv}`);
            return res.then(response => response.data);
        } catch (error) {
            let message = "An error has occurred while fetching the contact list.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            console.error(message);
            return Promise.resolve(null);
        }
    }
}