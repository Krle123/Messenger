import { UserDto } from "../../Domain/DTOs/users/UserDto";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IUserService } from "../../Domain/services/users/IUserService";

export class UserService implements IUserService {
  public constructor(private userRepository: IUserRepository) {}

  async getAllUsers(): Promise<UserDto[]> {
    const users: User[] = await this.userRepository.getAll();
    const usersDto: UserDto[] = users.map(
      (user) => new UserDto(user.id, user.username, user.role)
    );

    return usersDto;
  }
}
