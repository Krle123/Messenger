import { Message } from "../../../Domain/models/Message";
import { IMessageRepository } from "../../../Domain/repositories/messages/IMessageRepository";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../../connection/DbConnectionPool";
import { Unread } from "../../../Domain/models/Unread";

export class MessageRepository implements IMessageRepository {
    async create(message: Message): Promise<Message> {
        try 
        {
            const query = `
              INSERT INTO messages (idRcv, idSnd, messageContent)
              VALUES (?, ?, ?)
            `;
            const [result] = await db.execute<ResultSetHeader>(query,
                [
                    message.idRcv,
                    message.idSnd,
                    message.messageContent,
                ]
            );

            if(result.insertId)
            {
                return new Message(result.insertId, message.idRcv, message.idSnd, message.messageContent, new Date(), false);
            }

            return new Message();
        }
        catch (error)
        {
            console.error('Error creating message:', error);
            return new Message();
        }
    }
    
    async getById(id: number): Promise<Message> {
        try {
            const query = `SELECT * FROM messages WHERE idMsg = ?`;
            const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

            if (rows.length > 0) {
                const row = rows[0];
                return new Message(row.idMsg, row.idRcv, row.idSnd, row.messageContent, row.msgTime, row.msgRead);
            }

            return new Message();
        }
        catch {
            return new Message();
        }
    }

    async getByIdRcv(idRcv: number): Promise<Message[]> {
        try {
            const query = `SELECT * FROM messages WHERE idRcv = ?`;
            const [rows] = await db.execute<RowDataPacket[]>(query, [idRcv]);
            
            return rows.map(row => new Message(row.idMsg, row.idRcv, row.idSnd, row.messageContent, row.msgTime, row.msgRead));
        }
        catch {
            return [];
        }
    }

    async getByIdSnd(idSnd: number): Promise<Message[]> {
        try {
            const query = `SELECT * FROM messages WHERE idSnd = ?`;
            const [rows] = await db.execute<RowDataPacket[]>(query, [idSnd]);

            return rows.map(row => new Message(row.idMsg, row.idRcv, row.idSnd, row.messageContent, row.msgTime, row.msgRead));
        }
        catch {
            return [];
        }
    }

    async getByConversation(idUser: number, idConversationPartner: number): Promise<Message[]> {
        try {
            const query = `SELECT * FROM messages WHERE (idSnd = ? AND idRcv = ?) OR (idSnd = ? AND idRcv = ?) ORDER BY msgTime ASC`;
            const [rows] = await db.execute<RowDataPacket[]>(query, [idConversationPartner, idUser, idUser, idConversationPartner]);
            return rows.map(row => new Message(row.idMsg, row.idRcv, row.idSnd, row.messageContent, row.msgTime, row.msgRead));
        }
        catch {
            return [];
        }
    }

    async getContactList(idRcv: number): Promise<number[]> {
        try {
            const query = `SELECT DISTINCT idSnd FROM messages WHERE idRcv = ? ORDER BY msgTime DESC`;
            const [rows] = await db.execute<RowDataPacket[]>(query, [idRcv]);

            return rows.map(row => row.idSnd);
        }
        catch {
            return [];
        }
    }

    async getUnreadCount(idRcv: number): Promise<Unread[]> {
        try {
            const query = `
            SELECT idSnd, COUNT(*) AS unreadCount
            FROM messages
            WHERE idRcv = ? 
            AND msgRead = FALSE 
            GROUP BY idSnd;`;

            const [rows] = await db.execute<RowDataPacket[]>(query, [idRcv]);

            return rows.map(row => new Unread(row.idSnd, row.unreadCount));
        } catch {
            return [];
        }
    }

    async getAll(): Promise<Message[]> {
        try {
            const query = `SELECT * FROM messages ORDER BY id ASC`;
            const [rows] = await db.execute<RowDataPacket[]>(query);
        
            return rows.map(row => new Message(row.idMsg, row.idRcv, row.idSnd, row.messageContent, row.msgTime, row.msgRead));
        } 
        catch 
        {
            return [];
        }
    }

    async update(message: Message): Promise<Message> {
        try {
            const query = `
                UPDATE messages 
                SET idRcv = ?, idSnd = ?, messageContent = ?, msgRead = ?
                WHERE idMsg = ?
            `;
            const [result] = await db.execute<ResultSetHeader>(query, [
                message.idRcv,
                message.idSnd,
                message.messageContent,
                message.msgRead,
                message.id
            ]);

            if (result.affectedRows > 0) {
                return message;
            }

            return new Message();
        } catch {
            return new Message();
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const query = `
                DELETE FROM messages 
                WHERE id = ?
            `;
            const [result] = await db.execute<ResultSetHeader>(query, [id]);

            return result.affectedRows > 0;
        } catch {
            return false;
        }
    }

    async exists(id: number): Promise<boolean> {
        try {
            const query = `SELECT COUNT(*) as count FROM messages WHERE id = ?`;
            const [rows] = await db.execute<RowDataPacket[]>(query, [id]);
            return rows[0].count;
        } catch {
            return false;
        }
    }
}