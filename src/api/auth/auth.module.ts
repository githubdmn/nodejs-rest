import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AUTH_SERVICE } from '@/utils/constants';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@/database/database.module';
import { env } from '@/conf';
import { PassportModule } from '@nestjs/passport';
import { AuthUserController } from './auth.controller.user';
import { AuthAdminController } from './auth.controller.admin';
import { LocalStrategy } from './local.strategy';

const Services = [
  {
    provide: AUTH_SERVICE,
    useClass: AuthService,
  },
  LocalStrategy,
];

@Module({
  controllers: [AuthUserController, AuthAdminController],
  providers: [...Services],
  imports: [
    PassportModule,
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: env.jwtSecret,
        signOptions: {
          expiresIn: '60s',
        },
      }),
    }),
  ],
  exports: [],
})
export class AuthModule {}
