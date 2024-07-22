import { Module } from '@nestjs/common';
import { AUTH_FIREBASE_SERVICE, AUTH_USER_SERVICE } from '@/common/constants';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@/database/database.module';
import { env } from '@/conf';
import { PassportModule } from '@nestjs/passport';
import { AuthUserService, FirebaseAuthUserService } from './firebase-service';
import { AuthController } from './auth.controller';

const Services = [
  {
    provide: AUTH_USER_SERVICE,
    useClass: AuthUserService,
  },
  {
    provide: AUTH_FIREBASE_SERVICE,
    useClass: FirebaseAuthUserService,
  },
];

@Module({
  controllers: [AuthController],
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
