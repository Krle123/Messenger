import type { UserDto } from "../../models/users/UserDto";

export type UserResponse = {
  success: boolean;
  message: string;
  data?: UserDto;
}