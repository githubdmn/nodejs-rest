import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserEntity,
  AdminEntity,
  PasswordEntity,
  RolesEntity,
  TokenEntity,
} from './entities';

export const TypeOrmCustomAuth = TypeOrmModule.forFeature([
  UserEntity,
  AdminEntity,
  PasswordEntity,
  RolesEntity,
  TokenEntity,
]);
