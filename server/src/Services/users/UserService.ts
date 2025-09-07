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
    console.log("User fetched in service:", user);
    const userDto: UserDto = new UserDto(user.id, user.username, user.role, user.firstName, user.lastName, user.phone);
    console.log("User DTO in service:", userDto);
    return userDto
  }
  
  async getAllUsers(): Promise<UserDto[]> {
    const users: User[] = await this.userRepository.getAll();
    const usersDto: UserDto[] = users.map(
      (user) => new UserDto(user.id, user.username, user.role)
    );
    return usersDto;
  }

  async updateUser(userDto: UserDto): Promise<UserDto> {
    const user: User = await this.userRepository.update(new User(userDto.id, userDto.username, userDto.role, "", userDto.firstName, userDto.lastName, userDto.phone));
    return new UserDto(user.id, user.username, user.role, user.firstName, user.lastName, user.phone);
  }
}
