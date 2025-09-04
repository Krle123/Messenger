import { UserDto } from "../../DTOs/users/UserDto";

export interface IUserService {
     /**
     * Vraca listu svih korisnika u sistemu.
     * @returns Podatke o korisnicima u vidu liste.
     */
  getAllUsers(): Promise<UserDto[]>;

  /**
   * Vraca listu korisnika sa specificnom ulogom.
   * @param role - Uloga korisnika (npr. "admin", "user").
   * @returns Podatke o korisnicima sa specificnom ulogom u vidu liste.
   */
  getAllRole(role: string): Promise<UserDto[]>;
}