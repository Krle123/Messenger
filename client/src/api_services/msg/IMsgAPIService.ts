import type { MsgResponse } from "../../types/msg/MsgResponse";
import type { UnreadResponse } from "../../types/msg/UnreadResponse";

export interface IMsgAPIService {
    sendMessage(idRcv: number, idSnd: number, messageContent: string): Promise<MsgResponse>;
    getConversation(idUser: number, idConversationPartner: number): Promise<MsgResponse>;
    markAsRead(id: number): Promise<boolean>;
    getUnreadCount(idRcv: number): Promise<UnreadResponse>;
    getContactList(idRcv: number): Promise<MsgResponse>;
}