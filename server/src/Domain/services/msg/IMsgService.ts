import { MessageDto } from "../../DTOs/msg/MessageDto";
import { UnreadDto } from "../../DTOs/msg/UnreadDto";

export interface IMsgService {
    /**
     * Šalje poruku od pošiljaoca primaocu sa datim sadržajem.
     * @param idRcv - ID primaoca poruke.
     * @param idSnd - ID pošiljaoca poruke.
     * @param messageContent - Sadržaj poruke.
     * @returns true ako je poruka uspešno poslata, inače false.
     */
    sendMessage(idRcv: number, idSnd: number, messageContent: string): Promise<MessageDto>;

    /**
     * Dohvata sve poruke između dva korisnika.
     * @param idRcv - ID primaoca poruke.
     * @param idSnd - ID pošiljaoca poruke.
     * @returns Niz poruka između dva korisnika.
     */
    getConversation(idUser: number, idConversationPartner: number): Promise<MessageDto[]>;

    /**
     * Dohvata broj nepročitanih poruka za određenog korisnika.
     * @param idRcv - ID korisnika za kojeg se broje nepročitane poruke.
     * @returns Niz objekata koji sadrže ID pošiljaoca i broj nepročitanih poruka od tog pošiljaoca.
     */
    getUnreadCount(idRcv: number): Promise<UnreadDto[]>;

    /**
     * Dohvata listu jedinstvenih ID-eva korisnika koji su u komunikaciji sa datim korisnikom.
     * @param idRcv - ID korisnika za kojeg se dohvaća lista kontakata.
     * @returns Niz jedinstvenih ID-eva korisnika koji su u komunikaciji sa datim korisnikom.
     */
    getContactList(idRcv: number): Promise<number[]>;

    /**
     * Označava poruku kao pročitanu.
     * @param id - ID poruke koja se označava kao pročitana.
     * @returns true ako je poruka uspešno označena kao pročitana, inače false.
     */
    markAsRead(id: number): Promise<boolean>;
}