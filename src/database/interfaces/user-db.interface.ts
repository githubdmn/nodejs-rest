import { UpdateUserRequestDto, UpdateUserResponseDto } from "@/dto";

export interface IUserDB {
  findUserByUserId(userId: string): Promise<any>;

  findUserByEmail(email: string): Promise<any>;

  updateUser(
    userId: string,
    newUser: Partial<UpdateUserRequestDto>,
  ): Promise<UpdateUserResponseDto>;
}
