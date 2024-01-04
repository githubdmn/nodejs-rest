import { CreateUserRequest } from '@/dto';
import { UserEntity } from '@/entities';

export interface IUserDatabase {
  save(user: CreateUserRequest): Promise<UserEntity>;
  findUserByUserId(userId: string): Promise<UserEntity | null>;
  findUserByEmail(email: string): Promise<UserEntity | null>;
}
