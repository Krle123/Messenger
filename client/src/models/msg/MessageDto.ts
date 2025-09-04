export interface MessageDto {
    id: number;
    idRcv: number;
    idSnd: number;
    messageContent: string;
    msgTime: Date;
    msgRead: boolean;
}