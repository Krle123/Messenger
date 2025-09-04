import type { MessageDto } from "../../models/msg/MessageDto";
import type { MsgResponse } from "../../types/msg/MsgResponse";

export interface IMsgAPIService {
    sendMessage(idRcv: number, idSnd: number, messageContent: string): Promise<MsgResponse>;
    getConversation(idRcv: number, idSnd: number): Promise<MessageDto[] | null>;
    markAsRead(id: number): Promise<boolean>;
    getUnreadCount(idRcv: number): Promise<number | null>;
    getContactList(idRcv: number): Promise<number[] | null>;
}