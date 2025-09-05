import { MessageDto } from "../../Domain/DTOs/msg/MessageDto";
import { UnreadDto } from "../../Domain/DTOs/msg/UnreadDto";
import { Message } from "../../Domain/models/Message";
import { IMessageRepository } from "../../Domain/repositories/messages/IMessageRepository";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IMsgService } from "../../Domain/services/msg/IMsgService";

export class MsgService implements IMsgService {

    public constructor(private messageRepository: IMessageRepository, private userRepository: IUserRepository) {}

    async sendMessage(idRcv: number, idSnd: number, messageContent: string): Promise<MessageDto> {
        const message = await this.messageRepository.create(new Message(0, idRcv, idSnd, messageContent));

        if(message.id !== 0) 
        {
            return new MessageDto(message.id, message.idRcv, message.idSnd, message.messageContent, message.msgTime, message.msgRead);
        }

        return new MessageDto();
    }

    async getConversation(idUser: number, idConversationPartner: number): Promise<MessageDto[]> {
        const messages = await this.messageRepository.getByConversation(idUser, idConversationPartner);

        if(messages.length > 0)
        {
            return messages.map(message => new MessageDto(message.id, message.idRcv, message.idSnd, message.messageContent, message.msgTime, message.msgRead));
        }
        return [];
    }

    async getUnreadCount(idRcv: number): Promise<UnreadDto[]> {
        const unreadCounts = await this.messageRepository.getUnreadCount(idRcv);

        if(unreadCounts.length > 0)
        {
            return unreadCounts.map(unread => new UnreadDto(unread.idSnd, unread.unreadCount));
        }
        return [];
    }

    async getContactList(idRcv: number): Promise<number[]> {
        const contactIds = await this.messageRepository.getContactList(idRcv);

        if(contactIds.length > 0)
        {
            return contactIds;
        }
        return [];
    }

    async markAsRead(id: number): Promise<boolean> {
        console.log("Marking message as read in service:", id);
        const message = await this.messageRepository.getById(id);
        if(message.id !== 0)
        {
            message.msgRead = true;
            console.log("Updating message to read:", message);
            const updatedMessage = await this.messageRepository.update(message);
            console.log("Updated message:", updatedMessage);
            return updatedMessage.id !== 0;
        }
        console.log("Message not found with id:", id);
        return false;
    }
}