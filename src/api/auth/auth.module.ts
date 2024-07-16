import { Module } from '@nestjs/common';
import { AUTH_USER_SERVICE } from '@/utils/constants';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@/database/database.module';
import { env } from '@/conf';
import { PassportModule } from '@nestjs/passport';
import { AuthUserController } from './user/auth-user.controller';
import { AuthUserService } from './user';

const Services = [
  {
    provide: AUTH_USER_SERVICE,
    useClass: AuthUserService
  },
 
];

@Module({
  controllers: [AuthUserController],
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
