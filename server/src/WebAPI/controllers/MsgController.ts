import { Request, Response, Router } from "express";
import { IMsgService } from "../../Domain/services/msg/IMsgService";
import { dataValidationMessage } from "../validators/msg/MessageValidator";
import jwt from "jsonwebtoken";

export class MsgController {
    private router: Router;
    private msgService: IMsgService;

    constructor(msgService: IMsgService) {
        this.router = Router();
        this.msgService = msgService;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/messages/send', this.sendMessage.bind(this));
        this.router.get('/messages/conversation/:idRcv/:idSnd', this.getConversation.bind(this));
        this.router.get('/messages/unread/:idRcv', this.getUnreadCount.bind(this));
        this.router.get('/messages/contacts/:idRcv', this.getContactList.bind(this));
        this.router.post('/messages/markAsRead/:id', this.markAsRead.bind(this));
    }

    private async sendMessage(req: Request, res: Response): Promise<void> {
        try {
            const { idRcv, idSnd, messageContent } = req.body;

            const rezultat = dataValidationMessage(messageContent);
            if (!rezultat.success) {
                res.status(400).json({ success: false, message: rezultat.message });
                return;
            }
            const result = await this.msgService.sendMessage(idRcv, idSnd, messageContent);
            if(result.id !== 0) {
                res.status(200).json({ success: true, message: 'Message sent successfully', data: result });
                return;
            } else {
                res.status(500).json({ success: false, message: 'Failed to send message' });
                return;
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    private async getConversation(req: Request, res: Response): Promise<void> {
        try {
            const { idRcv, idSnd } = req.body;
            const result = await this.msgService.getConversation(idRcv, idSnd);
            if(result.length > 0) {
                res.status(200).json({ success: true, message: 'Conversation fetched successfully', data: result });
                return;
            }
        }catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    private async getUnreadCount(req: Request, res: Response): Promise<void> {
        try {
            const { idRcv } = req.body;
            const result = await this.msgService.getUnreadCount(idRcv);

            if(result.length > 0) 
            {
                res.status(200).json({ success: true, message: 'Unread count fetched successfully', data: result });
                return;
            }
            res.status(200).json({ success: true, message: 'No unread messages', data: 0 });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    private async getContactList(req: Request, res: Response): Promise<void> {
        try {
            const { idRcv } = req.body;
            const result = await this.msgService.getContactList(idRcv);
            if(result.length > 0) {
                res.status(200).json({ success: true, message: 'Contact list fetched successfully', data: result });
                return;
            }
            res.status(200).json({ success: true, message: 'No contacts found', data: result });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    private async markAsRead(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.body;
            const result = await this.msgService.markAsRead(id);
            if(result) {
                res.status(200).json({ success: true, message: 'Message marked as read successfully' });
                return;
            }
            res.status(500).json({ success: false, message: 'Failed to mark message as read' });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    public getRouter(): Router {
        return this.router;
    }
}
