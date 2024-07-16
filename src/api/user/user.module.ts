import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AUTH_USER_SERVICE } from '@/utils/constants';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@/database/database.module';
import { env } from '@/conf';

const Services = [
  {
    provide: AUTH_USER_SERVICE,
    useClass: UserService,
  },
];

@Module({
  controllers: [UserController],
  providers: [...Services],
  imports: [
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
export class UserModule {}
