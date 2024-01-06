import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  UpdateUserResponseDto,
  UserLoginRequestDto,
  UserLoginResponseDto,
} from '@/dto';

export interface IUser {
  register(user: CreateUserRequestDto): Promise<CreateUserResponseDto>;
  getJwt({
    email,
    password,
  }: UserLoginRequestDto): Promise<UserLoginResponseDto>;
  resetPassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<UpdateUserResponseDto>;
}
