import type { UserDto } from "../../models/users/UserDto";
import type { UserResponse } from "../../types/user/UserResponse";

/**
 * Interfejs za korisnicki servis.
 */
export interface IUsersAPIService {
    getAllUsers(): Promise<UserDto[]>;
    getUserById(id: number): Promise<UserDto>;
    updateUser(user: UserDto): Promise<UserResponse>;
}