import { Module } from '@nestjs/common';
import { AuthService } from './custom/auth-admin.service';
import { AUTH_SERVICE } from '@/utils/constants';
import { JwtModule } from '@nestjs/jwt';
import { env } from '@/conf';
import { PassportModule } from '@nestjs/passport';
import { AuthUserController } from './auth-user.controller';
import { AuthAdminController } from './auth-admin.controller';
import { LocalStrategy } from './custom/local.strategy';
import { TypeOrmCustomAuth } from './custom';

const Services = [
  {
    provide: AUTH_SERVICE,
    useClass: AuthService,
  },
  LocalStrategy,
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
  controllers: [AuthUserController, AuthAdminController],
  providers: [...Services],
  imports: [...DynamicImports],
  exports: [],
})
export class AuthModule {}
