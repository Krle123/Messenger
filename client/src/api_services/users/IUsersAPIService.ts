import type { UserDto } from "../../models/users/UserDto";

/**
 * Interfejs za korisnicki servis.
 */
export interface IUsersAPIService {
    getAllUsers(token: string): Promise<UserDto[]>;
    getUserById(id: number): Promise<UserDto>;
}