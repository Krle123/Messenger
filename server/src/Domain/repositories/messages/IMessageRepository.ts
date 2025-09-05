import { Message } from "../../models/Message";
import { Unread } from "../../models/Unread";


export interface IMessageRepository {
  /**
   * Kreira novu poruku u bazi podataka
   * @param message - Objekat poruka za kreiranje
   * @returns Promise koji vraća kreiranu korisnika sa dodeljenim ID-om ili prazan objekat
   */
  create(message: Message): Promise<Message>;

    /**
        * Pronalazi korisnika po ID-u
        * @param id - Jedinstveni identifikator poruke
        * @returns Vraća poruku ili prazan objekat ako nije pronađen
    */
    getById(id: number): Promise<Message>;

    /**
        * Pronalazi poruku po ID-u primaoca
        * @param idRcv - Jedinstveni identifikator primaoca
        * @returns Vraća poruku ili prazan objekat ako nije pronađen
    */
    getByIdRcv(idRcv: number): Promise<Message[]>;

    /**
        * Pronalazi poruku po ID-u posijaoca
        * @param idSnd - Jedinstveni identifikator posiljaoca
        * @returns Vraća poruku ili prazan objekat ako nije pronađen
    */
    getByIdSnd(idSnd: number): Promise<Message[]>;

    /**
        * Pronalazi poruke u konverzaciji
        * @param idSnd - Jedinstveni identifikator posiljaoca
        * @param idRcv - Jedinstveni identifikator primaoca
        * @returns Vraća poruku ili prazan objekat ako nije pronađen
    */
    getByConversation(idUser: number, idConversationPartner: number): Promise<Message[]>;

    /**
        * Vraća listu ID-eva korisnika sa kojima je moguce pricati
        * @param idRcv - Jedinstveni identifikator primaoca
        * @returns Promise koji vraća niz jedinstvenih ID-eva korisnika koji su kontaktirali određenog primaoca
    */
    getContactList(idRcv: number): Promise<number[]>;

    /**
        * Vraća broj nepročitanih poruka za svakog posiljaoca
        * @param idRcv - Jedinstveni identifikator primaoca
        * @returns Promise koji vraća niz objekata tipa Unread, gde svaki objekat sadrži ID pošiljaoca i broj nepročitanih poruka od tog pošiljaoca
    */
    getUnreadCount(idRcv: number): Promise<Unread[]>;

    /**
        * Vraća sve poruke iz baze podataka
        * @returns Promise koji vraća niz svih poruka
        */
    getAll(): Promise<Message[]>;

    /**
       * Ažurira postojeću poruku
       * @param message - Objekat poruka sa ažuriranim podacima
       * @returns Promise koji vraća ažuriranu poruku ili prazan objekat ako ažuriranje nije uspešno
       */
    update(message: Message): Promise<Message>;
  
    /**
        * Briše poruku iz baze podataka
        * @param id - ID poruke za brisanje
        * @returns Promise koji vraća true ako je brisanje uspešno, false inače
    */
    delete(id: number): Promise<boolean>;

    /**
        * Proverava da li poruka postoji u bazi podataka
        * @param id - ID poruke za proveru
        * @returns Promise koji vraća true ako poruka postoji, false inače
    */
    exists(id: number): Promise<boolean>;
}