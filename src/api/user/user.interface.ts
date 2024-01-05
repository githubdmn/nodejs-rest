import { CreateUserRequest, UserLoginRequest, UserLoginResponse } from '@/dto';
import { UserEntity } from '@/entities';

export interface IUser {
  register(user: CreateUserRequest): Promise<UserEntity>;
  getJwt(user: UserLoginRequest): Promise<UserLoginResponse>;
}
