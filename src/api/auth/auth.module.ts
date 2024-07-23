import { Module } from '@nestjs/common';
import { AUTH_ADMIN_FIREBASE_SERVICE, AUTH_ENDUSER_FIREBASE_SERVICE } from '@/common/constants';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@/database/database.module';
import { env } from '@/conf';
import { PassportModule } from '@nestjs/passport';
import { AuthUserService, EnduserAuthFirebaseService } from './firebase-service';
import { EndUserAuthController } from './auth.controller';

const Services = [
  {
    provide: AUTH_ADMIN_FIREBASE_SERVICE,
    useClass: AuthUserService,
  },
  {
    provide: AUTH_ENDUSER_FIREBASE_SERVICE,
    useClass: EnduserAuthFirebaseService,
  },
];

@Module({
  controllers: [EndUserAuthController],
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
