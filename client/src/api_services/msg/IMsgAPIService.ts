import type { MessageDto } from "../../models/msg/MessageDto";
import type { UnreadDto } from "../../models/msg/UnreadDto";
import type { MsgResponse } from "../../types/msg/MsgResponse";

export interface IMsgAPIService {
    sendMessage(idRcv: number, idSnd: number, messageContent: string): Promise<MsgResponse>;
    getConversation(idUser: number, idConversationPartner: number): Promise<MessageDto[]>;
    markAsRead(id: number): Promise<boolean>;
    getUnreadCount(idRcv: number): Promise<UnreadDto[]>;
    getContactList(idRcv: number): Promise<number[] | null>;
}