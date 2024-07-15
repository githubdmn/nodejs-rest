import { UpdateUserRequestDto, UpdateUserResponseDto, UserDto } from "@/dto";

export interface IUserDatabase {
  findUserByUserId(userId: string): Promise<UserDto>;

  findUserByEmail(email: string): Promise<UserDto>;

  updateUser(
    userId: string,
    newUser: Partial<UpdateUserRequestDto>,
  ): Promise<UpdateUserResponseDto>;
}
