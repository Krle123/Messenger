import { UserAuthDataDto } from "../../DTOs/auth/UserAuthDataDto";

export interface IAuthService {
    /**
     * Prijavljuje korisnika sa datim korisničkim imenom i lozinkom.
     * @param username - Korisničko ime korisnika.
     * @param password - Lozinka korisnika.
     * @returns Podatke o korisniku ako je prijava uspešna, ili prazan objekat ako nije.
     */
  login(username: string, password: string): Promise<UserAuthDataDto>;

  /**
   * Registruje novog korisnika sa datim korisničkim imenom i lozinkom.
   * @param username - Korisničko ime korisnika.
   * @param password - Lozinka korisnika.
   * @param role - Uloga korisnika u sistemu.
   * @returns Podatke o korisniku ako je registracija uspešna, ili prazan objekat ako nije.
  */
  registration(username: string, role: string, password: string): Promise<UserAuthDataDto>;
}
