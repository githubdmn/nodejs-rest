import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserEntity,
  AuthAdminEntity,
  PasswordEntity,
  RolesEntity,
  TokenEntity,
} from './entities';

export const TypeOrmCustomAuth = TypeOrmModule.forFeature([
  UserEntity,
  AuthAdminEntity,
  PasswordEntity,
  RolesEntity,
  TokenEntity,
]);
