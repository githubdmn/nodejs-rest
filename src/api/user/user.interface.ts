import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  UserLoginRequestDto,
  UserLoginResponseDto,
} from '@/dto';

export interface IUser {
  register(user: CreateUserRequestDto): Promise<CreateUserResponseDto>;
  getJwt({
    email,
    password,
  }: UserLoginRequestDto): Promise<UserLoginResponseDto>;
}
