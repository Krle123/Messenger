import { UserDto } from "../../Domain/DTOs/users/UserDto";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IUserService } from "../../Domain/services/users/IUserService";

export class UserService implements IUserService {
  public constructor(private userRepository: IUserRepository) {}

  async getAllRole(role: string): Promise<UserDto[]> {
    const users: User[] = await this.userRepository.getAllRole(role);
    const usersDto: UserDto[] = users.map(
      (user) => new UserDto(user.id, user.username, user.role)
    );
    return usersDto;
  }

  async getUserById(id: number): Promise<UserDto> {
    const user: User = await this.userRepository.getById(id);
    return new UserDto(user.id, user.username, user.role);
  }
  
  async getAllUsers(): Promise<UserDto[]> {
    const users: User[] = await this.userRepository.getAll();
    const usersDto: UserDto[] = users.map(
      (user) => new UserDto(user.id, user.username, user.role)
    );

    return usersDto;
  }
}
