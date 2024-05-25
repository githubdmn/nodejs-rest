import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  UpdateUserResponseDto,
  UserDto,
  UserLoginRequestDto,
  UserLoginResponseDto,
} from '@/dto';

export interface IUser {
  // register(user: CreateUserRequestDto): Promise<CreateUserResponseDto>;
  getJwt({
    email,
    password,
  }: UserLoginRequestDto): Promise<UserLoginResponseDto>;
  resetPassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<UpdateUserResponseDto>;
  refreshToken(
    user: Partial<UserDto>,
    refreshToken: string,
  ): Promise<UserLoginResponseDto>;
  logout(refreshToken: string): Promise<UserLoginResponseDto>;
}
