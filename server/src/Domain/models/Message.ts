export class Message{
    public constructor(
        public id: number = 0,
        public idRcv: number = 0,
        public idSnd: number = 0,
        public messageContent: string = '',
        public msgTime: Date,
        public msgRead: boolean = false
    ){}
}