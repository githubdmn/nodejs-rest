import { Logger, Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { env } from '@/conf';
import { PassportModule } from '@nestjs/passport';
import { AuthUserController } from './auth-user.controller';
import { AuthAdminController } from './auth-admin.controller';
import { LocalStrategy } from './custom/service/implementation/local.strategy';
import { TypeOrmCustomAuth } from './custom';
import {
  AUTH_CUSTOM_ADMIN_REPOSITORY,
  CUSTOM_AUTH_ADMIN_SERVICE,
} from './custom/constants';
import AuthAdminSQLiteRepositoryService from './custom/repository/sqlite/admin.sqlite.service';
import { CustomAuthAdminServiceImplementation } from './custom/service/implementation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './custom/entities';
import { RolesSeederService } from './custom/seed/RolesSeederService';

const Services = [
  {
    provide: AUTH_CUSTOM_ADMIN_REPOSITORY,
    useClass: AuthAdminSQLiteRepositoryService,
  },
  {
    provide: CUSTOM_AUTH_ADMIN_SERVICE,
    useClass: CustomAuthAdminServiceImplementation,
  },
  RolesSeederService,
  Logger,
];

const DynamicImports = [
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
    useFactory: async () => ({
      secret: env.jwtSecret,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  }),
];

const todoRefactor = 'env.CustomAuth';
if (todoRefactor == 'env.CustomAuth') {
  DynamicImports.push(TypeOrmCustomAuth);
}

@Module({
  controllers: [AuthAdminController],
  providers: [...Services],
  imports: [...DynamicImports, TypeOrmModule.forFeature([RolesEntity])],
  exports: [],
})
export class AuthModule {}
