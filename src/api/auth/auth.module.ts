import { Module } from '@nestjs/common';
import { AuthService } from './custom/auth.service';
import { AUTH_SERVICE } from '@/utils/constants';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@/database/database.module';
import { env } from '@/conf';
import { PassportModule } from '@nestjs/passport';
import { AuthUserController } from './auth.controller.user';
import { AuthAdminController } from './auth.controller.admin';
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
  DatabaseModule,
  JwtModule.registerAsync({
    useFactory: async () => ({
      secret: env.jwtSecret,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  }),
];

if ('env.CustomAuth') {
  DynamicImports.push(TypeOrmCustomAuth);
}

@Module({
  controllers: [AuthUserController, AuthAdminController],
  providers: [...Services],
  imports: [...DynamicImports],
  exports: [],
})
export class AuthModule {}
