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
        this.router.post('/send', this.sendMessage.bind(this));
        this.router.get('/conversation/:idUser/:idConversationPartner', this.getConversation.bind(this));
        this.router.get('/unread/:idRcv', this.getUnreadCount.bind(this));
        this.router.get('/contacts/:idRcv', this.getContactList.bind(this));
        this.router.post('/markAsRead/:id', this.markAsRead.bind(this));
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
            const { idUser, idConversationPartner } = req.params;
            const result = await this.msgService.getConversation(Number(idUser), Number(idConversationPartner));
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
            const { idRcv } = req.params;
            const result = await this.msgService.getUnreadCount(Number(idRcv));

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
            const { id } = req.params;
            console.log("Marking message as read:", id);
            const result = await this.msgService.markAsRead(Number(id));
            if(result) {
                console.log("Message marked as read:", id);
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
