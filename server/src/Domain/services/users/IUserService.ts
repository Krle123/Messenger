import { UserDto } from "../../DTOs/users/UserDto";

export interface IUserService {
     /**
     * Vraca listu svih korisnika u sistemu.
     * @returns Podatke o korisnicima u vidu liste.
     */
  getAllUsers(): Promise<UserDto[]>;

  /**
   * Vraca korisnika na osnovu njegovog ID-ja.
   * @param id - ID korisnika.
   * @return Podatke o korisniku ili null ako korisnik nije pronadjen.
   */
  getUserById(id: number): Promise<UserDto>
  /**
   * Vraca listu korisnika sa specificnom ulogom.
   * @param role - Uloga korisnika (npr. "admin", "user").
   * @returns Podatke o korisnicima sa specificnom ulogom u vidu liste.
   */
  getAllRole(role: string): Promise<UserDto[]>;

  /**
   * Ažurira informacije o korisniku.
   * @param user - Podaci o korisniku koji se ažuriraju.
   * @returns Ažurirane podatke o korisniku.
   */
  updateUser(user: UserDto): Promise<UserDto>;
}